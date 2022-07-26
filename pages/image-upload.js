import React, {useState, useEffect} from 'react';
import UploadProgressPage from '../components/upload_image_progress_page/uploadProgressPage';

const ImageUpload = () => {
    const [progress, setprogress] = useState(0);

    useEffect(() => {
        const timeout = setInterval((e) => {
            setprogress(prv => prv+1)
            // setprogress(prv => prv+10)
        },100)
        setTimeout(() => {
            clearInterval(timeout)
        }, 10000)
        return () => {
            clearInterval(timeout)
        };
    }, []);

    return (
        <div>
            <UploadProgressPage progress={progress} />
        </div>
    );
}

export default ImageUpload;
