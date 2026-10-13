---
title: "Media and Bible downloads, October 2026"
description: "Why some media and Bible translations would not download from 11 October 2026, what we have restored, and what is still left."
category: "Post Mortems"
order: 1
lastUpdated: "2026-10-13"
---

::callout{type="warning" title="Partly resolved"}
19 of our 38 Bible translations and all preset background videos work again. Media uploaded before the incident is still being restored. We will update this page when everything is back.
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

We resolved the billing issue, but the account has not been reopened yet. AWS has been slow to respond because we are not on a premium support plan, which gets faster replies. This was a mistake on our side, not something any church did.

## Timeline

| Date | What happened |
|------|---------------|
| 13 October | New storage provider set up. 19 Bible translations and all background videos moved to it. New uploads are being switched over. |
| 11 to 13 October | Billing issue resolved and support case opened with AWS. Still waiting on a response. |
| Around 11 October | AWS suspended our account. Media downloads and uploads began to fail. |

## What we have done so far

- **Bible translations:** 19 of our 38 translations work again, including KJV, NIV, NKJV, ESV, NLT, AMP and the Nigerian language Bibles.
- **Background videos:** the six preset background videos work again.
- **New storage:** we set up a second storage provider, Cloudflare, so new uploads no longer depend on AWS.
- **Smarter loading:** the app now checks the new storage first and falls back to the old location, so files start working as soon as we move them.
- **AWS:** we resolved the billing issue and are pressing AWS to reopen the account.

## What is still left

- **Older uploads:** images and videos uploaded before the incident are still locked with AWS. We will move them across as soon as AWS reopens the account.
- **19 Bible translations:** these include MSG, TPT, WEB and several non-English Bibles. They return with the same move.

## What you can do until then

- Open your schedule on the computer you use for service before Sunday, so media already saved there is ready.
- Do not clear your browser data or reinstall the desktop app for now. Saved media lives there.
- If a file you need is missing, upload it again. New uploads go to the new storage.

## What we are changing

- **Billing:** we are adding a backup payment method and reminders so a billing issue cannot interrupt service again.
- **Backups:** media will be kept with more than one provider, so one account problem cannot lock your files.

We are sorry. Sunday services depend on Cloud of Worship, and this should not have happened.

If something is still not working for your church, write to [hello@cloudofworship.com](mailto:hello@cloudofworship.com).
