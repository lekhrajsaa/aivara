import React from 'react'
import Header from '../header/HeaderConditional'
import Sidebar from '../SideBar/SideBar'
import axios from 'axios'
import { useEffect } from 'react'
import { setNotification, setSocketConn } from '../../redux/dataAction';
import { useSelector, useDispatch } from 'react-redux';
import AllNotifications from '../NotificationPage/allNotifications'
const notificationsPage = () => {

  const X_API_KEY = process.env.NEXT_PUBLIC_XAPI;
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API;
  const dispatch = useDispatch();

  const notifications = useSelector((state) => {
    // console.log(state)
    console.log(state.userdata.notification)
    return state.userdata.notification;
  });

 
  const fetchNotification = async () => {
    const token = localStorage.getItem('token');

    var data = JSON.stringify({
      query: `{
            getNotification{
                notifications{
                    clientName
                    id
                    reportId
                    reportStatus
                    customTimeStamp
                    checked
                }
                status
            }
        }`,
      variables: {}
    });

    var config = {
      method: 'post',
      url: `${SERVER_URL}api/v1`,
      headers: {
        'x-api-key': X_API_KEY,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const response = await axios(config);
      console.log(response.data.data.getNotification.notifications)
      dispatch(setNotification(response.data.data.getNotification.notifications.sort(function (a, b) { return b.customTimeStamp - a.customTimeStamp })))
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    fetchNotification();
  }, [])


  const checkNotificationsHandler = async (ids) => {
    const token = localStorage.getItem('token')

    if (ids.length > 0 && token) {
      let temp = JSON.stringify(ids)

      var data = JSON.stringify({
        query: `mutation{
                  checkNotification(idInput:${temp}){
                      message 
                  }
              }`,
        variables: {}
      });

      var config = {
        method: 'post',
        url: `${SERVER_URL}api/v1`,
        headers: {
          'x-api-key': X_API_KEY,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: data
      };

      try {
        const response = await axios(config);
        console.log(response);
        
      } catch (error) {
        console.log(error)
      }
    }
  }

  const timeMacker = (timeStamp) => {
    if (timeStamp) {
      const newDate = new Date(timeStamp);

      const h = parseInt(newDate.getHours() / 10) === 0 ? `0${newDate.getHours()}` : `${newDate.getHours()}`
      const m = parseInt(newDate.getMinutes() / 10) === 0 ? `0${newDate.getMinutes()}` : `${newDate.getMinutes()}`

      return `${h}:${m}`
    }
  }

  const dateMacker = (timeStamp) => {
    if (timeStamp) {
      const newDate = new Date(timeStamp);

      return `${newDate.getDate()}/${newDate.getMonth() + 1}/${JSON.stringify(newDate.getFullYear()).slice(2, 4)}`
    }
  }


  // function viewAllClickHandler() {
  //   let uncheckedIds = notifications.map(item => item.id);
  //   checkNotificationsHandler(uncheckedIds);

  //   const modNotifications = [...notifications];
  //   modNotifications.forEach(item => {
  //     item.checked = true;
  //   })
  //   dispatch(setNotification(modNotifications))
    
  // }

  return (
    <>
      <Header headerWithSignout={true} />
      <Sidebar />
  
      <AllNotifications 
        // key={notifications.id}
        // id={notifications.id}
      data={notifications}
      timeMacker={timeMacker}
      dateMacker={dateMacker}
     
        checkNotificationsHandler={checkNotificationsHandler}
        // setShowNotificationBox={setShowNotificationBox}

    />
    </>
  )
}

export default notificationsPage