<template>
  <div class="testimonial-bg section min-h-[300px]">
    <div class="testimonial-bg-overlay"></div>
    <div
      class="inner flex-col lg:flex lg:flex-row py-[10%] md:py-[5%] justify-between text-white relative h-[100%] inset-0"
    >
      <h4
        class="text-2xl md:text-3xl 2xl:text-4xl text-center leading-[4vh] lg:text-left w-[100%] xl:leading-[3rem] xl:w-[60%] 2xl:w-[70%] 2xl:leading-[3.5rem] font-bold"
      >
        “After four months of use, we love its versatility—displaying everything
        from PowerPoint slides to videos with animated backgrounds. The app’s
        ability for different users to create accounts and share lyrics fosters
        community. Cloud of Worship is indispensable, and we highly recommend it
        for any congregation looking to enhance their worship experience.”
      </h4>
      <div
        class="user-ctn flex justify-center lg:justify-normal place-items-end pt-[10%] md:pt-[5%]"
      >
        <div class="user flex items-center gap-3 bottom-0">
          <img
            src="https://revaise.s3.us-east-2.amazonaws.com/website/yinka.webp"
            loading="lazy"
            alt="Yinka Adenikinju"
            class="w-[50px] h-[50px] md:w-[70px] md:h-[70px] object-cover rounded-full border-2 md:border-4 border-purple-500"
          />
          <div class="texts">
            <div class="name font-semibold text-md md:text-lg mb-1 md:mb-2">
              Yinka Adenikinju
            </div>
            <div class="folio text-xs md:text-sm text-slate-300">
              Head, Media Department, <br />
              Foursquare Gospel Church, Salvation Chapel
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.testimonial-bg {
  background: linear-gradient(
    90deg,
    rgba(137, 70, 201, 1) 0%,
    rgba(68, 34, 99, 1) 100%
  );
  background-size: cover;
  background-position: center;
  position: relative;
}
.testimonial-bg-overlay {
  position: absolute;
  inset: 0;
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/ctn-bg.webp")
    center no-repeat;
  background-size: cover;
}
</style>
