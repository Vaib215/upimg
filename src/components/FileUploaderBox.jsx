import React, {useState} from 'react'
import imageSvg from "../image.svg"
import UploadProgress from './UploadProgress'
import UploadCompleted from './UploadCompleted'
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios'

const FileUploaderBox = () => {
  const [uploading, setUploading] = useState(true);
  const [progress, setProgress] = useState('0')
  const [uploaded, setUploaded] = useState(false)
  const [url, setUrl] = useState('/')
  const handleChange = async(file) => {
    if (file) {
    setUploading(false);
    let formData = new FormData()
    formData.append("file", file)
    const resp = await axios.post('https://image-uploader-backend.vaib215.repl.co',formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: data => {
      setProgress(""+Math.round((100 * data.loaded) / data.total))
      },
    })
    setUploaded(true)
    setUrl(resp["data"].split('co')[1])
    
  }}
  return (
  <form className="container">
    {uploading && (
    <>
    <h3>Upload your image</h3>
    <small>Supported formats: jpg/jpeg & png</small>
    <FileUploader className="drop-upload" handleChange={handleChange} name="file" types={["JPG", "PNG"]}>
      <div className="upload-box">
        <img src={imageSvg} alt="upload-icon"/>
        <p>Drag & Drop your image here</p>
      </div>
    </FileUploader>
    <small>Or</small>
    <FileUploader handleChange={handleChange} name="file" types={["JPG", "PNG"]}>
      <button>Choose a file</button>
    </FileUploader>
    </>
    )}
    {!uploading && !uploaded && (
    <UploadProgress prog={progress}/>
    )}
    {!uploading && uploaded && (
      <UploadCompleted id={url}/>
    )}
  </form>
  )
}

export default FileUploaderBox;