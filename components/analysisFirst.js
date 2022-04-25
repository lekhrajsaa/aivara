import React from "react";
import classes from "./analysis.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
const image =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8tbWBPpebnEMYaL2RhjNq6EM-VIIf75FvQ&usqp=CAU";
const Analysisheader = () => {
  const [tags, setTags] = React.useState([]);
  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  };

  const removeTag = (id) => {
    // setTags(tags.filter((el, i) => i == index));
    setTags((prevalue) => {
      return prevalue.filter((item, index) => {
        return index !== id;
      });
    });
  };

  return (
    <>
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
                image:1/20 <br />
                Total diatom count:30
              </p>
            </div>
            <div className={classes.analysis_tags}>
              <div>
                {tags.map((tag, index) => (
                  <div className={classes.tag_item_div} key={index}>
                    <span className={classes.tag_text}>
                      {tag}
                      <button
                        className={classes.tag_delete}
                        onClick={() => removeTag(index)}
                      >
                        <AiOutlineClose />
                      </button>
                    </span>
                  </div>
                ))}
              </div>

              <div className={classes.analysis_body_tag2}>
                <p>Specific identified</p>
                <button>family a</button> <button>family b</button>
              </div>
            </div>
            <form className={classes.analysis_form}>
              <div className="form-group">
                <label for="Inputspecies">Add new Species</label>
                <input
                  type="text"
                  class="form-control"
                  id="Inputspecies"
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div class="form-group">
                <label for="Inputgenus">Add new Genus</label>
                <input type="text" class="form-control" id="Inputdenus" />
              </div>
            </form>
          </div>
          <div className={classes.analysis_image}>
            <img src={image} />
            <p>view image</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Analysisheader;
