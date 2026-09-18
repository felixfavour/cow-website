---
title: "What Is NDI? A Simple Guide for Churches"
author: Favour Felix
cover: /images/blog/ndi-church-media-team.webp
created: September 18, 2026 10:00 AM
updated: September 18, 2026 10:00 AM
paragraph: "What is NDI? See how churches can send worship lyrics and slides to a livestream over a local network, and learn the benefits and limitations before Sunday."
tag: Guides, Church Media
---

Your lyrics are on the projector. Your livestream operator wants those same words on screen for people watching online. How do you get the picture from the presentation computer to the streaming computer?

One option is a video cable and a capture card. Another is **NDI**.

## What is NDI, in plain English?

NDI stands for **Network Device Interface**. It is a way for devices and software to send and receive live video, and in some cases audio, over a computer network. Think of it as a video connection that travels through your church's network instead of a dedicated HDMI cable between two machines.

The computer making the picture is the **sender**. The computer or device using that picture is the **receiver**. A sender announces its video as an **NDI source**, which a compatible receiver can select. That is the whole basic idea. [NDI's own introduction](https://docs.ndi.video/all/getting-started/what-is-ndi) explains the technology in more detail.

For a typical church setup, both machines are on the same local network. NDI moves the picture between them; your streaming software still has to send the finished service to YouTube, Facebook, or another online destination. NDI by itself is not a livestream to the internet.

## Picture it on a Sunday morning

Imagine a presentation laptop at the back of the room and a separate computer running your livestream:

1. The presentation laptop shows the next song lyric on the room screen.
2. It also makes its live picture available as an NDI source on the church network.
3. The streaming computer receives that source and places the lyrics in its video mix.
4. The streaming software combines the lyrics with cameras and sound, then broadcasts the service online.

No one needs to point a camera at the projector screen. The streaming team receives a direct video feed of the presentation output.

## Why might a place of worship use it?

- **Fewer video adapters and capture devices.** If your sender and receiver already support NDI, you can move the picture between computers without adding an HDMI capture card to that connection.
- **Room and stream can share the same visuals.** Lyrics, scripture, sermon points, announcements, or other live slides can reach the stream while the room continues to use its projector.
- **More flexible placement.** The streaming computer can sit at the media desk while the presentation computer sits elsewhere, as long as the network connection is suitable.
- **A feed for more than one destination.** A compatible switcher, production computer, or confidence monitor can receive an NDI source. Check the capacity of your network and sender before adding more receivers.

The practical advantage is flexibility. A small team can connect parts of its video workflow without running a separate video cable for every new destination.

## What are the side effects and limitations?

NDI is useful, but it adds work for your network and computers. Plan for these tradeoffs before using it during a service:

- **It uses network bandwidth.** Live video can be demanding, especially when you add several feeds or receivers. A wired gigabit network is a good starting point for production. Congested Wi-Fi can cause a picture to stutter or drop. [NDI's bandwidth guidance](https://docs.ndi.video/all/getting-started/white-paper/bandwidth) explains why network capacity matters.
- **There can be a small delay.** Encoding, sending, receiving, and displaying video all take time. Check that your slides and audio still line up in the final stream, especially if sound comes from a separate mixer. [NDI notes](https://docs.ndi.video/all/getting-started/white-paper/encoding-and-decoding) that end-to-end delay depends on the network and the devices involved.
- **Discovery can fail even when both computers have internet.** A guest Wi-Fi network, firewall, or network setting can keep a receiver from seeing a sender. Test the exact setup you will use on Sunday, preferably with both machines connected by Ethernet.
- **Your computer has more to do.** Making and receiving a live video feed can use processing power. Watch for dropped frames or a struggling presentation machine during rehearsal.
- **It does not replace a backup plan.** If the network or sender fails, the feed to the stream stops. Keep the room projector on its normal display connection, and know how to switch the livestream to a camera or holding slide.

Also remember that an NDI source is intended for devices on your production network. Keep that network separate from public guest access where possible.

## How to use NDI in Cloud of Worship

Cloud of Worship can send its **live display** as an NDI source from the [Windows desktop app](/docs/settings-and-shortcuts/desktop-app). The feature is free, but it is not available in the browser app. Here is the short setup:

1. Install the Cloud of Worship desktop app on your Windows presentation computer. Install [NDI Tools or the NDI runtime](https://ndi.video/tools/) on that computer too.
2. Put the presentation computer and your NDI receiver on the same local network. A wired connection is preferable.
3. In Cloud of Worship, open **Settings → Display Settings → NDI Live Output** and turn on **Broadcast live output over NDI**.
4. Open the live display. The NDI broadcast starts with that window and stops when you close it.
5. On your receiver, choose the source named **CoW Live Output**. In OBS Studio, you will need an [NDI-capable plugin such as DistroAV](https://obsproject.com/forum/resources/distroav-network-audio-video-in-obs-studio-using-ndi%C2%AE-technology.528/) before an NDI source appears as an input.
6. Change a slide and check the receiver's preview. If it cannot find the source, check the app's NDI status panel, Windows Firewall, and whether the two machines are on an isolated guest network.

The feed shows the full live display, including its backgrounds and overlays, at up to 1080p and 30 frames per second. Keep your projector on its usual physical display output. For detailed setup and troubleshooting, see the [NDI live output guide](/docs/going-live/ndi-output).

Want to try the workflow with your own service slides? [Get started with Cloud of Worship](https://app.cloudofworship.com/signup?utm_source=marketing_website_blog&utm_medium=article&utm_campaign=ndi_guide) and test an NDI feed during your next rehearsal.
