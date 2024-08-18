---
layout: post
title: How to sync saves between your Steam Deck and gaming PC
description: A little command-line magic for games without Steam Cloud support.
date: 2024-08-18
keywords: gaming, tutorial
image: sd-stylized.webp
caption: Based on a photo by Liam Dawe (Wikimedia Commons)
---

I recently purchased a [Steam Deck](https://store.steampowered.com/steamdeck). It’s a cool and useful gaming machine and one that I’ll publish my full thoughts on later. For now, I just wanted to document a workaround I use to implement to sync my _Dark Souls II_ save between my gaming PC and Steam Deck.

First, some background: Steam lets any game [sync and backup its data to Steam Cloud](https://help.steampowered.com/en/faqs/view/68D2-35AB-09A9-7678). However, a developer must _choose_ to implement this. Most do, but as I recently found out, some do not.

For example, From Software, [though geniuses at game design](https://kylenazario.com/blog/from-software-games-are-comedies), chose not to sync _Dark Souls II_ saves through Steam Cloud. If you play a bunch of the game on Steam Deck, like I did, that save only lives on the Deck's hard drive.

I ended up implementing my own sync solution through Dropbox. Basically, I keep my _DS2_ save in Dropbox and use filesystem links to point the game to that Dropbox folder. This way, when I play the game and update my save, the change is saved to the cloud and synced to both my Steam Deck and gaming PC.

To do this, first [sign up for Dropbox](https://www.dropbox.com/plans). A free basic account gets you [2 GB](https://www.dropbox.com/features/sync/save-space), more than enough for small save files. I dusted off my account from 10 years ago and installed the [official Dropbox client](https://www.dropbox.com/install) for Windows on my gaming PC. This put a Dropbox folder on my hard drive. Anything inside the folder syncs to the cloud, so I copied my _DS2_ save to that folder.

On the Steam Deck, I used [Maestral](https://maestral.app), a lightweight Dropbox client for Mac and Linux. I installed the GUI version following [their instructions](https://maestral.app/docs/installation) and began running Maestral. At this point, it synced my Dropbox data from the cloud and I saw the _DS2_ save file I'd copied from my gaming PC.

The last step was to delete the _Dark Souls II_ save folder on the gaming PC and Steam Deck and replace it with a filesystem link to Dropbox. Back up your save before doing this.

On Windows, _Dark Souls II_ keeps saves at `C:\Users\[your username]\AppData\Roaming\DarkSoulsII\[random letters and numbers]` ([source](https://old.reddit.com/r/DarkSouls2/comments/23zqtx/dark_souls_2_pc_save_data_location/)). Delete this folder and open Command Prompt. Run this command...

```shell
mklink /d "C:\path\\to\\your\\Dropbox\\folder" "C:\\ds2\\save\\path"
```

...where the last path is the full path of the folder you deleted.

Now, when you open `C:\Users\[your username]\AppData\Roaming\DarkSoulsII`, you should see a folder link with the same name as the folder you deleted. When you open this link, it should take you to the Dropbox folder with your save.

On Steam Deck, we'll do a similar process. Find the [save location on the Deck](https://old.reddit.com/r/SteamDeck/comments/tzr1es/sync_save_files_from_pc_to_steam_deck_in_dark/) and delete the folder with the random numbers and letters containing your `.sl2` save file. Now, open a terminal window and run...

```
ln -s "/path/to/your/Dropbox/folder" "/ds2/save/path"
```

...where again, the last path is the folder you deleted.

Now, when the game runs on Windows or SteamOS and tries to load your save, it will load the file saved to Dropbox. When you save your game, Dropbox will detect that your save file has changed and sync it to the cloud. Now your progress syncs between computers!

### A few caveats

- Setting this up is a pain in the ass
- Your save is "backed up" in that it won't be lost if your hard drive fails, but it is not backed up because you're still screwed if something happens to the Dropbox copy. Periodically upload your save to another cloud provider.
- _Dark Souls II_ crashes if Dropbox tries to sync the file while it is running. My current workaround for this is to pause syncing while I'm playing.
