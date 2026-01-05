import React from 'react'
import { useAuth } from '../store/auth.js'

function About() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome {user.username} to About page</h1>
    </div>
  )
}

export default About
