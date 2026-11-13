---
title: "How to Export Your EasyWorship Songs to Cloud of Worship"
seoTitle: "Move Your Song Library from EasyWorship to Cloud of Worship"
author: Favour Felix
author_img: /images/author/favour.jpeg
cover: /images/blog/blog-easyworship-import.webp
created: November 12, 2026 9:00 AM UTC
updated: November 12, 2026 9:00 AM UTC
paragraph: "Switching from EasyWorship doesn't mean retyping every song. Here's the step-by-step way to back up your EasyWorship library and bring it straight into Cloud of Worship."
metaDescription: "A step-by-step guide to exporting your EasyWorship song database and importing it into Cloud of Worship, without retyping a single lyric."
tag: How-to, Guides, EasyWorship
---

If your church has years of songs sitting in EasyWorship, switching presentation software can feel like it means starting over. It doesn't. Cloud of Worship (CoW) can read an EasyWorship backup directly and bring every song, title, artist and all, into your library in a few minutes.

This only works in the **Cloud of Worship desktop app** for now, since reading EasyWorship's database needs native code a browser tab isn't allowed to run. If you're on Mac or a shared computer, see [the desktop app](/docs/settings-and-shortcuts/desktop-app) for where things stand there.

## Step 1: Back up your song library in EasyWorship

You're not exporting songs one by one, you're backing up the whole database, and letting CoW pick the songs out of it.

1. Open EasyWorship on the computer that holds your song library.
2. Go to **File → Backup/Restore** (on older versions, **Tools → Backup**).
3. Choose **Backup**, and make sure **Songs** is checked.
4. Save it somewhere you'll find again, like your Desktop. EasyWorship saves this as a single `.zip` file.

If that computer isn't the one running Cloud of Worship, copy the `.zip` file over, by USB drive, shared folder or however your church normally moves files between machines.

## Step 2: Import it into Cloud of Worship

1. Open the Cloud of Worship desktop app and sign in to your church's account.
2. Open **Quick Actions** (press **Cmd/Ctrl + K**, or use the search bar) and search for **Import from EasyWorship**.
3. Click **Choose EasyWorship backup (.zip)** and select the file from Step 1.
4. CoW reads the file on your own computer, nothing leaves your device at this point, and lists every song it found.

## Step 3: Review and import

Every song is selected by default. Before you commit:

- Hover a song to preview its lyrics.
- Uncheck anything you don't want brought over, or click **Deselect all** and pick just a handful.
- Click **Import `n` Songs** when you're ready.

Songs are added one at a time, so a library of a few hundred songs can take a little while. Leave the app open until it finishes. When it's done, you'll see how many were added, how many were already in your library (CoW skips exact duplicates automatically), and how many failed, which you can simply try importing again.

That's it. Your songs are now in your church's library in Cloud of Worship, searchable from Quick Actions like any song added by hand.

## A few things worth knowing

- **You need an internet connection to import.** Reading the backup file works offline, but adding songs to your library needs to reach Cloud of Worship's servers.
- **This moves songs, not schedules.** Backgrounds, slide order and service plans don't come across, you'll want to rebuild those services in CoW once your songs are in.
- **EasyWorship is untouched.** You're copying your library, not deleting it from EasyWorship, so you can keep using it during the switch if you need to.

Still deciding whether to make the move at all? See our full comparison: [Cloud of Worship vs EasyWorship: Which One Works Better for Your Church?](/blog/cloud-of-worship-vs-easyworship-which-one-works-better-for-your-church)
