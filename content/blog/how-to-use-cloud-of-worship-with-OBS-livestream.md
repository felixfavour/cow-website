---
title: "How to use Cloud of Worship with OBS Studio - Livestream"
author: Favour Felix
cover: /images/blog/blog-obs.webp
created: December 28, 2024 11:00 AM
updated: December 28, 2024 11:00 AM
paragraph: Cloud of Worship is a great for screen projection and livestreaming, integrating it with OBS Studio makes it even more powerful for live broadcasts.
tag: How-to, Guides
---

In this guide, I’ll show you how to integrate Cloud of Worship with OBS Studio using the livestream URL.

Cloud of Worship makes it easy to share worship lyrics and multimedia content, and combining it with OBS Studio enhances your livestream experience for church services, events, and more.

Let’s break down each step to make sure the process is straightforward. Here are the highlighted steps:

1. Open Cloud of Worship and copy livestream URL
2. Open OBS and add a new Browser Source
3. Configure the Browser Source
4. Adjust the Position and Size of the Browser Source
5. Test and Go Live

## Step 1: Open Cloud of Worship and Copy Livestream URL

![How to copy livestream URL on Cloud of Worship](https://firebasestorage.googleapis.com/v0/b/favour-portfolio.appspot.com/o/cow%2Fblog%2Fblog-vmix-2.webp?alt=media&token=fedf0106-7dc1-4ffa-b146-f4daf6fde112)

1. **Log into Cloud of Worship:** Start by logging into your account at [app.cloudofworship.com](https://app.cloudofworship.com/login).
2. **Find the Livestream URL:** Once logged in, navigate to the **Livestream** section. Here, you’ll see the URL for your live worship stream, which should look similar to this format: ***app.cloudofworship.com/livestream/[livestream_id],*** Copy this URL, as you’ll need it shortly.

## Step 2: Open OBS Studio and Add a New Browser Source

![Add new Browser source for Cloud of Worship on OBS](https://firebasestorage.googleapis.com/v0/b/favour-portfolio.appspot.com/o/cow%2Fblog%2Fblog-obs-2.webp?alt=media&token=60280be9-45fd-40fb-85f4-49f3e5f12d3a)

1. **Launch OBS:** Open your OBS software on your computer. Ensure you have an updated version to avoid compatibility issues.
2. **Add Input:** In the lower left corner, click on the **Add Input** button. This will bring up the “Add Input” menu, allowing you to add different types of media sources.

1. **Launch OBS Studio:** Open OBS Studio on your computer and make sure it’s updated to the latest version to avoid any compatibility issues.
2. **Create a New Scene or Choose an Existing One:** If you don’t already have a scene set up for your live worship, create a new scene by clicking the  **+** button under **Scenes**. Otherwise, select the scene where you want to add Cloud of Worship.
3. **Add a Browser Source:** In the **Sources** box, click the **+** button and select **Browser** from the dropdown menu. This will let you add a browser-based source like Cloud of Worship.

## Step 3: Configure the Browser Source

![Configure the Browser Source for Cloud of Worship on OBS](https://firebasestorage.googleapis.com/v0/b/favour-portfolio.appspot.com/o/cow%2Fblog%2Fblog-obs-3.webp?alt=media&token=0e170c8e-03b5-406f-bdb0-5d175961541e)

1. **Name the Source:** When prompted, give your new source a name, like “Cloud of Worship,” to make it easy to identify.
2. **Paste the URL:** In the **URL** field, paste the livestream URL you copied from Cloud of Worship.
3. **Set the Resolution (Optional):** OBS lets you adjust the width and height of the source, so you may want to set the resolution to match your stream settings, such as 1280x720 or 1920x1080, for a clear display.
4. **Remove Custom CSS**: Clear out any custom CSS that is added by default to affect interference of the livestream display.
5. **Confirm Settings:** Click **OK** to save your settings and add the source to your scene.

## Step 4: Adjust the Position and Size of the Browser Source

1. **Position the Source:** You’ll now see the Cloud of Worship stream in your OBS preview window. Click and drag it to adjust its position within the frame.
2. **Resize if Needed:** Use the corners of the browser source to resize it as needed, ensuring that lyrics or multimedia content are clearly visible. You may choose to center it or position it at the bottom third of the screen for lyrics.
3. **Set Transparency (Optional):** If you’d like the lyrics or content to overlay other visuals, you can adjust the opacity by right-clicking the source, selecting **Filters**, and adding a **Color Correction** filter to tweak transparency.

## Step 5: Test and Go Live

1. **Preview Your Stream:** Double-check that everything looks right in the OBS preview window. Make sure the text, visuals, and any animations from Cloud of Worship display correctly.
2. **Start Streaming or Recording:** When you’re ready, hit **Start Streaming** (or **Start Recording**) in OBS Studio. Your Cloud of Worship feed should now be live, displaying all the lyrics, verses, or multimedia content you’ve set up on Cloud of Worship.

## Tips for Optimal Performance

- **Stable Internet Connection:** Since Cloud of Worship streams through an online URL, ensure you have a stable internet connection for smooth performance.
- **Audio Configuration:** If your Cloud of Worship feed includes audio, remember to adjust audio levels in OBS to maintain balance with other sources.
- **Hotkeys (Advanced):** Set up hotkeys to easily switch the Cloud of Worship source on and off if you frequently toggle between content types during a service.

## Known Issues and Limitations

While Cloud of Worship integrates smoothly with OBS Studio for displaying lyrics and a variety of content, there are a few known limitations to be aware of. 

Currently, certain features like countdown slides and video slides do not function as expected when used through the livestream URL. 

For now, it’s best to handle countdowns or video segments using the desktop capture input or through alternative sources until these limitations are addressed in future updates.

## Conclusion

Adding Cloud of Worship to OBS Studio with a livestream URL is a simple process that greatly enhances the quality and professionalism of your worship broadcasts. With just a few steps, you can integrate live lyrics, verses, and visuals into your streams, creating a more engaging worship experience for your viewers.

By using the livestream URL as a browser source in OBS Studio, you’re ready to share dynamic, immersive content with your congregation. Enjoy streaming!