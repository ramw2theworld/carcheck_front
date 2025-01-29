<script lang="ts" setup>

definePageMeta({
  layout: 'dashboard',
});

const check_colors = ['#60C5FF', '#1EE6A8', '#EF343A'];

</script>

<template>
  <div class="h-full w-full flex space-x-7">
    <div class="flex-1 flex flex-col h-full space-y-5">
      <div class="w-full h-[12rem] rounded-xl bg-dashboard-custom-1">
        <div></div>
        <div></div>
      </div>
      <div class="h-[15rem] space-y-1">
        <div class="w-full px-2 flex items-center justify-between">
          <p class="text-lg text-black font-bold">Latest Checks</p>
          <div class="flex items-center space-x-1">
            <p class="text-[0.65rem] font-bold">See more</p>
            <span>
              <img src="/public/images/svg/icon-chev-right.svg" alt="">
            </span>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-x-5 text-black">
          <div v-for="(_, index) in 3" :key="index"
            class="h-[12.5rem] rounded-xl bg-white flex flex-col items-center justify-between px-[1.7rem] py-[1.25rem]">
            <div class="flex w-full">
              <div class="flex-1 flex items-center space-x-1">
                <div class="w-[0.8rem]">
                  <img src="/public/images/placeholder/car-logo.png" class="w-full" alt="">
                </div>
                <div class="flex flex-col leading-3">
                  <small class="font-bold">Toyota Corolla</small>
                  <p class="text-[0.5rem] font-bold text-[#CFCCCC]">TYPE-R GT I-VTEC</p>
                </div>
              </div>
              <div>
                <p class="text-[0.65rem] font-bold">2017</p>
              </div>
            </div>
            <div>
              <img src="/public/images/placeholder/car.png" alt="">
            </div>
            <div class="w-full flex space-x-2">
              <div class="w-[70%] flex justify-between space-x-1">
                <div class="leading-3">
                  <div class="text-[0.5rem] space-x-1 flex items-center">
                    <span>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.67571" y="3.06055" width="6.5" height="2"
                          transform="rotate(-21.5245 0.67571 3.06055)" fill="white" stroke="#0F1829" stroke-width="0.5"
                          stroke-linejoin="round" />
                        <circle cx="1.97285" cy="3.62392" r="0.25" transform="rotate(-21.5245 1.97285 3.62392)"
                          fill="#0F1829" />
                        <circle cx="6.15907" cy="1.97287" r="0.25" transform="rotate(-21.5245 6.15907 1.97287)"
                          fill="#0F1829" />
                        <rect x="0.864781" y="2.90413" width="6.5" height="2"
                          transform="rotate(-1.00816 0.864781 2.90413)" fill="white" stroke="#0F1829" stroke-width="0.5"
                          stroke-linejoin="round" />
                        <circle cx="1.88223" cy="3.88639" r="0.25" transform="rotate(-1.00816 1.88223 3.88639)"
                          fill="#0F1829" />
                        <circle cx="6.3815" cy="3.80721" r="0.25" transform="rotate(-1.00816 6.3815 3.80721)"
                          fill="#0F1829" />
                        <rect x="1.59627" y="2.71495" width="6.5" height="2" transform="rotate(25.5727 1.59627 2.71495)"
                          fill="white" stroke="#0F1829" stroke-width="0.5" stroke-linejoin="round" />
                        <circle cx="2.06663" cy="4.04865" r="0.25" transform="rotate(25.5727 2.06663 4.04865)"
                          fill="#0F1829" />
                        <circle cx="6.12584" cy="5.9911" r="0.25" transform="rotate(25.5727 6.12584 5.9911)"
                          fill="#0F1829" />
                      </svg>
                    </span>
                    <p>
                      Plate
                    </p>
                  </div>
                  <div class="text-[0.7rem] uppercase font-bold">
                    LF56WDF
                  </div>
                </div>
                <div class="leading-3">
                  <div class="text-[0.5rem] space-x-1 flex items-center">
                    <span>
                      <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_0_192)">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M3.5 -1.52588e-05C5.4348 -1.52588e-05 7 1.56589 7 3.4953C7 5.42472 5.4348 6.99062 3.5 6.99062C1.5652 6.99062 0 5.42472 0 3.4953C0 1.56589 1.568 -1.52588e-05 3.5 -1.52588e-05Z"
                            fill="#0F1829" />
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M3.50005 0.433418C5.19405 0.433418 6.56605 1.80358 6.56605 3.49531C6.56605 5.18705 5.19405 6.55721 3.50005 6.55721C1.80605 6.55721 0.434052 5.18705 0.434052 3.49531C0.434052 1.80358 1.80605 0.433418 3.50005 0.433418Z"
                            fill="white" />
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M3.39356 1.55193C2.31836 1.61345 1.49516 2.53062 1.55676 3.60438C1.58476 4.13846 1.83116 4.61383 2.20076 4.94378L1.86196 5.32407H1.86476C1.39436 4.90743 1.08636 4.30903 1.04716 3.63234C0.974362 2.27895 2.01036 1.12131 3.36556 1.04581L3.39356 1.55193Z"
                            fill="#0F1829" />
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M3.63716 1.04581C4.99236 1.12131 6.02836 2.27895 5.95276 3.63234C5.91636 4.30903 5.60556 4.90743 5.13516 5.32407H5.13796L4.79916 4.94658C5.17156 4.61383 5.41516 4.14126 5.44596 3.60438C5.50476 2.53062 4.68436 1.61345 3.60916 1.55193L3.63716 1.04581Z"
                            fill="#0F1829" />
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M6.08447 2.13914L4.27287 2.9864L2.46127 3.83646L2.53967 3.98466L2.61807 4.13566L4.35127 3.1374L6.08447 2.13914Z"
                            fill="#0F1829" />
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M3.49983 2.99478C3.77703 2.99478 4.00383 3.21848 4.00383 3.49531C4.00383 3.77214 3.77703 3.99584 3.49983 3.99584C3.22263 3.99584 2.99863 3.77214 2.99863 3.49531C2.99863 3.21848 3.22263 2.99478 3.49983 2.99478Z"
                            fill="#0F1829" />
                        </g>
                        <defs>
                          <clipPath id="clip0_0_192">
                            <rect width="7" height="6.99063" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <p>
                      Mileage
                    </p>
                  </div>
                  <div class="text-[0.7rem] font-bold">
                    12345
                  </div>
                </div>
                <div class="leading-3">
                  <div class="text-[0.5rem] space-x-1 flex items-center">
                    <span>
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.85328 2.37078H7.70515V3.55625H7.55702V2.51906C7.55702 2.27386 7.35769 2.07453 7.11249 2.07453H6.51984V1.48187C6.51984 1.31892 6.38654 1.18547 6.22343 1.18547H5.03796V1.03734H6.96421V0H2.22265V1.03719H4.1489V1.18531H2.96344C2.80048 1.18531 2.66703 1.31861 2.66703 1.48172V2.07438C2.42184 2.07438 2.2225 2.27371 2.2225 2.51891V2.57547L1.74296 2.81531H1.18531V3.55625H1.03719V2.07453H0V5.92703H1.03719V4.44531H1.18531V5.18624H1.74296L2.2225 5.42609V5.48265C2.2225 5.72784 2.42184 5.92718 2.66703 5.92718H2.81516V6.22358C2.81516 6.38654 2.94846 6.51999 3.11156 6.51999H4.88969C5.05264 6.51999 5.18609 6.38669 5.18609 6.22358V5.92718H7.11234C7.35753 5.92718 7.55687 5.72784 7.55687 5.48265V4.44546H7.705V5.63521H7.85312C8.26158 5.63521 8.59406 5.30288 8.59406 4.89427V3.11187C8.59406 2.70341 8.26173 2.37093 7.85312 2.37093L7.85328 2.37078ZM0.740936 5.63062H0.296405V2.37078H0.740936V5.63062ZM1.18547 4.1489H1.03734V3.8525H1.18547V4.1489ZM1.63 4.88984H1.48187V3.11172H1.63V4.88984ZM2.22265 5.09452L1.92625 4.9464V3.05516L2.22265 2.90703V5.09468V5.09452ZM2.51891 0.740936V0.296405H6.66781V0.740936H2.51891ZM4.74156 1.03734V1.18547H4.44516V1.03734H4.74156ZM2.96344 1.48187H6.22328V2.07453H2.96344V1.48187ZM4.88969 6.22343H3.11156V5.92703H4.88969V6.22343ZM7.26047 5.4825C7.26047 5.56413 7.19397 5.63062 7.11234 5.63062H2.66718C2.58556 5.63062 2.51906 5.56413 2.51906 5.4825V2.51891C2.51906 2.43728 2.58556 2.37078 2.66718 2.37078H7.11234C7.19397 2.37078 7.26047 2.43728 7.26047 2.51891V5.48234V5.4825ZM7.705 4.1489H7.55687V3.8525H7.705V4.1489ZM8.29765 4.89412C8.29765 5.08734 8.17383 5.25213 8.00125 5.31327V2.69256C8.17368 2.75371 8.29765 2.91849 8.29765 3.11172V4.89412Z"
                          fill="black" />
                        <path d="M6.37168 2.96344H2.81543V3.25984H6.37168V2.96344Z" fill="black" />
                        <path d="M6.37168 4.74158H2.81543V5.03798H6.37168V4.74158Z" fill="black" />
                        <path d="M6.37168 3.85251H2.81543V4.14891H6.37168V3.85251Z" fill="black" />
                        <path d="M6.37168 2.96344H2.81543V3.25984H6.37168V2.96344Z" fill="black" />
                        <path d="M6.37168 4.74158H2.81543V5.03798H6.37168V4.74158Z" fill="black" />
                        <path d="M6.37168 3.85251H2.81543V4.14891H6.37168V3.85251Z" fill="black" />
                      </svg>
                    </span>
                    <p>
                      Type
                    </p>
                  </div>
                  <div class="text-[0.7rem] font-bold">
                    Diesel
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-1 text-[0.68rem] font-bold w-[30%]">
                <p>
                  See more
                </p>
                <img src="/public/images/svg/icon-chev-right.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-[11.5rem] bg-white rounded-xl flex justify-between">
        <div class="px-9 pt-4 pb-6 text-black flex flex-col justify-between">
          <div class="space-y-1 pr-8">
            <p class="text-2xl font-bold">
              You are running out of checks ?
            </p>
            <p class="text-[0.9rem]">These offers are for you</p>
          </div>
          <div class="flex items-center space-x-1 font-bold">
            <small>
              Get a new plan instead
            </small>
            <span>
              <img src="/public/images/svg/icon-chev-right.svg" alt="">
            </span>
          </div>
        </div>
        <div class="flex px-[1.1rem] py-[0.9rem] space-x-5">
          <div v-for="(x, index) in check_colors" :key="x + index"
            class="h-[9.4rem] w-[10.35rem] rounded-lg px-[0.8rem] pt-[1.2rem] pb-[0.6rem] flex flex-col"
            :style="{ backgroundColor: `rgba(${parseInt(x.slice(1, 3), 16)}, ${parseInt(x.slice(3, 5), 16)}, ${parseInt(x.slice(5, 7), 16)}, 0.30)` }">
            <div class="flex-1 text-center space-y-2 text-black">
              <div class="leading-[0.8rem]">
                <p class="text-[1.2rem] font-bold">01 Checks</p>
                <p class="text-[0.7rem]">Full Report</p>
              </div>
              <div class="leading-[0.2rem]">
                <p class="text-3xl font-bold outlined-text">-10%</p>
                <p class="text-[0.6rem]"> £5.53 per check
                </p>
              </div>
            </div>
            <button class="w-full h-[1.95rem] bg-black text-white rounded-[0.4rem] text-[0.8rem] font-semibold">
              Get now
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col bg-blue-400 h-full w-[20rem] rounded-lg">d</div>
  </div>
</template>



<style scoped>
.bg-dashboard-custom-1 {
  background: linear-gradient(to bottom, #FF7400, #FFA500), url('/path/to/your/image.jpg');
  background-size: cover;
  background-blend-mode: overlay;
}

.outlined-text {

  color: white;
  text-shadow:
    -1px -1px 0 #000,
    /* Top-left shadow */
    1px -1px 0 #000,
    /* Top-right shadow */
    -1px 1px 0 #000,
    /* Bottom-left shadow */
    1px 1px 0 #000;
  /* Bottom-right shadow */
}
</style>