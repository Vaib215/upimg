import React, {useState} from 'react'

const UploadCompleted = ({id}) => {
  const [message,setMessage] = useState('')
  const handleCopy = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(`https://image-uploader.vaib215.repl.co${id}`)
    setMessage("show")
    setTimeout(()=>{
      setMessage('')
    },3000)
  }
  return (
    <div className="prev-wrapper">
      <h2>Uploaded Successfully!</h2>
      <img className="check" src="https://img.icons8.com/external-phatplus-solid-phatplus/64/219653/external-check-essential-phatplus-solid-phatplus.png" alt="completed"/>
      <img className="prev-img" src={`https://image-uploader-backend.vaib215.repl.co${id}`} alt={`preview-${id}`}/>
      <div className="link-wrapper">
        <a href={`https://image-uploader-backend.vaib215.repl.co${id}`}><input type="text" value={`https://image-uploader-backend.vaib215.repl.co/${id}`} disabled/></a>
        <button onClick={handleCopy}>Copy Link</button>
      </div>
      <div className={`message ${message}`}>Link copied to clipboard</div>
    </div>
  )
}

export default UploadCompleted