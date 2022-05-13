import React from "react";
import classes from "./analysis.module.css";
import { AiOutlineClose } from "react-icons/ai";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
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
const data = [
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
    caption: "San Francisco",
  },
  {
    image:
      "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
    caption: "Scotland",
  },

  {
    image:
      "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
    caption: "Darjeeling",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg",
    caption: "San Francisco",
  },
  {
    image:
      "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
    caption: "Scotland",
  },
  {
    image:
      "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg",
    caption: "Darjeeling",
  },
  {
    image:
      "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx",
    caption: "San Francisco",
  },
  {
    image:
      "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg",
    caption: "Scotland",
  },
  {
    image:
      "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
    caption: "Darjeeling",
  },
];

const Analysisheader = () => {
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
                <p>
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
                <div className="form-group">
                  <label for="Inputspecies" style={{ fontWeight: "500" }}>
                    Add new Species
                  </label>
                  <input
                    type="text"
                    className="form-control inspecies"
                    id="Inputspecies"
                    onKeyDown={speciesKeyDown}
                    style={{
                      marginTop: "10px",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>

                <div className="form-group" style={{ marginTop: "10px" }}>
                  <label for="Inputgenus" style={{ fontWeight: "500" }}>
                    Add new Genus
                  </label>
                  <input
                    type="text"
                    className="form-control ingenus"
                    id="Inputdenus"
                    onKeyDown={genusKeyDown}
                    style={{
                      marginTop: "10px",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
              </form>
            </div>
            <div
              className={open ? classes.Analysis_Image : classes.analysis_image}
            >
              <img src={image} />

              <div className={classes.mybox}>
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
              </div>
              <p>
                <BsEye />
                <span className={classes.view_image} onClick={handleOpen}>
                  View Image
                </span>
              </p>
              <h5>Image:1/20</h5>
              {/* <h6>
                <FileDownloadOutlinedIcon className={classes.download} />
                Download
              </h6> */}
            </div>
          </div>
          {/* ========================= */}

          {/*  ======================================== */}
          <div className={classes.analysis_pagination}>
            <h5 className={classes.previous}>
              <BsArrowLeft /> PREVIOUS
            </h5>
            <h5 className={classes.next}>
              NEXT <BsArrowRight />
            </h5>
          </div>
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
                <img src={image} />
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
  /* <div className={classes.imagemain_tap}>
<p>
  <BiChevronLeft />
</p>
<div className={classes.imagetap}>
  {data.map((a, i) => {
    return (
      <>
        <img src={a.image} className={classes.image_slice} />
      </>
    );
  })}
</div>
<p>
  <BiChevronRight />
</p> 
</div>*/
}
