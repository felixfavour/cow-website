---
title: "Multi-Screen Setup"
description: "Assign your projector as the Live display and a second monitor as the Stage display from Display Settings."
category: "Going Live"
order: 3
lastUpdated: "2026-09-12"
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
| **Close live window when this tab is closed** | Ties the live window's lifetime to the Control Center tab or window. Leave this **off** if you want the projection to survive a Control Center reload. |
| **Let a team member's phone control this output** | On by default. Lets someone on a phone pick this device and take slides live on the screen it is driving, but only while the live window is open here. Stored on this computer only. See [using CoW on your phone](/docs/teams-and-collaboration/using-cloud-of-worship-on-your-phone) |

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

::callout{type="tip" title="The desktop app skips all of this"}
On the [Windows desktop app](/docs/settings-and-shortcuts/desktop-app), monitors are read from the operating system rather than the browser, so there is no permission prompt and no *"No external screens detected"*. The live and stage displays open as real application windows placed directly on the monitor you choose, with no popup blocker involved.
::
