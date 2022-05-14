import React from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import styles from "./car.module.css";
// import "./styles.css";
import FeaturedImage from "./FeaturedImage";
import Modal from "./Modal";
import RenderThumbs from "./RenderThumbs";
import RenderGallery from "./RenderGallery";
import Zoom from "./Zoom";
import { images } from "./Images";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { setmodelimage } from "../../redux/dataAction";
import { useDispatch, useSelector } from "react-redux";
import {
  BsArrowLeft,
  BsArrowRight,
  BsEye,
  AiOutlineDownload,
} from "react-icons/bs";
const renderNextButton = ({ isDisabled }) => {
  return <ArrowForwardIosIcon className={styles.alice_carousel__next_btn} />;
};
const renderPrevButton = ({ isDisabled }) => {
  return <ArrowBackIosIcon className={styles.alice_carousel__prev_btn} />;
};

class CarouselFinal extends React.Component {
  state = {
    currentIndex: 1,
    itemsInSlide: 2,
    responsive: { 0: { items: 4 } },
    galleryItems: images,
    modal: false,
  };

  handleOnSlideChange = (event) => {
    console.log("slide");
    const { itemsInSlide, item } = event;
    this.setState({ itemsInSlide, currentIndex: item });
  };

  slideTo = (i) => this.setState({ currentIndex: i });

  // my handlers
  handleEnlargeClick = () => {
    this.setState({ modal: true });
  };

  handleModalFalse = () => {
    this.setState({ modal: false });
  };

  render() {
    // const dispatch = useDispatch();
    const { currentIndex, galleryItems, responsive, modal } = this.state;
    // dispatch(setmodelimage(galleryItems));
    const mymodel = {
      imae: galleryItems,
    };
    const buttonClickHandler = () => {
      this.setState(mymodel);
    };

    return (
      <>
        <Modal
          modal={modal}
          items={galleryItems}
          handleModalFalse={this.handleModalFalse}
          currentIndex={currentIndex}
        />
        <FeaturedImage
          items={galleryItems}
          currentIndex={this.state.currentIndex}
        />
        <Zoom handleEnlargeClick={this.handleEnlargeClick} />

        <div className={styles.alice_wrapper}>
          <span className={styles.alice_carousel__prev_btn}></span>{" "}
          <AliceCarousel
            items={galleryItems}
            dotsDisabled={true}
            slideToIndex={currentIndex}
            responsive={responsive}
            onInitialized={this.handleOnSlideChange}
            onSlideChanged={this.handleOnSlideChange}
            onResized={this.handleOnSlideChange}
            renderPrevButton={renderPrevButton}
            renderNextButton={renderNextButton}
            onClick={buttonClickHandler}
          >
            {galleryItems.map((item, i) => (
              <span key={i} onClick={() => this.slideTo(i)}>
                <img className={styles.image_thumb} src={item} />
              </span>
            ))}
          </AliceCarousel>
          <h5 className={styles.imagesTotal}>
            Image: {currentIndex + 1}/{galleryItems.length + 1}
          </h5>
        </div>
      </>
    );
  }
}

export default CarouselFinal;
