
import Footer from "../components/Footer"
import HeaderApp from "../components/HeaderApp"
import LoginForm from "../components/LoginForm"
import getTabs from "../components/tab"

import Tabs from 'react-responsive-tabs';


import StyledDropzone from "../components/Upload"

export default function ge(){
 
     return(
         <>
       <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"/>
         <HeaderApp>
         </HeaderApp>
{/* <BasicTabs/> */}
<div style={{
                marginTop:"2%",
                fontWeight: "700",
                fontFamily: "Roboto",
                fontSize: "110%",
                
                marginLeft:"10%",
              }}>
         <Tabs items={getTabs()}     />
      
              </div>

    
         </>
     )
 }