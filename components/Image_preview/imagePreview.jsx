import React from 'react';
import classes from './imagePreview.module.css';
import Test from '../test';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const ImagePreview = ({ galleryItems, currentIndex, setPreviewImage }) => {

    console.log(galleryItems[currentIndex])
    return (
        <div className={classes.backdrop}>

            <div className={classes.image_modal}>
                <p
                    className={classes.image_modal_close}
                    onClick={() => setPreviewImage(false)}
                >
                    Close
                </p>

                {/* <figure>
                    <img src={galleryItems[currentIndex]} />
                </figure> */}
                <Test imageurl={galleryItems[currentIndex]} />

                {/* <img src={galleryItems[currentIndex]} /> */}

                <a className="button" href={galleryItems[currentIndex]} download>
                    <p className={classes.image_modal_download}>
                        <FileDownloadOutlinedIcon />
                        Download
                    </p>
                </a>
            </div>
        </div>
    );
}

export default ImagePreview;
