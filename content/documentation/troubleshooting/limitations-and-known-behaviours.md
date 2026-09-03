---
title: "Limitations & Known Behaviours"
description: "Honest notes about how CoW behaves in the real world, so nothing surprises you mid-service."
category: "Troubleshooting"
order: 1
lastUpdated: "2026-09-03"
---

## Performance on low-end devices

On a low-end or heavily loaded machine, the **Control Center** can gradually slow down over a long service, especially with large schedules, lots of media, or many hours of continuous use.

**If that happens, just reload the Control Center** (`app.cloudofworship.com`). **Your Live Display (`app.cloudofworship.com/live`) stays active.** It keeps projecting the whole time you're reloading. The two windows are independent, and when the Control Center comes back it re-reads the current live state from the live window, so you pick up exactly where you left off.

::callout{type="warning" title="Never reload the /live window mid-service"}
That's the one your congregation is looking at. Reload the Control Center instead.
::

::callout{type="important" title="Check this setting first"}
If **Settings → Display Settings → "Close live window when this tab is closed"** is **on**, closing the Control Center tab also kills the projection. Turn it **off** if you want the live window to survive independently.
::

## Both windows must be in the same browser

The Control Center and Live Display talk to each other through the browser itself. Running the Control Center in Chrome and the live window in Safari will **not** work. Open both in the same browser.

## Switching schedules clears the live slide

By design. The Live Display drops to the blank or idle screen and you promote a slide from the new schedule.

## Blank doesn't remember the previous slide

One-way. It clears the live output and won't restore the old slide. It's disabled when nothing is live.

## Style defaults only affect new slides

Changing default font, size or alignment won't restyle slides you already created. Edit those individually.

## Upload size caps

Free: images up to **3 MB**, videos up to **250 MB**, **100 MB** total cloud storage. Teams: **10 MB** images, unlimited video size, **5 GB** storage. Watch your usage in **Settings → Storage Settings**.

## Media uploads in the background

Media is stored locally first and uploaded in the background. Adding a large video right before it's needed is risky. Add media ahead of the service where you can.

## Multi-screen detection is browser-dependent

Automatic screen detection works best in Chrome and Edge. In other browsers you may see **"No external screens detected"** and will need to drag the live window to your projector manually, which works fine.

## Livestream URLs are per-schedule

The copied livestream URL is tied to the active schedule. Switch schedules and you'll need a fresh URL.

## Verification code limits

Three resends maximum, with a two-minute cooldown between them.
