import classes from "./ReportSubmit.module.css";
import { useRouter } from "next/router";
// import getTabs from "./tab";
// import Tabs from 'react-responsive-tabs';
const ReportSubmit = () => {
  const router = useRouter();
  return (
      <>
    <div className={classes.body}>
      <p>
        Your report has been submitted <br></br>Track under review section <span className={classes.link}
        onClick={() => router.push("/home")}
        style={{ cursor: "pointer" }} >link</span>
      </p>
    </div>
    <div className={classes.mid}>
        <p onClick={() => router.push("/newHome")}
                  style={{ cursor: "pointer" }} >back to dashboard</p>
    </div>
    <div className={classes.footer}>
        <p  >copyright aivara  |  terms and coditions</p>
    </div>
    </>
  );
};

export default ReportSubmit;
