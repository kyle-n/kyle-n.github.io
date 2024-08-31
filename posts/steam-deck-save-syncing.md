---
layout: post
title: How to sync saves between your Steam Deck and gaming PC
description: A little command-line magic for games without Steam Cloud support.
date: 2024-08-18
keywords: gaming, tutorial
image: sd-stylized.webp
caption: Based on a photo by Liam Dawe (Wikimedia Commons)
---

Steam lets any game [sync and backup its data to Steam Cloud](https://help.steampowered.com/en/faqs/view/68D2-35AB-09A9-7678). However, not every game takes advantage of this.

For example, From Software, [though geniuses at game design](https://kylenazario.com/blog/from-software-games-are-comedies), chose not to sync _Dark Souls II_ saves through Steam Cloud. If you play a bunch of the game on [Steam Deck](https://store.steampowered.com/steamdeck), like I did, that save only lives on the Deck's hard drive.

I implemented my own sync solution through Dropbox with these steps:

1. [Sign up for Dropbox](https://www.dropbox.com/plans). A free basic account gets you [2 GB](https://www.dropbox.com/features/sync/save-space), more than enough for small save files.
2. Install the [official Dropbox client](https://www.dropbox.com/install) for Windows on your gaming PC. This puts a Dropbox folder on your hard drive. Anything inside the folder syncs to the cloud.
3. Find the location of your save file and copy it into the Dropbox folder.

(On Windows, _Dark Souls II_ [keeps saves](https://old.reddit.com/r/DarkSouls2/comments/23zqtx/dark_souls_2_pc_save_data_location/) at `C:\Users\[your username]\AppData\Roaming\DarkSoulsII\[random letters and numbers]`.)

4. Rename the folder containing your game's save from `[saveFolder]` to `[saveFolder] old`
5. [Open Command Prompt as an administrator](https://grok.lsu.edu/article.aspx?articleid=18026&printable=y)
6. Run this command:

```shell
mklink /d "C:\\path\\to\\[saveFolder]" "C:\path\\to\\your\\Dropbox\\folder"
```

This creates a shortcut so when your game saves, it will put the new save file in Dropbox.

7. On Steam Deck, Install the GUI for [Maestral](https://maestral.app) using [their instructions](https://maestral.app/docs/installation).
8. Run Maestral and let it sync your Dropbox data.
9. Observe your save file is on the Deck
10. Find the game's [save location on the Deck](https://old.reddit.com/r/SteamDeck/comments/tzr1es/sync_save_files_from_pc_to_steam_deck_in_dark/)
11. Rename the folder containing your game's save file from `[saveFolder]` to `[saveFolder] old`.
12. Open a terminal window.
13. Run this command:

```shell
ln -s "/path/to/your/Dropbox/folder" "/path/to/[saveFolder]"
```

This creates a shortcut so when the game saves on Deck, it will also put the new save file into Dropbox.

### A few caveats

- Setting this up is a pain in the ass
- Your save will not be lost if your hard drive fails or you lose your deck, but you're still screwed if something happens to the Dropbox copy. Periodically upload your save to another cloud provider or save duplicates.
- _Dark Souls II_ and _III_ crash if Dropbox tries to sync the file while the game is running. My current workaround for this is to pause syncing while I'm playing.
