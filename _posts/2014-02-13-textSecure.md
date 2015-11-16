---
layout: post
title: Send Encrypted and Secure Text and MMS Messages on Android with TextSecure
original: http://www.technorms.com/38943/textsecure-encrypts-texts-mms-on-android
image: textsecure-title.gif
org: TechNorms
keywords: encrypted messaging, sms, mms, android, textsecure, android, cyanogenmod
categories: messaging, android, privacy, tech, technorms, review
---

Security matters more and more these days now that Edward Snowden has revealed just how deeply the National Security Agency has penetrated the world’s communications. It can read everything.

<!--break-->

What’s a security-minded user to do? How do you communicate when your texts are scooped up by a government agency?

Ideally you’d get rid of your smartphone. However, if you want something secure without giving up that handy pocket computer, check out TextSecure. It offers more security than the average texting app through a couple excellent features.

## Security First

security and privacyTextSecure is built from the ground up for . It locks the app with a password, keeping your messages safe behind a private key. According to the app’s website:

“This passphrase will be used to encrypt all of TextSecure’s secret information, including the keys used to encrypt your text messages. The security of your messages depends on the strength of this passphrase, so make it good.”

The key encrypts your messages locally and when texting to other users. This is the main draw of TextSecure- sending messages to others which are exponentially less likely to be intercepted.

If the person you’re messaging uses TextSecure as well, the app will display a lock icon on the send button and in the conversation’s title bar.

The app uses security measures created by researcher Moxie Marlinspike to pass data securely between devices.

The entire app is open-source and hosted on GitHub. Additionally, the developer keeps wiki pages explaining its cryptographic techniques for security audits.

The local security also includes an interesting feature to protect yourself. You can’t take screenshots of the conversations, something which made illustrating this article that much harder.

### Design and Implementation

TextSecure’s design is decent. It uses a nice Holo theme (with options for dark and light) that looks like the old AOSP Messaging app.

There’s also a nifty sliding side drawer for the security options to check people’s identity keys.

As for implementation, CyanogenMod began implementing the service into its Messaging app by default, so other CM users can securely chat with each other. As long as you’re on 10.2 or later, you’ll get the new features.

On the usability side of things, TextSecure offers a dizzying array of languages including English, Arabic, Chinese, French, Spanish, Greek, and Tibetan.

Texting and general performance seem strong, though it’s not as fancy as other Android third-party messaging apps.

Its users likely won’t care as much about the interface, though. You use TextSecure for the features, not the graphics.

### Final Thoughts

It bears remembering that no messaging app is 100 percent secure, especially TextSecure. I couldn’t find an independent security audit to verify its quality.

Be careful of the metadata, as well. A third-party snooper could miss the content of a secure message but still record you messaging that person.

That said, using TextSecure can’t hurt if you and a friend want to communicate securely. While it won’t protect you completely, it will reduce the likelihood of your message being intercepted.

Be careful what you send.

[*Download TextSecure*](https://play.google.com/store/apps/details?id=org.thoughtcrime.securesms&hl=en)