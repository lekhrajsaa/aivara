
import { useEffect, useState } from "react";
import classes from "../components/Header.module.css";
import HeaderMobile from "../components/HeaderMobile";
import styles from "../components/LoginForm.module.css"
import { useRouter } from 'next/router'

export default function verify(){
  const[email,setemail] = useState();
  const route = useRouter();
  useEffect(()=>{
   setemail(localStorage.getItem('email'));
  },[])
return(<>
         <div className={classes.verifyEmail} >
             <div className={classes.verifyEmail_header}>
               <d ><img src="/Frame.svg" alt=""/></d> 
               <a className={classes.verifyEmail_backButton}  onClick={()=>route.push("/")}>Back</a>
             </div>
              <div className={classes.verifyEmail_headerMobile}>
         
           <HeaderMobile className={classes.logo}/>
           <div class={classes.back} style={{position:"absolute",
     top :"6%",
     left: "78%", textDecoration:"underline", color:"#818181"}}>
      <a onClick={()=>handleBack()}>back</a>
     </div>
              </div>
             <div className={classes.verifyEmail_content}>
                 <p className={classes.verifyEmail_text}>We have send an email to "{email}"</p>
                 <p className={classes.verifyEmail_resend}>resend</p>
               
             </div>
             
         </div>
       
       

</>)
}