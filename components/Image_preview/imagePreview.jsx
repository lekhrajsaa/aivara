import React, { Component } from "react";
import classes from "./imagePreview.module.css";
import Test from "../test";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Annotation from "react-image-annotation";
// import {
//   PointSelector,
//   RectangleSelector,
//   OvalSelector,
// } from "react-image-annotation/lib/selectors";

export default class ImagePreview extends Component {
      
  state = {
    annotations: [],
    annotation: {},
    
    
  }

  onChange = (annotation) => {
    this.setState({ annotation });
  };


  onSubmit = (annotation) => {
    const img = new Image();
    img.src = this.props.galleryItems[this.props.currentIndex];

    img.onload = function() {
      console.log('ddd', this.width+'x', this.height+'y')
      alert(this.width + ' x ' + this.height);
    }
    
    const { geometry, data } = annotation;
    console.log(geometry);
    console.log(data);

    
    

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

