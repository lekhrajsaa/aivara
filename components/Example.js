import React from "react";
import { ListGroup, ListGroupItem, Row, Col, Button } from "reactstrap";
import classes from "./image.module.css";

function Example() {
  React.useEffect(async () => {
    const Dropzone = (await import("dropzone")).default;
    Dropzone.autoDiscover = false;

    let currentMultipleFile = undefined;

    new Dropzone(document.getElementById("dropzone-multiple"), {
      url: "https://",
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer: document.getElementsByClassName(
        "dz-preview-multiple"
      )[0],
      previewTemplate: document.getElementsByClassName("dz-preview-multiple")[0]
        .innerHTML,
      maxFiles: null,
      acceptedFiles: null,
      init: function () {
        this.on("addedfile", function (file) {
          if (currentMultipleFile) {
          }
          currentMultipleFile = file;
        });
      },
    });
    document.getElementsByClassName("dz-preview-multiple")[0].innerHTML = "";
  }, []);
  return (
    <div className={classes.dropBox}>
      <img width="50" height="50" src="icon.png" className={classes.img} />
      <h3 className={classes.text}>Upload a photo</h3>
      <div className="dropzone dropzone-multiple" id="dropzone-multiple">
        <div className="fallback">
          <div className="custom-file">
            <input
              className="custom-file-input"
              id="customFileUploadMultiple"
              multiple="multiple"
              type="file"
            />
            <label
              className="custom-file-label"
              htmlFor="customFileUploadMultiple"
            >
              Choose file
            </label>
          </div>
        </div>
        <ListGroup
          className=" dz-preview dz-preview-multiple list-group-lg"
          flush
        >
          <ListGroupItem className=" px-0">
            <Row className=" align-items-center">
              <Col className=" col-auto">
                <div className=" avatar">
                  <img
                    alt="..."
                    className=" avatar-img rounded"
                    data-dz-thumbnail
                    src="https://argon-dashboard-pro-svelte.creative-tim.com/img/theme/img-1-1000x600.jpg"
                  />
                </div>
              </Col>
              <div className=" col ml--3">
                <h4 className=" mb-1" data-dz-name>
                  ...
                </h4>
                <p className=" small text-muted mb-0" data-dz-size>
                  ...
                </p>
              </div>
              <Col className=" col-auto">
                <Button size="sm" color="danger" data-dz-remove>
                  <i className="fas fa-trash" />
                </Button>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
}

export default Example;
