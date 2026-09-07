import {useState} from "react"
import "../auth.form.scss"
import {useNavigate , Link} from "react-router"
import { useAuth } from '../hooks/useAuth.js'

const Login = () => {
  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await handleLogin(email,password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  }

  const navigate = useNavigate();

  if(loading) {
    return <main className="auth-page"><div className="auth-loading">Checking your session...</div></main>
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-intro">
          <div>
            <img className="auth-logo" src="/resume-ai-icon.png" alt="Interview Lab" />
            <p className="auth-eyebrow">INTERVIEW LAB / AI PREP</p>
            <h1>Walk into your next interview prepared.</h1>
            <p className="auth-description">Your resume has the story. We help you find the questions, gaps, and preparation plan hiding inside it.</p>
          </div>
          <div className="auth-note"><span>01</span> Personalised preparation, built from your profile.</div>
        </section>

        <section className="form-container">
          <div className="form-heading">
            <p className="auth-eyebrow">WELCOME BACK</p>
            <h2>Sign in to your lab</h2>
            <p>Continue building your interview advantage.</p>
          </div>
          <form onSubmit = {handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder='you@example.com' autoComplete="email" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder='Enter your password' autoComplete="current-password" required />
            </div>
            <button className="button primary-button" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <span aria-hidden="true">-&gt;</span>}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
          <p className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></p>
        </section>
      </div>
    </main>
  )
}

export default Login
