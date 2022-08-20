import React from 'react';
import cls from './backdrop_buffer.module.css';

//Text to display when report Analysis is in process
const BackdropBuffer = ({bufferText}) => {
    return (
        <div className={cls.backdrop}>
            <div className={cls.model}>
                <div className={cls.bufferCircle} />
                <div className={cls.bufferText}>{bufferText}</div>
            </div>
        </div>
    );
}

export default BackdropBuffer;
