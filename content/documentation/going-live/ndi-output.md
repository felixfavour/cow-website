---
title: "NDI Live Output"
description: "Publish the live display as an NDI source on your local network, so OBS, vMix, TriCaster or any NDI receiver can pick up your slides without a capture card."
category: "Going Live"
order: 8
lastUpdated: "2026-09-12"
---

*Free feature. Desktop app only.*

NDI sends your live display over the local network as a video source. Any NDI receiver on the same network (OBS, vMix, TriCaster, an NDI-capable switcher or monitor) can pick it up and use it like a camera input, with no capture card and no cable between machines.

::callout{type="important" title="This is the desktop app only"}
The NDI section appears in **Settings → Display Settings** only when you are running the installed [desktop app](/docs/settings-and-shortcuts/desktop-app). In the browser, use the [livestream URL](/docs/going-live/livestream-output-obs-vmix) as a browser source instead.

The desktop app currently ships for **Windows** only, so NDI output is a Windows feature today. The macOS notes below apply to the macOS build once it is released.
::

## Before you start

1. **Install the NDI runtime.** It is not bundled with Cloud of Worship. Install **NDI Tools** or the NDI runtime from [ndi.video/tools](https://ndi.video/tools/). NDI 5 and NDI 6 are both supported, and NDI 6 is preferred when both are present.
2. **Use one network.** The sending computer and the receiving computer must be on the same local network. NDI discovery does not cross the public internet.
3. **On Windows**, you need Windows 10 version 1903 or newer.

## Turning it on

1. Open **Settings → Display Settings → NDI Live Output**.
2. Switch on **Broadcast live output over NDI**.
3. Open the live display. Broadcasting starts as soon as the live window opens, and stops when you close it.

If the live window is not open yet when you flip the toggle, you will see *"NDI will start with the live window"*. That is expected. Open the live display and it begins on its own.

In your receiver, look for a source named **CoW Live Output** on the sending computer.

::callout{type="tip" title="The preference stays on this machine"}
**Broadcast live output over NDI** is stored on that computer only. It never syncs to your account or to your teammates, so turning it on at the church laptop will not turn it on for someone at home.
::

## What the output looks like

| | |
|---|---|
| **Source name** | CoW Live Output |
| **Resolution** | Matches the live window, scaled down to fit 1920 x 1080 |
| **Frame rate** | 30 fps |
| **Cursor** | Not included |

The feed is exactly what the live display shows, so blank screen, alerts, backgrounds and overlays all come through.

## Reading the status panel

The panel under the toggle is the honest state of the broadcast.

| Row | What it means |
|-----|---------------|
| **Status** (with the coloured dot) | *Not broadcasting*, *Starting*, *Broadcasting*, *Needs attention*, or *Unsupported on this system* |
| **Source** | The name receivers will see. Always CoW Live Output |
| **Resolution** | The captured size and frame rate, or *Waiting for live output* before the first frame arrives |
| **NDI runtime** | The runtime version that was found and loaded, or *Not detected*. Hover it to see the file it loaded from |
| **Receivers** | How many receivers are currently pulling the source right now |

### "Broadcasting last frame" with an amber Stalled badge

This means the sender is healthy and still feeding receivers at 30 fps, but the live window has not produced a new frame in the last 2 seconds, so it is repeating the last one.

This is normal and harmless most of the time. Screen capture only produces a frame when something on the live display actually changes, so a still slide with no video or animation legitimately produces nothing new. The badge clears by itself the moment you change slide or play a video. On Windows it also appears when the live window is minimized.

Worry about it only when the badge stays on while something is visibly moving on the live display. That points at capture having stopped, and the status usually turns to **Needs attention** with an error in the same panel.

## Troubleshooting

| What you see | What to do |
|--------------|------------|
| *The NDI runtime is not installed or could not be found* | Install NDI Tools or the runtime from [ndi.video/tools](https://ndi.video/tools/), then press **Retry**. The **Install NDI runtime** button in the panel opens the same page |
| *The installed NDI runtime could not be loaded* / *does not export…* | The runtime is present but broken or too old. Update or reinstall it, then press **Retry** |
| *Open the live output window before starting NDI* | The live display is closed. Open it and broadcasting starts on its own |
| *Screen Recording permission is required…* (macOS 14.3 and older) | Press **Open Screen Recording settings**, enable Cloud of Worship under **Privacy & Security → Screen Recording**, then restart the app. macOS 14.4 and newer does not need this |
| *ScreenCaptureKit could not uniquely identify the live output window* | Close duplicate Cloud of Worship windows, then press **Retry** |
| *NDI live output requires Windows 10 version 1903 or newer* | Update Windows |
| *This computer's CPU is not supported…* | The NDI runtime cannot run on that processor. There is no workaround on that machine |
| **Broadcasting** but **Receivers: 0** | The receiver cannot discover the source. See below |

### The receiver cannot find CoW Live Output

- Confirm both machines are on the **same network**, and that it is not a guest network that isolates clients from each other.
- On Windows, allow **Cloud of Worship** through Windows Firewall, and make sure the network is set to **Private** rather than Public. The app shows this hint in the panel when nothing has connected.
- Some networks block the multicast and mDNS traffic NDI uses for discovery. If yours does, add the sending computer manually in **NDI Access Manager** as a remote source.
- Wired ethernet is strongly preferred. 1080p30 NDI is a heavy stream, and congested WiFi shows up as stutter or dropouts at the receiver.

::callout{type="warning" title="NDI is not a substitute for the projector output"}
Use NDI to feed your stream or a switcher. Keep projecting to the physical screen through [multi-screen setup](/docs/going-live/multi-screen-setup). If NDI stops, the room still sees the slides.
::

## NDI or the livestream URL?

Both feed your stream, and they solve different problems.

| | NDI | [Livestream URL](/docs/going-live/livestream-output-obs-vmix) |
|---|---|---|
| **Where it runs** | Desktop app only (Windows today) | Any browser, any machine |
| **Needs** | NDI runtime, same local network | An internet connection |
| **Carries** | The live display exactly as rendered, as video | The slides, rendered again in the receiving browser |
| **Best for** | A switcher or an OBS machine in the same building | A remote stream operator, or when installing anything is not an option |
| **Plan** | Free | Teams |
