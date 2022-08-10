import React, { Component } from "react";

import Annotation from "react-image-annotation";

export default class CarouselPreviewImage extends Component {
    state = {
        annotations: [],
        annotation: {},
    };

    shouldComponentUpdate(nextProps){
        if(JSON.stringify(nextProps) === JSON.stringify(this.props)){
            return true;
        }
        this.setState({
            ...this.state,
            annotations: [
                ...nextProps.annotations
            ]
        })
        setTimeout(() => {
            Array.from(document.querySelectorAll('.yvPWU')).forEach((rec) => {
                const randomColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
                rec.style.outline = `2px solid ${randomColor}`;
            });
        }, 10)
    }

    componentDidMount() {
        console.log('report data', this.props.reportData);
        document.querySelector('.ixSjBM').style.display = 'none';

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
                alt="Two pebbles anthropomorphized holding hands"
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