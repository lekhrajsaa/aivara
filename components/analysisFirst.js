import React from "react";
import classes from "./analysis.module.css";
import { AiOutlineClose } from "react-icons/ai";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";

import {
  BsArrowLeft,
  BsArrowRight,
  BsEye,
  AiOutlineDownload,
} from "react-icons/bs";
import { ModelTraining } from "@mui/icons-material";
const image =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8tbWBPpebnEMYaL2RhjNq6EM-VIIf75FvQ&usqp=CAU";

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
  const router = useRouter();
  const [Genus, setGenus] = React.useState(["family A", "Family B"]);
  const [Species, setSpecies] = React.useState(["family A", "Family B"]);

  const [open, setOpen] = React.useState(false);

  const [miaClass, setMainClass] = useState(false);
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
              <AiOutlineClose />
            </div>
          </div>
          <div className={classes.analysis_body}>
            <div className={classes.analysis_body_tags}>
              <div>
                <p>
                  image: 1/20 <br />
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
                    style={{ marginTop: "10px" }}
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
                    style={{ marginTop: "10px" }}
                  />
                </div>
              </form>
            </div>
            <div className={classes.analysis_image}>
              <img src={image} />
              {/* <h6>
              <AiOutlineDownload />
              Download
            </h6> */}
              <p>
                <BsEye />
                <span className={classes.view_image} onClick={handleOpen}>
                  View Image
                </span>
              </p>
            </div>
          </div>
          <div className={classes.analysis_pagination}>
            <h4 className={classes.prevalue}>
              <BsArrowLeft /> PREVIOUS
            </h4>
            <h4 className={classes.next} onClick={() => router.push("/reportSubmit")}
                  style={{ cursor: "pointer" }} >
              NEXT <BsArrowRight />
            </h4>
          </div>
          {/* ===================Image Model===================== */}
          <div>
            {/* <Modal style={{ border: "none" }} open={open} onClose={handleClose}>
              <Box sx={style}>
                <div className={classes.image_modal}>
                  <img src={image} />
                </div>
              </Box>

              
            </Modal> */}

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
