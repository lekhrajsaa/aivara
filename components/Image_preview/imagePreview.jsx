import React, { Component } from "react";
import classes from "./imagePreview.module.css";
import Test from "../test";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Annotation from "react-image-annotation";

export default class ImagePreview extends Component {
  state = {
    annotations: [
      {
        geometry: {
          type: "RECTANGLE",
          x: 27.666907950415805,
          y: 21.199999722567473,
          width: 16.60014477024948,
          height: 25.818181818181817,
        },
        data: {
          text: "Demo1",
          id: Math.random(),
        },
      },
      {geometry: {
        type: "RECTANGLE",
        x: 67.94266903233257,
        y: 13.9272724498402,
        width: 9.796806749655431,
        height: 31.272727272727277,
      },
      data:{
        text: "Demo2",
        id: Math.random(),
      }
    },
    ],
    annotation: {},
  };

  onChange = (annotation) => {
    this.setState({ annotation });
  };

  onSubmit = (annotation) => {
    const { geometry, data } = annotation;
    console.log(geometry);
    console.log(data);
    let height1;
    let width1;
    const img = new Image();
    img.src = this.props.galleryItems[this.props.currentIndex];

    img.onload = function() {
      height1 = this.height;
      width1 = this.width;

      const X_CENTER_NORM = geometry.x / width1;
      const Y_CENTER_NORM = geometry.y / height1;
      const WIDTH_NORM = geometry.width / width1;
      const HEIGHT_NORM = geometry.height / height1;
      const Label_ID_1 = data.text;

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
  };

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
            value={this.state.annotation}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
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
