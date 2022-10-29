import React from 'react';
import './index.css'
import {useState , useReducer, useEffect} from 'react'
import axios from 'axios'
import http from '../../api/axiosApi'
import { Link } from 'react-router-dom';
import data from '../../data';

function BannerScreen() {

  const slider = [
    {
        // image:'/upload/b1.jpg'
      image: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/308559388_183167370940841_3460698438650772251_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_ohc=Jifh-UGjnpIAX-n4DUY&_nc_ht=scontent.fsgn2-7.fna&oh=00_AT9JFJhF-gYjrZ6E3nemUNdr5GLBUPWa96KhPOUbY0jezg&oe=63585C05"
    },
    // {
    //   image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/285755268_157190083538570_3207590026116716436_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=nTjL6NgAZMMAX-w8syt&_nc_ht=scontent.fsgn2-8.fna&oh=00_AT_hLNViJinNttBryM2vDbZNefUnGFtlVXdGO5p2K_GBLQ&oe=6358502E"
    // },
    // {
    //   image: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/273014318_110262351564677_8425694595742022457_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6wywUtryiOwAX-XLs41&_nc_ht=scontent.fsgn2-7.fna&oh=00_AT-71XOwKtfl5nbB-KVcUdTi0LViLvyK8ze3hfT50uHseA&oe=635792E2"
    // },
    // {
    //   image: "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/272774504_109529301637982_5446207964604281096_n.png?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=HUimm2rb0EoAX9KGeIf&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT8M7eM2GVi1upyoPIWQM1rFv1Hm8r_6xevCO3e2L4LlMw&oe=635834B6"
    // }
  ]
  return (
    <div>
      <div className='banner-image'
      loop={true}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      navigation={true}
    //   modules={[Navigation, Autoplay]}
      >
        {slider.map((p) => (
          <div key={p.image} className='banner-background'>
              <img src={p.image} alt='' className='banner-background-img'/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BannerScreen;