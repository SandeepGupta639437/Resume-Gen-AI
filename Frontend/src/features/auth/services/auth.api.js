import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/auth`,
  withCredentials: true,
});
// const API_URL = "http://localhost:5000";

export async function register (username,email,password){
  try{
    const response = await api.post(`/register`, {username,email,password});
    return response.data;
  }
  catch(err){
    console.error(err)
    throw err
  }
}


export async function login (email,password){
  try{
    const response = await api.post(`/login`, {email,password});
    return response.data;
  }
  catch(err){
    console.error(err)
    throw err
  }
}

export async function logout (){
  try{
    const response = await api.get(`/logout`);
    return response.data;
  }
  catch(err){
    console.error(err)
    throw err
  }
}

export async function getMe (){
  try{
    const response = await api.get(`/get-me`);
    return response.data;
  }
  catch(err){
    console.error(err)
    throw err
  }
}
  
 