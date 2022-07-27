import React from 'react';

import classes from './notification.module.css';

const Notification = ({reportName, reportStatus, date, readStatus}) => {
    return (
        <div className={`${classes.notification} ${readStatus ?  '' : classes.notRead }`}>
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
