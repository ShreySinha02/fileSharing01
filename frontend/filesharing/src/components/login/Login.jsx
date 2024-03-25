import React,{useState} from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import {useAuth} from '../../context'
import { useNavigate } from 'react-router-dom';




function Login() {
  const {updateLoginStatus,authStatus,loginStatus}=useAuth()
  const [loading, setLoading] = useState(false);
 const navigate=useNavigate()
  const login=async (values)=>{
    setLoading(true);
    const url=`http://0.0.0.0:81/login`
    const config = {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
  };
    const formdata=new FormData()
    formdata.append('username',values.username)
    formdata.append('password',values.password)
    await axios.post(url,formdata,config)
    .then((res)=>res.data)
    .then((data)=>{
      console.log(data["access_token"])
      localStorage.setItem('token',data["access_token"])
      updateLoginStatus(true)
      navigate('/')
     
  
    })
    .catch((e)=>{
      // console.log(e)
      alert(e.response.data)})
    .finally(setLoading(false))
    
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: login
  });
  return (
    <form onSubmit={formik.handleSubmit} className="bg-gradient-to-r from-purple-400 to-pink-600 text-white p-8 items-center justify-center flex flex-grow shadow-md w-96 mx-auto ">
      <div className="space-y-4">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-bold mb-2">
            username
          </label>
          <input
            id="username"
            name="username"
            required
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-bold mb-2">
            password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            onChange={formik.handleChange}
            value={formik.values.lastName}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
  
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </form>
  
  
    );
}

export default Login;