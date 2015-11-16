---
layout: post
title: The Complete Guide to Hosting Your Own Website With GitHub Pages
original: http://www.technorms.com/45118/guide-to-host-website-github-pages
image: ghpages.png
org: TechNorms
keywords: technorms, github pages, guide, hosting, website, github pages, free online, jekyll, static sites
categories: web, tech, guide, technorms
---

Two weeks ago, I decided to build my own website. Considering I only knew basic HTML and CSS and absolutely nothing about hosting, this took a lot more work than I anticipated. Learning how to do proper CSS was an adventure. 

<!--break-->

For this article, though, we'll focus on hosting. Where do you upload your website? How do you get a web page online once it's been designed? The answer is GitHub Pages. There's definitely a learning curve, but it's a really awesome system once it's all set up. 

## What is Hosting? 

Simply put, someone has to run a computer 24/7 to deliver your website to anyone who asks for it. A server is a computer that hosts your website and keeps the lights on. 

Running a server can be challenging for amateurs. Instead, it's easier to let another service handle the process (and keep your power bills down). 

Instead, you can host your content (and enjoy the advantage of great software development tools) on [GitHub](https://github.com). Programmers like GitHub because it lets you host projects and code, completely for free. 

One type of project you can host on GitHub is a website. Just run your project like it's any other GitHub software program and you can let their servers do the work. Here's how to do it. 

### How to Use GitHub Pages

First, [sign up for GitHub](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0CB8QFjAAahUKEwiZwsr9qvLGAhUHhg0KHZyUB0Q&url=https%3A%2F%2Fgithub.com%2Fjoin&ei=Pm-xVZmrG4eMNpypnqAE&usg=AFQjCNF6nezHQWX1hKwEFQVYRrUheS9_Ig&sig2=ZOpd-Ehij5y5XKPyc6zUlA). Next, you'll need to [create a repository](https://github.com/new). The naming is important- it must be in this format: 

> *username*.github.io

For my website, I put kyle-n.github.io. Once you get some files hosted there, putting (username).github.io into the address bar of any browser will pull up your website. Pretty cool, eh? 

Next you'll need to set up a GitHub project. Mac and Linux users can do this natively from the command line, which I would recommend. Windows users can also [download and install command-line git]((http://guides.beanstalkapp.com/version-control/git-on-windows.html)). 

If you're not a fan of the command line, there are GitHub GUI clients for [Windows](https://windows.github.com) and [Mac](https://mac.github.com). I'd really recommend learning the commands, though, and that's what this guide will focus on. 

On the command line, enter: 

> git clone https://github.com/*username*/*username*.github.io

Replacing username where necessary, obviously. This will clone the (nonexistent) project to your local machine. To start editing it, enter: 

> cd *username*.github.io

> touch index.html

This will make an index page for your website, which should always be the homepage name. To edit that, open it up in any text editor and start editing there. HTML design is another article, though. 

Once you've made the changes you want to index.html, switch back to the terminal and enter: 

> git add --all

> git commit -m 'Initial commit'

> git push -u origin master

After that, going to http://*username*.github.io will show the index.html that you built. 

### How to Associate a Domain Name With a GitHub Page

Using the github.io domain is fine for nonprofessional work, but what if you want to use your own domain? The whole point of having your own website is to have a space that's totally yours. 

To do that, you need to buy a domain name. You can purchase one of those from a domain registrar like [Hover](https://www.hover.com). For my site, I used [NameCheap](https://www.namecheap.com/?utm_source=none&affnetwork=nc&utm_medium=Affiliate&utm_campaign=38218). I don't need a lot of customer service, and their domain names are indeed cheap. 

Sign up for an account with your preferred registrar and buy your domain. After that, associating it with a GitHub Page takes a little effort. We're creating what's called an apex domain, aka something.com and not other.something.com, which is a subdomain. 

Open up your website folder on your local machine. Now open a text editor and enter: 

> example.com

No http, no www, just the name and domain type. All that goes on a single line. No spaces, no enter, nothing else. There can only be one domain in this file. 

Save it as: 

> CNAME

Just that. No .txt extension, no .rtf, just CNAME in all caps. Once that's done, make sure it's in the project folder and enter: 

> git add .

> git commit -m 'CNAME added'

> git push origin master

This will add a CNAME file to your site. It's necessary for the URL to work. 

### Configuring aliases

Here's the hard part. Now you have to edit your domain settings. From a big picture, you need to add A records to your DNS provider for: 

> 192.30.252.153

> 192.30.252.154

In two separate entries and everything. How to do this depends on your registrar, and it's inevitably confusing for hosting newbies. 

For NameCheap, go to the three-bar menu on the right > manage domains > (your domain) > All Host Records (on the left). 

In the @ column under IP Address/URL, enter the first IP from above. In the www column, enter: 

> *username*.github.io.

Note the period at the end of that last one. Also note the lack of www or http. 

Below, in the subdomain settings, enter "a" in the first column and the second IP in the second. 

For record type, the @ and subdomain a columns need to be "A (Address)." Www needs to be CNAME (Alias). Now press "Save Changes" at the bottom. 

### Develop and Test

This should do it for your website. If you need any other help, [GitHub Pages](https://help.github.com/categories/github-pages-basics/) guides are always useful. Enjoy development! 