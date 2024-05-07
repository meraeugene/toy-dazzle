import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const slides = [
  {
    id: 1,
    image: "/images/slide1.webp",
  },
  {
    id: 2,
    image: "/images/slide2.webp",
  },
  {
    id: 3,
    image: "/images/slide3.webp",
  },
  {
    id: 4,
    image: "/images/slide4.webp",
  },
  {
    id: 5,
    image: "/images/slide5.webp",
  },
  {
    id: 6,
    image: "/images/slide6.webp",
  },
];

const Featured = () => {
  return (
    <Swiper
      style={{
        "--swiper-navigation-color": "#fff",
        "--swiper-pagination-color": "#fff",
      }}
      spaceBetween={30}
      centeredSlides={true}
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
      {slides.map((slide, index) => (
        <SwiperSlide key={slide.id}>
          <img src={slide.image} alt="" className="w-full" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Featured;
