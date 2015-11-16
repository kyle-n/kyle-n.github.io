---
layout: post
title: How to Autofill KeePass Passwords in Chrome, Firefox and Safari
original: http://www.technorms.com/44981/autofill-keepass-passwords-browser
image: keepassBrowser.png
org: TechNorms
keywords: technorms, keepass, chrome, firefox, safari, autofill, passwords, web browser
categories: web, tech, guide, technorms
---

We at TechNorms [love KeePass](http://www.technorms.com/162/the-best-open-source-password-manager-keepass-password-safe). It's a free (as in beer and as in freedom) and open-source password manager that also happens to be available on every major computing platform. What's not to love? 

<!--break-->

Well, there is one thing that needs some work. Its browser integration. Despite its [propensity for being hacked](https://blog.lastpass.com/2015/06/lastpass-security-notice.html/), it's great at autofilling your passwords within your browser, no input needed. That's damn convenient. Turns out KeePass has a similar feature- it just takes some setting up. Here's how to autofill KeePass passwords in a browser. 

## How to Autofill KeePass Passwords in a Browser

### Edit Entries

Here's the not fun part. In order to use the login data within your KeePass database, it means adding information to the URL field for every login entry. 

Go to whatever page you login to a website on. For example, mine would be [this one](https://login.yahoo.com/config/login?.src=fpctx&.intl=us&.done=https%3A%2F%2Fwww.yahoo.com%2F) for Yahoo. Copy that URL. Open your KeePass database and enter that into the URL field. 

Do that for whatever login entries you want to use within a browser. 

### Setup KeePass Data Transfer

For this tutorial, we'll assume you're using KeePassX. It's the free, cross platform version that runs on Windows, Mac and Linux. You'll also need the [alpha](https://www.keepassx.org/news/2014/04/433) version that creates KeePass 2.0 databases. 

To transfer data from KeePassX to a browser, it means keeping your database open. This is also a security issue, so be careful with what you leave running. 

Next, you need [keepasshttp](https://github.com/pfn/keepasshttp/), a bit of software that securely transfers password data by http. Installation varies by platform. 

On Windows, download [Chocolatey](https://chocolatey.org). It's a command-line package manager for Microsoft's OS and it's much easier than doing the manual installation of keepasshttp. 

Once that's installed, enter: 

> choco install keepass-keepasshttp

And let it do its thing. 

For Linux and Mac, you need to run KeePass under [Mono](http://keepass.info/help/v2/setup.html#mono). Downloading a 2.0 version of KeePass should do the trick there. 

Next, [download keepasshtml](https://raw.github.com/pfn/keepasshttp/master/KeePassHttp.plgx). This will give you a .plgx file, which is a KeePass plugin. To install, you drop it in the KeePass directory. This is located wherever you keep the KeePass executable. 

On Windows, that is under Program Files (unless you have the portable version). On Mac, it's under Applications. On Linux, it's /usr/lib/keepass2/ by default. 

### Browser Extensions

I dug up compatible browser extensions for Chrome, Firefox and Safari. All three do more or less the same thing- auto-filling your password data. 

Chrome has [chromeIPass](https://chrome.google.com/webstore/detail/chromeipass/ompiailgknfdndiefoaoiligalphfdae?hl=en). It's free, useful and functional. No complaints there. 

ChromeIPass autofills a page if it's your only login. If you have multiple accounts, it'll let you choose an account by clicking the icon in the menu bar. You can also add login data to your database when you enter a password at a URL that's not stored in KeePass, which is neat. Just be sure not to add duplicate entries for previous entries that don't have a URL. 

Firefox has [PassIFox](https://addons.mozilla.org/En-us/firefox/addon/passifox/). Users have mixed reviews of it, but it's also the only game in town for Firefox people. 

Safari offers [passafari](https://github.com/mmichaa/passafari.safariextension). It's functional, but development looks frozen with no sign of continuing. Even the documentation isn't finished. 

### Final Thoughts

Honestly, all the setup and janky extensions and needing to fill in URLs makes KeePass a less attractive prospect than something like LastPass. LastPass might charge you money, but at least it abstracts away login data and makes it even more convenient. 

There's also no good way to implement this kind of setup on mobile. Android, maybe. iOS, never. Your best bet there is still to use a basic KeePass app and copy and paste your data into the form. 

However, for people who don't mind putting in a little elbow grease, KeePass and keepasshttp is a viable alternative. Plus, it's open source, and who doesn't like that? 