import React, { useState } from 'react'
import axios from 'axios'
function FileDownload() {

  const [id, setId] = useState()

  const idChange = (e) => {
    setId(e.target.value)
  }

  const handleDownload = async () => {

    try {
      const response = await axios({
        method: 'get',
        url: `http://0.0.0.0:81/downloadfile/${id}`,
        responseType: 'arraybuffer', // Important for binary data
        withCredentials:true
      });

      if (response.status === 200) {
        const  filename  = response.headers['content-disposition'];
        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: 'application/octet-stream' });

        // Create a download link and trigger the download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert('File downloaded successfully');
      } else {
        console.error('Failed to download file');
      }
    } catch (error) {
      console.error('Error downloading file', error);
    }
  };
  return (
    <div className="flex flex-row gap-4 p-4">
    <input
      className="w-2/3 px-4 py-2 h-8 rounded-full border-2 text-gray-950 border-indigo-600 focus:outline-none focus:border-purple-700 transition-all duration-300"
      type='text'
      onChange={idChange}
      placeholder='Enter Unique String'
    />
    <button
      className="w-1/3 px-4 h-8 text-sm border-2 border-rose-400 rounded-full  bg-rose-400 hover:bg-green-400 hover:text-white transition-all duration-300"      onClick={handleDownload}>
      Download File
    </button>
  </div>
  
  )
}

export default FileDownload;