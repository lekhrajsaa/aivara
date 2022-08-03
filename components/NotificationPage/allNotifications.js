import React from 'react'
import classes from "./allnotifications.module.css"
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from '../../redux/dataAction';
import { useRouter } from 'next/router';
import { style } from '@mui/system';

const allNotifications = ({ id ,key,data, dateMacker, timeMacker,checkNotificationsHandler}) => {

  const notifications = useSelector(state => state.userdata.notification);
  const dispatch = useDispatch();

  const router = useRouter();






  // console.log('not', data)
  function notificationClickHanlder(id) {
    
    const modNotifications = [...notifications];
    modNotifications.forEach(item => {
      if (item.id === id) {
        checkNotificationsHandler([id])
        item.checked = true;
      }
    })
    dispatch(setNotification(modNotifications))
    // setShowNotificationBox(false)
    // console.log("hello")
    router.push('/reports')
  }
  // console.log("hello",data)
  
  return (
    <>

      <h1 className={classes.notifi_heading}>Notifications 
        {notifications && !(notifications?.filter(notif => notif.checked === false).length < 1) && <span className={classes.notificationDot} style={{ width: "10px", height: "10px", backgroundColor: "blue", borderRadius: "50%", display: "inline-block" }}></span> }
</h1>
      <section className={classes.notificationBox} >
        {/* <div onClick={notificationClickHanlder} className={`${classes.notification} ${readStatus ? ''  : classes.notRead  }`}> */}
       {
            data?.length > 0
              ?
              data.map((item) => (
                
                <div onClick={() => { notificationClickHanlder(item.id)}} className={`${classes.notificationRow} ${item.checked ? '' : classes.notRead}`} id={item.id}>
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
              <p style={{ color: '#ccc', textAlign: 'center', margin: '15% 0',fontSize:"35px" }}>No Notifications to show.</p>
          }
       
        {/* </div> */}
      </section>
    </>

  )
}

export default allNotifications