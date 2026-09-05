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
    const isLoggedIn = await handleLogin(email,password);
    if (isLoggedIn) {
      navigate("/");
    } else {
      setError("Login failed. Check your email and password, then try again.");
    }
  }

  const navigate = useNavigate();

  if(loading) {
    return (<main> <h1>Loading.....</h1></main>)
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit = {handleSubmit}>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder='email.com' required />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder='Enter your password' required />
            </div>
            <button className="button primary-button" type="submit">
              Login
            </button>
            {error && <p className="error-message">{error}</p>}
        </form>

        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login
