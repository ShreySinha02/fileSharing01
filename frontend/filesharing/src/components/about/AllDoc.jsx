import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../context';

import Doc from './Doc';
function AllDoc() {

  const { loginStatus, username } = useAuth()
  const [docList, setDocList] = useState([])
  
  const getalldoc = async () => {
    try {
      // console.log(username)
      const response = await axios({
        method: 'get',
        url: `http://0.0.0.0:81/getdoc`,
        params: {
          username: username,
        },
        responseType: 'json'
      })
      // console.log(response)
      if (response && response.status === 200) {
        // console.log(response.data)
        setDocList(response.data)
      }
      else {

        console.log("something wrong")
      }
    } catch (error) {
      console.log(error)
    }
  }

  

  useEffect(() => {
    const fetchData = async () => {
      if (loginStatus) {
        await getalldoc();
      }
    };

    fetchData();

  }, [])
  return (
    <>
    <div className="bg-gray-800 p-4 text-black">
      {loginStatus ? (
        <div className="grid grid-cols-4 gap-4">
          {docList.map((doc) => (
            <div key={doc.id} className="p-4rounded-md">
              <Doc doc={doc} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">Not Authenticated</h1>
          <p className="mt-4 text-lg text-gray-300">Please log in to view documents.</p>
        </div>
      )}
    </div>
  </>
  
  )
}

export default AllDoc;