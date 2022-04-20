import React, { useMemo, useState,useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Tab, Tabs, TabPanel } from "@mui/material";
import classes from "./LoginForm.module.css";
import { setImages } from "../Data/dataAction";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router'

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "10%",
  borderWidth: 1,
  borderRadius: 1,
  borderColor: "#eeeeee",

  backgroundColor: "#F9F9F9",
  color: "#bdbdbd",
  outline: "none",

  fontFamily: "Sora",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

// function StyledDropzone(props) {

  // const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
  //   useDropzone({ accept: "image/jpeg,image/png" });

  // const style = useMemo(
  //   () => ({
  //     ...baseStyle,
  //     ...(isFocused ? focusedStyle : {}),
  //     ...(isDragAccept ? acceptStyle : {}),
  //     ...(isDragReject ? rejectStyle : {}),
  //   }),
  //   [isFocused, isDragAccept, isDragReject]
  // );
//   // const[pic,setpic] = useState();

//   // const imagehandle =async(e)=>{
 
//   //   // console.log("e.traget.files")
//   //   // setpic(e.target.files[0].name);
//   //   // const reader = new FileReader();
//   //   // reader.onloadend=()=>{
//   //   //   setpicurl(reader.result)
//   //   // }
//   //   // reader.readAsDataURL(e.target.files[0])
//   //   // const file = await e.target.files[0];
  
    
//   //   //   if(!file) 
//   //   //      return console.log("file not upload")

//   //   //   if(file.type !== 'image/jpeg' && file.type !== 'image/png')
//   //   //       return console.log("File format is incorrect")
        
//   //   //   let formData2 =  new FormData()
//   //   //   formData2.append('file', file)
//   //   //   console.log(formData2)
      
  
//   // }


//   return (
//     <div >
//       <div style={{  borderTop:"1px solid #E3E1E1" , paddingTop:"3%" , width:"90%"}} ></div>
//       <div className={classes.uploadBox}>
//         <div {...getRootProps({style})}>
//           <input {...getInputProps()}  type="file"
     
//       onChange={(e)=>{console.log("ghhg")}}/>`\`
    


//           <img width="50" height="50" src="picture-double-landscape.svg" className={classes.img} />
//           <h4 className={classes.photo}
//             style={{
//               color: "#717171",
//               fontSize: "100%",
//               fontFamily: "Sora",
//               fontWeight: "400",
//             }}
//           >
//             Upload a photo
//           </h4>
//           <p className={classes.drag}
//             style={{
//               color: "#717171",
//               fontSize: "90%",
//               fontFamily: "Sora",
//               fontWeight: "400",
//             }}
//           >
//             Drag & drop or click to{" "}
//             <a style={{ textDecoration: "underline" }}>select</a>
//           </p>
//           <p style={{ marginTop: "15%", fontSize: "75%", color: "#A7A7A7", fontFamily: "Sora",
//               fontWeight: "400",}} className={classes.only}>
//             only .jpeg and .png formats not exceeding 100 MB
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// <StyledDropzone />;
// export default StyledDropzone;






function StyledDropzone(props) {
 


  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter()
  // const {getRootProps, getInputProps} = useDropzone({
  //   accept: 'image/*',
  //   onDrop: acceptedFiles => {
  //     setFiles(acceptedFiles.map(file => Object.assign(file, {preview: file }))); 
   
  //   }
  // }
  //      ); 
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
  useDropzone({ accept: "image/jpeg,image/png" ,
  onDrop: acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {preview: file }))); 
 
  }

});
const style = useMemo(
  () => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {}),
  }),
  [isFocused, isDragAccept, isDragReject]
);

  
if(files.length != 0){
dispatch(setImages(files));

console.log("set images")
router.push('/detail')
}
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
  console.log(files)

  // className: 'dropzone'
  return (
    <div >
    <div style={{  borderTop:"1px solid #E3E1E1" , paddingTop:"3%" , width:"90%"}} ></div>
    <div  className={classes.uploadBox}>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
       
        <img width="50" height="50" src="picture-double-landscape.svg" className={classes.img} />
          <h4 className={classes.photo}
            style={{
              color: "#717171",
              fontSize: "100%",
              fontFamily: "Sora",
              fontWeight: "400",
            }}
          >
            Upload a photo
          </h4>
          <p className={classes.drag}
            style={{
              color: "#717171",
              fontSize: "90%",
              fontFamily: "Sora",
              fontWeight: "400",
            }}
          >
            Drag & drop or click to{" "}
            <a style={{ textDecoration: "underline" }}>select</a>
          </p>
          <p style={{ marginTop: "15%", fontSize: "75%", color: "#A7A7A7", fontFamily: "Sora",
              fontWeight: "400",}} className={classes.only}>
            only .jpeg and .png formats not exceeding 100 MB
          </p>
      </div>
     
    </div>
    </div>


   
  );
}
<StyledDropzone />;
export default StyledDropzone;