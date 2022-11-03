import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import http from '../../../api/axiosApi';

const OrderScreen = () => {
  const storeUser = localStorage.getItem('user');
  const storeTokens = localStorage.getItem('tokens');

  const [orders, setOrders] = useState({});
  console.log(orders)
  // console.log(orders.order.customerOders)

  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    const results = async () => {
      try {
        const res = await http.get(`/orders/${id}`);
        setOrders(res.data);
      } catch (err) {
        if (err.res) {
          console.log(err.res.data.message);
        } else {
          console.log('Error: Network Error');
        }
      }
    };
    results();
    if (!storeUser && !storeTokens) navigate('/login');
  }, [storeUser, storeTokens, navigate, id]);
  return <div>
        <div className="mt-10">
      <div className="container flex bg-white justify-between md:flex-row flex-col py-4">
        <div className="md:w-[65%] h-[622px] w-full">
          <div className="shadow-md p-4 h-full">
            <h1 className="text-[20px] font-semibold">Chi tiết đơn hàng</h1>
            <div className="mt-4">
              <div className="my-4 flex items-center justify-between">
                <label className="block">Tên khách hàng</label>
                {/* <p>{orders.order.customerInformation.fullName}</p> */}
              </div>
              <div className="my-4 flex items-center justify-between">
                <label className="block">Số điện thoai</label>
                {/* <p>{orders.order.customerInformation.phone}</p> */}
              </div>
              <div className="my-4 flex items-center justify-between">
                <label className="block">Địa chỉ</label>
                {/* <p>{orders.order.customerInformation.address}</p> */}
              </div>
              <div className="my-4 flex items-center justify-between">
                <label className="block">Phương thức thanh toán</label>
                {/* <p>{oderDetails?.payments}</p> */}
              </div>
              <div className="my-4 flex items-center justify-between">
                <label className="block">Trạng thái đơn hàng</label>
                {/* <p>{oderDetails?.statusOrder}</p> */}
              </div>
              <div className="my-4 flex items-center justify-between">
                <label className="block">Trạng thái đơn hàng</label>
                <p>
                  {/* {oderDetails?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"} */}
                </p>
              </div>
              <div className="my-4 flex items-center justify-between">
                <label className="block">Thời gian mua</label>
                {/* <p>{oderDetails?.createdAt}</p> */}
              </div>

              <div className="my-4 flex items-center justify-between">
                <label className="block mb-3">Ghi chú</label>
                {/* <p>
                  {oderDetails?.note?.length > 0
                    ? oderDetails?.note
                    : "Không có"}
                </p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[30%] w-full h-[622px] overflow-auto shadow-md">
          <div className="p-4">
            <h1 className="text-[20px] font-semibold">Tổng giá trị đơn hàng</h1>
          </div>
          <div>
            {/* {oderDetails?.products?.map((p) => (
              <CartItem
                key={p.colors + p.memorys}
                cart={p}
                showQuanty={false}
              />
            ))} */}
          </div>
          <div className="w-[100%] bg-[#ffd400] p-4 text-white">
            <h1 className="text-2xl font-semibold">Sumary</h1>
            <div className="flex items-center justify-between mt-4">
              <p className="text-md">Total Products</p>
              {/* <p className="text-md">{oderDetails?.products?.length}</p> */}
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-md">Total</p>
              <p className="text-md">
                {/* <NumberFormat
                  value={oderDetails?.totalOrder}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"đ"}
                /> */}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* {loading && <Loading />} */}
    </div>
  </div>;
};

export default OrderScreen;
