import React from 'react';
import { useState, useReducer, useEffect } from 'react';
import http from '../../api/axiosApi';
import Product from '../../components/Product';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SlideShow from '../../layout/SlideShow';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Top from '../../components/Top';
import Button from 'react-bootstrap/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper'
import 'swiper/css';
import 'swiper/css/free-mode';

function HomeScreen() {
  // const [products, setProducts] = useState([]);
  const [top, setTop] = useState([]);
  const [pagination, setPagination ] = useState(1);
  const [page, setPage ] = useState([]);
  const [endPage, setEndPage] = useState()
  // console.log(pagination)
  // useEffect(() => {
  //   const results = async () => {
  //     try {
  //       const res = await http.get('/products');
  //       setProducts(res.data);
  //       // console.log(res.data)
  //     } catch (err) {
  //       if (err.res) {
  //         console.log(err.res.data.message);
  //       } else {
  //         console.log('Error: Network Error');
  //       }
  //     }
  //   };
  //   results();
  // }, []);
  useEffect(() => {
    const results = async () => {
      try {
        const res = await http.get('/homePage/rollTop');
        setTop(res.data);
        // console.log(res.data)
      } catch (err) {
        if (err.res) {
          console.log(err.res.data.message);
        } else {
          console.log('Error: Network Error');
        }
      }
    };
    results();
  }, []);

  const increaseHandle = () => {
    if(pagination >= endPage) {
      setPagination(endPage)
    } else {
      console.log()
      setPagination(pagination + 1)
    }
    // resultsPage();
  }
  const minusHandle = () => {
    if(pagination >= 1) {
      setPagination(1)
    } else {
      console.log()
      setPagination(pagination - 1)
    }
  }
  useEffect(() => {
    const resultsPage = async () => {
      try {
        console.log(pagination)
        const res = await http.get(`/pagination/products?page=${pagination}`);
        setPage(res.data);
        setEndPage(res.data.endPage)
        console.log(res.data)
      } catch (err) {
        if (err.res) {
          console.log(err.res.data.message);
        } else {
          console.log('Error: Network Error');
        }
      }
    };
    resultsPage();
  }, [pagination]);
  // console.log(top)
  // console.log(products)
  // console.log(page.products)
  // console.log(page)
  return (
    <div>
      <div>
          <SlideShow/>
      </div>
      <div style={{position: 'relative'}} className='div-top'>
      <h2 className='div-top-h2'>Hot Trend</h2>
        <Swiper
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 15
            },
          }}
        >
          {top?.product?.map((product, index) => (
          <SwiperSlide>
              {/* {top?.product?.map((product, index) => ( */}
                <Top key={index} product={product}/>
              {/* ))} */}
          </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <h1 className='div-top-h2'>Sản phẩm tại quán</h1>
      <div className="products">
        <Row>
          {page?.products && page?.products.map((product , index) => (
            <Col sm={6} md={4} lg={3} className='mb-3'  key={product.slug}>
            <Product product={product}></Product>
            </Col>
          ))}
        </Row>
        <div style={{ display: 'flex' }}>
          <Button variant="outline-secondary" onClick={minusHandle} >
            <i class="fas fa-chevron-left"></i>
          </Button >{'  '}
          <div className='numberPage'>
            <strong style={{fontSize: "large"}}>{page.numberPageNow}</strong>
            {/* ...{page.endPage} */}
          </div>
          {'  '}
          <Button variant="outline-secondary" onClick={increaseHandle}>
            <i class="fas fa-chevron-right"></i>
          </Button >
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
