import React, { useEffect } from "react";
import classes from "./analysis.module.css";
import { AiOutlineClose } from "react-icons/ai";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { useState } from "react";
import { useRouter } from "next/router";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../carousel/Images";
import {
  BsEye,
  BsArrowRightShort,
} from "react-icons/bs";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
} from '@mui/material';

import ImagePreview from "./Image_preview/imagePreview";
import { setAiReportData } from "../../redux/dataAction";
import CarouselPreviewImage from "./CarouselPreviewImage";

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

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API;

// const DataFromAI = [
//   {
//     "imageId": "f8c95192-a4b0-4ce7-bbe6-e50421aec514",
//     "objects_confidence": [
//       {
//         "gomphonema1 parvulum1": 0.999646,
//         "coordinates": {
//           "x": 73,
//           "y": 21,
//           "w": 20,
//           "h": 32
//         }
//       },
//       {
//         "parvulum2 gomphonema2": 0.999646,
//         "coordinates": {
//           "x": 50,
//           "y": 21,
//           "w": 20,
//           "h": 32
//         }
//       }
//     ],
//     "objects_count": {
//       "gomphonema parvulum": 1,
//       "parvulum gomphonema": 1,
//     }
//   },
//   {
//     "imageId": "f8c95192-a4b0-4ce7-bbe6-e50421aec514",
//     "objects_confidence": [
//       {
//         "gomphonema3 parvulum3": 0.999646,
//         "coordinates": {
//           "x": 3,
//           "y": 50,
//           "w": 20,
//           "h": 10
//         }
//       },
//       {
//         "parvulum4 gomphonema4": 0.999646,
//         "coordinates": {
//           "x": 50,
//           "y": 21,
//           "w": 20,
//           "h": 10
//         }
//       }
//     ],
//     "objects_count": {
//       "gomphonema parvulum": 1,
//       "parvulum gomphonema": 1,
//     }
//   },
//   {
//     "imageId": "f8c95192-a4b0-4ce7-bbe6-e50421aec514",
//     "objects_confidence": [
//       {
//         "gomphonema5 parvulum5": 0.999646,
//         "coordinates": {
//           "x": 3,
//           "y": 50,
//           "w": 20,
//           "h": 10
//         }
//       },
//       {
//         "parvulum6 gomphonema6": 0.999646,
//         "coordinates": {
//           "x": 50,
//           "y": 21,
//           "w": 20,
//           "h": 10
//         }
//       }
//     ],
//     "objects_count": {
//       "gomphonema parvulum": 1,
//       "parvulum gomphonema": 1,
//     }
//   },
//   {
//     "imageId": "f8c95192-a4b0-4ce7-bbe6-e50421aec514",
//     "objects_confidence": [
//       {
//         "gomphonema7 parvulum7": 0.999646,
//         "coordinates": {
//           "x": 3,
//           "y": 50,
//           "w": 20,
//           "h": 10
//         }
//       },
//       {
//         "parvulum8 gomphonema8": 0.999646,
//         "coordinates": {
//           "x": 50,
//           "y": 21,
//           "w": 20,
//           "h": 10
//         }
//       }
//     ],
//     "objects_count": {
//       "gomphonema parvulum": 1,
//       "parvulum gomphonema": 1,
//     }
//   }
// ];

const Analysisheader = () => {
  // const DataFromAI = null;

  const tempAiData = useSelector((state) => state.userdata.reportDataFrom_AI); // todo
  const reportId = tempAiData.reportId; // todo
  const photos = tempAiData.photos; // todo
  const report = tempAiData.report; // todo
  
  console.log('all',tempAiData, reportId, photos, report, "ai data test"); // todo delete

  const DataFromAI = tempAiData.report; // * check


  const dispatch = useDispatch();

  // const updatedReportData = DataFromAI;
  const [updatedReportData, setUpdatedReportData] = useState(DataFromAI || []);
  const [annotations, setAnnotations] = useState([
    {
      geometry: {
        type: 'RECTANGLE',
        x: 20,
        y: 20,
        width: 40,
        height: 20,
      },
      data: {
        text: 'test',
        id: 1
      }
    }
  ]);

  const mimage = useSelector((state) => state.userdata.modelimge);
  const router = useRouter();
  const [Genus, setGenus] = React.useState(["family A", "Family B"]);
  const [Species, setSpecies] = React.useState(["family A", "Family B"]);
  const [objectCount, setObjectCount] = useState(0)

  const [open, setPreviewImage] = React.useState(false);
  const [miaClass, setMainClass] = useState(false);
  const route = useRouter();


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
      setPreviewImage(false);
    } else {
      setPreviewImage(true);
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
  const [currentIndex, setcurrentIndex] = useState(0);
  const [itemsInSlide, setitemsInSlide] = useState(2);
  // const [galleryItems, setgalleryItems] = useState(images);
  const [galleryItems, setgalleryItems] = useState(photos?.map(item => item.url) || []);
  const [openSubmitReportDilogBox, setOpenSubmitReportDilogBox] = useState(false);

  const slideTo = (i) => {
    setcurrentIndex(i);
  };
  const handleOnSlideChange = (event) => {
    console.log("slide");
    const { itemsInSlide, item } = event;

    setcurrentIndex((item + 1) % galleryItems?.length);
    // console.log(currentIndex ,updatedReportData)
    // setcurrentIndex(item);
    setitemsInSlide(item);

  };
  const renderNextButton = ({ isDisabled }) => {
    return <BiChevronRight style={{
      width: 'fit-content',
      position: "absolute",
      top: "20px",
      right: "-50px",
      fontSize: "30px"
    }} className="alice_carousel__next_btn" />;
  };
  const renderPrevButton = ({ isDisabled }) => {
    return <BiChevronLeft style={{
      width: 'fit-content',
      position: "absolute",
      top: "20px",
      left: "-50px",
      fontSize: "30px"
    }}
      className="alice_carousel__prev_btn" />;
  };

  // ===============Genus===================
  const genusKeyDown = (e) => {
    console.log(e)
  };
  const genusremoveTag = (i) => {
    setGenus(prv => prv.filter((item, index) => i !== index));
    setSpecies(prv => prv.filter((item, index) => i !== index));
    // alert(JSON.stringify(updatedReportData[currentIndex].objects_confidence));
    let newObjectConfs = updatedReportData[currentIndex].objects_confidence.filter((item, index) => i !== index)
    setUpdatedReportData(prv => { prv[currentIndex].objects_confidence = newObjectConfs; return prv; })
    setObjectCount(prv => --prv);
    // console.log('codfjsfj', updatedReportData[currentIndex].objects_confidence.filter((item, index) => i !== index))
  };


  useEffect(() => {
    const allSlides = document.querySelectorAll('.alice-carousel__stage-item');
    const currentImage = galleryItems[currentIndex];

    Array.from(allSlides).forEach(slide => {
      if (slide.children[0].children[0].src === currentImage) {
        slide.children[0].children[0].classList.add('hero');
      } else {
        slide.children[0].children[0].classList.remove('hero');
      }
    })
  }, [currentIndex])


  // useEffect(() => {
  //   if (DataFromAI?.data) {
  //     // console.log(DataFromAI)

  //     const imagesFromAI = DataFromAI?.data.map(item => item.imageUrl);

  //     console.log(imagesFromAI)
  //     if (imagesFromAI.length > 0) {
  //       setgalleryItems(imagesFromAI)
  //     }
  //   }
  // }, [DataFromAI])

  useEffect(() => {
    console.log('rpt', updatedReportData)
    console.log('currentIndex', currentIndex)
    if (updatedReportData) {

      updateAnnotations();

      let tempGenus = updatedReportData[currentIndex].objects_confidence.map(item => {
        let genus = Object.keys(item)[1].split(' ')[0];
        return genus;
      })
      let tempSpecies = updatedReportData[currentIndex].objects_confidence.map(item => {
        let species = Object.keys(item)[1].split(' ')[1];
        return species;
      })

      setGenus(tempGenus);
      setSpecies(tempSpecies);
      setObjectCount(updatedReportData[currentIndex].objects_confidence.length)
    }

  }, [currentIndex, updatedReportData[currentIndex]?.objects_confidence, open]);

  const updateAnnotations = () => {
    let tempAnnotations = updatedReportData[currentIndex].objects_confidence.map(obj => {
      let TEXT = Object.keys(obj)[1];
      let Label_ID_1 = TEXT + Math.random();

      return {
        geometry: {
          type: 'RECTANGLE',
          x: obj.coordinates.x,
          y: obj.coordinates.y,
          width: obj.coordinates.w,
          height: obj.coordinates.h,
        },
        data: {
          text: TEXT || 'test',
          id: Label_ID_1
        }
      }
    })
    setAnnotations(tempAnnotations)
  }


  function addGenusFormSubmitHanlder(e) {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (DataFromAI?.data && updatedReportData?.data) {

      const reportId = DataFromAI?.data[0].reportId;

      console.log(reportId)

      var raw = JSON.stringify({
        "reportId": reportId,
        "data": updatedReportData?.data
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`${SERVER_URL}updateReportData`, requestOptions)
        .then(response => response.text())
        .then(result => { console.log(result); router.push('/reports'); dispatch(setAiReportData({})) })
        .catch(error => { console.log('error', error); alert('something went wrong') });
    }
  }


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
              <AiOutlineClose onClick={() => { route.push("/reports"); dispatch(setAiReportData({})) }} />
            </div>
          </div>
          <div className={classes.analysis_body}>
            <div className={classes.analysis_body_tags}>
              <div>
                <p className={classes.analysis_body_firstext}>
                  {/* image: 1/20 <br /> */}
                  Total diatom count: {objectCount}
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
                  {Species && Species.map((tag, index) => (
                    <div className={classes.tag_item_div} key={index}>
                      <span className={classes.tag_text}>
                        {tag}
                        <button
                          className={classes.tag_delete}
                        // onClick={() => speciesremoveTag(index)}
                        >
                          {/* <AiOutlineClose /> */}
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <form onSubmit={(e) => e.preventDefault()} className={classes.analysis_form}>

                <div className="form-group" style={{ marginTop: "10px" }}>

                  <label htmlFor="Inputgenus" style={{ fontWeight: "500" }}>
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
                      width: '90%',
                    }}
                  />

                </div>
                <button
                  style={{
                    position: "absolute",
                    right: "290px",
                    // bottom: "50px",
                    top: '540px',
                    marginTop: "100px",
                    border: "none",
                    background: "white",
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "bolder",
                    // float: "right",
                    // left: "250px",
                    width: 'fit-content'
                  }}

                  onClick={() => setOpenSubmitReportDilogBox(true)}
                >
                  Submit<BsArrowRightShort />
                </button>
              </form>
            </div>
            <div
              className={open ? classes.Analysis_Image : classes.analysis_image}
            >

              <div className={classes.carousel_main}>
                <div id="bigImage" className={classes.bigImage}>
                  {/* <img src={galleryItems[currentIndex]} /> */}
                  <CarouselPreviewImage
                    galleryItems={galleryItems}
                    currentIndex={currentIndex}
                    setPreviewImage={setPreviewImage}
                    reportData={updatedReportData}
                    setUpdatedReportData={setUpdatedReportData}
                    annotations={annotations}
                  />
                </div>
                <div className={classes.carousel_item}>
                  <AliceCarousel
                    responsive={{
                      0: {
                        items: 4,
                      },
                    }}
                    infinite={true}
                    disableDotsControls={true}
                    renderPrevButton={renderPrevButton}
                    renderNextButton={renderNextButton}
                    className={classes.carsousel_size}
                    onInitialized={handleOnSlideChange}
                    onSlideChanged={handleOnSlideChange}
                    onResized={handleOnSlideChange}
                  >
                    {galleryItems?.map((item, i) => (
                      <span key={i} onClick={() => slideTo(i)}>
                        <img className={classes.imagestyle} src={item} />
                      </span>
                    ))}

                  </AliceCarousel>
                  <span style={{ fontFamily: 'Sora', fontSize: '18px', fontWeight: '400' }}>Image: {(currentIndex + 1) + ' / ' + (galleryItems?.length)}</span>
                </div>
              </div>

              <p>
                <BsEye />
                <span className={classes.view_image} onClick={handleOpen}>
                  View Image
                </span>
              </p>

            </div>
          </div>


          {/* ===================Image Model===================== */}
          <div>
            {
              open && (
                <ImagePreview
                  galleryItems={galleryItems}
                  currentIndex={currentIndex}
                  setPreviewImage={setPreviewImage}
                  reportData={updatedReportData}
                  setUpdatedReportData={setUpdatedReportData}
                />
              )
            }
          </div>
        </div>
      </div>


      <Dialog
        open={openSubmitReportDilogBox}
        // onClose={() => setOpen(false)}
        aria-labelledby='dilog-title'
        aria-aria-describedby='dilog-description'
        sx={{ p: 2 }}

      >
        <DialogTitle id="dilog-title">Please click on submit button to complete your report</DialogTitle>
        <DialogActions sx={{ mx: 1, mb: 1 }}>
          <Button onClick={() => setOpenSubmitReportDilogBox(false)}>cancel</Button>
          <Button variant="contained" onClick={addGenusFormSubmitHanlder}>Submit Report</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Analysisheader;