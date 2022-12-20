import React from 'react';
import http from '../../../http/axiosApi';
import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'

export async function getServerSideProps() {
  const res = await http.get('/admin/getAllCategory');
  const category = await res.data;

  // Pass data to the page via props
  return { props: { category } };
}

const Category = ({category}) => {
  const router = useRouter()
  const handleOnDelete = async (id) => {
    try {
      const res = await http.delete(`/deleteCategory/${id}`);
      if (res.data.success)
      router.push("/dashboard/category")
      toast.success('Delete product Successfully');
    } catch (err) {
      toast.error('Faild');
      console.log({ err });
    }
  };
  return (
    <Container style={{ marginTop: '50px' }}>
      <ListGroup>
        {category?.category &&
          category.category.map((c) => (
            <ListGroup.Item style={{ display: 'flex', justifyContent: 'spaceBetween'}} className='listItem-users'>
              {c.categories}
              <Button
                variant="outline-danger"
                className="p-container-bt"
                onClick={(e) => handleOnDelete(c._id, e)}
              >
                Delete
              </Button>
            </ListGroup.Item>
          ))}
      </ListGroup>
      <div>New Category</div>
      <Link
        href={`/dashboard/category/createCategory`}
        // className="edit-link table-link-button"
        style={{ color: 'white', marginTop: '50px' }}
      >
        <Button variant="danger" className="p-container-bt">
          {/* <IoMdAdd/> */}
          Create
        </Button>
      </Link>
    </Container>
  );
};

export default Category;
