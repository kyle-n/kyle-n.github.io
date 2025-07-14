---
layout: post
title: How to remotely access a Plex server behind CGNAT
description: No port forwarding necessary.
keywords: tutorial
date: 2025-07-14
---

I recently figured out how to expose my Plex server for remote access. This way, I can keep streaming [my special music collection](/blog/why-plex-music) outside the home.

It was challenging, especially since my home internet provider uses [carrier-grade network address translation](https://en.wikipedia.org/wiki/Carrier-grade_NAT), or CGNAT. CGNAT hides a large number of internet users, usually residential, behind a couple shared IPv4 addresses. I couldn't tell you why my ISP uses it, but they do, and it means I cannot open a port to the public internet.

No public ports is an issue, because if I'm traveling and open the Plex app, it pings Plex's servers and asks for a web address from which it can directly load content. Plex clients _can_ relay video from your server through Plex's own servers, but this is [limited to 720p](https://support.plex.tv/articles/216766168-accessing-a-server-through-relay/), doesn't support downloads and [requires a subscription](https://support.plex.tv/articles/requirements-for-remote-playback-of-personal-media/).

With CGNAT, I can't open a public port for loading Plex content. I share the same IP address with thousands of other people. To my understanding, CGNAT doesn't support it.

### Publishing the server

Enter [Cloudflare](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/):

> Cloudflare Tunnel provides you with a secure way to connect your resources to Cloudflare without a publicly routable IP address. With Tunnel, you do not send traffic to an external IP — instead, a lightweight daemon in your infrastructure (cloudflared) creates [outbound-only connections](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/#outbound-only-connection) to Cloudflare's global network.

You can set up a Cloudflare Tunnel to give a local process on your machine a publicly accessible address. I recommend [this guide](https://mythofechelon.co.uk/blog/2024/1/7/how-to-set-up-free-secure-high-quality-remote-access-for-plex) ([archive](https://web.archive.org/web/20241224205238/https://mythofechelon.co.uk/blog/2024/1/7/how-to-set-up-free-secure-high-quality-remote-access-for-plex)), which is perfect, but for one final step, which I found in the post's [comments](http://disq.us/p/2z0v4bh).

Open your server's settings and add two [custom server URLs](https://support.plex.tv/articles/200430283-network/). They should be whatever domain you used for your tunnel, but with the ports specified. For example, my tunnel runs at [https://plex.spooky.pictures](https://plex.spooky.pictures) [^1]. My custom server access URLs are `https://plex.spooky.pictures:80,https://plex.spooky.pictures:443`.

[^1]: The domain is leftover from an [unfinished personal project](https://github.com/kyle-n/spooky-pictures), basically a fan site for horror movies.

### Maintaining the connection

To keep the server online, make sure your computer is set to never sleep! This will shut off the tunnel.

I also set up a [cron](https://en.wikipedia.org/wiki/Cron) job to check the public server URL, and restart the tunnel if it is down.

This nesting doll of shell scripts begins with the cron config:

```
@reboot /Users/kylenazario/server/maintain-tunnel.sh
*/5 * * * * /Users/kylenazario/server/maintain-tunnel.sh
```

`maintain-tunnel.sh`:

```sh
#!/usr/bin/env bash

cd /Users/kylenazario/server
status=$(./get-tunnel-status.sh)

ERROR_MSG='Error detected, restarting the tunnel service...'

# Check if the response starts with "error code"
if [[ $status == "true" ]]; then
    echo "No error detected."
else
    echo "$ERROR_MSG"
    ./send-push.sh "$ERROR_MSG"
    ./restart-tunnel.sh
fi
```

`get-tunnel-status.sh`:

```sh
#!/usr/bin/env bash

# URL to check
URL="https://plex.spooky.pictures"

# If the tunnel is online, the returned HTML will include a 401
response=$(curl -s "$URL")

if [[ $response == *"401 Unauthorized"* ]]; then
    echo "true"
else
    echo "false"
fi
```

`restart-tunnel.sh`:

```sh
#!/usr/bin/env bash

cd /Users/kylenazario/server

echo "Stopping tunnel..."
./kill-tunnel.sh
echo "Tunnel stopped"

sleep 3

echo "Starting tunnel..."
./tunnel.sh
echo "Tunnel started"

sleep 3
./check-networking-status.sh
```

`kill-tunnel.sh`:

```sh
#!/usr/bin/env bash

killall -9 cloudflared tunnel run
```

`tunnel.sh`:

```sh
#!/usr/bin/env bash

cloudflared tunnel run > /dev/null 2>&1 &
```

The last script, `send-push.sh`, just pings me using [Pushover](https://pushover.net).
