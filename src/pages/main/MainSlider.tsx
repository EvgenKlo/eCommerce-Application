import { Swiper, SwiperSlide } from 'swiper/react';
import type { objectSliderInfo } from './MainPage';
import { Link as RouterLink } from 'react-router-dom';

import 'swiper/css';

import './style.css';

import { Autoplay, Navigation } from 'swiper/modules';

export const MainSlider: React.FC<{ sliders: objectSliderInfo[] }> = ({ sliders }) => {
  return (
    <>
      <Swiper
        slidesPerView={5}
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 0,
        }}
        loop={true}
        speed={5000}
        style={{ margin: 0, padding: 0 }}
      >
        {sliders.map((slider) => (
          <SwiperSlide
            key={slider.id}
            style={{ maxHeight: 300 }}
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
