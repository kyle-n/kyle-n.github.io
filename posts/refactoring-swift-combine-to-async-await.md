---
layout: post
title: Refactoring Swift Combine code to be async
description: Embracing modern APIs and programming paradigms
date: 2024-08-25
keywords: tutorial, apple, swift, rxjs
---

<script>
  import {base} from '$app/paths';
</script>

I recently released [JavaSnipt 2]({base}/blog/javasnipt-2), a faster and improved version of the best JavaScript blocker for Safari.

One feature of JavaSnipt is users can block JS on a website by simply tapping Share > JavaSnipt. A modal pops up letting them know JS has been blocked on that site, then dismisses itself. After the user reloads the page (an iOS restriction), the JavaScript is gone.

As part of the rewrite, I threw out all the old share sheet code. Back in 2021, I was far too enamored with [Combine](https://developer.apple.com/documentation/combine), [RxJS](https://rxjs.dev) and reactive programming. I wrote a share sheet that used Combine where it shouldn't have and ended up with some pretty kludgy code.

JavaSnipt 2 cleans out all that for nice, modern [asynchronous Swift](https://www.hackingwithswift.com/swift/5.5/async-await). The result is fast, composable, easy to read and easy to reason about.

### Background

When a user is in Safari or another app's in-app browser and taps Share > JavaSnipt, they enter a complex flow chart of UI possibilities.

First, we load the user's settings and check which mode they're in. JavaSnipt lets you add sites to it and pick whether to block JS on those sites or allow it only on those sites.

Next, we check if the JavaSnipt [content blocker](https://developer.apple.com/documentation/safariservices/creating-a-content-blocker) is enabled. If it's disabled, we show a warning telling the user to enable it. When they close this message, nothing else happens. Not much point in adding sites to JavaSnipt if it doesn't block anything.

If the blocker is enabled, we load the website from the user's share. We then check whether the user has already added this site to JavaSnipt.

If the user has not added it, we add it, show the "Site added" screen, wait a few seconds, and dismiss the popup. If they haven't, we show a screen asking them to confirm allowing or blocking JavaScript on that website. If the user cancels, we close the dialog and do nothing else. If they conform, we remove the site and close the dialog.

After all of that, we check if the user has been shown a one-time reminder to refresh the page on iOS to see changes. If they haven't seen the reminder, we show it, then close the dialog. If they have, we just close out and finish.

It's a choose-your-own adventure with a lot of branching UI paths, all of which involve some amount of async work.

### Loading the website

One of the first steps is to get which website the user shared to JavaSnipt. The old code used Combine to do this:

```swift
private func getHost() -> AnyPublisher<String?, Error> {
    let hostTracker = PassthroughSubject<String?, Error>()
    if let item = extensionContext?.inputItems.first as? NSExtensionItem,
       let itemProvider = item.attachments?.first,
       itemProvider.hasItemConformingToTypeIdentifier("public.url") {
       itemProvider.loadItem(forTypeIdentifier: "public.url", options: nil) { url, error in
            if let error = error {
                hostTracker.send(completion: .failure(error))
            } else {
                if let shareURL = url as? URL,
                   let host = shareURL.host {
                    hostTracker.send(host)
                } else {
                    hostTracker.send(nil)
                }
            }
            }
    } else {
        DispatchQueue.main.async {
            hostTracker.send(nil)
        }
    }
    return hostTracker.eraseToAnyPublisher()
}
```

Bit of a shim, but one that turns a callback-based URL into one that emits a value reactively into a Combine chain. The problem was using it with other values:

```swift
let currentHost = blockerEnabled
    .filter { $0 }
    .void()
    .flatMap { self.getHost() }
    .compactMap { $0 }
    .delay(for: .seconds(1), scheduler: DispatchQueue.main)
    .share()
let siteAdded = currentHost
    .tryMap { host -> Bool in
        try CloudKitConnector.addSiteWithoutMatchingPattern(pattern: host) != nil
    }
    .share()
```

You can see me trying to embed some of the UI logic into Combine chains. Load if the blocker is enabled, but don't load the current host unless it is. If the host loads, try adding it to the user's sites and see if the operation completed successfully. Hard to read and debug, honestly.

Conversely, here's what it looks like with `async`/`await`:

```swift
Task {
    do {
        let blockerState = try await SFContentBlockerManager
            .getStateOfContentBlocker(withIdentifier: BLOCKER_EXTENSION_IDENTIFIER)
        guard blockerState?.isEnabled == true else {
            await alertUserToEnableBlocker()
            completeRequest()
            return
        }
        guard let host = try await getHost() else {
            showErrorAndComplete("Could not get website")
            return
        }
        guard let appConfig = CloudKitConnector.getAppConfig() else {
            showErrorAndComplete("Could not load app config")
            return
        }
        let existingSite = try CloudKitConnector.findExistingSite(pattern: host)
        if let existingSite {
            let confirmed = await alertUserToConfirmRemovingTargetedSite(
                host: host,
                isBlacklist: appConfig.isBlacklist
            )
            if confirmed {
                _ = try CloudKitConnector.deleteSite(id: existingSite.id)
                await alertUserSiteWasRemoved(host: host, isBlacklist: appConfig.isBlacklist)
            }
        } else {
            _ = try CloudKitConnector.addSiteWithoutMatchingPattern(pattern: host)
            await alertUserSiteWasAdded(host: host, isBlacklist: appConfig.isBlacklist)
        }
        if !appConfig.showniOSRefreshReminder {
            await alertUserToRefresh()
            try CloudKitConnector.updateAppConfig(showniOSRefreshReminder: true)
        }
        completeRequest()
    } catch {
        showErrorAndComplete(error.localizedDescription)
    }
}
```

The individual helper functions look like this:

```swift
private func alertUserToConfirmRemovingTargetedSite(host: String, isBlacklist: Bool) async -> Bool {
    return await withCheckedContinuation { continuation in
        let action = isBlacklist ? "Allow" : "Block"
        let title = "\(action) JavaScript on \(host)?"
        let alert = UIAlertController(title: title, message: nil, preferredStyle: .alert)
        let cancelAction = UIAlertAction(title: "Cancel", style: .default) { _ in
            continuation.resume(returning: false)
        }
        alert.addAction(cancelAction)
        let confirmAction = UIAlertAction(title: action, style: .destructive) { _ in
            continuation.resume(returning: true)
        }
        alert.addAction(confirmAction)
        present(alert, animated: true)
    }
}
```

`async`/`await` provides a natural way to wait for a real-world operation, in this case the user's choice on the confirm dialog. Once it completes, we step to the next item in the branching UI flow. 

It feels far easier to read and reason about than the Combine equivalent. I still believe reactive programming is a powerful programming paradigm, but `async`/`await` feels more appropriate to this use case. 