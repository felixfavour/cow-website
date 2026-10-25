---
title: "Camera Slides"
description: "Show a webcam or capture card full screen on the Live Output, for the preacher, a stage shot or a baptism."
category: "Building Your Service"
order: 9
lastUpdated: "2026-10-25"
---

A camera slide puts a live picture from a webcam or capture card on the Live Output, full screen. Use it for a close-up of the preacher, a shot of the baptism pool or a camera feed from the back of the room.

::callout{type="note" title="Rolling out gradually"}
Camera slides are being switched on for churches in stages. If **Add Camera** is missing from Quick Actions, it hasn't reached your church yet.
::

## Add a camera slide

1. Open **Add Camera** in Quick Actions. Searching *webcam*, *capture card* or *preacher* finds it too.
2. Allow camera access when your browser asks. If you refuse, the form says **Camera access denied** and explains how to allow it again in your browser's site settings.
3. Pick a camera from the list. Click **Refresh** if you plugged one in after opening the form. A preview shows the picture.
4. Choose how it fills the screen:
   - **Fill (crops the edges)** covers the whole screen.
   - **Fit (shows the whole picture)** keeps the full picture with bars if the shapes differ.
5. Turn on **Flip horizontally (mirror effect)** if the picture looks backwards.
6. Click **Add to schedule**.

To change any of this later, select the slide and open **Camera settings** in the Preview & Edit Pane.

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
