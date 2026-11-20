---
title: "Streaming to YouTube"
seoTitle: "Stream Your Church Service to YouTube Live"
description: "Send your live output and audio straight to YouTube Live from the desktop app, with a check before you go live and stats while you stream. Beta."
category: "Going Live"
order: 8
lastUpdated: "2026-11-18"
---

*Desktop app only. Beta.*

::callout{type="note" title="Rolling out gradually"}
Streaming to YouTube is being switched on for churches in stages. If you don't see **Stream to YouTube (beta)** in Display Settings, it hasn't reached your church yet.
::

The desktop app can send your Live Display and its audio straight to YouTube Live, with no OBS and no capture window to pick.

## Set it up once

1. In YouTube Studio, go to **Create → Go Live → Stream settings** and copy your stream key.
2. In CoW, open **Settings → Display Settings → Stream to YouTube (beta)**.
3. Paste the key into **YouTube stream key**. It is stored on this computer only.
4. Choose an **Audio source**. Your mixer or soundboard input gives the cleanest sound, not the built-in microphone. You can also pick the default input or no audio.
5. Choose a **Stream quality**: 720p, 1080p at 30 or 60 frames per second, or 4K at 60. If your live window is smaller than the quality you pick, CoW warns you that it is an upscale and won't look sharper.

Quality choices your computer can't encode are shown as unavailable, with the reason. 4K needs a graphics chip that can encode HEVC.

## Go live

- Turn on **Stream to YouTube when I go live**. From then on, **Go Live** opens the live window and starts the stream in one click.
- Or leave it off and choose **Go Live → Go live on YouTube** to stream once.

With no stream key yet, **Go live on YouTube** opens Display Settings instead.

The live window opens full screen on its own desktop and streaming starts once it settles. **Send a test pattern instead** sends a test picture, so you can check the connection without showing your slides.

## The check before you stream

Before each stream a panel asks **Ready to go live on YouTube?** and checks four things:

| Check | What it tells you |
|-------|-------------------|
| **Internet** | Your upload speed. Green with room to spare, amber if it's just enough, red if too slow |
| **YouTube** | Whether YouTube's streaming server answers, and how quickly |
| **Audio** | The chosen input with a live level meter. You can switch input here. It warns if no sound arrives within 5 seconds |
| **Quality and encoder** | What the stream will be, and a warning if this computer has to encode in software |

Choose **Go live on YouTube** (or **Go live anyway** if a check failed), **Live window only** to skip YouTube this time, or **Cancel**. Turn the check off with **Check before streaming** in Display Settings.

## While you stream

A status bar along the bottom of the Control Center shows the stream's health (**Live**, **Struggling** or **Reconnecting**), time live, data sent, frame rate and delayed frames, with an audio meter. A red YouTube badge also sits beside **End Live Session**. Click it for the same stats. Data sent drops on still slides, which is normal.

Ending the broadcast closes the live window. That covers **Stop streaming** in settings, **End Live Session** and stopping from the system. Closing the live window stops the stream. CoW keeps the computer awake while it streams.

::callout{type="tip"}
Prefer OBS or vMix? See [Livestream output](/docs/going-live/livestream-output-obs-vmix) and [NDI output](/docs/going-live/ndi-output).
::
