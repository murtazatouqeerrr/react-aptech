import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Contact() {
  
const [contact, setContact] = useState({
  username: "",
  email: "",
  message: ""
});

const handleInput = (e) => {
  setContact({
    ...contact,
    [e.target.name]: e.target.value
  });
};

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(contact);

    const response = await fetch("http://localhost:8000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contact)
    });

    if (response.ok) {
      const respData = await response.json();
      alert(respData.msg);
    } else {
      alert("Contact Create  failed");
    }
  };

  return (
    <>
      <h1 className="mb-4 p-4">Welcome to Contact page</h1>

      <Form onSubmit={handleSubmit} style={{ maxWidth: "400px" }} className='p-4'>
        <Form.Group className="mb-3 " controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text"
            name="username"
            value={contact.username}
            placeholder="Enter Username"
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email"
            name="email"
            value={contact.email}
            placeholder="Enter Email"
            onChange={handleInput}
          />
        </Form.Group>

        
        
        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Message</Form.Label>
          <Form.Control 
            type="text"
            name="message"
            value={contact.message}
            placeholder="Enter Message"
            onChange={handleInput}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </>
  );
}

export default Contact;
