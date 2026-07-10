import {useContext , useEffect} from "react"
import {AuthContext} from "../auth.context.jsx"
import {login, register, logout, getMe} from "../services/auth.api.js"

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

  useEffect(() => {
    const getAndSetUser = async () => {  // fetch User
      try {
        const data = await getMe()
        setUser(data?.user ?? null)
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getAndSetUser()
  }, [])

  return {user, loading, handleLogin, handleRegister, handleLogout}
}