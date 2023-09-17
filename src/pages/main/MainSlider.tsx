// import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { objectSliderInfo } from './MainPage';
import { Link as RouterLink } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Autoplay } from 'swiper/modules';
export const MainSlider: React.FC<{ sliders: objectSliderInfo[] }> = ({ sliders }) => {
  console.log(sliders);
  return (
    <>
      <Swiper
        spaceBetween={50}
        centeredSlides={true}
        effect={'coverflow'}
        grabCursor={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // pagination={true}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper"
        loop={true}
      >
        {sliders.map((slider) => (
          <SwiperSlide
            key={slider.id}
            onClick={() => {}}
          >
            <RouterLink
              to={`catalog/${slider.id}`}
              key={slider.id}
            >
              <img
                src={slider.url}
                alt={slider.name}
              />
            </RouterLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
