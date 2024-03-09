import React, { useCallback, useEffect, useRef, useState } from 'react'

import {v4 as uuidV4} from 'uuid'
// import { Delta } from 'quill';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { Link } from 'react-router-dom';





function Home() {
  const { changeDocStatus,loginStatus } = useAuth()
  // const [docid,setDocId]=useState('')
  const [roomid,setRoomId]=useState('')
  const navigate=useNavigate()
  // console.log(state)
  const handleClick=async ()=>{
    const uuid = uuidV4();
    console.log(uuid);
  
    
    //  setDocId(uuid);
  
    
    // console.log(docid);
    navigate(`/document/${uuid}`);
    console.log("clicked");
  }
 const handleChange=(e)=>{
  setRoomId(e.target.value)
 }
 const handleSubmit=()=>{
  navigate(`/document/${roomid}`)
 }
  return ( <div className="flex grow bg-blue-500 items-center justify-center ">
{loginStatus ? (
    <div className="bg-gradient-to-br from-blue-500 size-11/12 to-blue-700 py-8 px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-64 grid grid-cols-1 md:grid-cols-2 gap-8">
    <div >
      <button
        onClick={handleClick}
        className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-100 transition duration-300 ease-in-out"
      >
        New Doc
      </button>
    </div>
    <div>
      <div className="grid grid-cols-1 gap-4">
        <input
          type='text'
          placeholder='Enter document ID'
          value={roomid}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white font-semibold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline-green hover:bg-green-600 transition duration-300 ease-in-out"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
  
  
  ) : (
    <h1 className="text-2xl font-bold">Not authenticated</h1>
  )}
  </div>

  )
    
}

export default Home;

// authState ?
 
//         : <h1>Not autheticated</h1>
//   )