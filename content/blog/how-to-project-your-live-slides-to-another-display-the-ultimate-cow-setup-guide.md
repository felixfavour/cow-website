---
title: "How to Project Your LIVE Slides to Another Display: The Ultimate CoW Setup Guide"
author: Praise Simileoluwa
author_img: /images/author/praise.jpg
cover: https://images.unsplash.com/photo-1740645580366-c4f1de0219dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFRyb3VibGVzaG9vdGluZyUyMCUyNiUyMEhlbHAlMjBHdWlkZXN8ZW58MHx8MHx8fDA%3D
created: February 26, 2026 7:00 PM
paragraph: ""
seo:
  title: "Tech Guide: Top 5 Free Presentation Tools (And Why Cloud of Worship Wins)"
  description: As we navigate 2026, church ministry is more digital than ever. From seamless livestreams to interactive sermon notes, technology is no longer a luxury, it’s the backbone of congregational connection. Yet, for many media teams, the very tools meant to simplify Sunday mornings have become a source of "technical friction."
tag: " Guides"
updated: February 26, 2026 7:00 PM
---

#

## **Guide 1: The "Go Live" Button is Unresponsive**

**Symptoms:** You click "Go Live" but nothing happens, or the screen stays static.

**The Fix:**

1. **Check Display Mode:** Ensure your Windows display is set to **"Extend"** (Windows Key + P) and not "Duplicate."
2. **Version Check:** Ensure you are on version **v0.36.8 or higher**. A specific fix was pushed for this.
3. **Browser Permissions:** If using Chrome, look for a small icon in the address bar asking for permission to "Manage multiple windows." Click **Allow**.
4. **Hardware Reset:** If the second screen was recently disconnected, restart the CoW app to refresh the display detection.

## **Guide 2: How to Stream Bible Verses to Prism Live/OBS**

**Context:** The direct "Livestream URL" feature is currently in private beta/maintenance.

**The Fix (Alternatives):**

- **Option A (Capture Card):** Use a physical HDMI capture card to send the CoW output from your media PC into your streaming PC as a Video Input.
- **Option B (Window Capture):** In OBS/Prism, use "Window Capture" to select the Cloud of Worship display window.
- **Note:** We are working on adding **NDI support** soon to make this wireless and seamless.

## **Guide 3: "Display Failed" or Smart TV Connection Issues**

**Symptoms:** The app doesn't see your secondary monitor or TV.    

**The Fix:**

1. **Windows Settings:** Go to *Settings > System > Display*. If you only see one box (labeled "1"), your computer doesn't recognize the TV yet.
2. **Hardware Check:** If you only have one VGA/HDMI port on your CPU, you may need a **Splitter** or a **USB-to-HDMI adapter** to create a true secondary output.
3. **Primary Monitor Rule:** Always open the CoW app on your **Primary (Main)** monitor first, then select the secondary screen from the app settings.

## **Guide 4: Installing CoW When Links are Blocked (The Mobile Workaround)**

**Symptoms:** Your church network or system security blocks the .exe download link.

**The Fix:**

1. **Download on Mobile:** Open the download link on your smartphone (using mobile data if church Wi-Fi is restricted).
2. **Transfer:** Connect your phone to the PC via USB or send the file to yourself via Telegram/WhatsApp Desktop.
3. **Install:** Run the .exe file from your local "Downloads" folder. This bypasses many browser-level download restrictions.

## **Guide 5: Fixing "Purple Screen" on YouTube Video Previews**

**Symptoms:** You add a YouTube link, but the preview box is just a solid purple color.

**The Fix:**

1. **Link Verification:** Ensure you are pasting the full URL (e.g., <https://www.youtube.com/watch?v=>...) and not a shortened "Clip" link.
2. **Refresh Connection:** Sometimes the embed needs a "nudge." Try switching to a different slide and coming back to the video slide.
3. **Active Internet:** Unlike lyrics, YouTube videos require an active, stable internet connection to fetch the preview data.
