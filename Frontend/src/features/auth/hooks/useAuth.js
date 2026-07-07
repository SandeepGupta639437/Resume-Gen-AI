import {useContext} from "react"
import {AuthContext} from "../auth.context.jsx"
import {login, register, logout} from "../services/auth.api.js"

export const useAuth = () => {
  const context = useContext(AuthContext)
  const {user, setUser, loading, setLoading} = context


  const handleLogin = async (email,password) => {
    try{
      setLoading(true)
      const data = await login(email,password)
      setUser(data.user)
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  } 
  const handleRegister = async (username,email,password) => {
    try{
      setLoading(true)
      const data = await register(username,email,password)
      setUser(data.user)
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try{
      setLoading(true)
      await logout()
      setUser(null)
      setLoading(false)
    }
    catch(err){
      console.log(err)
    }
  }
  return {user, loading, handleLogin, handleRegister, handleLogout}
}