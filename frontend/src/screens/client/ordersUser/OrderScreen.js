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

  const result = orders?.order
  const customerOder = orders?.order?.customerOders
  console.log(result)
  return <div>
    <div className="mt-10">
      <div className="container flex bg-white justify-between md:flex-row flex-col py-4">
        <div className="md:w-[65%] h-[622px] w-full">
          <div className="shadow-md p-4 h-full">
            <h1 className="text-[20px] font-semibold">Chi tiết đơn hàng</h1>
            <div className="mt-4">
              <div className="my-4 flex items-center justify-between" style={{display: 'flex'}}>
                <strong style={{marginRight:'10px'}} className="block">Tên khách hàng</strong>
                <p>{result?.customerInformation.fullName}</p>
              </div>
              <div className="my-4 flex items-center justify-between" style={{display: 'flex'}}>
                <strong style={{marginRight:'10px'}} className="block">Số điện thoai</strong>
                <p>{result?.customerInformation.phone}</p>
              </div>
              <div className="my-4 flex items-center justify-between" style={{display: 'flex'}}>
                <strong style={{marginRight:'10px'}} className="block">Địa chỉ</strong>
                <p>{result?.customerInformation.address}</p>
              </div>
              <div className="my-4 flex items-center justify-between" style={{display: 'flex'}}>
                <strong style={{marginRight:'10px'}} className="block">Thanh toán bằng</strong>
                <p>{result?.methodPay}</p>
              </div>
              <div className="my-4 flex items-center justify-between" style={{display: 'flex'}}>
                <strong style={{marginRight:'10px'}} className="block">Thanh toán</strong>
                <p>
                  {result?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </p>
              </div>
              <div className="my-4 flex items-center justify-between" style={{display: 'flex'}}>
              <strong style={{marginRight:'10px'}} className="block">Trạng thái đơn hàng</strong>
                <p>
                  {result?.isDelivered ? "Đã nhận" : "Chưa nhận"}
                </p>
              </div>
              <div className="my-4 flex items-center justify-between" style={{display: 'flex'}}>
                <strong style={{marginRight:'10px'}} className="block">Thời gian mua</strong>
                <p>{result?.createdAt}</p>
                {/* <p>{result?.createdAt.substring(0, 10)} {''} ({result?.createdAt.substring(11, 19)})</p> */}
              </div>

              <div className="my-4 flex items-center justify-between" style={{display: 'flex'}}>
                <strong style={{marginRight:'10px'}} className="block mb-3">Ghi chú</strong>
                <p>
                  {result?.note?.length > 0
                    ? result?.note
                    : "Không có"}
                </p>
              </div>
              <div>
                <strong style={{marginRight:'10px'}} className="block">Đơn mua</strong>
                <div>
                  {customerOder?.map((o) => (<div key={o._id}>
                    <div>
                      <p>Tên: {o.name}</p>
                      <p>Giá: {o.price}</p>
                      <p>Số lượng: {o.quantiny}</p>
                      <img style={{width: '100px'}} src={o.image} alt=''/>
                    </div>
                  </div>))}
                </div>
                <div>
                  <strong style={{marginRight:'10px'}} className="block">Tổng đơn mua:</strong>
                  <strong>{result?.totalOrders}</strong>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      {/* {loading && <Loading />} */}
    </div>
  </div>;
};

export default OrderScreen;
