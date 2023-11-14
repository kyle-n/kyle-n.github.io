---
layout: post
title: The time I went stir-crazy during Covid and reverse-engineered Substack’s private API
date: 2023-11-14
keywords: apple, personal
---

I try to spend my time on this blog showcasing [things I'm proud of]({base}/blog/keyword/showcase) - [clever side projects]({base}/blog/why-svelte), [AI tricks]({base}/blog/ai-browser-extension), [achievements in reactive programing]({base}/blog/angular-reactive-forms-rental-rates-servicecore), that kind of thing.

<script>
  import {base} from '$app/paths';
</script>

But I also wanted to once, permanently, write down what happened to my least successful side project. It's the time I poured hundreds of hours into an extremely bad app no one used - not even me. 

It's time to write about the time I went stir-crazy during COVID and reverse-engineered Substack's private API. 

### The setting

You have to understand I was in a bad place. It was June 2020. I was living in across the country from my friends and family in a small one-bedroom apartment. COVID lockdowns were in effect. I'd not seen almost anyone in person for months at this point.

I was also frustrated with my job. I was working as a frontend developer at a local SaaS company that was, well, *chaotic*. I wanted a new job but didn't have the resume to get one with one year of experience and no computer science degree. 

I couldn't change my resume, so I fixated on gaining notoriety with a side project. Make something amazing and maybe somebody at a *good* company would notice me and offer a golden ticket out of my dreary day job (this did not work).

### The idea

What to make? Well, in another life, I actually worked as a writer and journalist, so I decided to make an app for writers. 

At this point, Substack didn't have any kind of native app. I thought that was strange. Why should Substack writers have to compose newsletters in a web app, even on an iPad? Also, why should they have to use a simple rich text web editor? Why not let them write in Markdown?

Thus, Compose for Substack was born.

### The app

It would be a native iOS and iPadOS app for newsletter authors. You'd compose Substack newsletter drafts using Markdown. You would be able to save and publish drafts, all from a well-designed, native interface.

![A screenshot of Compose for Substack. No draft is selected](compose-no-draft-selected.png) 

I didn't have any iOS or macOS development experience, but Apple had just announced version 2 of [SwiftUI](https://developer.apple.com/xcode/swiftui/). SwiftUI is their declarative framework for writing iOS and macOS apps. It felt similar to React, which I knew somewhat well, and so I decided Compose should be written in SwiftUI. This plan seemed like the best way to create a high-quality, native iOS and macOS interfaces without learning the intricacies of UIKit and AppKit. 

If you are an Apple ecosystem developer, you may already see some problems with this idea. We'll get to those.

### The API

Compose for Substack had an ambitious goal - total interoperability with the Substack web app. My goal was to let the user start a draft in Compose, then view it on the web app and have it be exactly the same. 

For this reason, Compose only lightly used [CloudKit](https://developer.apple.com/icloud/cloudkit/) and [Core Data](https://developer.apple.com/documentation/coredata/). The most important data, the user's blog posts, was actually stored on Substack's servers as a normal draft post - as if the user had written in on substack.com. 

This (way too ambitious) goal required reverse-engineering Substack's private drafts API. They had no public-facing API at the time and zero documentation for third-party developers. 

So, I played around with the web editor, keeping an eye on the network tab of the Chrome dev tools. I traced every network request, building a mental model of how Substack's web app saved data to the backend. 

I could see why they hadn't opened it to third-parties. One of the properties on the `Draft` response object actually used the ❤ character as a property key, I think to indicate how many favorites it had. 

If you did a GET publication data, it returned just a whole kitchen sink of data, with no way to filter it.

```swift
// SubstackPublication.swift
import Foundation

struct SubstackPublication: Codable {
    let id: Int?
    let name: String? = nil
    let type: String? = nil
    let homepageType: String? = nil
    let logoURL, logoURLWide: String?
    let subdomain: String?
    let authorID: Int?
    let copyright: String? = nil
    let customDomain: String?
    let customDomainOptional: Bool? = nil
    let emailBannerURL: String? = nil
    let emailFrom: String? = nil
    let trialEndOverride: String? = nil
    let emailFromName: String? = nil
    let supportEmail: String? = nil
    let firstEnabledPaymentsAt: String? = nil
    let heroImage: String? = nil
    let heroText: String? = nil
    let requireClickthrough: Bool? = nil
    let themeVarBackgroundPop: String? = nil
    let defaultCoupon: String? = nil
    let communityEnabled: Bool? = nil
    let themeVarCoverBgColor: String? = nil
    let coverPhotoURL: String? = nil
    let themeVarColorLinks: Bool? = nil
    let defaultGroupCoupon: String? = nil
    let paymentsEnabled: Bool? = nil
    let createdAt: String? = nil
    let podcastEnabled: Bool? = nil
    var pageEnabled: Bool? = nil
    var applePayDisabled: Bool? = nil
    let fbPixelID: Int? = nil
    let gaPixelID: Int? = nil
    let twitterPixelID: Int? = nil
    let podcastTitle: String? = nil
    let podcastFeedURL: String? = nil
    let hidePodcastFeedLink: Bool? = nil
    let paymentsSurveyStatus: Int? = nil
    let minimumGroupSize: Int? = nil
    let parentPublicationID: Int? = nil
    let bylinesEnabled: Bool? = nil
    let bylineImagesEnabled: Bool? = nil
    let postPreviewLimit: Int? = nil
    let defaultWriteCommentPermissions: String?
    let defaultPostPublishSendEmail: Bool?
    let googleSiteVerificationToken: String? = nil
    let pauseState: String? = nil
    let language: String? = nil
    let paidSubscriptionBenefits: String? = nil
    let freeSubscriptionBenefits: String? = nil
    let foundingSubscriptionBenefits: String? = nil
    let parentAboutPageEnabled: Bool? = nil
    let inviteOnly: Bool? = nil
    let subscriberInvites: Int? = nil
    let defaultCommentSort: String?
    let plans: String? = nil
    let stripeCountry: String? = nil
    let authorName: String? = nil
    let authorPhotoURL: String? = nil
    let authorBio: String? = nil
    let hasChildPublications: Bool? = nil
    let hasPublicUsers: Bool? = nil
    let hasPosts: Bool? = nil
    let hasPodcast: Bool? = nil
    let hasSubscriberOnlyPodcast: Bool? = nil
    let hasCommunityContent: Bool? = nil
    let twitterScreenName: String? = nil
    let draftPlans: String? = nil
    let baseURL: String?
    let hostname: String?
    let isOnSubstack: Bool? = nil
    let parentPublication: String? = nil
    let childPublications: Array<String>? = nil
    let siblingPublications: [String]? = nil

    enum CodingKeys: String, CodingKey {
        case id
        case logoURL = "logo_url"
        case logoURLWide = "logo_url_wide"
        case subdomain
        case authorID = "author_id"
        case customDomain = "custom_domain"
        case coverPhotoURL = "cover_photo_url"
        case defaultWriteCommentPermissions = "default_write_comment_permissions"
        case defaultPostPublishSendEmail = "default_post_publish_send_email"
        case defaultCommentSort = "default_comment_sort"
        case baseURL = "base_url"
        case hostname
    }
}
```

The API wasn't bad, just messy and not built for outside use. It took a *lot* of experimentation to decipher which properties I needed to send in my PUT requests to save updated newsletter drafts.

One of the hardest parts was reverse-engineering how Substack saved post contents. It looked like they were using [Prosemirror](https://prosemirror.net) and saving the text as one big JSON object. I had to write what was, as far as I knew, the world's only [Swift-language Markdown-Prosemirror converter](https://gist.github.com/kyle-n/ecbd81c97f2415a35356f197f9ccf965). I'm proud of that one. 

### The editor

I also faced the small issue that no one had written an open-source text editor that was exactly what I wanted. Lots of editors had Markdown *shortcuts*. If you typed `**hello**`, editors with Markdown shortcuts removed the asterisks and left **hello** in bold.

I wanted an editor like [Byword](https://www.bywordapp.com) (which I am using to write this post), which uses Markdown patterns to apply formatting as you type, without removing the formatting characters. If you type `**hello**` in Byword, it leaves the asterisks and makes the "hello" between them bold. 

![Compose for Substack showing a list of drafts next to the editor](compose-drafts.png)

Apple's documentation for [how to wrap UIKit components for SwiftUI](https://developer.apple.com/documentation/swiftui/uiviewrepresentable) is actually decent, so I learned just enough UIKit to render a text editor that formatted your text as your typed. It took a long time and a lot of effort, and it still [slows down if you write too much](https://github.com/kyle-n/HighlightedTextEditor/issues/25), but I got it working. The editor took Markdown, and, after the user had stopped typing for a few seconds, converted it to Prosemirror and synced it to substack.com.

That was about the extend of my SwiftUI success. 

### The framework

![A screenshot of an iPad displaying a login screen in Compose](compose-login.png)

SwiftUI has good qualities. UIs are easier to build declaratively. It's one reason React has taken over frontend web dev. It feels more intuitive than making subclasses and overriding parent functions, like in UIKit. 

However.

SwiftUI is a work in progress. Every year, Apple makes it more powerful and less buggy, but there are enough rough edges some people have [sworn off it entirely](https://mastodon.social/@stroughtonsmith/110277575917369837).

In 2020, the rough edges were twice as bad. AppKit-flavored SwiftUI, which of course I picked, is twice *that*. I picked SwiftUI to avoid learning AppKit and UIKit, but it lacked so much I *still* ended up learning both. SwiftUI often produced UIs that were good but not amazing.

This was my mistake. To create a high-quality, boutique iOS & Mac app, avoid brand-new frameworks with tons of rough edges. It's possible to make great apps in SwiftUI, but 2020 was the wrong year for a junior to try it.

### The price

The app would be free to download. You would be able to publish three posts before I'd require a $5 / month subscription.

The subscription was necessary because this app would require ongoing updates to keep it compatible with the Substack API. "Lifetime purchase" was also a bad option, since Substack could cut me off at any time. Better to charge month to month.

![The settings screen of Compose for Substack](compose-settings.png)

I investigated in-app payments. On one hand, RevenueCat seemed like a fast way to get out the door. StoreKit seemed complicated. 

I still picked StoreKit. If the app made money, I didn't want to give RevenueCat a cut. Plus, using a third-party StoreKit library somehow seemed like cheating.

### The launch

You are probably starting to sense some red flags. Reader, I sensed none of them.

For example, one small red flag was the audience. At no point during development did I:

- Test the app with Substack writers
- Ask writers if they wanted a native editing app
- Ask writers if they wanted to write in Markdown
- Ask writers if they would pay for an app enabling them to do these things

I plowed on ahead and launched the iOS and iPadOS versions of the app in the fall of 2020. 

After several weeks, my total subscribers were...

Zero. 

I can't remember how many people downloaded it, but it wasn't more than 40. Obviously no one subscribed. It is the worst-performing side project I've ever made. 

I was so embarrassed I pulled it off the App Store after just a few weeks. The product-market mismatch was so obvious, more development seemed like a waste. 

### The lessons

If nothing else, the whole fiasco was a good learning experience.

- Product-market fit is everything. If you don't have something people will pay for, nothing else matters.
- Technical competence loses to product-market fit every time.
- Get your product in front of users as soon as possible.
- Use proven, established tools you know well so you can build something good quickly.
- Reverse-engineering private APIs is fun but a risky business idea.
- Either build something for yourself, or something you're **extremely** confident other people will use. 
- Use third-party tools like RevenueCat or Firebase if they help you build faster. It doesn't matter if they take a bigger cut of your profits. Your top priority is to get out the door and figure out if your app is something people actually want.

The project wasn't a total loss. I spent some time breaking out my text editor into an open source project, [HighlightedTextEditor](https://github.com/kyle-n/HighlightedTextEditor). It's been decently successful - 643 stars, with a fair number of issues and PRs on GitHub. I'm glad people are using it.