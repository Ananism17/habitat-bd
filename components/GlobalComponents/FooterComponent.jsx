//react
import React from "react";
import Image from "next/image";

//react-bootstrap
import { Col, Container, Row } from "react-bootstrap";

//icons
import { BiLogoFacebook, BiLogoLinkedin, BiLogoYoutube } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs";

const FooterComponent = () => {
  return (
    <>
      <div className="footer">
        <Container>
          <Row className="justify-content-center">
            <Col xs lg="8" className="text-center mt-3">
              <Image
                src="/images/logo-white.png"
                width={160}
                height={80}
                alt="Picture of the author"
              />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col
              xs
              lg="8"
              className="text-center mt-3"
              style={{ fontSize: "20px" }}
            >
              Everyone deserves a decent place to call home.
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs lg="8" className="text-center mt-3">
              Habitat for Humanity Singapore is part of an international housing
              charity dedicated to eradicating poverty housing worldwide.
              Convicted that safe and affordable housing provides a path out of
              poverty, we have been working alongside low-income communities to
              increase their access to improved living conditions.
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs lg="8" className="text-center mt-3">
              <BiLogoFacebook style={{ fontSize: "30px" }} className="me-2" />
              <BsInstagram style={{ fontSize: "30px" }} className="me-2" />
              <BiLogoLinkedin style={{ fontSize: "30px" }} className="me-2" />
              <BiLogoYoutube style={{ fontSize: "30px" }} className="me-2" />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs lg="8" className="text-center mt-3 mb-4">
              Home <span className="word-divider" /> About Us{" "}
              <span className="word-divider" /> Financial Information{" "}
              <span className="word-divider" /> Privacy Policy{" "}
              <span className="word-divider" /> Unsubscribe{" "}
              <span className="word-divider" /> Careers{" "}
              <span className="word-divider" /> Sitemap
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs lg="8" className="text-center mt-5">
              Charity Registration Number <br />
              01774
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FooterComponent;
