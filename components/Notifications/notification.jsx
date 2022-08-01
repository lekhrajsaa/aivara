import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from '../../redux/dataAction';
import { useRouter } from 'next/router';
import classes from './notification.module.css';

const Notification = ({id, reportName, reportStatus, date, readStatus, checkNotificationsHandler, setShowNotificationBox}) => {

    const notifications = useSelector(state => state.userdata.notification);
    const dispatch = useDispatch();

    const router = useRouter();

    function notificationClickHanlder(){
        const modNotifications = [...notifications];
        modNotifications.forEach(item => {
            if(item.id === id){
                checkNotificationsHandler([id])
                item.checked = true;
            }
        })
        dispatch(setNotification(modNotifications))
        setShowNotificationBox(false)
        router.push('/reports')
    }

    return (
        <div onClick={notificationClickHanlder} className={`${classes.notification} ${readStatus ?  '' : classes.notRead }`}>
            <div>
                <div className={classes.reportName}>{reportName}</div>
                <div className={classes.reportStatus}>{reportStatus} </div>
            </div>
            <div className={classes.dateContainer}>
                <div className={classes.date}>{date.date}</div>
                <div className={classes.time}>{date.time}</div>
            </div>
        </div>
    );
}

export default Notification;
