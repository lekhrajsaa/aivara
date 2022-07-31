import React, { Component } from "react";
import classes from "./imagePreview.module.css";
import Test from "../test";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Annotation from "react-image-annotation";

export default class ImagePreview extends Component {
  state = {
    annotations: [
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

      // },
      // {
      //   geometry: {
      //     type: "RECTANGLE",
      //     x: 67.94266903233257,
      //     y: 13.9272724498402,
      //     width: 9.796806749655431,
      //     height: 31.272727272727277,
      //   },
      //   data: {
      //     text: "Demo2",
      //     id: Math.random(),
      //   }
      // },
    ],
    annotation: {},
  };

  onChange = (annotation) => {
    this.setState({ annotation });
  };

  onSubmit = (annotation) => {
    const { geometry, data } = annotation;
    // console.log(geometry);
    console.log('dta', data);
    let height1;
    let width1;
    const img = new Image();
    img.src = this.props.galleryItems[this.props.currentIndex];

    img.onload = (e) => {
      height1 = e.target.height;
      width1 = e.target.width;
      console.log('imgHeight', height1, width1)

      const X_CENTER_NORM = geometry.x / width1;
      const Y_CENTER_NORM = geometry.y / height1;
      const WIDTH_NORM = geometry.width / width1;
      const HEIGHT_NORM = geometry.height / height1;
      //Label_ID_1 X_CENTER_NORM Y_CENTER_NORM WIDTH_NORM HEIGHT_NORM
      const Label_ID_1 = `LABEL_ID_${X_CENTER_NORM}_${Y_CENTER_NORM}_${WIDTH_NORM}_${HEIGHT_NORM}`;
      const TEXT = data.text;

      // console.log('repoData', this.props.reportData)
      console.log('Annotation', annotation)
      let Annotations = this.props.reportData.data[this.props.currentIndex].annotations;
      if (!Annotations) {

        this.props.reportData.data[this.props.currentIndex]['annotations'] = [{
          X_CENTER_NORM: X_CENTER_NORM,
          Y_CENTER_NORM: Y_CENTER_NORM,
          // x: X_CENTER_NORM * width1,
          // y: Y_CENTER_NORM * height1,
          WIDTH_NORM: WIDTH_NORM,
          HEIGHT_NORM: HEIGHT_NORM,
          Label_ID_1,
          TEXT,
        }]
      } else {
        console.log('ann', Annotation)
        Annotations.push({
          X_CENTER_NORM: X_CENTER_NORM,
          Y_CENTER_NORM: Y_CENTER_NORM,
          WIDTH_NORM: WIDTH_NORM,
          HEIGHT_NORM: HEIGHT_NORM,
          Label_ID_1,
          TEXT,
        })
      }
      console.log(this.props.reportData)

      // console.log(Label_ID_1,X_CENTER_NORM,Y_CENTER_NORM,WIDTH_NORM,HEIGHT_NORM);
    };

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
    // console.log(annotations);

    setTimeout(() => {
      // Array.from(document.querySelectorAll('.yvPWU')).forEach((rec, i) => {
      //   if(i === Array.from(document.querySelectorAll('.yvPWU')).length - 1){
      //     const randomColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
      //     rec.style.outline = `2px solid ${randomColor}`;
      //   }
      // });
      const randomColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
      document.querySelectorAll('.yvPWU')[document.querySelectorAll('.yvPWU').length - 1].style.outline = `2px solid ${randomColor}`;
    }, 10)
  };

  componentDidMount() {
    console.log('report data', this.props.reportData)
    let Annotations = this.props.reportData.data[this.props.currentIndex].annotations;
    if (Annotations) {
      // xN: X_CENTER_NORM,
      // yN: Y_CENTER_NORM,
      // // x: X_CENTER_NORM * width1,
      // // y: Y_CENTER_NORM * height1,
      // height: HEIGHT_NORM,
      // width: WIDTH_NORM,
      // data: {
      //   id: Label_ID_1,
      //   text: TEXT
      // }

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
      const img = new Image();
      img.src = this.props.galleryItems[this.props.currentIndex];



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
                x: X_CENTER_NORM * width1,
                y: Y_CENTER_NORM * height1,
                width: WIDTH_NORM * width1,
                height: HEIGHT_NORM * height1,
              },
              data: {
                text: TEXT || 'test',
                id: Label_ID_1
              }
            })
        }

        this.setState({
          annotation: { ...this.state.annotation },
          annotations: annotationArray
        })
      }
      setTimeout(() => {
        Array.from(document.querySelectorAll('.yvPWU')).forEach((rec) => {
          const randomColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
          rec.style.outline = `2px solid ${randomColor}`;
        });
      }, 10)
    }

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

          <Annotation
            src={this.props.galleryItems[this.props.currentIndex]}
            alt="Two pebbles anthropomorphized holding hands"
            annotations={this.state.annotations}
            type={this.state.type}
            // value={this.state.annotation}
            value={this.state.annotation}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            style={{ width: 'fit-content', margin: 'auto' }}
          />


          <a
            className="button"
            href={this.props.galleryItems[this.props.currentIndex]}
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
    );
  }
}
