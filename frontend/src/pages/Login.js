import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = new URLSearchParams({
      email: user.email,
      password: user.password
    }).toString();

    const response = await fetch(`http://localhost:8000/login?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const respData = await response.json();

    if (response.ok) {
      alert(respData.msg);
      navigate("/");
    } else {
      alert("login failed: " + respData.msg);
    }
  };

  return (
    <>
      <h1 className="mb-4 p-4">Welcome to Login page</h1>

      <Form onSubmit={handleSubmit} style={{ maxWidth: "400px" }} className='p-4'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            name="email"
            value={user.email}
            placeholder="Enter email"
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={handleInput}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}

export default Login;
