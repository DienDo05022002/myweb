import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./index.css";
import { Navigation, Autoplay } from "swiper";

const slider = [
  { image: "https://scontent.fhan2-1.fna.fbcdn.net/v/t39.30808-6/307311874_182221091035469_4182920931909409261_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=e3f864&_nc_ohc=8U9b0pQzHjYAX_rB7mg&_nc_ht=scontent.fhan2-1.fna&oh=00_AfB9mklOXABAxgteDjQ6X-RctyJBnYBv0I2dkeolN9qqzw&oe=6368E789" },
  // { image: "https://scontent.fhan2-1.fna.fbcdn.net/v/t39.30808-6/294630535_167655315825380_2407173561188613755_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=moQgKzAVcUIAX-QdUfk&_nc_ht=scontent.fhan2-1.fna&oh=00_AfDoov9wOvK8EPw9ExAsHFW1h0uqJka19bTmAWlfQGwJXg&oe=6368A87D" },
  // {
  //   image: "https://scontent.fhan2-2.fna.fbcdn.net/v/t39.30808-6/284713554_153989720525273_2400961810202183415_n.png?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=oBP3A5S9DCIAX8utmqb&_nc_ht=scontent.fhan2-2.fna&oh=00_AfAjg35_obQiGD5P6vwL3J8onPale-o7ZiYyWMeK39QAIg&oe=63682D34",
  // },
];
const SlideShow = () => {
  return (
    <div>
      <div className="aspect-[720/220] mt-6 rounded-md overflow-hidden border-none">
      <Swiper
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {slider.map((p) => (
          <SwiperSlide key={p.image}>
            <img src={p.image} alt=''/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  );
};

export default SlideShow;
