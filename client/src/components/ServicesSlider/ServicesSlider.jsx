import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img1 from '../../assets/images/ca1.jpg'
import img2 from '../../assets/images/ca2.jpg'
import img3 from '../../assets/images/ca3.jpg'
import img4 from '../../assets/images/ca4.jpg'

// import required modules
import {Autoplay, FreeMode, Pagination, Navigation } from 'swiper/modules';
import ServicesSliderCard from './ServicesSliderCard';

export default function ServicesSlider() {
  return (
    <div>
  <div className='space-y-8'>
  <h1 className='container mx-auto text-center text-6xl font-bold text-orange-700 '>Popular services</h1>
  <p className='text-center font-bold text-black '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias distinctio, ipsam deserunt provident, ipsum illo esse porro ratione <br /> quos totam, quidem sequi quibusdam aspernatur! Cumque corrupti voluptatum iure in facilis.</p>
  </div>
        <div className='container py-0 mx-auto'>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination,Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <ServicesSliderCard image={img1}></ServicesSliderCard>
        </SwiperSlide>
        <SwiperSlide>
            <ServicesSliderCard image={img2}></ServicesSliderCard>
        </SwiperSlide>
        <SwiperSlide>
            <ServicesSliderCard image={img3}></ServicesSliderCard>
        </SwiperSlide>
        <SwiperSlide>
            <ServicesSliderCard image={img4}></ServicesSliderCard>
        </SwiperSlide>
      </Swiper>
    </div>
    </div>
  );
}