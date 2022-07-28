import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from '../../redux/dataAction';

import classes from './notification.module.css';

const Notification = ({id, reportName, reportStatus, date, readStatus}) => {

    const notifications = useSelector(state => state.userdata.notification);
    const dispatch = useDispatch();

    function notificationClickHanlder(){
        const modNotifications = [...notifications];
        modNotifications.forEach(item => {
            if(item.id === id){
                item.checked = true;
            }
        })
        dispatch(setNotification(modNotifications))
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
