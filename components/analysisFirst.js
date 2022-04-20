import classes from "../components/analysis.module.css";
import { AiOutlineClose } from "react-icons/ai";
const analysisfirst = () => {
  return (
    <>
      <div className={classes.analysis_header}>
        <div className={classes.analysis_second_main}>
          <h1>Analysis</h1>
          <h5>Taxa details of the classified image</h5>
        </div>
        <div className={classes.analysis_cross_icon}>
          <AiOutlineClose />
        </div>
      </div>
    </>
  );
};
export default analysisfirst;
