import React from 'react';
import http from '../../../http/axiosApi';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

export async function getStaticPaths() {
  const res = await http.get('/admin/getAllOrders');
  const data = await res.data.order;
  const paths = data.map((p) => ({
    params: { id: p._id },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await http.get(`/admin/getOrderById/${id}`);
  const data = await res.data;
  return {
    props: {
      results: data,
    },
  };
}

const DetailOrder = ({ results }) => {
  const orderD = results.order;
  console.log(results);
  return (
    <Container>
      <ListGroup variant="flush">
        <ListGroup.Item> <strong>Created At :</strong>{orderD?.createdAt.substring(0, 10)}</ListGroup.Item>
        <ListGroup.Item>
        <strong>Name: </strong>{orderD && orderD?.customerInformation.fullName}
        </ListGroup.Item>
        <ListGroup.Item>
        <strong>Address: </strong>{orderD && orderD?.customerInformation.address}
        </ListGroup.Item>
        <ListGroup.Item>
        <strong>Phone: </strong>{orderD && orderD?.customerInformation.phone}
        </ListGroup.Item>

        <ListGroup.Item>
        <strong>Note: </strong>{orderD && orderD?.customerInformation.note}
        </ListGroup.Item>
        <ListGroup.Item><strong>Totals: </strong>{orderD && orderD?.totalOrders}₫</ListGroup.Item>
        <ListGroup.Item><strong>Pay: </strong>{orderD && orderD?.methodPay}</ListGroup.Item>
        <ListGroup.Item>
          <div>
            <strong>Customer orders:</strong>
            {orderD &&
              orderD?.customerOders?.map((o, i) => (
                <div key={i} className="container-form-orders">
                  <div>
                    <p>
                      <label className="container-form-label-order">
                        Name:{' '}
                      </label>
                      {o.name}
                    </p>
                    <p>
                      <label className="container-form-label-order">
                        Category:{' '}
                      </label>
                      {o.category}
                    </p>
                    <p>
                      <label className="container-form-label-order">
                        Price :{' '}
                      </label>
                      {o.price}
                    </p>
                    <p>
                      <label className="container-form-label-order">
                        Quantiny:{' '}
                      </label>
                      {o.quantiny}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default DetailOrder;
