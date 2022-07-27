import React, { Component } from "react";
import Annotation from "react-image-annotation";

export default class Test extends Component {
  state = {
    annotations: [],
    annotation: {
      type: "RECTANGLE",
      x: 27.666907950415805,
      y: 21.199999722567473,
      width: 16.60014477024948,
      height: 25.818181818181817,
      text: 'fdgf',
    },
  };

  onChange = (annotation) => {
    this.setState({ annotation });
  };

  onSubmit = (annotation) => {
    const { geometry, data } = annotation;

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
      <Annotation
        src={"https://picsum.photos/seed/picsum/200/300"}
        alt="Two pebbles anthropomorphized holding hands"
        annotations={this.state.annotations}
        type={this.state.type}
        value={this.state.annotation}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}
