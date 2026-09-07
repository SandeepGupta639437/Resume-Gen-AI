import {useAuth} from "../hooks/useAuth.js"
import {Navigate} from "react-router"
import React from "react"

const Protected = ({children}) => {
  const {loading , user} = useAuth() 

  if (loading) {
    return <main className="auth-page"><div className="auth-loading">Preparing your interview lab...</div></main>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default Protected