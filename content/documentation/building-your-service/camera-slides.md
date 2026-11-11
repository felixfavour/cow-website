---
title: "Camera Slides"
seoTitle: "Show a Live Camera on the Projector"
description: "Show a webcam, capture card or any video input full screen on the Live Output, for the preacher, a stage shot or a baptism."
category: "Building Your Service"
order: 9
lastUpdated: "2026-11-11"
---

A camera slide puts a live picture from a webcam or capture card on the Live Output, full screen. Use it for a close-up of the preacher, a shot of the baptism pool or a camera feed from the back of the room.

::callout{type="note" title="Rolling out gradually"}
Camera slides are being switched on for churches in stages. If **Add Video Input (Camera)** is missing from Quick Actions, it hasn't reached your church yet.
::

## Add a camera slide

1. Open **Add Video Input (Camera)** in Quick Actions. Searching *webcam*, *capture card*, *obs*, *vmix* or *preacher* finds it too.
2. Allow camera access when your browser asks. If you refuse, the form says **Video access denied** and explains how to allow it again in your browser's site settings.
3. Pick a camera from the dropdown. Click **Refresh** if you plugged one in after opening the form. A preview shows the picture.
4. Choose how it fills the screen:
   - **Fill (crops the edges)** covers the whole screen.
   - **Fit (shows the whole picture)** keeps the full picture with bars if the shapes differ.
5. Turn on **Flip horizontally (mirror effect)** if the picture looks backwards.
6. Click **Add to schedule**.

To change any of this later, select the slide and open **Camera settings** in the Preview & Edit Pane.

## Effects

Select a camera slide and use the **Effect** picker in the editor toolbar. Each effect has an **Adjust** panel, with **Reset** to go back to the defaults.

| Effect | What it does |
|--------|--------------|
| **No effect** | The plain picture |
| **Main character echo** | Faint copies of the main person on one or both sides. Adjust the number of copies, the distance from the person and how visible the copies are. Choose whether to copy only the people or the whole picture |
| **Light leak** | Film-style light bursts, scratches and dust. Adjust the strength, the speed and the rest between bursts |

The effect looks the same on the projector, the Live Output and inside a [slide pair](/docs/building-your-service/slide-pairs).

## Using a teammate's camera

*Teams feature.* If the slide's camera is plugged into a teammate's computer, your Live Output shows their picture instead of opening a camera of your own. It shows *Connecting to (name)'s camera* while it links up, and *(name) is offline* if their computer goes away, and picks up again when it returns. A short Wi-Fi drop reconnects by itself without asking for camera permission. Up to 3 computers can watch one camera at a time.

## Where the camera opens

The camera only opens in the live window (and in NDI output) and in your Live Output preview. Schedule thumbnails, the editor, the livestream page, the Stage Display and the phone screen show a **Camera is live** card instead. They never open a camera, so nothing else on your network can grab it.

- CoW opens the camera at 1080p, capped at 30 frames per second.
- Going from a camera slide to lyrics and back to the camera reuses the open camera, so there is no delay.
- While a camera slide is live, the preview in the editor says **Preview paused**.
- If the slide's camera isn't plugged into this computer, the form shows it as **Not connected to this computer**. The projector falls back to another camera instead of showing black.

::callout{type="warning" title="Safari and the macOS app"}
Safari's engine lets only one page hold a camera at a time. If the preview and the projector compete, the projector takes priority.
::

To show a camera beside your lyrics or scripture, see [Slide pairs](/docs/building-your-service/slide-pairs).
