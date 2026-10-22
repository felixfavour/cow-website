---
title: "Media and Bible downloads, October 2026"
description: "Why some media and Bible translations would not download from 11 October 2026, and how everything was restored by 22 October 2026."
category: "Post Mortems"
order: 1
lastUpdated: "2026-10-22"
---

::callout{type="success" title="Resolved"}
Everything is back as of 22 October 2026. All 38 Bible translations, all preset background videos, and the images and videos you uploaded before the incident are available to every church again.
::

## Summary

Since around 11 October 2026, some files stored in Cloud of Worship could not be downloaded. This mostly affected uploaded images and videos, background videos, and some Bible translations.

Your schedules, slides, songs, lyrics and settings were never affected, and no data has been lost. Everything is still safely stored.

## What you may have noticed

- Images or videos you uploaded did not show on a new computer, or showed a loading state.
- Some Bible translations would not download.
- Background videos did not load on first use.
- Uploading new media failed or kept retrying.

If your media was already saved on your computer before the incident, it kept working as normal.

## Why it happened

We store media files with Amazon Web Services (AWS). A billing issue on our account led AWS to suspend it, which locked access to the stored files.

We resolved the billing issue, but AWS was slow to reopen the account because we are not on a premium support plan, which gets faster replies. This was a mistake on our side, not something any church did.

## Timeline

| Date | What happened |
|------|---------------|
| 22 October | Media uploaded before the incident restored and available to all customers. Everything is back. |
| 17 October | The remaining 19 Bible translations restored, including MSG, TPT, WEB and the non-English Bibles. All 38 translations now work. |
| 13 October | New storage provider set up. 19 Bible translations and all background videos moved to it. New uploads are being switched over. |
| 11 to 13 October | Billing issue resolved and support case opened with AWS. Still waiting on a response. |
| Around 11 October | AWS suspended our account. Media downloads and uploads began to fail. |

## What we have done so far

- **Bible translations:** all 38 translations work again. 19 came back on 13 October, including KJV, NIV, NKJV, ESV, NLT, AMP and the Nigerian language Bibles. The other 19, including MSG, TPT, WEB and the non-English Bibles, were rebuilt from public sources and checked against second copies on 17 October.
- **Background videos:** the six preset background videos work again.
- **New storage:** we set up a second storage provider, Cloudflare, so new uploads no longer depend on AWS.
- **Smarter loading:** the app now checks the new storage first and falls back to the old location, so files start working as soon as we move them.
- **Older uploads:** on 22 October, images and videos uploaded before the incident were restored and are now available to all customers.
- **AWS:** we resolved the billing issue and pressed AWS to reopen the account.

## What is still left

Nothing. All media and Bible translations are available again.

## What to do now

- You do not need to do anything. Media that looked missing or stuck loading should now appear on its own.
- If a file you need is still missing, write to us at the address below and we will look into it straight away.

## What we are changing

- **Billing:** we are adding a backup payment method and reminders so a billing issue cannot interrupt service again.
- **Backups:** media will be kept with more than one provider, so one account problem cannot lock your files.

We are sorry. Sunday services depend on Cloud of Worship, and this should not have happened.

If something is still not working for your church, write to [hello@cloudofworship.com](mailto:hello@cloudofworship.com).
