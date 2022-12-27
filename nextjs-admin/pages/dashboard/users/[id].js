import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import http from '../../../http/axiosApi';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';


export async function getStaticPaths() {
  const res = await http.get('/getAllUsers');
  const data = await res.data.users;
  const paths = data.map((p) => ({
    params: { id: p._id },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await http.get(`/getUsers/${id}`);
  const data = await res.data;
  return {
    props: {
      results: data,
    },
  };
}

const updataPassword = ({results}) => {
  const user = results.user
  const getId = user._id
  const router = useRouter()
  console.log(user)
  console.log(getId)
  // const { id } = router.query
  // console.log(id)
  // const fetchData = async () => {
  //   console.log(id)
  //   const res = await http.get(`/getUsers/${id}`);
  //   console.log(res)
  // }
  // fetchData(id)
  // useEffect( (id) => {
  //   console.log(id)
  //   // if (!id ) {
  //   //   router.push("/users")
  //   // }
  //   // const res = await http.get(`/getUsers/${id}`)
  //   //  console.log(res)
  // }, []);
  const [password, setPassword] = useState({
    password: '',
    passwordAgain: ''
  });
  console.log(password)
  const handleChange = (e) => {
    setPassword((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.password != password.passwordAgain) {
      alert('password incorrect')
      toast.error('Faild, please enter password again');
      // throw new Error('password incorrect');
    }

    try {
      const res = await http.post(`/updataUsers/${getId}`, password);
      if (res.data.success)
        router.push("/dashboard/users")
    } catch (err) {
      alert('password incorrect')
      // toast.error('Failt!!!');
      console.log(err)
    }
  };
  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name </Form.Label>
            <Form.Control
              disabled
              value={user.name}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              disabled
              value={user.email}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              value={password.password}
              onChange={handleChange}
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter Password again</Form.Label>
            <Form.Control
              name="passwordAgain"
              value={password.passwordAgain}
              onChange={handleChange}
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default updataPassword;
