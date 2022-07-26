import React from 'react';
import classes from './customProgressBar.module.css';

const CustomProgressBar = ({color, progress}) => {
    return (
        <div className={classes.progressBar}>
            <div style={{backgroundColor: `${color}`, width: `${progress}%`}} className={classes.progress}></div>
        </div>
    );
}

export default CustomProgressBar;
