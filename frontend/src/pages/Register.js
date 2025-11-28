import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: ""
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
    console.log(user);

    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      const respData = await response.json();
      alert(respData.msg);
    } else {
      alert("Registration failed");
    }
  };

  return (
    <>
      <h1 className="mb-4 p-4">Welcome to Register page</h1>

      <Form onSubmit={handleSubmit} style={{ maxWidth: "400px" }} className='p-4'>
        <Form.Group className="mb-3 " controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text"
            name="username"
            value={user.username}
            placeholder="Enter Username"
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email"
            name="email"
            value={user.email}
            placeholder="Enter Email"
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password"
            name="password"
            value={user.password}
            placeholder="Enter Password"
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control 
            type="text"
            name="phone"
            value={user.phone}
            placeholder="Enter Phone"
            onChange={handleInput}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
}

export default Register;
