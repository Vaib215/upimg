import React from 'react'

const UploadProgress = ({prog}) => {
  return (
    <div className="upload-progress">
      <div class="prog-per">
        <h3>Uploading...</h3>
        <b>{prog}%</b>
      </div>
      <div className="progress">
        <div style={{"width": `${prog}%`}}></div>
      </div>
    </div>
  )
}

export default UploadProgress;