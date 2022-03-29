
import Footer from "../components/Footer"
import HeaderApp from "../components/HeaderApp"
import LoginForm from "../components/LoginForm"
import getTabs from "../components/tab"

import Tabs from 'react-responsive-tabs';




export default function ge(){
 
     return(
         <>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet"/>
         <HeaderApp>
         </HeaderApp>
{/* <BasicTabs/> */}
<div style={{
                marginTop:"2%",
                fontWeight: "700",
                fontFamily: "Sora",
                fontSize: "110%",
                
                marginLeft:"10%",
              }}>
         <Tabs items={getTabs()}   selectedTabKey={0}  />
      
              </div>

    
         </>
     )
 }