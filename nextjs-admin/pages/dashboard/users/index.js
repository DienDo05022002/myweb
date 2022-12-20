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
  const res = await http.get('/getAllUsers');
  const users = await res.data;

  // Pass data to the page via props
  return { props: { users } };
}

const index = ({users}) => {
  const router = useRouter()
  const handleOnDelete = async (id) => {
    try {
      const res = await http.delete(`/deleteUsers/${id}`);
      if (res.data.success)
      router.push("/dashboard/users")
      toast.success('Delete product Successfully');
    } catch (err) {
      toast.error('Faild');
      console.log({ err });
    }
  };
  return (
    <Container>
      <ListGroup>
        {users.users &&
          users.users.map((c) => (
            <div>
              <ListGroup.Item style={{ display: 'flex', justifyContent: 'spaceBetween'}} className='listItem-users'>
                <div>
                  <div>Name: {c.name}</div>
                  <div>Email: {c.email}</div>
                </div>
                <div>
                  <Button variant="outline-primary">Edit Password</Button>{' '}
                  <Button
                    variant="outline-danger"
                    className="p-container-bt"
                    onClick={(e) => handleOnDelete(c._id, e)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            </div>
          ))}
      </ListGroup>
      {/* <Link
        href={`/dashboard/category/createCategory`}
        // className="edit-link table-link-button"
        style={{ color: 'white' }}
      >
        <Button variant="danger" className="p-container-bt">
          Create
        </Button>
      </Link> */}
    </Container>
  );
};

export default index;
