import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";

import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import axios from 'axios'

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('api/admin/adminLogin',{email:email,password:password})
    .then((res)=>{
        console.log(res.data)
        setEmail('')
        setPassword('')     
            navigate('/adminDash')    
    })
    .catch((err)=>{
        toast.error('invalid admin email or password ')
    })
  };
  return (
    <FormContainer>
      <h1>Log in</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Admin Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Admin password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="danger" className="mt-3">
          admin log in 
        </Button>
       
      </Form>
    </FormContainer>
  );
}

export default LoginScreen;
