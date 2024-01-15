import { useState } from "react";

//components
import PhotoGridComponent from "./PhotoGridComponent";

//react-bootstrap
import { Container, Row, Col } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import VideoGridComponent from "./VideoGridComponent";

const HeaderComponent = () => {
  const [key, setKey] = useState("photo");

  return (
    <>
      <Container style={{ padding: "10px" }}>
        {/* <Row className="justify-content-center mt-3">
          <Col md lg={9} className="path-header">
            <small>Gallery</small>
          </Col>
        </Row> */}
        <Row className="justify-content-center mt-4">
            <Col md lg={9} className="header">
              <h3>Gallery</h3>
            </Col>
          </Row>
        <Row className="justify-content-center mt-5">
          <Col md lg={9}>
            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
              <Tab eventKey="photo" title="Photos" />
              <Tab eventKey="video" title="Videos" />
            </Tabs>
          </Col>
        </Row>
      </Container>
      {key == "photo" ? <PhotoGridComponent /> : <VideoGridComponent />}
    </>
  );
};

export default HeaderComponent;
