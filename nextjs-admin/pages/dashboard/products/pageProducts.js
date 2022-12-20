import React from 'react';
import http from '../../../http/axiosApi';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'

export async function getServerSideProps() {
  const res = await http.get('/admin/getProducts');
  const products = await res.data;

  // Pass data to the page via props
  return { props: { products } };
}

const pageProducts = ({products}) => {
  const router = useRouter()
  const handleOnDelete = async (id) => {
    try {
      const res = await http.delete(`/admin/deleteProduct/${id}`);
      if (res.data.success)
      router.push("/dashboard/products/pageProducts")
      toast.success('Delete product Successfully');
    } catch (err) {
      toast.error('Faild');
      console.log({ err });
    }
  };
  const results = products.products;
  return (
    <div>
      <Table striped bordered hover className='table-product'>
        <thead>
          <tr>
            <th>#</th>
            <th>Products</th>
            <th>Edit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {results &&
            results.map((i, index) => (
              <tr key={i._id}>
                <th>{index}</th>
                <th style={{ display: 'flex' }}>
                  <img src={i.image} alt={i.name} style={{ width: '50px' }} />
                  <div>{i.name}</div>
                </th>
                <th>
                  <Button
                    variant="outline-secondary"
                    className="p-container-bt"
                  >
                    <Link
                      href={`/dashboard/products/${i._id}`}
                      className="edit-link"
                    >
                      Edit
                    </Link>
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="p-container-bt"
                    onClick={(e) => handleOnDelete(i._id, e)}
                  >
                    Delete
                  </Button>
                </th>
                <th>
                  <div className="div-boxshadow">
                    Active
                    {i.active === 'un' ? (
                      <Button
                        variant="danger"
                        className="p-container-bt"
                        onClick={async () => {
                          http.patch(`/admin/setStatusProduct/${i._id}`, {
                            active: 'on',
                          });
                          router.push("/dashboard/products/pageProducts")
                        }}
                      >
                        {' '}
                        Un
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        className="p-container-bt"
                        onClick={async () => {
                          http.patch(`/admin/setStatusProduct/${i._id}`, {
                            active: 'un',
                          });
                          router.push("/dashboard/products/pageProducts")
                        }}
                      >
                        On{' '}
                      </Button>
                    )}
                  </div>
                </th>
                <th>
                  <div className="div-boxshadow">
                    Roll Top
                    {i.rollTop === 'un' ? (
                      <Button
                        variant="danger"
                        className="p-container-bt"
                        onClick={async () => {
                          http.patch(`/admin/setStatusProduct/${i._id}`, {
                            rollTop: 'on',
                          });
                          router.push("/dashboard/products/pageProducts")
                        }}
                      >
                        {' '}
                        Un
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        className="p-container-bt"
                        onClick={async () => {
                          http.patch(`/admin/setStatusProduct/${i._id}`, {
                            rollTop: 'un',
                          });
                          router.push("/dashboard/products/pageProducts")
                        }}
                      >
                        On{' '}
                      </Button>
                    )}
                  </div>
                </th>
              </tr>
            ))}
        </tbody>
      </Table>
      <Link
        href={`/dashboard/products/createProduct`}
        className="edit-link table-link-button" 
        style={{ color: 'white' }}
      >
        <Button variant="danger" className="p-container-bt">
          {/* <IoMdAdd/> */}
          Create
        </Button>
      </Link>
    </div>
  );
};

export default pageProducts;
