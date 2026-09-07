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
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-intro">
          <div>
            <img className="auth-logo" src="/resume-ai-icon.png" alt="Interview Lab" />
            <p className="auth-eyebrow">INTERVIEW LAB / AI PREP</p>
            <h1>Build your interview advantage.</h1>
            <p className="auth-description">Create your profile once. Turn your experience into focused preparation for what comes next.</p>
          </div>
          <div className="auth-note"><span>01</span> Your preparation starts with your story.</div>
        </section>

        <section className="form-container">
          <div className="form-heading">
            <p className="auth-eyebrow">GET STARTED</p>
            <h2>Create your lab profile</h2>
            <p>Save your preparation and pick up where you left off.</p>
          </div>
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
            <button className="button primary-button" type="submit" disabled={loading}>
              {loading ? "Creating profile..." : "Create profile"}
              {!loading && <span aria-hidden="true">-&gt;</span>}
            </button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        </section>
      </div>
    </main>
  )
}

export default Register
