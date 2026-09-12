---
title: "The Desktop App"
description: "Install Cloud of Worship as a native Windows app for real multi-monitor windows, NDI output and background updates."
category: "Settings, Shortcuts & Offline"
order: 5
lastUpdated: "2026-09-12"
---

*Free feature. Windows only for now.*

Alongside the browser app, Cloud of Worship is available as a **native desktop app**. It is the same product, signed into the same account, working on the same schedules. What it adds is everything a browser is not allowed to do.

## What the desktop app adds

| | Browser | Desktop app |
|---|---------|-------------|
| **Live and stage windows** | Browser popups, subject to popup blockers | Real application windows placed on the monitor you choose |
| **Monitor detection** | Needs browser permission, best in Chrome or Edge | Monitors listed by name, resolution and position, no prompt |
| **[NDI output](/docs/going-live/ndi-output)** | Not available | Available |
| **Updates** | Reload when prompted | Downloaded in the background, applied on restart |

Everything else, every slide type, schedule, setting and shortcut, works identically in both.

## Installing

1. Go to the [download page](/download) and click **Download for Windows**. It always points at the current installer, `Cloud.of.Worship_<version>_x64-setup.exe`.
2. Run the installer, then sign in with your usual account.

If you would rather pick the file yourself, every release is on the [releases page](https://github.com/CoW-Labs/cloudofworship/releases/latest). Take the `-setup.exe`; the `latest.json` and `.sig` files next to it are used by the app's own updater and you do not need them.

Windows may warn that the publisher is not recognised before it will run a newly released installer. Choose **More info → Run anyway**.

Your schedules, songs, library and settings live on your account rather than on the device, so everything you already have appears as soon as you sign in.

::callout{type="important" title="Windows only at the moment"}
The desktop app currently ships for **Windows** only. A macOS build is in progress and is not yet released. Until it is, Mac users should use the browser app, or [install it as a Progressive Web App](/docs/settings-and-shortcuts/installing-cloud-of-worship), which is fully supported.
::

## Updates

The desktop app checks for a new version shortly after launch and downloads it quietly in the background. Restarting the app installs it. Nothing interrupts you mid service.

To see which version you are on, open **Settings** and look at the app version at the bottom of the panel. The **What's New** quick action shows the release notes for that version.

## Which should your church use?

**Use the desktop app** if you present from a fixed Windows machine, especially with a second monitor for projection, a stage display for the platform, or a livestream through OBS or vMix.

**Use the browser app** if you present from a Mac, a Chromebook, or a shared computer you cannot install software on.

Both stay in sync. A team member on the desktop app and a team member in a browser tab are working on the same schedule in real time.
