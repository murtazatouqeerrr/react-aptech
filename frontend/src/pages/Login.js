
import React, { useState } from 'react'

function Login() {

  const [user, setUser] = useState({

    email: "",
    password: ""
   
  });

  const handleInput =  (e) => {
    let name = e.target.name;
    let value = e.target.value;

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
  } else {
    alert("login failed: " + respData.msg);
  }
};

  return (
    <>
    <div>
      <h1>Welcome to Login page</h1>
    </div>

    <form onSubmit={handleSubmit}>
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
<input type='submit' value='Submit'/>
    </form>
  </>)
}

export default Login
