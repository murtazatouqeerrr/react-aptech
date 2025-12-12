import React from 'react'
import { useState, useEffect } from 'react'







function Home() {
  const [username, setUsername] = useState("");
useEffect(() => {
  const storedName = localStorage.getItem("username");
  setUsername(storedName);
}, []);

  return (
    <div>
      <h1>Welcome {username}</h1>

      <h1>Welcome to home page</h1>
    </div>
  )
}

export default Home
