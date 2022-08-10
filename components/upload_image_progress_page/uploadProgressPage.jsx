import React from 'react';
import Header from '../Header/HeaderConditional';
import CustomProgressBar from './customProgressBar';

import classes from './uploadProgressPage.module.css';


const UploadProgressPage = ({ progress, pageTitle }) => {
    return (
        <>
            <Header headerWithSignout={true} />

            <div className={classes.PageMainContainer}>
                <div className={classes.pageTitle}>
                    <p>{pageTitle || "Uploading"}</p>
                </div>
                <div className={classes.progressContainer}>
                    <p className={classes.progressCount}>
                        {progress}%
                    </p>
                    {/* <CustomProgressBar color={(progress < 51) ? '#5FA5FA' : '#5cf1c2'} progress={progress} /> */}
                    <CustomProgressBar color={`rgb(0,${progress+150},${255 - (progress - 0)})`} progress={progress} />
                    <p className={classes.pageHint}>Please wait while the application is loading...</p>
                </div>
            </div>
        </>
    );
}

export default UploadProgressPage;
