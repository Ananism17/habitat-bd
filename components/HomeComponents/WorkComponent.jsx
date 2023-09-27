//react-bootstrap
import { Container, Row, Col } from "react-bootstrap";

//icons
import { GiBrickWall } from "react-icons/gi";
import { AiFillHeart } from "react-icons/ai";
import { FaHammer, FaKey } from "react-icons/fa";

const WorkComponent = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs lg="9" className="text-center">
          <h1>What We Do</h1>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs lg="8" className="text-center">
          <p style={{ fontSize: "20px" }}>
            At Habitat for Humanity Bangladesh, we build decent homes across
            Asia-Pacific and rehabilitate flats in Bangladesh for vulnerable
            families.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs lg="9" className="text-center">
          <Row>
            <Col md>
              <GiBrickWall style={{ fontSize: "30px", color: "#28b4d3" }} />
              <p
                style={{ fontSize: "18px", color: "#28b4d3" }}
                className="mt-2"
              >
                Building decent <br />
                houses overseas
              </p>
            </Col>
            <Col md>
              <AiFillHeart style={{ fontSize: "30px", color: "#28b4d3" }} />
              <p
                style={{ fontSize: "18px", color: "#28b4d3" }}
                className="mt-2"
              >
                Working in partnership <br />
                with families
              </p>
            </Col>
            <Col md>
              <FaHammer style={{ fontSize: "30px", color: "#28b4d3" }} />
              <p
                style={{ fontSize: "18px", color: "#28b4d3" }}
                className="mt-2"
              >
                Improving living <br />
                conditions in Bangladesh
              </p>
            </Col>
            <Col md>
              <FaKey style={{ fontSize: "30px", color: "#28b4d3" }} />
              <p
                style={{ fontSize: "18px", color: "#28b4d3" }}
                className="mt-2"
              >
                Restoring dignity through <br />
                decent living conditions
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default WorkComponent;
