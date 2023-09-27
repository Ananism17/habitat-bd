//react-bootstrap
import { Container, Row, Col, Button } from "react-bootstrap";

//icons
import { AiFillFormatPainter } from "react-icons/ai";
import { MdCleaningServices } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { TbBugOff } from "react-icons/tb";

const DonationComponent = () => {
  return (
    <div style={{ background: "#28b4d3", color: "white", padding: "10px" }}>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs lg="9" className="text-center">
            <h1>How Your Dollar Can Change Lives</h1>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs lg="8" className="text-center">
            <p style={{ fontSize: "20px" }}>
              Every dollar donated is stretched to bring decent living
              conditions to families, elderly and individuals most in need.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs lg="9" className="text-center">
            <Row className="g-4">
              <Col md>
                <AiFillFormatPainter style={{ fontSize: "50px" }} />
                <h4 className="mt-2">$40</h4>
                <p style={{ fontSize: "18px" }} className="mt-2">
                  helps to buy painty supplies to brighten up a home
                </p>
              </Col>
              <Col md>
                <MdCleaningServices style={{ fontSize: "50px" }} />
                <h4 className="mt-2">$50</h4>
                <p style={{ fontSize: "18px" }} className="mt-2">
                  helps to buy a full set of cleaning supplies to upkeep a home
                </p>
              </Col>
              <Col md>
                <FaBed style={{ fontSize: "50px" }} />
                <h4 className="mt-2">$100</h4>
                <p style={{ fontSize: "18px" }} className="mt-2">
                  helps to buy a new single-size bed frame for a good night's
                  sleep
                </p>
              </Col>
              <Col md>
                <TbBugOff style={{ fontSize: "50px" }} />
                <h4 className="mt-2">$250</h4>
                <p style={{ fontSize: "18px" }} className="mt-2">
                  helps to hire one-time professional pest extermination
                  services
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs lg="12" className="text-center mt-5 mb-3">
            <Button className="button-donate-now">DONATE NOW</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DonationComponent;
