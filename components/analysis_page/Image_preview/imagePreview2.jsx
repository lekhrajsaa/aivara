import { useState, useEffect } from 'react';

import Annotation from "react-image-annotation";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import classes from './imagePreview.module.css';

function ImagePreview({ galleryItems, currentIndex, setPreviewImage, reportData, setUpdatedReportData }) {
  const [annotations, setAnnotations] = useState([]);
  const [annotation, setAnnotation] = useState({});
  const [type, setType] = useState("RECTANGLE");

  useEffect(() => {
    console.log('report data', currentIndex, reportData)
    let Annotations = reportData[currentIndex].objects_confidence.map((item, i) => {
      let text = Object.keys(item)[0];
      console.log('text', text)
      return {
        X_CENTER_NORM: item.coordinates.x,
        Y_CENTER_NORM: item.coordinates.y,
        WIDTH_NORM: item.coordinates.w,
        HEIGHT_NORM: item.coordinates.h,
        Label_ID_1: Math.random() + i,
        TEXT: text
      }
    });
    if (Annotations) {
      const img = new Image();
      img.src = galleryItems[currentIndex];

      img.onload = (e) => {
        let height1 = e.target.height;
        let width1 = e.target.width;
        let annotationArray = [];

        for (let i = 0; i < Annotations.length; i++) {
          let { X_CENTER_NORM, Y_CENTER_NORM, WIDTH_NORM, HEIGHT_NORM, Label_ID_1, TEXT } = Annotations[i];
          annotationArray.push(
            {
              geometry: {
                type: "RECTANGLE",
                // x: X_CENTER_NORM * width1,
                // y: Y_CENTER_NORM * height1,
                // width: WIDTH_NORM * width1,
                // height: HEIGHT_NORM * height1,
                x: X_CENTER_NORM,
                y: Y_CENTER_NORM,
                width: WIDTH_NORM,
                height: HEIGHT_NORM,
              },
              data: {
                text: TEXT || 'test',
                id: Label_ID_1
              }
            })
        }
        setAnnotations(annotationArray)
      }
      setTimeout(() => {
        Array.from(document.querySelectorAll('.yvPWU')).forEach((rec) => {
          const randomColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
          rec.style.outline = `2px solid ${randomColor}`;
        });
      }, 10)
    }
  }, [])

  function annotationSubmitHandler() {

  }

  return (
    <div className={classes.backdrop}>
      <div className={classes.image_modal}>
        <p className={classes.image_modal_analysis}>Analysis</p>
        <p
          className={classes.image_modal_close}
          onClick={() => setPreviewImage(false)}
        >
          Close
        </p>

        <Annotation
          src={galleryItems[currentIndex]}
          alt="Two pebbles anthropomorphized holding hands"
          annotations={annotations}
          type={type}
          value={setAnnotation}
          // onChange={onChange}
          onSubmit={annotationSubmitHandler}
          style={{ width: 'fit-content', margin: 'auto' }}
        />


        <a
          className="button"
          href={galleryItems[currentIndex]}
          target={"_blank"}
          download
        >
          <p className={classes.image_modal_download}>
            <FileDownloadOutlinedIcon />
            Download
          </p>
        </a>
      </div>
    </div>
  )
}

export default ImagePreview;