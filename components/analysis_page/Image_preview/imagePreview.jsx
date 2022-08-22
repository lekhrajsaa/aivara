import React, { Component } from "react";
import classes from "./imagePreview.module.css";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Annotation from "react-image-annotation";

export default class ImagePreview extends Component {
  state = {
    annotations: [
      //This is left commented here to understand the structure anotation object
      // {
      //   geometry: {
      //     type: "RECTANGLE",
      //     x: 27.666907950415805,
      //     y: 21.199999722567473,
      //     width: 16.60014477024948,
      //     height: 25.818181818181817,
      //   },
      //   container: '',
      //   data: {
      //     text: "Demo1",
      //     id: Math.random(),
      //   },
      // }
    ],
    annotation: {},
    activeAnnotations: [],
  };

  onChange = (annotation) => {
    this.setState({ annotation });
  };

  //Runs when we annotate and submit the annotaion
  onSubmit = (annotation) => {
    const { geometry, data } = annotation;

    //Converting x,y,w,h(in %) came from Annotion from to x1, y1, x2, y2(in px) and to relative an 416x416 image (see comments on componetDidMount function)
    const X_CENTER_NORM = ((geometry.x * 416) / 100);
    const Y_CENTER_NORM = ((geometry.y * 416) / 100);
    const WIDTH_NORM = (((geometry.width + geometry.x) * 416) / 100);
    const HEIGHT_NORM = (((geometry.height + geometry.y) * 416) / 100);
    const TEXT = data.text.trim();

    //createing the object as the object structure of report data
    let obj = new Object();
    obj['detect'] = TEXT;
    obj['value'] = 0;
    let obj1 = {
      "cordinates": {
        "x": X_CENTER_NORM,
        "y": Y_CENTER_NORM,
        "w": WIDTH_NORM,
        "h": HEIGHT_NORM
      },
      ...obj
    }



    //Logic for checking if the diatom already in the annotations
    let currentDiatomCount = 0;
    let alreadyHasOne = false; //detected diatom

    let object_confidence = this.props.reportData[this.props.currentIndex].objects_confidence;

    //looping through also diatom objets in object_confidence
    for (let i = 0; i < object_confidence.length; i++) {
      let item = object_confidence[i];

      //if annotation text is matched to new annotation text
      if (item.detect === TEXT) {
        currentDiatomCount = this.props.reportData[this.props.currentIndex].objects_count_custom.values[i] + 1;
        this.props.reportData[this.props.currentIndex].objects_count[TEXT] = currentDiatomCount;
        this.props.reportData[this.props.currentIndex].objects_count_custom.values[i] = currentDiatomCount;
        alreadyHasOne = true;
        break;
      } else {
        alreadyHasOne = false;
      }
    }

    if (!alreadyHasOne) {
      currentDiatomCount = 1;
      this.props.reportData[this.props.currentIndex].objects_count[TEXT] = 1;
      this.props.reportData[this.props.currentIndex].objects_count_custom.detects.push(TEXT);
      this.props.reportData[this.props.currentIndex].objects_count_custom.values.push(currentDiatomCount);
    }

    this.props.reportData[this.props.currentIndex].objects_confidence.push(obj1);
    this.props.setUpdatedReportData(this.props.reportData);

    //setting the states of annotaions
    this.setState({
      annotation: {},
      annotations: this.state.annotations.concat({
        geometry,
        data: {
          ...data,
          id: Math.random(),
        },
      }),
    });

    //Changing the color of annotation rectangle to a random color
    setTimeout(() => {
      const randomColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
      document.querySelectorAll('.yvPWU')[document.querySelectorAll('.yvPWU').length - 1].style.outline = `2px solid ${randomColor}`;
    }, 10)
  };

  componentDidMount() {
    //looping through object_confidence to get the data and convert it to the structure of annotation object
    let Annotations = this.props.reportData[this.props.currentIndex].objects_confidence.map((item, i) => {
      let text = item.detect;
      return {
        //Here we are converting the cordinates(x1 y1 x2 y2) sent from Ai to x,y,w,h(in %)
        //The ai sents the cordinate according after convrting images into 416x416 width height
        //tha'ts why its 416-----------------V   here
        X_CENTER_NORM: ((item.cordinates.x / 416) * 100),
        Y_CENTER_NORM: ((item.cordinates.y / 416) * 100),
        WIDTH_NORM: (((item.cordinates.w - item.cordinates.x) / 416) * 100),
        HEIGHT_NORM: (((item.cordinates.h - item.cordinates.y) / 416) * 100),
        Label_ID_1: Math.random() + i,
        TEXT: text
      }
    });

    if (Annotations) {
      let annotationArray = [];

      for (let i = 0; i < Annotations.length; i++) {
        let { X_CENTER_NORM, Y_CENTER_NORM, WIDTH_NORM, HEIGHT_NORM, Label_ID_1, TEXT } = Annotations[i];

        let x = X_CENTER_NORM;
        let y = Y_CENTER_NORM;
        let w = WIDTH_NORM;
        let h = HEIGHT_NORM;

        annotationArray.push(
          {
            geometry: {
              type: 'RECTANGLE',
              x: x,
              y: y,
              width: w,
              height: h,
            },
            data: {
              text: TEXT,
              id: Label_ID_1
            }
          }
        )
      }

      //setting the annotions
      this.setState({
        annotation: { ...this.state.annotation },
        annotations: annotationArray
      })

      //Changing the color of annotation rectangle to a random color
      setTimeout(() => {
        Array.from(document.querySelectorAll('.yvPWU')).forEach((rec) => {
          const randomColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
          rec.style.outline = `2px solid ${randomColor}`;
        });
      }, 10)
    }

  }

  //for make the annotation text visible
  activeAnnotationComparator = (a, b) => {
    return a.data.id === b
  }

  render() {
    return (
      <div className={classes.backdrop}>
        <div className={classes.image_modal}>
          <p className={classes.image_modal_analysis}>Analysis</p>
          <p
            className={classes.image_modal_close}
            onClick={() => this.props.setPreviewImage(false)}
          >
            Close
          </p>

          <div className={classes.annotationBoxContainer}>

            <Annotation
              src={this.props.galleryItems[this.props.currentIndex]}
              alt="Sample image of water"
              annotations={this.state.annotations}
              type={this.state.type}
              value={this.state.annotation}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              // style={{ width: 'fit-content', margin: 'auto' }}
              style={{ ...this.props.style, margin: 'auto' }}
              activeAnnotationComparator={this.activeAnnotationComparator}
              activeAnnotations={this.state.activeAnnotations}
            />

          </div>
          <a
            className="button"
            href={this.props.galleryItems[this.props.currentIndex]}
            // target={"_blank"}
            download
          >
            <p
              className={classes.image_modal_download}
              onClick={() => {
                this.setState({
                  activeAnnotations: this.state.annotations.map(data => data.data.id)
                })
              }}
            >
              <FileDownloadOutlinedIcon />
              Download
            </p>
          </a>
        </div>
      </div>
    );
  }
};