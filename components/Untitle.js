import { MdOutlineModeEdit } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";
import classes from "./Untitle.module.css";
import { Table } from "react-bootstrap";

const Untitle = () => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.untitle}>
          Untitled <MdOutlineModeEdit className={classes.editIcon} />
        </div>
        <div className={classes.download}>Download</div>
        <div className={classes.email}>Email</div>
        <div className={classes.closeIcon}>
          <AiOutlineClose />
        </div>
      </div>
      <div className={classes.nameContainer}>
        <div className={classes.name}>
          Name of the company : <p className={classes.subName}>Hazen</p>
        </div>
        <div className={classes.name}>
          Technician: <p className={`${classes.subName} ${classes.leftSubName}`}>Hazen</p>
        </div>
        <div className={classes.name}>
          Timestamp:<p className={`${classes.subName} ${classes.leftSubName}`}>29/10/2021 14:25 hrs </p>
        </div>
      </div>

      <div className={classes.table} >
        <Table bordered className={classes.tableBody}>
          <thead >
            <tr className={classes.tableHeading}>
              <th>Site Code</th>
              <th>Geographical Location</th>
              <th>Taxa Details</th>
              <th>Count of Images</th>
              <th>Count of taxa</th>
              <th>Relative Abundance</th>
            </tr>
          </thead>
          <tbody >
            <tr>
              <td>EG</td>
              <td>10.888 8.999</td>
              <td>aulacoseira granulata</td>
              <td>100</td>
              <td>60</td>
              <td>0.6</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            <tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr><tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr><tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr><tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr><tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr><tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr><tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr><tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr><tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr><tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr><tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr><tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr><tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr><tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr><tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr><tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr><tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr><tr>
              <td>WG</td>
              <td>9.02 6.99</td>
              <td>cymbella turgidula</td>
              <td>100</td>
              <td>40</td>
              <td>0.4</td>
            </tr>
            
          </tbody>
        </Table>
      </div>
      <div className={classes.footer}>
        <div className={classes.signature}>
          <p className={classes.txtCenter}>
            <BsUpload className={classes.uploadIcon} /> Your Signature{" "}
          </p>
        </div>
        <div className={classes.footerTxt}>generated using technique</div>
      </div>
      <div className={classes.last}>Designation of who signed, date</div>
    </>
  );
};
export default Untitle;
