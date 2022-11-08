import React, {useState} from 'react';
import Buttot from 'react-bootstrap/esm/Button';
import {useNavigate} from 'react-router-dom';
import { Form } from 'react-router-dom'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


const Search = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('')
    const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : '/search')
    }
  return (
    <Form className='d-flex me-auto' onSubmit={submitHandler}>
        {/* <InputGroup> */}
             {/* <FormControl></FormControl> */}
        {/* </InputGroup> */}
    </Form>
  )
}

export default Search