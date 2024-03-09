import React from 'react'
import FileUpload from '../fileupload/FileUpload';
import FileDownload from '../filedownload/FileDownload';
function Root() {
  return (
    <div className="flex  rounded-full">
      <div className="flex relative bg-gradient-to-r items-center  from-purple-500 to-blue-500 p-8   shadow-md">
        <div className="absolute inset-0 bg-cover bg-blur"></div>
        <div className="relative z-10 justify-center  text-white">
          <FileUpload />
          <FileDownload />
        </div>
      </div>
    </div>
  )
}

export default Root