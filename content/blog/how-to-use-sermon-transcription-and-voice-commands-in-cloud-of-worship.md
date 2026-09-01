---
title: "How to Use Sermon Transcription and Voice Commands in Cloud of Worship"
author: Favour Felix
author_img: /images/author/favour.jpeg
cover: /images/blog/pulpit-image.webp
created: September 1, 2026 9:00 AM
updated: September 1, 2026 9:00 AM
paragraph: "Learn how to transcribe sermons live, detect Bible references, navigate verses, and switch Bible translations using voice commands in Cloud of Worship."
excerpt: "Learn how to transcribe sermons live, detect Bible references, navigate verses, and switch Bible translations using voice commands in Cloud of Worship."
read_time: "7 min read"
tag: How-to, Guides, Sermon Tools, Voice Commands
user_title: "How to Use Sermon Transcription and Voice Commands in Cloud of Worship"
---

Following a sermon live can be demanding for a church media operator.

The pastor may mention a Bible passage without warning, move to another verse, or request a different translation. At the same time, the operator is expected to listen carefully and keep the congregation's screen up to date.

Cloud of Worship's sermon transcription feature helps with this. It can turn speech into a live transcript, detect Bible references, suggest relevant passages, and respond to supported voice commands.

This guide explains how to set it up, which phrases work, and what to expect during a service.

## What Sermon Transcription Can Do

While transcription is running, Cloud of Worship can:

- Display spoken words as a live transcript
- Detect complete Bible references such as “John 3:16”
- Create or update a Bible slide when a reference is detected
- Suggest passages related to the latest part of the sermon
- Move forward or backward through Bible verses, songs, hymns, and song setlists
- Move to a specific numbered verse
- Change the translation on the selected Bible slide

The operator can also select any detected or suggested passage manually from the **Transcripts** or **Scriptures** tab.

## Set Up Transcription Before the Service

A short sound check before the service will make transcription much more reliable.

1. Open **Settings > Microphone Settings**.
2. Select the microphone you want Cloud of Worship to use.
3. Open **Settings > Bible Slide Settings** and make sure the Bible translations you may need are available on the device.
4. Open **Settings > Other Settings** and review the transcription options.

The two important settings are:

- **Automatic transcription actions:** Allows detected Bible references and voice navigation commands to update the live slide.
- **Voice Bible version changes:** Allows commands such as “Switch to NIV” to change the translation on the selected Bible slide.

For the clearest results, use a good microphone, reduce room noise, and keep a reliable internet connection.

## Start and Stop Sermon Transcription

To begin:

1. Open **Quick Actions**.
2. Choose **Transcribe Sermon**.
3. Select the **microphone** button in the Transcribe panel.
4. Begin speaking normally.

The words being spoken will appear in the **Transcripts** tab. The sound level in the panel should move when the microphone hears someone speaking.

Select the **stop** button when the sermon or service is finished.

## Is There a Trigger Word?

No. There is no wake phrase such as “Hey Cloud of Worship.”

While transcription is running, Cloud of Worship checks everything it hears for supported commands. This means you can say a command directly, without introducing it first.

For the best response, say the command clearly as a short phrase, then pause briefly. The command will remain visible as part of the transcript.

## Voice Commands You Can Use

These are reliable examples. Cloud of Worship can also recognise similar natural wording.

| What you want to do | Example voice commands |
| --- | --- |
| Move forward | “Next verse”, “Show the next verse”, “Go forward”, “Continue to the next verse” |
| Move backward | “Previous verse”, “Go back one verse”, “Bring it back”, “Return to the previous verse” |
| Go to a numbered verse | “Verse 7”, “Go to verse 12”, “Show verse number twenty-three” |
| Change Bible translation | “Switch to NIV”, “Show this passage in KJV”, “Give me Amplified”, “Use the New King James Version” |
| Move and change translation | “Next verse in Amplified”, “Go to verse 7 in NIV”, “Previous verse in the New King James Version” |

Useful command words include:

- Forward: **next**, **following**, **forward**, **ahead**, **continue**, **advance**, **proceed**
- Backward: **previous**, **prev**, **back**, **backward**, **return**, **bring it back**
- Numbered verse: **verse** or **verse number**, often with **go**, **move**, **jump**, **show**, **open**, or **display**
- Translation: **switch**, **change**, **set**, **use**, **show**, **display**, or **give me**

Numbered verse commands accept digits or spoken numbers from 1 to 176. On a Bible slide, the number refers to a verse in the chapter currently displayed. It does not refer to a chapter number.

For the most predictable result during a live service, you can give translation and navigation commands separately. For example, say “Switch to NIV,” wait for the slide to change, then say “Next verse.”

## Say Bible References Naturally

You do not need to use a special command before mentioning a Bible passage. Simply say a complete reference, for example:

- “John 3:16”
- “John chapter 3 verse 16”
- “Second Corinthians 5:17”
- “Matthew chapter 3 verses 20 to 22”

When **Automatic transcription actions** is on, the first detected reference updates an existing Bible slide or creates a new one, then takes it live.

Other detected or suggested passages appear in the **Scriptures** tab. The operator can select any of them manually.

A book or chapter without a verse is not enough. For example, “John 3” will not be treated as a complete reference. Say the book, chapter, and verse.

## How Bible Translation Commands Work

You can say a translation's short code or full name, for example:

- “NIV”
- “N K J V”
- “New King James Version”
- “AMP”
- “Amplified Bible”

Only the default translation and translations already available on the device can be selected. Translation commands also require a Bible slide to be selected.

Some translation names are common words used during sermons. Cloud of Worship requires a clearer instruction for these names to reduce accidental changes:

- Say “Switch to The Message,” instead of only “The Message.”
- Say “Give me The Passion Translation,” instead of only “Passion.”
- Say “Use the World English Bible,” instead of only “Web.”

You can also use their short codes: **MSG**, **TPT**, and **WEB**.

## What Is Not Currently Supported

Sermon transcription does not currently support:

- A wake phrase or custom trigger word
- Starting, stopping, or clearing transcription by voice
- Commands such as “Next chapter,” “Go to chapter 4,” or “Show the whole chapter”
- Moving through PowerPoint or presentation pages by voice
- Opening a song, hymn, media item, schedule, or general slide by name
- Changing to a Bible translation that is not available on the device
- Changing Bible translations while a non-Bible slide is selected
- Speech recognition and voice commands in languages other than English
- A built-in button to save, download, copy, or reopen a transcript from the Transcribe panel

The transcript in the panel is a working view for the current session. Closing the panel ends the active transcription view, and **Clear transcript** removes the visible text. Do not use the panel as the only permanent sermon record.

## How to Prevent Accidental Slide Changes

Because there is no wake phrase, normal sermon wording can occasionally sound like a command. Phrases containing “next verse,” “move forward,” or “bring it back” may update the selected slide.

If you want the transcript and Bible suggestions without automatic live changes, turn off:

**Settings > Other Settings > Automatic transcription actions**

Bible references and suggestions will still appear for the operator to review and select manually.

## Troubleshooting

### Nothing Is Being Transcribed

Allow microphone access in the browser, confirm the correct microphone is selected in Settings, and check that the sound level moves when someone speaks.

### The Microphone Will Not Start

Use an up-to-date Chrome, Edge, or Safari browser. Also check that the device has a working internet connection.

### A Voice Command Is Ignored

Say it as a short, clear phrase. Confirm that **Automatic transcription actions** is on and that a supported slide type is selected.

### A Translation Command Is Ignored

Confirm that **Voice Bible version changes** is on, select a Bible slide, and make sure the requested translation is available on the device.

### A Bible Reference Is Missed

Say the complete book, chapter, and verse, then pause briefly. For example, say “First Corinthians chapter 13 verse 4.”

### The Weekly Timer Reaches Zero

Online transcription stops when your account's weekly allowance is used. The allowance resets on Monday.

## A Simpler Way to Follow the Sermon

Sermon transcription is designed to support the media operator, not replace them. It listens for references, prepares relevant passages, and makes common verse changes easier, while the operator remains in control of what the congregation sees.

Open [Cloud of Worship](https://app.cloudofworship.com), select **Transcribe Sermon** from Quick Actions, and test the feature before your next service.
