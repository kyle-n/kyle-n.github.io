---
layout: post
title: WWDC Wishlist&#58; A free large-language model built into iOS and macOS
image: wwdc23.jpg
---

As an Apple developer, one thing I would love to see at WWDC is a free large-language model built into iOS and macOS. Ship GPT-whatever with the OS and let third-party apps call into it for free. 

This would be good for a couple reasons. 

First, it would be incredibly useful for us third-party developers. I am currently writing a [web extension for autofilling email login codes](https://www.nazariosoftware.com/2023/04/14/log-in-seamlessly-with-autofill-email-codes.html). The app has an algorithm that finds login codes in the text of an email. It works pretty well, but you know what's even better? ChatGPT. ChatGPT finds the code every single time.[^1]

[^1]: I also tried machine learning, but it is not something I have a lot of expertise with. [Tensorflow.js](https://www.tensorflow.org/js) with the [Q&A model](https://github.com/tensorflow/tfjs-models/tree/master/qna) was slow and had a terrible accuracy rate. 

Unfortunately, ChatGPT is not feasible in my app. Using their API would be an ongoing cost, which would require an ongoing subscription. Additionally, I don’t want to send users’ emails to OpenAI.

I could ship an LLM like [llama.cpp](https://github.com/ggerganov/llama.cpp) with my app but LLMs are, at the moment, too large. I don't want to include a multi-gigabyte model file in a web extension. Better for Apple to put it in the OS once and share it across all apps. 

Apple could also implement a locally run LLM more efficiently than any third party. Last year, they patched CoreML and [made Stable Diffusion run twice as fast](https://arstechnica.com/information-technology/2022/12/apple-slices-its-ai-image-synthesis-times-in-half-with-new-stable-diffusion-fix/).

A free and locally run LLM would be good for Apple users’ privacy as well. If I were Tim Cook, I might be concerned about lots of apps on my platform using LLM services that keep user data to train their models. If Apple provided a free, local, private LLM for developers instead, it would encourage third-party developers to not use other services.

It would even encourage developers to create only for Apple platforms. This theoretical LLM, if it ever exists, will be enabled by Apple Silicon. It will be possible only because of hardware you can’t get on other platforms. 

So, fingers crossed. Here’s hoping for something great this year at WWDC with generative AI. 