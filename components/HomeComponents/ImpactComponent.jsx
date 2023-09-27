//react-bootstrap
import { Container, Row, Col } from "react-bootstrap";

const ImpactComponent = () => {
  return (
    <div style={{ background: "#eaeaea", padding: "10px" }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs lg="12" className="text-center mt-4">
            <h1>Our Impact To Date</h1>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs lg="8" className="text-center">
            <p style={{ fontSize: "20px" }}>
              Habitat Bangladesh began operations in 2004 and has been actively
              engaging volunteers to work alongside us in fighting poverty
              housing in Bangladesh and across the Asia-Pacific region.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs lg="12" className="text-center">
            <Row className="justify-content-center ">
              <Col sm lg="3">
                <Row>
                  <Col xs lg="3" className="element-with-green-line "></Col>
                  <Col xs lg="9">
                    <div style={{ fontSize: "26px" }}>5,480 houses</div>
                    <p className="mt-3">built across Asia-Pacific</p>
                  </Col>
                </Row>
              </Col>
              <Col sm lg="3">
                <Row>
                  <Col xs lg="3" className="element-with-green-line "></Col>
                  <Col xs lg="9">
                    <div style={{ fontSize: "26px" }}>4,036 families</div>
                    <p className="mt-3">served in Bangladesh</p>
                  </Col>
                </Row>
              </Col>
              <Col sm lg="3">
                <Row>
                  <Col xs lg="3" className="element-with-green-line "></Col>
                  <Col xs lg="9">
                    <div style={{ fontSize: "26px" }}>40,580 volunteers</div>
                    <p className="mt-3">fighting poverty with us</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ImpactComponent;
