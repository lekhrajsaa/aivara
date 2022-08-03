import React, { useRef, useEffect, useState } from 'react';

import classes from './notificationBox.module.css';
import Notification from './notification';

import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { setNotification, setSocketConn } from '../../redux/dataAction';
import {useRouter} from 'next/router';

const X_API_KEY = process.env.NEXT_PUBLIC_XAPI;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API;

import io from 'socket.io-client';

const SOCKET_URL = "https://socket.aivara.in";

    

const NotificationBox = ({ setShowNotificationBox }) => {
    
    // const socket_conn = useSelector((state) => state.userdata.socket_conn);
    const dispatch = useDispatch();

    const socket = io(SOCKET_URL);

    useEffect(() => {
        socket.on('test api', (data) => {
            console.log(data)
        })

        socket.on('report data', (data) => {
            console.log(data)
        })
    }, [socket])

    const notifications = useSelector((state) => {
        console.log(state)
        return state.userdata.notification;
    });

    const notificationBox = useRef();
    // useEffect(() => {
    //     setTimeout(() => {
    //         notificationBox.current.focus();
    //     }, 10)
    // }, []);

    function blurHanlder() {
        setShowNotificationBox(false);
    }

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
            // setNotifications(response.data.data.getNotification.notifications.sort(function(a, b){return b.customTimeStamp-a.customTimeStamp}))
            // dispatch(setSocketConn(true)); //socket connection on
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // dispatch(setSocketConn(false)); // socket connection off

        fetchNotification();
    }, [])

    //
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
                // dispatch(setNotification());
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
const router = useRouter();

    function viewAllClickHandler() {
        let uncheckedIds = notifications.map(item => item.id);
        checkNotificationsHandler(uncheckedIds);

        const modNotifications = [...notifications];
        modNotifications.forEach(item => {
            item.checked = true;
        })
        dispatch(setNotification(modNotifications))
       router.push("/notificationspage")
    }

    return (
        <div
            tabIndex={0}
            ref={notificationBox}
            // onBlur={blurHanlder}
            className={classes.mainContainer}
        >
            <div className={classes.triangle}></div>
            <div className={classes.notificationBox}>
                <h5 className={classes.notificationHeading}>Notifications</h5>
                <div className={classes.notificationContainer}>
                    {
                        notifications?.length > 0
                            ?
                            notifications.map((item) => (
                                <Notification
                                      key={item.id}
                                    id={item.id}
                                    reportName={item.clientName}
                                    reportStatus={item.reportStatus}
                                    date={{
                                        date: dateMacker(item.customTimeStamp),
                                        time: timeMacker(item.customTimeStamp)
                                    }}
                                    readStatus={item.checked}
                                    checkNotificationsHandler={checkNotificationsHandler}
                                    setShowNotificationBox={setShowNotificationBox}
                                />))
                            :
                            <p style={{ color: '#ccc', textAlign: 'center', margin: '28px 0' }}>No Notifications to show.</p>
                    }
                </div>
                <button className={classes.viewAllBtn} onClick={viewAllClickHandler}>   View All  </button> 
            </div>
        </div>
    );
}

export default NotificationBox;
