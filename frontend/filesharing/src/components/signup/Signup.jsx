import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const navigate=useNavigate()
  const signup = (values) => {
   const url=`http://127.0.0.1:8000/signup`
   const config = {
    headers: {
      'content-type': 'application/json',
    },
  };
  const data={
    "username": values.username ,
    "email": values.email,
    "full_name": values.fullName,
    "password": values.password
  }
  axios.post(url,data,config)
  .then(
    (res)=>{
      if (res.status==200) alert(res.data['message'])
      if (res.data['message']!="Please Enter Unique Username"){

        navigate('/login')
      }

    }
  ).catch((e)=>{console.log(e)})
  }



const formik = useFormik({
  initialValues: {
    username: '',
    fullName: '',
    email: '',
    password: ''
  },
  onSubmit: signup
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
        <label htmlFor="fullName" className="block text-sm font-bold mb-2">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          required
          type="text"
          onChange={formik.handleChange}
          value={formik.values.fullName}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-bold mb-2">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          required
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
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
        Submit
      </button>
    </div>
  </form>


  );
};
export default Signup;