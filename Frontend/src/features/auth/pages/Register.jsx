import React from 'react'
import {useNavigate , Link} from "react-router"
import { useAuth } from '../hooks/useAuth.js'
import {useState} from "react"

const handleSubmit = async(e) => {
  e.preventDefault();
  await handleRegister(username,email,password);
}

const Register = () => {
  const { loading, handleRegister } = useAuth();
  
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(username,email,password);
    navigate("/");
  }
  const navigate = useNavigate();


  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit = {handleSubmit}>
            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username" placeholder='Enter your username' required />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder='email.com' required />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder='Enter your password' required />
            </div>
            <button className="button primary-button" type="submit">
              Register
            </button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register
