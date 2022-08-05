

import Header from "../header/HeaderConditional";

import StyledDropzone from "./Upload"
import { Nav, Container } from "react-bootstrap";
import classes from "./all.module.css";
import { route } from "next/dist/server/router";
import { useRouter } from "next/router";

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
      // style={{
      //   marginTop: "2%",
      //   fontWeight: "700",
      //   fontFamily: "Sora",
      //   fontSize: "110%",

      //   marginLeft: "10%",
      // }}
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
