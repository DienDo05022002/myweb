import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./index.css";
import { Navigation, Autoplay } from "swiper";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const slider = [
  {
    image: "https://scontent.fhan2-1.fna.fbcdn.net/v/t39.30808-6/307311874_182221091035469_4182920931909409261_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=e3f864&_nc_ohc=8U9b0pQzHjYAX_rB7mg&_nc_ht=scontent.fhan2-1.fna&oh=00_AfB9mklOXABAxgteDjQ6X-RctyJBnYBv0I2dkeolN9qqzw&oe=6368E789",
    caption: 'Slide 1'
  },
  // {
  //   image: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/295028399_169688242288754_8919946023488187521_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=bFZj0XTLNewAX9I8Nnz&tn=4apuG7USHeZ59uTv&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfAV9elTw9esluLY2PKOkT4q0wqCASkKx2xS91jEd6oHFw&oe=637865B6",
  //   caption: 'Slide 2'
  // },
  
  // { image: "https://scontent.fhan2-1.fna.fbcdn.net/v/t39.30808-6/294630535_167655315825380_2407173561188613755_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=moQgKzAVcUIAX-QdUfk&_nc_ht=scontent.fhan2-1.fna&oh=00_AfDoov9wOvK8EPw9ExAsHFW1h0uqJka19bTmAWlfQGwJXg&oe=6368A87D" },
  // {
  //   image: "https://scontent.fhan2-2.fna.fbcdn.net/v/t39.30808-6/284713554_153989720525273_2400961810202183415_n.png?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=oBP3A5S9DCIAX8utmqb&_nc_ht=scontent.fhan2-2.fna&oh=00_AfAjg35_obQiGD5P6vwL3J8onPale-o7ZiYyWMeK39QAIg&oe=63682D34",
  // },
];
const SlideShow = () => {
  return (
    <div>
      <div className="aspect-[720/220] mt-6 rounded-md overflow-hidden border-none">
      <div className="slide-container">
        <Slide className='slide-slide' style={{width: '100%'}}>
         {slider.map((slideImage, index)=> (
            <div className="each-slide" key={index}  style={{width: '100%'}}>
              <div>
                <img src={slideImage.image} alt='' style={{width: '100%'}}/>
                <span>{slideImage.caption}</span>
              </div>
            </div>
          ))} 
        </Slide>
      </div>
      {/* <Swiper
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
      </Swiper> */}
    </div>
    </div>
  );
};

export default SlideShow;
