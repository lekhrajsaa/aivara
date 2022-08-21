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

// const image =
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSleNg85PLgTXzYbZyiSuStVjNbdHmrp6NorQ&usqp=CAU";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 1750,
//   outerHeight: 2000,
//   boxShadow: 24,
//   p: 2,
// };

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API;

const Analysisheader = () => {
  // const DataFromAI = null;

  const tempAiData = useSelector((state) => state.userdata.reportDataFrom_AI); // todo
  const reportId = tempAiData.reportId; // todo
  const photos = tempAiData.photos; // todo
  const report = tempAiData.report; // todo


  // const mimage = useSelector((state) => state.userdata.modelimge);
  const router = useRouter();
  const [Genus, setGenus] = React.useState([]);
  const [Species, setSpecies] = React.useState([]);

  const [objectCount, setObjectCount] = useState(0)

  const [open, setPreviewImage] = React.useState(false);
  // const [miaClass, setMainClass] = useState(false);
  const [imageSize, setImageSize] = useState({ w: 0, h: 0 })


  // Carsousel
  const [currentIndex, setcurrentIndex] = useState(0);
  // const [itemsInSlide, setitemsInSlide] = useState(2);
  const [galleryItems, setgalleryItems] = useState(photos?.map(item => item.url) || []);
  const [openSubmitReportDilogBox, setOpenSubmitReportDilogBox] = useState(false);

  const route = useRouter();

  console.log('all', tempAiData, reportId, photos, report, "ai data test", currentIndex); // todo delete

  const dispatch = useDispatch();

  const [updatedReportData, setUpdatedReportData] = useState(tempAiData.report || []);
  const [annotations, setAnnotations] = useState([
    // {
    //   geometry: {
    //     type: 'RECTANGLE',
    //     x: 20,
    //     y: 20,
    //     width: 40,
    //     height: 20,
    //   },
    //   data: {
    //     text: 'test',
    //     id: 1
    //   }
    // }
  ]);

  const handleOpen = () => {
    if (open === true) {
      setMainClass(true);
      setPreviewImage(false);
    } else {
      setPreviewImage(true);
    }
  };
  // const [childData, setChildData] = useState({
  //   image: "unknown",
  // });
  // console.log(childData);
  // const passData = (data) => {
  //   setChildData(data);
  // };

  const slideTo = (i) => {
    setcurrentIndex(i);
  };
  const handleOnSlideChange = (event) => {
    console.log("slide");
    const { itemsInSlide, item } = event;

    if (updatedReportData.length > 1) {
      setcurrentIndex((item + 1) % galleryItems?.length);
      // setitemsInSlide(item);
    }

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

  const genusremoveTag = (i, genus) => {
    // alert(i)
    let currentImageReport = updatedReportData[currentIndex];
    // let newObjectConfs = currentImageReport.objects_confidence.filter((item, index) => i !== index);

    let newObjectConfs = [];
    let conf = currentImageReport.objects_confidence;
    let oneDeleted = false;
    for (let i = 0; i < conf.length; i++) {
      let item = conf[i];
      if (item.detect.split(' ')[0] === genus) {
        console.log('ad', item.detect.split(' ')[0], genus)
        if (!oneDeleted) {
          oneDeleted = true;
          if(currentImageReport.objects_count[item.detect] > 1){
            currentImageReport.objects_count[item.detect] = --currentImageReport.objects_count[item.detect];
          }else{
            delete currentImageReport.objects_count[item.detect];
          }
        } else {
          newObjectConfs.push(item);
        }
      } else {
        console.log('aa', item.detect.split(' ')[0], genus)
        newObjectConfs.push(item);
      }
    }

    let currentDiatomCount = currentImageReport.objects_count_custom.values[i];
    if (currentDiatomCount > 1) {
      currentDiatomCount--;
      currentImageReport.objects_count_custom.values[i] = currentDiatomCount;
    } else {
      delete currentImageReport.objects_count[currentImageReport.objects_confidence[i].detect.trim()];
      currentImageReport.objects_count_custom.detects.splice(i, 1);
      currentImageReport.objects_count_custom.values.splice(i, 1)
    }

    setUpdatedReportData(prv => {
      currentImageReport.objects_confidence = newObjectConfs;
      return updatedReportData;
    })

    updatePage()

    // let tempGenus = updatedReportData[currentIndex].objects_count_custom.detects.map((item, i)=> {
    //   let count = updatedReportData[currentIndex].objects_count_custom.values[i];
    //   if(count > 1){
    //     let genus = item.split(' ')[0] + '(' + count + ')';
    //     return genus;
    //   }else{
    //     let genus = item.split(' ')[0];
    //     return genus;
    //   }
    // })
    // let tempSpecies = updatedReportData[currentIndex].objects_count_custom.detects.map(item => {
    //   let species = item.split(' ')[1];
    //   return species;
    // })

    // setGenus(prv => prv.filter((item, index) => i !== index));
    // setSpecies(prv => prv.filter((item, index) => i !== index));
    // alert(JSON.stringify(updatedReportData[currentIndex].objects_confidence));
    // updateAnnotations()
    // setObjectCount(prv => --prv);
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

  useEffect(() => {
    updatePage()
  }, [currentIndex, updatedReportData[currentIndex]?.objects_confidence, open]);


  function updatePage() {
    console.log('rpt', updatedReportData)
    console.log('currentIndex', currentIndex)
    if (updatedReportData.length > 0 && updatedReportData[currentIndex].objects_confidence.length > 0) {
      console.log(updatedReportData, 'formfdsfaj')

      let tempGenus = updatedReportData[currentIndex].objects_count_custom.detects.map((item, i) => {
        let count = updatedReportData[currentIndex].objects_count_custom.values[i];
        if (count > 1) {
          let genus = item.split(' ')[0] + '(' + count + ')';
          return genus;
        } else {
          let genus = item.split(' ')[0];
          return genus;
        }
      })
      let tempSpecies = updatedReportData[currentIndex].objects_count_custom.detects.map(item => {
        let species = item.split(' ')[1];
        return species;
      })

      // let tempGenus = updatedReportData[currentIndex].objects_confidence.map(item => {
      //   let genus = item.detect.split(' ')[0];
      //   return genus;
      // })
      // let tempSpecies = updatedReportData[currentIndex].objects_confidence.map(item => {
      //   let species = item.detect.split(' ')[1];
      //   return species;
      // })

      setGenus(tempGenus);
      setSpecies(tempSpecies);
      setObjectCount(updatedReportData[currentIndex].objects_confidence.length)
      updateAnnotations();
    } else {
      setGenus([]);
      setSpecies([]);
      setObjectCount(updatedReportData[currentIndex].objects_confidence.length);
      updateAnnotations()
    }

    let img = new Image();
    img.src = galleryItems[currentIndex];

    img.onload = () => {
      setImageSize({ w: img.width, h: img.height })
    }
  }


  const updateAnnotations = () => {
    console.log(updatedReportData, currentIndex, 'ff')
    let image = new Image()
    image.src = galleryItems[currentIndex];

    image.onload = () => {
      let img = new Image();
      img.src = galleryItems[currentIndex];

      let tempAnnotations = updatedReportData[currentIndex].objects_confidence.map(obj => {
        let TEXT = obj.detect;
        let Label_ID_1 = TEXT + Math.random();

        const x = ((obj.cordinates.x / 416) * 100);
        const y = ((obj.cordinates.y / 416) * 100);
        const w = (((obj.cordinates.w - obj.cordinates.x) / 416) * 100);
        const h = (((obj.cordinates.h - obj.cordinates.y) / 416) * 100);

        return {
          geometry: {
            type: 'RECTANGLE',
            x: x,
            y: y,
            width: w,
            height: h,
          },
          data: {
            text: TEXT || 'TEST',
            id: Label_ID_1
          }
        }
      })
      console.log('temp', tempAnnotations)
      setAnnotations(tempAnnotations)


    }
  }

  useEffect(() => {
    setTimeout(() => {
      Array.from(document.querySelectorAll('.yvPWU')).forEach((rec) => {
        const randomColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
        rec.style.outline = `2px solid ${randomColor}`;
      });
    }, 10)
  }, [annotations])


  function addGenusFormSubmitHanlder(e) {
    e.preventDefault();

    console.log('subm', updatedReportData)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // alert('submit1')
    if (updatedReportData) {
      // alert('submit')
      const reportId = tempAiData.reportId;

      console.log(reportId)

      var raw = JSON.stringify({
        "reportId": reportId,
        "data": updatedReportData
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`${SERVER_URL}updateReportData`, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          router.push('/reportSubmit');  
          dispatch(setAiReportData({}))
        })
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
                  Total diatom count: {objectCount}
                </p>
              </div>
              <div className={classes.analysis_tags}>
                {/* <div> */}
                <p>Genus identified</p>

                <div>

                  {Genus.map((tag, index) => (
                    <div className={classes.tag_item_div} key={index} style={{ margin: '20px 5px' }}>
                      <span className={classes.tag_text}>
                        {tag}
                        <button
                          className={classes.tag_delete}
                          onClick={() => genusremoveTag(index, tag.split('(')[0])}
                        >
                          <AiOutlineClose />
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
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

                {/* <div className="form-group" style={{ marginTop: "10px" }}>

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

                </div> */}
                <button
                  style={{
                    position: "absolute",
                    right: "290px",
                    top: '540px',
                    marginTop: "100px",
                    border: "none",
                    background: "white",
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "bolder",
                    width: 'fit-content'
                  }}

                  onClick={() => setOpenSubmitReportDilogBox(true)}
                >
                  Submit <BsArrowRightShort />
                </button>
              </form>
            </div>
            <div
              className={open ? classes.Analysis_Image : classes.analysis_image}
            >

              <div className={classes.carousel_main}>
                <div id="bigImage" className={classes.bigImage}>
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
                    responsive={{ 0: { items: 4, }, }}
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
                  className={classes.annotation}
                  galleryItems={galleryItems}
                  currentIndex={currentIndex}
                  setPreviewImage={setPreviewImage}
                  reportData={updatedReportData}
                  setUpdatedReportData={setUpdatedReportData}
                  style={{ width: imageSize.w + 'px', height: imageSize.h + 'px' }}
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