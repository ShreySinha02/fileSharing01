import React, { useState } from 'react'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
function Doc({doc}) {
    const id=doc.id
    const fname=doc.file_name
    const initailName=!fname.length?id:fname
    // console.log(doc)
    const navigate=useNavigate()
    const [editable,setEditable]=useState(false)
    const [name,setName]=useState(initailName)


    const handleClick=(docId)=>{
        // console.log("c")
        navigate(`/document/${docId}`)
      }

    const handleEdit=()=>{
        setEditable(true)

    }
    const handleDelte=()=>{
        console.log("delete")

    }
    const handleSubmit=async ()=>{
        try {
            res=await axios({
                method:'post',
                url: `http://127.0.0.1:8000/rename`,
                params:{
                    docId:id,   
                    filename:name
                },
                responseType:"json"
            })
            if(res.status==200){
                    console.log(res)
            }
        } catch (error) {
            
        }finally{
            window.location.reload(false)
            setEditable(false)
        }
    }
    const handleChange=(e)=>{
        setName(e.target.value) 
        // console.log(name)
    }
  return (
    <div key={doc.id}  className="flex flex-col size-40  items-center m-2 justify-between bg-gray-100 p-4 mb-4 rounded-md">
    {!editable?(<><div data-testid="doc" className="cursor-pointer" onClick={() => handleClick(doc.id)}>
      {!fname.length?name:fname}
    </div>
    <div className="flex space-x-4">
      <span
      data-testid='renameBtn'
        className="cursor-pointer text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
        onClick={() => handleEdit(doc.id)}
      >
        Rename
      </span>
      <span
        className="cursor-pointer text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
        onClick={() => handleDelete(doc.id)}
      > 
        Delete
      </span>
    </div></>):(<div className="size-11/12  flex flex-col justify-center items-center">
      <input className=" h-8 w-32  " placeholder='rename' onChange={handleChange} value={name}/>
      <span className="cursor-pointer" onClick={handleSubmit}>submit</span>
    </div>)}
  </div>
     

 
  )
}

export default Doc