import React, { useRef, useEffect, useState } from 'react';

import classes from './notificationBox.module.css';
import Notification from './notification';

import axios from 'axios'

const X_API_KEY = process.env.NEXT_PUBLIC_XAPI;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API;

const NotificationBox = ({ setShowNotificationBox }) => {

    const [notifications, setNotifications] = useState([])

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
            // console.log(response.data.data.getNotification.notifications)
            setNotifications(response.data.data.getNotification.notifications.sort(function(a, b){return b.customTimeStamp-a.customTimeStamp}))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchNotification();
    }, [])

    //
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


    return (
        <div
            tabIndex={0}
            ref={notificationBox}
            onBlur={blurHanlder}
            className={classes.mainContainer}
        >
            <div className={classes.triangle}></div>
            <div className={classes.notificationBox}>
                <h5 className={classes.notificationHeading}>Notifications</h5>
                <div className={classes.notificationContainer}>
                    {
                        notifications.length > 0
                            ?
                            notifications.map((item) => (
                                <Notification
                                    key={ item.id }
                                    reportName={item.clientName}
                                    reportStatus={item.reportStatus}
                                    date={{
                                        date: dateMacker(item.customTimeStamp),
                                        time: timeMacker(item.customTimeStamp)
                                    }}
                                    readStatus={item.checked}
                                />))
                            :
                            null
                    }
                </div>
                <button className={classes.viewAllBtn} onClick={() => { fetchNotification(); console.log("clicked") }}>View All</button>
            </div>
        </div>
    );
}

export default NotificationBox;
