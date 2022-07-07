import React from 'react';
import cls from './backdrop_buffer.module.css';

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
