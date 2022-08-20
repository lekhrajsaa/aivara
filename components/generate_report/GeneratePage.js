

import Header from "../Header/HeaderConditional";
import StyledDropzone from "./Upload"
//react-bootstrap used for the box to display content inside it
import { Nav, Container } from "react-bootstrap";
import classes from "./all.module.css";
//useRouter used to route to another page
import { useRouter } from "next/router";
//not in used might be deleted later
import { route } from "next/dist/server/router";


//FUnction to take image as input from user
const GeneratePage = () => {
  const route = useRouter();

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <Header headerWithSignout={true} />
      {/* <BasicTabs/> */}
      <div
        className={classes.con}
     
      >
        <Container>
          <Nav className="me-auto">
            <Nav.Link className={classes.focus} href="/gen">Generate</Nav.Link>

            <div className={classes.backBtn} onClick={()=> route.push("/detail")}>back</div>
          </Nav>
        </Container>
        <StyledDropzone />

        {/* <Tabs items={getTabs()} selectedTabKey={0} /> */}
      </div>
    </>
  );
};

export default GeneratePage;
