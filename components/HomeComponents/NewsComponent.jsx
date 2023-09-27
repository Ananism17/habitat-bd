//react-bootstrap
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const NewsComponent = () => {
  return (
    <div style={{ background: "#28b4d3", color: "white", padding: "10px" }}>
      <Container>
        <Row className="justify-content-center mt-3">
          <Col md lg={9}>
            <Row>
              <Col md lg="9">
                <h2>Habitat Singapore News & Updates</h2>
                <p style={{ fontSize: "20px" }}>
                  Subscribe to us & never miss an update! We'll keep you
                  informed on all our latest volunteering opportunities,
                  advocacy events & ways you can get involved.
                </p>
              </Col>
              <Col md lg="3" className="d-flex align-items-center justify-content-center">
                <Button className="button-donate-now">Subscribe</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewsComponent;
