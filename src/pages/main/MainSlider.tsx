import { Swiper, SwiperSlide } from 'swiper/react';
import type { objectSliderInfo } from './MainPage';
import { Link as RouterLink } from 'react-router-dom';

import 'swiper/scss';
import 'swiper/scss/effect-coverflow';
import 'swiper/scss/navigation';

import { EffectCoverflow, Autoplay, Navigation } from 'swiper/modules';
export const MainSlider: React.FC<{ sliders: objectSliderInfo[] }> = ({ sliders }) => {
  return (
    <>
      <Swiper
        spaceBetween={20}
        navigation={true}
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
          delay: 2200,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay, Navigation]}
        loop={true}
      >
        {sliders.map((slider) => (
          <SwiperSlide key={slider.id}>
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
