import React, { useEffect } from 'react';
import Header from '../header/Header';
import { Outlet } from 'react-router-dom';
import Root from '../root/Root';
import { useState } from 'react';
import { AuthProvider, useAuth } from '../../context';
import axios from 'axios';
import { redirect } from 'react-router-dom';

function Container() {

  const {updateLoginStatus,updateUserName}=useAuth()

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
        // console.log(user)
        updateUserName(user)
        updateLoginStatus(true)
      } else {
        console.log("something wrong")
      }
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    const authToken = localStorage.getItem('token')
    if (authToken) {
      verifyToken(authToken)
    }
    const intervalId = setInterval(() => {
      const authToken = localStorage.getItem('token');
      if (authToken) {
        verifyToken(authToken);
      }
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);


  }, []
  )

  return (
    <>
     
        <div className="min-h-screen" >
          <Header className=""/>
          <div className="flex h-svh">
            <Root />
            <Outlet />
          </div>
        </div>
    
    </>
  );
}

export default Container;
