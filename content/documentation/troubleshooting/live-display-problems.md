---
title: "Live Display Problems"
description: "Sluggish Control Center, a black live window, Go Live not showing a slide, the live window closing, and screens not detected."
category: "Troubleshooting"
order: 2
lastUpdated: "2026-09-12"
featured: true
---

## The Control Center feels sluggish

Reload `app.cloudofworship.com`. Your live output keeps running. See [Performance on low-end devices](/docs/troubleshooting/limitations-and-known-behaviours#performance-on-low-end-devices).

## The Live Display says "Select a slide from the Slide Schedule Pane to show here"

Nothing is live. Click a slide in the Slide Schedule Pane.

## My live window is black, or showing a custom video instead of my slide

That's the blank or idle screen. No slide is live. Either **Blank** was clicked or you switched schedules. Click a slide to project it. If you set a video or image in **Settings → Blank Settings**, that plays instead of plain black while idle.

## Clicking "Go Live" didn't put my slide on screen

**Go Live** opens the output *window*. Once open, click a slide in the Slide Schedule Pane to project it, or press **Cmd/Ctrl + P** for the one in the editor. See [Promoting slides](/docs/going-live/promoting-slides).

## The live window closed when I closed my tab

Turn off **Settings → Display Settings → "Close live window when this tab is closed."**

## "No external screens detected"

Click **Refresh screens**. If it persists, your browser may not support screen detection. Chrome and Edge work best. You can always drag the live window to the projector by hand. See [Multi-screen setup](/docs/going-live/multi-screen-setup).

On Windows, the [desktop app](/docs/settings-and-shortcuts/desktop-app) reads monitors from the operating system instead of the browser, so this message does not occur there.

## The live window never opened

In a browser, the live display opens as a popup, so a popup blocker can stop it silently. Allow popups for `app.cloudofworship.com` and click **Go Live** again. The [desktop app](/docs/settings-and-shortcuts/desktop-app) opens real application windows and is not affected.

## Slides I take live from my phone are not reaching the projector

Check the status row at the top of the **Live** tab on the phone.

- **Not controlling a screen** means you have not picked an output yet. Tap the row and choose one.
- **No output device online** in the list means no computer in your team has a live window open. Open the live display on the projector machine first.
- **Reconnecting to the output…** means the screen you were driving dropped off. Slides are paused until it returns.

Also confirm that **Settings → Display Settings → "Let a team member's phone control this output"** is on at the projector machine. See [using CoW on your phone](/docs/teams-and-collaboration/using-cloud-of-worship-on-your-phone).
