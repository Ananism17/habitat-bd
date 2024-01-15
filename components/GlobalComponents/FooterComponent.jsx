//react
import React from "react";
import Link from "next/link";

//react-bootstrap
import { Col, Container, Row } from "react-bootstrap";

//icons
import { BiLogoFacebook, BiLogoLinkedin, BiLogoTwitter } from "react-icons/bi";

const FooterComponent = () => {
  return (
    <>
      <div className="footer">
        <Container>
          <Row className="justify-content-center">
            <Col xs lg="8" className="text-center mt-4">
              <img
                src="/images/logo-white.png"
                width="200"
                height="80"
                alt="habitat_logo_white"
                className="mt-3 mb-3"
              />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col
              xs
              lg="8"
              className="text-center mt-4"
              style={{ fontSize: "20px" }}
            >
              <b>Everyone deserves a decent place to call home.</b>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs lg="11" className="text-center mt-3">
              Habitat for Humanity Bangladesh is part of an international
              housing charity dedicated to eradicating poverty housing
              worldwide. Convicted that safe and affordable housing provides a
              path out of poverty, we have been working alongside low-income
              communities to increase their access to improved living
              conditions.
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs lg="8" className="text-center mt-3">
              <Link
                href="https://www.facebook.com/HabitatBD"
                target="_blank"
                style={{ textDecoration: "none", color: "white" }}
              >
                <BiLogoFacebook style={{ fontSize: "30px" }} className="me-2" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/habitatbd/"
                target="_blank"
                style={{ textDecoration: "none", color: "white" }}
              >
                <BiLogoLinkedin style={{ fontSize: "30px" }} className="me-2" />
              </Link>
              <Link
                href="https://www.twitter.com/HFH_BD"
                target="_blank"
                style={{ textDecoration: "none", color: "white" }}
              >
                <BiLogoTwitter style={{ fontSize: "30px" }} className="me-2" />
              </Link>
              
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs lg="8" className="text-center mt-3 mb-4">
              <Link href="/" style={{ textDecoration: "none", color: "white" }}>
                Home{" "}
              </Link>
              <span className="word-divider" />{" "}
              <Link
                href="/menus/about-us"
                style={{ textDecoration: "none", color: "white" }}
              >
                About Us{" "}
              </Link>
              <span className="word-divider" />
              <Link href="#" style={{ textDecoration: "none", color: "white" }}>
                Unsubcribe{" "}
              </Link>
              <span className="word-divider" />
              <Link href="/menus/career" style={{ textDecoration: "none", color: "white" }}>
                Careers{" "}
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FooterComponent;
