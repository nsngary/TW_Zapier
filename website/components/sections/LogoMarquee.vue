<template>
  <section id="trusted-by" class="logo-marquee section-padding bg-neutral-50" role="region" aria-labelledby="trusted-heading">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 id="trusted-heading" class="text-base font-medium text-neutral-700 tracking-wide uppercase">Trusted by 3.4 million companies</h2>
      </div>

      <!-- Logo 無限輪播（使用 Cloudinary 連結） -->
      <div class="relative overflow-hidden" aria-hidden="true">
        <div class="flex marquee-track space-x-12 items-center">
          <div v-for="n in 2" :key="n" class="flex space-x-12 items-center flex-shrink-0">
            <img v-for="logo in logos" :key="logo.alt + n" class="h-6 sm:h-8 lg:h-10 opacity-80" :src="logo.src" :alt="logo.alt" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const logos: Array<{ alt: string; src: string }> = [
  { alt: 'Disney', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1745254334/disney_zfpuci.png' },
  { alt: 'Thomson Reuters', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1745254335/thomson-reuters_hvfvdm.png' },
  { alt: 'Alphabet', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866526/Homepage/Ticker/alphabet-logo_ojj7s0.png' },
  { alt: 'Meta', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1745254334/meta_sa6fhf.png' },
  { alt: 'Okta', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866527/Homepage/Ticker/okta-w-circle_nb2lkv.png' },
  { alt: 'HP', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1745254334/hp_lhfrfl.png' },
  { alt: 'Samsung', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1745254334/samsung_bvgxev.png' },
  { alt: "Lowe's", src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866526/Homepage/Ticker/lowes_jookhj.png' },
  { alt: 'P & G', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866525/Homepage/Ticker/p-and-g_o60hzm.png' },
  { alt: 'Alibaba', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745867083/Homepage/Ticker/alibaba-2_stdr10.png' },
  { alt: 'Hermes', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866524/Homepage/Ticker/hermes_mpn39n.png' },
  { alt: 'Siemens', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866524/Homepage/Ticker/siemens_zmbyn5.png' },
  { alt: 'Equifax', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866523/Homepage/Ticker/equifax_cmnhn3.png' },
  { alt: 'American Family', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866523/Homepage/Ticker/american-family_b0rj2q.png' },
  { alt: 'StoneX', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866522/Homepage/Ticker/stone-x_wyzrjl.png' },
  { alt: 'Opendoor', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866522/Homepage/Ticker/opendoor_ocwpe0.png' },
  { alt: 'Booking.com', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866522/Homepage/Ticker/booking_lwarz3.png' },
  { alt: 'Indeed', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866521/Homepage/Ticker/indeed_jakzfz.png' },
  { alt: 'Mastercard', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745867429/Homepage/Ticker/mastercard_g9zhda.png' },
  { alt: 'Allstate', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745867429/Homepage/Ticker/allstate_dqosx8.png' },
  { alt: 'Edward Jones', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866521/Homepage/Ticker/edward-jones_ejarvl.png' },
  { alt: 'Poshmark', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866521/Homepage/Ticker/poshmark_vjxmpp.png' },
  { alt: 'Flipkart', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866521/Homepage/Ticker/flipkart_gag3du.png' },
]
</script>

<!-- 使用語義 class + Tailwind；含 reduced‑motion 降級與 hover 暫停 -->
<style scoped>
.marquee-track {
  animation: scroll-x 30s linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}
@keyframes scroll-x {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none !important; }
}
</style>

