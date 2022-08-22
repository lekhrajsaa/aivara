import React, { Component } from "react";

import Annotation from "react-image-annotation";

export default class CarouselPreviewImage extends Component {
    state = {
        annotations: [],
        annotation: {},
    };

    componentDidMount() {
        document.querySelector('.ixSjBM').style.display = 'none'; //hiding 'click and drag to annotate'

        this.setState({
            ...this.state,
            annotations: [
                ...this.props.annotations
            ]
        })
        //changing the color of annotation rectangles to a random color
        setTimeout(() => {
            Array.from(document.querySelectorAll('.yvPWU')).forEach((rec) => {
                const randomColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
                rec.style.outline = `2px solid ${randomColor}`;
            });
        }, 10)
    }


    render() {
        return (
            <Annotation
                // disableAnnotation={true}
                src={this.props.galleryItems[this.props.currentIndex]}
                alt="Sample image of water"
                annotations={this.props.annotations}
                type="OVAL"
                value={this.state.annotation}
                // onChange={this.onChange}
                // onSubmit={this.onSubmit}
                style={{ width: '100%', margin: 'auto' }}
            />
        )
    }
}