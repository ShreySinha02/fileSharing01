import { useState,useEffect } from 'react'
import { FileDownload, FileUpload } from './components'

import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import axios from 'axios';


import { AllDoc, Contact, Container, Home, Root, Word } from './components/index.js';
import Signup from './components/signup/Signup.jsx';
import Login from './components/login/Login.jsx';
import { AuthProvider } from './context/AuthContext.js';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "alldoc",
        element: <AllDoc />,
      },
      {
        path: "created",
        element: <Contact />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "login",
        element: <Login />
      },
      
      
    ],
    
  },
  {
    path:"document/:id",
    element:  <Word/>
  
  }
  
]);


function App() {

  const [loading, setLoading] = useState(true);
  const [loginStatus, setLoginStatus] = useState(false)
  const [username,setUsername]=useState('')
 
  const updateLoginStatus = (state) => {
    setLoginStatus(state)
  }
  const updateUserName=(user)=>{
    setUsername(user)
  }
  
  const verifyToken = async (authToken) => {
    // console.log(authToken)

    try {
      const response = await axios({
        method: 'get',
        url: `http://127.0.0.1:8000/user`,
        params: {
          token: authToken,
        },
        responseType: 'json'
      })
      // console.log(response)
      if (response.status == 200) {
        const user = response.data.message
        console.log(user)
        updateUserName(user)
        updateLoginStatus(true)
      } else {
        console.log("something wrong")
      }
    }
    catch (e) {
      console.log(e)
    }
    finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    const authToken = localStorage.getItem('token')
    if (authToken) {
      verifyToken(authToken);
    } else {
      // No token found, set loading to false
      setLoading(false);
    }
  }, []
  )


  return (

    <>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <AuthProvider value={{ username, loginStatus, updateLoginStatus, updateUserName }}>
        <RouterProvider router={router} />
      </AuthProvider>
    )}
  </>
  )
}

export default App

