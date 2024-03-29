import React from 'react'
import Dropzone from 'react-dropzone'


//Message to be displayed on image upload page
<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  )}
 
</Dropzone>
 console.log(getRootProps)