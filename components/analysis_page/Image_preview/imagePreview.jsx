import React, { Component } from "react";
import classes from "./imagePreview.module.css";
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

      // }
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

      const X_CENTER_NORM = geometry.x;
      const Y_CENTER_NORM = geometry.y;
      const WIDTH_NORM = geometry.width;
      const HEIGHT_NORM = geometry.height;

      //Label_ID_1 X_CENTER_NORM Y_CENTER_NORM WIDTH_NORM HEIGHT_NORM
      const Label_ID_1 = `LABEL_ID_${X_CENTER_NORM}_${Y_CENTER_NORM}_${WIDTH_NORM}_${HEIGHT_NORM}`;
      const TEXT = data.text.trim();

      // console.log('repoData', this.props.reportData)
      console.log('Annotation', annotation)
      // let Annotations = this.props.reportData[this.props.currentIndex].objects_confidence.map((item, i) => {
      //   let text = Object.keys(item)[1];
      //   console.log('text', text)
      //   return {
      //     X_CENTER_NORM: item.cordinates.x,
      //     Y_CENTER_NORM: item.cordinates.y,
      //     WIDTH_NORM: item.cordinates.w,
      //     HEIGHT_NORM: item.cordinates.h,
      //     Label_ID_1: Math.random() + i,
      //     TEXT: text
      //   }
      // });

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
      this.props.reportData[this.props.currentIndex].objects_confidence.push(obj1);

      this.props.setUpdatedReportData(this.props.reportData);

    console.log(this.props.reportData)


      // if (!Annotations) {
      //   // this.props.reportData[this.props.currentIndex]['annotations'] = [{
      //   //   X_CENTER_NORM: X_CENTER_NORM,
      //   //   Y_CENTER_NORM: Y_CENTER_NORM,
      //   //   WIDTH_NORM: WIDTH_NORM,
      //   //   HEIGHT_NORM: HEIGHT_NORM,
      //   //   Label_ID_1,
      //   //   TEXT,
      //   // }];

      //   // this.props.reportData.data[this.props.currentIndex].objects_count++;


      //   // let obj = new Object();
      //   // obj['detect'] = 0;
      //   // // obj[value] = 0;
      //   // this.props.reportData[this.props.currentIndex].objects_confidence.push(obj);

      //   // console.log('Yo', this.props.reportData)
      //   // this.props.setUpdatedReportData(this.props.reportData)
      // } else {
      //   console.log('ann', Annotation)
      //   // Annotations.push({
      //   //   X_CENTER_NORM: X_CENTER_NORM,
      //   //   Y_CENTER_NORM: Y_CENTER_NORM,
      //   //   WIDTH_NORM: WIDTH_NORM,
      //   //   HEIGHT_NORM: HEIGHT_NORM,
      //   //   Label_ID_1,
      //   //   TEXT,
      //   // })

      //   // this.props.reportData.data[this.props.currentIndex].objects_count = ++this.props.reportData.data[this.props.currentIndex].objects_count;
      //   // this.props.reportData[this.props.currentIndex].objects_count++;
      //   let obj = new Object();
      //   obj[TEXT] = 0;
      //   let obj1 = {
      //     "coordinates": {
      //       "x": X_CENTER_NORM,
      //       "y": Y_CENTER_NORM,
      //       "w": WIDTH_NORM,
      //       "h": HEIGHT_NORM
      //     },
      //     ...obj
      //   }
      //   this.props.reportData[this.props.currentIndex].objects_confidence.push(obj1);

      //   this.props.setUpdatedReportData(this.props.reportData);

      // }
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
      const randomColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
      document.querySelectorAll('.yvPWU')[document.querySelectorAll('.yvPWU').length - 1].style.outline = `2px solid ${randomColor}`;
    }, 10)
  };

  componentDidMount() {
    console.log('report data', this.props.reportData)
    // let Annotations = this.props.reportData.data[this.props.currentIndex].annotations;
    let image = new Image();
    image.src = this.props.galleryItems[this.props.currentIndex];
    
    image.onload = () => {
      // document.querySelector('.annotationBoxContainer').children[0].children[0].width = image.width;
      // document.querySelector('.annotationBoxContainer').children[0].children[0].height = image.height;
      
      let Annotations = this.props.reportData[this.props.currentIndex].objects_confidence.map((item, i) => {
        let text = item.detect;
        console.log('text', text);
        // document.querySelector('.lmGPCf').style.width = image.width + 'px';
        // document.querySelector('.lmGPCf').style.height = image.height + 'px';
        // X_CENTER_NORM: item.cordinates.x / (image.width),
        // Y_CENTER_NORM: item.cordinates.y  / image.height,
        // WIDTH_NORM: item.cordinates.w  / image.width,
        // HEIGHT_NORM: item.cordinates.h  / image.height,
        // Label_ID_1: Math.random() + i,
        // TEXT: text

        console.log(item, 'itemdjlk', image.width, image.height)
        return {
          X_CENTER_NORM: item.cordinates.x / 4.3,
          Y_CENTER_NORM: item.cordinates.y / 4.5,
          WIDTH_NORM: item.cordinates.w / 20,
          HEIGHT_NORM: item.cordinates.h / 7,
          Label_ID_1: Math.random() + i,
          TEXT: text
        }
      });
      
      if (Annotations) {
        const img = new Image();
        img.src = this.props.galleryItems[this.props.currentIndex];
        let ths = this;

        img.onload = (e) => {
          let height1 = e.target.height;
          let width1 = e.target.width;
          let annotationArray = [];

          for (let i = 0; i < Annotations.length; i++) {
            let { X_CENTER_NORM, Y_CENTER_NORM, WIDTH_NORM, HEIGHT_NORM, Label_ID_1, TEXT } = Annotations[i];
            console.log('norm', X_CENTER_NORM, Y_CENTER_NORM, WIDTH_NORM, HEIGHT_NORM)
            annotationArray.push(
              {
                geometry: {
                  type: 'RECTANGLE',
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
              alt="Bacteria detected"
              annotations={this.state.annotations}
              type={this.state.type}
              // value={this.state.annotation}
              value={this.state.annotation}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              // style={{ width: 'fit-content', margin: 'auto' }}
            />

          </div>
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
