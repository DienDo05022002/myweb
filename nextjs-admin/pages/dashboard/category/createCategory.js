import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import http from '../../../http/axiosApi';
import { useRouter } from 'next/router'
// import Toast from 'react-bootstrap/Toast';

const createCategory = () => {
  const [category, setCategory] = useState({
    categories: '',
    description: '',
  });
  console.log(category)
  const handleChange = (e) => {
    setCategory((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.categories) {
      throw new Error('enter category');
    }

    try {
      const res = await http.post('/admin/createCategory', category);
      if (res.data.success)
        router.push("/dashboard/category")
    } catch (err) {
      // toast.error('Failt!!!');
      console.log(err)
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Category </Form.Label>
          <Form.Control
            name="categories"
            value={category.categories}
            onChange={handleChange}
            placeholder="Enter Category"
          />
          <Form.Text className="text-muted">Please enter input</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            value={category.description}
            onChange={handleChange}
            placeholder="Description"
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
  );
};

export default createCategory;
