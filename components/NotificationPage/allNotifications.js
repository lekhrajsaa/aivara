import React from 'react'
import classes from "./allnotifications.module.css"



const allNotifications = ({data, dateMacker, timeMacker}) => {

  console.log('not', data)
  
  return (
    <>
    <h1 className={classes.notifi_heading}>Notifications</h1>
    <section className={classes.notificationBox}>
      
       {
            data?.length > 0
              ?
              data.map((item) => (
                
               <div className={classes.notificationRow} id={item.id}>
                  <div>
                    <span>{item.clientName}</span><br></br>
                    <span>{timeMacker(item.customTimeStamp)} ,{dateMacker(item.customTimeStamp)}</span>
                  </div>
                  <div>
                    {item.reportStatus}
                  </div>
                </div>
                ))
              :
              <p style={{ color: '#ccc', textAlign: 'center', margin: '15% 0',fontSize:"30px" }}>No Notifications to show.</p>
          }
       
     
      </section>
    </>

  )
}

export default allNotifications