import React, { useState } from 'react'
import axios from 'axios';
function FileUpload() {

  const [file, setFile] = useState(null)
  const[filename,setFilename]=useState(null)
  const [uniqueString,setUniqueString]=useState(null)
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setFilename(selectedFile.name)
    }
  };
  // console.log(file.name)
 async function handleSubmit(event) {
    if (!file) {
      alert('No file selected');
      return;
    }
    event.preventDefault()
    const url = `http://0.0.0.0:81/uploadfile`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    await axios.post(url, formData, config).then((response) => {
      console.log(response.data );
      setUniqueString(response.data["unique_string"])
    }).catch((err)=>{alert(err.message)});

    setFile(null)
    setFilename(null)

  }
  return (
    <div>
  <form className="flex flex-row justify-center gap-4 p-4" onSubmit={handleSubmit}>
    <label className="relative flex items-center w-2/3 h-8 overflow-hidden rounded-full border-2 border-gray-300 cursor-pointer bg-white hover:shadow-md dark:border-gray-600 dark:bg-gray-700">
      <span className={`text-sm mx-3 ${
              file ? 'text-green-600 font-bold' : 'text-gray-500 dark:text-gray-400'
            }`}>{filename?filename:"Choose File"}</span>
      <input
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        type="file"
        id="dropzone-file"
        onChange={handleFileChange}
      />
    </label>
    {
      uniqueString?<h4 >{uniqueString}</h4>:null
    }
    <button
      className="w-1/3 px-4 h-8 text-sm border-2 border-rose-400 rounded-full  bg-rose-400 hover:bg-green-400 hover:text-white transition-all duration-300"
      onClick={handleSubmit}
    >
      Upload File
    </button>
  </form>
</div>

  )
}

export default FileUpload;

