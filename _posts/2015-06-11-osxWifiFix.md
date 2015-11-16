---
layout: post
title: How to Fix WiFi Issues on Mac OS Using In-built Tools
original: http://www.technorms.com/44679/fix-wifi-issues-on-mac-os
image: osxWifi.png
org: TechNorms
keywords: technorms, fix os x wifi, how to, built in tools, mac, troubleshoot
categories: apple, tech, guide, technorms
---

For an operating system designed to be easy to use, OS X has an odd way of handling WiFi networks. You have to pick one from the menu bar in the upper right and let it sit there, trying to connect. 

<!--break-->

When you're in a situation with less-than-ideal WiFi, sometimes it means troubleshooting. The basic unit of fixing computer problems (turning it off and back on again) is always relevant to WiFi trouble. If that doesn't work, OS X has a lot of useful tools for fixing troublesome WiFi- you just have to find them. 

## How to Troubleshoot OS X WiFi Problems

### How to Check for a Connection

I recently tried connecting to a new WiFi network and couldn't tell if I was connected to the internet. The WiFi signal showed full strength, but pages in the browser (the simplest connection test) would not load. 

To check if there's any way to get data out to the internet, go to Finder > Applications > Terminal. This opens a bash shell you can use to troubleshoot network issues. 

To test if there's any way to get to the internet, type in: 

> ping www.google.com

And press enter. Your Mac will now send requests to Google's servers, just to see if Google's servers talk back. 

If not, you'll see the Terminal window sit there and do nothing for a while, then it'll finish. 

It's useful for seeing if your internet is there, but slow and constantly timing out. In my case, I got packets back from Google but some requests timed out. Translation: Internet is flaky. 

### How to Forget a WiFi Network on Mac OS X

After the previous network didn't work, I tried connecting to a different one. No luck on this one, it required a password to log on. 

However, connecting to a network once means OS X thinks you and that WiFi network are now best friends and it should connect to it many times. This is not ideal when that network does not work. 

To forget a network, go to Finder > Applications > System Preferences > Network > Advanced (in the bottom-right corner). 

You'll see a list of the networks you've recently connected to. Click on the one you want to delete and press minus. This will remove it from the auto-connect list. 

Press OK, then Apply, and then you are finished. 

### How to Stop MacBook Airs From Dropping WiFi on Wake

This one drove me insane. OS X has a bug in it where MacBook Airs will wake up from sleep mode, show an internet connection, disconnect, and then reconnect. 

To fix this, open up the Network panel in the System Preferences like I've listed above. Click the "Location" box at the top and select "Edit Locations." 

Now press the plus icon to add a new location. Select it and press "Done" and "Apply" when finished. 

Now connect to your preferred WiFi network. OS X will remember that and not have to reconnect every time you open your Air's lid. Much better. 

### Final Thoughts

Network troubles are irritating, to be sure. The good news is that more fixes are on the way from Apple. The latest OS X beta reverts back to the old way of networking. Hopefully that's a little more reliable. 