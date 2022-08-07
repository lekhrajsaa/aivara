import React from 'react'
import Header from '../Header/HeaderConditional'
import Sidebar from '../SideBar/SideBar'
import axios from 'axios'
import { useEffect } from 'react'
import { setNotification, setSocketConn } from '../../redux/dataAction';
import { useSelector, useDispatch } from 'react-redux';
import AllNotifications from '../NotificationPage/allNotifications'

const NotificationsPage = () => {
  //essential credential for fetching data
  const X_API_KEY = process.env.NEXT_PUBLIC_XAPI;
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API;

  const dispatch = useDispatch();

  //fetching data from redux
  const notifications = useSelector((state) => {
    // console.log(state)
    console.log(state.userdata.notification)
    return state.userdata.notification;
  });

  //feching Notifications from server
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

    //header configration for fetcing notifications data
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


  // request for updating notification status in database
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

  //convrting timestap into custom time
  const timeMacker = (timeStamp) => {
    if (timeStamp) {
      const newDate = new Date(timeStamp);

      const h = parseInt(newDate.getHours() / 10) === 0 ? `0${newDate.getHours()}` : `${newDate.getHours()}`
      const m = parseInt(newDate.getMinutes() / 10) === 0 ? `0${newDate.getMinutes()}` : `${newDate.getMinutes()}`

      return `${h}:${m}`
    }
  }
  //convrting timestap into custom date
  const dateMacker = (timeStamp) => {
    if (timeStamp) {
      const newDate = new Date(timeStamp);

      return `${newDate.getDate()}/${newDate.getMonth() + 1}/${JSON.stringify(newDate.getFullYear()).slice(2, 4)}`
    }
  }

  // custom day maker
  const todaay = new Date();
  const ONE_DAYIN_MS = 86400000;
  const TODAY_IN_MS = new Date(
    `${todaay.getFullYear()}-${todaay.getMonth() + 1}-${todaay.getDate()}`
  ).getTime(); // at 12am
  const NEXT_DAT_IN_MS = TODAY_IN_MS + ONE_DAYIN_MS - 1; //today at 11.59.00

  const timestampConverter = (stamp) => {

    // today
    if (stamp < NEXT_DAT_IN_MS && stamp > TODAY_IN_MS) { console.log("its today"); return `${timeMacker(stamp)+","+"today"}`; };

    // yesterday
    if (stamp < TODAY_IN_MS && stamp > TODAY_IN_MS - ONE_DAYIN_MS) { console.log("its yester day"); return `${timeMacker(stamp) + "," + "Yesterday"}`; };
    
    // custom 30days
    if (stamp < TODAY_IN_MS - ONE_DAYIN_MS && stamp > TODAY_IN_MS - 30 * ONE_DAYIN_MS) {
      console.log(`its ${Math.floor((TODAY_IN_MS - stamp) / ONE_DAYIN_MS) + 1} days ago`);
      return `${Math.floor((TODAY_IN_MS - stamp) / ONE_DAYIN_MS) + 1} days ago`;
    };

    // beyond 30 days
    return `${timeMacker(stamp)} , ${dateMacker(stamp)}`
  }


  return (
    <>
      <Header headerWithSignout={true} />
      <Sidebar />
      {/* passing data as props */}
      <AllNotifications
        data={notifications}
        timeMacker={timeMacker}
        dateMacker={dateMacker}
        checkNotificationsHandler={checkNotificationsHandler}
        timestampConverter={timestampConverter}

      />
    </>
  )
}

export default NotificationsPage