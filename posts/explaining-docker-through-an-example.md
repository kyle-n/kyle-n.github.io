---
layout: post
title: Explaining Docker through an example
date: 2023-10-16
image: future-whale.png
caption: DALL-E 2- "a blue whale leaping through the air. The background is full of digital rain and numbers and neon lights"
description: A short anecdote illustrating why Docker is useful.
---

For a long time, I didn't understand what [Docker](https://www.docker.com/) did, or why one would use it. The most common explanations and metaphors didn't track for me.

It made sense when we used it at my old job. I want to tell this story, since it may help other people understand Docker's usefulness too.

### The mobile app

At my first job, our company made an app for iPhone and Android. The app used [Ionic](https://ionic.io/) 2.

Our app worked fine, most of the time. Customers would request new features, we'd add them and ship a new copy of the app to the Android and iOS app stores.

The problem was whenever a new developer joined the team, they couldn't build the app to run on a test phone. In order to build the app, you had to install a specific version of [OpenJDK](https://openjdk.org/) (*not* the latest) and a bunch of other Android command-line tools. *Then* you had to set a bunch of global bash variables so all these programs pointed at each other.

Even with experience on the command line, it took me an entire day to set up everything the app needed.

Our DevOps person, who was unaware the app required so much setup, watched this with horror. He decided nobody should ever have to go through what I went through again.

### Docker to the rescue

The DevOps person spent some time putting together a Docker container. This Docker container was basically a tiny command-line environment where everything was set up *perfectly*. It always had the right version of OpenJDK, the right bash variables and everything else you needed to build the app.

Once he'd made the container, he gave it to everyone on the frontend team. Now, when we wanted to build the app, we ran a single command, and the Docker container would build it for us. You didn't have to have anything else installed on your PC.

This was, obviously, a huge help. When we got new developers, or an existing developer got a new laptop, all they had to do was download the Docker container.

It also made technical upgrades easier. If the app needed a newer version of some Android command-line tool, the DevOps person could upgrade it once, in the container, and everyone would get the new version next time they did a build and ran the container. It was great!