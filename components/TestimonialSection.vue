<template>
  <div class="testimonial-bg section min-h-[400px]">
    <div class="testimonial-bg-overlay"></div>
    <div class="inner flex py-[5%] text-white relative h-[100%] inset-0">
      <h4 class="text-4xl w-[65%] font-bold">
        “CoW felt so easy to use, we love it and we would definitely recommend
        to all our churches. You too try it out!”
      </h4>
      <div class="user-ctn flex place-items-end pt-[15%]">
        <div class="user flex items-center gap-3 bottom-0">
          <img
            src="~/assets/images/user.png"
            alt="Yinka Adenikinju"
            class="w-[70px] h-[70px] object-cover rounded-full"
          />
          <div class="texts">
            <div class="name font-semibold text-lg mb-2">Yinka Adenikinju</div>
            <div class="folio text-sm text-slate-300">
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
  background: url("~/assets/images/ctn-bg.webp") center no-repeat;
  background-size: cover;
}
</style>
