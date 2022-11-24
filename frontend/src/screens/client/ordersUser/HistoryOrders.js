import React from 'react';
import { useState, useReducer, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import http from '../../../api/axiosApi';

const HistoryOrders = () => {
  const [orders, setOrders] = useState([]);

  const storeUser = localStorage.getItem('user');
  const storeTokens = localStorage.getItem('tokens');
  const navigate = useNavigate();

  useEffect(() => {
    if (!storeUser && !storeTokens) navigate('/login');
    const results = async () => {
      try {
        const res = await http.get('/History-orders');
        setOrders(res.data);
        console.log(res.data);
        // console.log(res.data.success);
        // console.log(res.data.orders);
      } catch (err) {
        if (err.res) {
          console.log(err.res.data.message);
        } else {
          console.log('Error: Network Error');
        }
      }
    };
    results();
  }, [storeUser, storeTokens, navigate]);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Đơn mua</th>
            <th>Ngày</th>
            <th>Tổng</th>
            <th>Thanh toán</th>
            <th>Đã nhận</th>
            <th>Thay đổi</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order?._id} 
            className={
              order.isPaid && order.isDelivered === true ? 'order-success' : 'order-notyet'
            }
            >
              <td>{order?._id}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.totalOrders}.000₫</td>
              <td>{order.isPaid === true 
                ? <p style={{marginBottom: '0'}}>Đã thanh toán</p> 
                : <p style={{marginBottom: '0'}}>Chưa thanh toán</p>}</td>
              <td>{order.isDelivered === true 
                ? <p style={{marginBottom: '0'}}>Đã thanh toán</p> 
                : <p style={{marginBottom: '0'}}>Chưa thanh toán</p>}
              </td>
              <td>
                <Button
                  className="HOButton"
                  type="button"
                  variant="light"
                  onClick={() => {
                    navigate(`/order/${order._id}`);
                  }}
                >
                  Details
                </Button>
              </td>

              {/* <td>{order._id}

                // <td>{order.customerOders}</td>
                // <img src={order.image} alt={order.name} />
                // </td>
                // <td>{order.createdAt.substring(0, 10)}</td>
                // <td>{order.totalOrders}</td>
                // <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                // <td>
                //   {order.isDelivered
                //     ? order.deliveredAt.substring(0, 10)
                //     : 'No'}
                // </td>
                // <td>
                //   <Button
                //   className='HOButton'
                //     type="button"
                //     variant="light"
                //     onClick={() => {
                //       navigate(`/order/${order._id}`);
                //     }}
                //   >
                //     Details
                //   </Button>
                </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryOrders;
