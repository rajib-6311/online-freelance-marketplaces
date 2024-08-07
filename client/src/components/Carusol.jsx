import  { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img1 from '../assets/images/carousel1.jpg'
import img2 from '../assets/images/carousel2.jpg'
import img3 from '../assets/images/carousel3.jpg'


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slider from './Slider';

export default function Carusol() {
  return (
    <div className='container px-6 py-8 mx-auto'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <Slider image={img1} text='This is slider picture'></Slider>
        </SwiperSlide>

        <SwiperSlide>
            <Slider image={img2} text='This is slider picture'></Slider>
        </SwiperSlide>

        <SwiperSlide>
            <Slider image={img3} text='This is slider picture'></Slider>
        </SwiperSlide>
        
        
      </Swiper>
    </div>
  );
}