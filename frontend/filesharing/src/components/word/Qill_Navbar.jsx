import React, { useRef,useState } from 'react'
import { Link } from 'react-router-dom'

function Qill_Navbar({docId}) {
  const [content, setContent] = useState(docId);
    const idref = useRef(null);
    const handleClick = () => {
        idref.current.style.background='blue'
        navigator.clipboard.writeText(content)
        const timeref=setTimeout(()=>{
            idref.current.style.background=''
        },1000)
        
          
    }
    
  return (
    <>
  <div className="bg-gray-200 py-4 px-6 flex items-center justify-between">
    <ul className="flex flex-row space-x-4 text-gray-700">
      <li><Link to={'/'} className="inline-block hover:text-gray-900 hover:bg-gray-100 rounded-md px-3 py-1">Home</Link></li>
      <li><button className="inline-block hover:text-gray-900 hover:bg-gray-100 rounded-md px-3 py-1">File</button></li>
    </ul>
  </div>

  <div className="bg-gradient-to-br from-gray-300 to-gray-500 py-2 px-2 md:px-6 lg:px-12 xl:px-24 2xl:px-48 text-white flex justify-center items-center">
    <p className="text-2xl font-bold">File ID:</p>
    <div 
                ref={idref} 
                className="text-lg mt-2"
                contentEditable={true} 
                style={{ outline: 'none' }} // Remove outline when focused
            >
                {content}
            </div>
    <button 
        className="ml-2 p-1 rounded text-sm bg-blue-500 hover:bg-blue-600 focus:outline-none"
        onClick={handleClick}
    >
        Copy
    </button>
</div>



</>


  
  
  
  )
}

export default Qill_Navbar