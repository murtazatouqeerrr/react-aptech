import React, { useState } from 'react';

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleInput = async (e) => {
    let name = e.target.name;
    let value = e.target.value;

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
      <div>
        <h1>Welcome to Register page</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          value={user.username}
          placeholder='Enter Username'
          onChange={handleInput}
        />

        <input
          type='text'
          name='email'
          value={user.email}
          placeholder='Enter Email'
          onChange={handleInput}
        />

        <input
          type='text'
          name='password'
          value={user.password}
          placeholder='Enter Password'
          onChange={handleInput}
        />

        <input
          type='text'
          name='phone'
          value={user.phone}
          placeholder='Enter Phone'
          onChange={handleInput}
        />

        <input type='submit' value='Register' />
      </form>
    </>
  );
}

export default Register;
