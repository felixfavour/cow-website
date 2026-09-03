---
title: "Multi-Screen Setup"
description: "Assign your projector as the Live display and a second monitor as the Stage display from Display Settings."
category: "Going Live"
order: 3
lastUpdated: "2026-09-03"
featured: true
---

**Settings → Display Settings** handles projector setup.

## Control Center

Shows the screen you're operating on, its resolution, and whether it's your primary screen, with the advice: *"This is where behind the scene control is done. We advise you get a second screen for the live content."*

If the Control Center has ended up on the wrong monitor, click **Move to primary screen**.

## Live Window Settings

| Setting | What it does |
|---------|--------------|
| **Open in fullscreen mode** | Live window opens fullscreen automatically |
| **Close live window when this tab is closed** | Ties the live window's lifetime to the Control Center tab. Leave this **off** if you want the projection to survive a Control Center reload. |

## Secondary Screens

CoW detects connected monitors and lists each with its label and resolution. Each screen can be assigned one of two roles:

- Toggle **Live display** on the screen you want to project the service to.
- Toggle **Stage display** on a screen facing your musicians and speakers. See [Stage display](/docs/going-live/stage-display).

A screen can only hold one role at a time. Turning **Live display** on for a screen already assigned as the stage display releases it from that role first (and vice versa).

- **Refresh screens** re-detects monitors if you plugged one in after loading.
- **"No external screens detected"** means only one display is connected, or your browser hasn't granted screen-detection permission. Chrome and Edge support this best.
- With only one external screen connected, you can still assign the **stage display**. It just opens in a new browser tab instead of on its own monitor.

::callout{type="tip" title="Detection is browser-dependent"}
Automatic screen detection works best in Chrome and Edge. In other browsers you may see **"No external screens detected"** and will need to drag the live window to your projector manually, which works fine.
::
