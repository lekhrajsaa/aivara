import React from "react";
import classes from "./analysis.module.css";
import { AiOutlineClose } from "react-icons/ai";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useState } from "react";
import CarouselFinal from "./carousel/carouselFinal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useSelector } from "react-redux";
import { images } from "./carousel/Images";
import {
  BsArrowLeft,
  BsArrowRight,
  BsEye,
  AiOutlineDownload,
} from "react-icons/bs";
import { ModelTraining } from "@mui/icons-material";
const image =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSleNg85PLgTXzYbZyiSuStVjNbdHmrp6NorQ&usqp=CAU";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1750,
  outerHeight: 2000,
  boxShadow: 24,
  p: 2,
};

const Analysisheader = () => {
  const mimage = useSelector((state) => state.userdata.modelimge);
  const router = useRouter();
  const [Genus, setGenus] = React.useState(["family A", "Family B"]);
  const [Species, setSpecies] = React.useState(["family A", "Family B"]);

  const [open, setOpen] = React.useState(false);
  const [miaClass, setMainClass] = useState(false);
  const route = useRouter();
  // ===============Genus===================
  const genusKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setGenus([...Genus, value]);
    e.target.value = "";
  };
  const genusremoveTag = (id) => {
    // setGenus(Genus.filter((el, i) => i == index));
    setGenus((prevalue) => {
      return prevalue.filter((item, index) => {
        return index !== id;
      });
    });
  };
  //==================species===============
  const speciesKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setSpecies([...Species, value]);
    e.target.value = "";
  };
  const speciesremoveTag = (id) => {
    // setGenus(Genus.filter((el, i) => i == index));
    setSpecies((prevalue) => {
      return prevalue.filter((item, index) => {
        return index !== id;
      });
    });
  };

  const handleOpen = () => {
    if (open === true) {
      setMainClass(true);
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  const [childData, setChildData] = useState({
    image: "unknown",
  });
  console.log(childData);
  const passData = (data) => {
    setChildData(data);
  };
  // const modelImage = localStorage.getItem("model");
  // console.log("image : ", modelImage);

  // Carsousel
  const [currentIndex, setcurrentIndex] = useState(1);
  const [itemsInSlide, setitemsInSlide] = useState(2);
  const [galleryItems, setgalleryItems] = useState(images);
  const slideTo = (i) => {
    setcurrentIndex(i);
  };
  const handleOnSlideChange = (event) => {
    console.log("slide");
    const { itemsInSlide, item } = event;

    setcurrentIndex(item);
    setitemsInSlide(item);
  };
  const renderNextButton = ({ isDisabled }) => {
    return <BiChevronRight className="alice_carousel__next_btn" />;
  };
  const renderPrevButton = ({ isDisabled }) => {
    return <BiChevronLeft className="alice_carousel__prev_btn" />;
  };
  return (
    <>
      <div
        className={open ? classes.analysis_mai_div : classes.analysis_mai_Div}
      >
        <div className={classes.analysis_main}>
          <div className={classes.analysis_header}>
            <div className={classes.analysis_second_main}>
              <h1>Analysis</h1>
              <h5>Taxa details of the classified image</h5>
            </div>
            <div className={classes.analysis_cross_icon}>
              <AiOutlineClose onClick={() => route.push("/home")} />
            </div>
          </div>
          <div className={classes.analysis_body}>
            <div className={classes.analysis_body_tags}>
              <div>
                <p className={classes.analysis_body_firstext}>
                  {/* image: 1/20 <br /> */}
                  Total diatom count: 30
                </p>
              </div>
              <div className={classes.analysis_tags}>
                {/* <div> */}
                <p>Genus identified</p>
                {Genus.map((tag, index) => (
                  <div className={classes.tag_item_div} key={index}>
                    <span className={classes.tag_text}>
                      {tag}
                      <button
                        className={classes.tag_delete}
                        onClick={() => genusremoveTag(index)}
                      >
                        <AiOutlineClose />
                      </button>
                    </span>
                  </div>
                ))}
                {/* </div> */}

                <div className={classes.analysis_body_tag}>
                  <p>Specific identified</p>
                  {Species.map((tag, index) => (
                    <div className={classes.tag_item_div} key={index}>
                      <span className={classes.tag_text}>
                        {tag}
                        <button
                          className={classes.tag_delete}
                          onClick={() => speciesremoveTag(index)}
                        >
                          <AiOutlineClose />
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <form className={classes.analysis_form}>
                {/* <div className="form-group">
                  <label for="Inputspecies" style={{ fontWeight: "500" }}>
                    Add new Species
                  </label>
                  <input
                    type="text"
                    className="form-control inspecies"
                    id="Inputspecies"
                    placeholder="Enter"
                    onKeyDown={speciesKeyDown}
                    style={{
                      marginTop: "10px",
                      backgroundColor: "transparent",
                      borderRadius: "0px",
                      maxWidth: "700px",
                    }}
                  />
                </div> */}

                <div className="form-group" style={{ marginTop: "10px" }}>
                  <label for="Inputgenus" style={{ fontWeight: "500" }}>
                    Add new Genus
                  </label>
                  <input
                    type="text"
                    className="form-control ingenus"
                    id="Inputdenus"
                    placeholder="Enter the genus"
                    onKeyDown={genusKeyDown}
                    style={{
                      marginTop: "10px",
                      backgroundColor: "transparent",
                      borderRadius: "0px",
                      maxWidth: "700px",
                    }}
                  />
                </div>
              </form>
            </div>
            <div
              className={open ? classes.Analysis_Image : classes.analysis_image}
            >
              <CarouselFinal passData={passData} />

              {/* <div>
                <img src={galleryItems[currentIndex]} />
                <div className="carousel_itme">
                  <AliceCarousel
                    items={galleryItems}
                    dotsDisabled={true}
                    slideToIndex={currentIndex}
                    responsive={{
                      0: {
                        items: 4,
                      },
                    }}
                    className="carsousel_size"
                    onInitialized={handleOnSlideChange}
                    onSlideChanged={handleOnSlideChange}
                    onResized={handleOnSlideChange}
                    renderPrevButton={renderPrevButton}
                    renderNextButton={renderNextButton}
                  >
                    {galleryItems.map((item, i) => (
                      <span key={i} onClick={() => slideTo(i)}>
                        <img className="imagestyle" src={item} />
                      </span>
                    ))}
                  </AliceCarousel>
                </div>
              </div> */}

              {/* <p>
                <BsEye />
                <span className={classes.view_image} onClick={handleOpen}>
                  View Image
                </span>
              </p> */}

              {/* <h6>
                <FileDownloadOutlinedIcon className={classes.download} />
                Download
              </h6> */}
            </div>
          </div>
          {/* ========================= */}

          {/*  ======================================== */}
          {/* <div className={classes.analysis_pagination}>
            <h5 className={classes.previous}>
              <BsArrowLeft /> PREVIOUS
            </h5>
            <h5 className={classes.next}>
              NEXT <BsArrowRight />
            </h5>
          </div> */}
          {/* ===================Image Model===================== */}
          <div>
            {open && (
              <div className={classes.image_modal}>
                <p
                  className={classes.image_modal_close}
                  onClick={() => setOpen(false)}
                >
                  Close
                </p>
                <img src={galleryItems[currentIndex]} />
                <p className={classes.image_modal_title}>
                  Lorem ipsum text, some info regarding the bacteria may come
                  here
                </p>
                <p className={classes.image_modal_download}>
                  <FileDownloadOutlinedIcon />
                  Download
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Analysisheader;

{
  /* <div className={classes.mybox}>
<span>
  <BiChevronLeft />
</span>
<div className={classes.imagetap}>
  {data.map((a, i) => {
    return (
      <>
        <img src={a.image} className={classes.image_slice} />
      </>
    );
  })}
</div>
<span>
  <BiChevronRight />
</span>
</div> */
}
