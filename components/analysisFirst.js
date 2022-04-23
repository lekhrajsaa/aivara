import classes from "./analysis.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
const image =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8tbWBPpebnEMYaL2RhjNq6EM-VIIf75FvQ&usqp=CAU";
const Analysisheader = () => {
  const [demospecies, setdemospecies] = useState("");
  const [species, setspecies] = useState(["family a", "family b"]);

  const InputSpecies = (e) => {
    setdemospecies(e.target.value);
    addspecies();
  };
  const addspecies = () => {
    setspecies((prevalue) => {
      return [...prevalue, demospecies];
    });
    demospecies(" ");
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
                <p>Genus identified</p>
                {species.map((val) => (
                  <button>{val}</button>
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
                  aria-describedby="Help"
                  onChange={InputSpecies}
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
