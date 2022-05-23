import React, { Component, useState } from "react";
import Annotation from "react-image-annotation";

export default class Test extends Component {
  state = {
    annotations: [],
    annotation: {},
  };

  onChange = (annotation, ) => {
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
  click = (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    console.log(x, y);
    // const [coord, setCoord] = useState({ x: 0, y: 0 });
    // setCoord({ x: e.screenX, y: e.screenY });
    // console.log(coord);
  };

  render() {
    return (
      <Annotation
        src={this.props.imageurl}
        alt="Two pebbles anthropomorphized holding hands"
        annotations={this.state.annotations}
        type={this.state.type}
        value={this.state.annotation}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        // onMouseDown={this.click}
        // allowComments={true}
        // allowTouch
      />
    );
  }
}
