---
layout: post
title: How Node.js Fakes Multithreading
image: reactor-pattern.png
caption: From Node.js Design Patterns by Mario Casciaro and Luciano Mammino
---

[Node.js](https://www.bitovi.com/backend-consulting/nodejs-consulting) is one of the most popular languages for web servers, even though [JavaScript is single-threaded](https://codeburst.io/is-javascript-single-threaded-youre-kidding-me-80b11d74f4e5). This might seem contradictory at first---don't web servers need to handle simultaneous connections?

The answer is something built into the language called **the reactor pattern**. The reactor pattern allows Node.js to not only "multithread" but to do so in a resource-efficient way that makes it [perfect for microservices](https://www.bitovi.com/blog/5-reasons-to-choose-nodejs).

**[Read the rest at the Bitovi blog](https://www.bitovi.com/blog/how-node.js-fakes-multithreading)**.