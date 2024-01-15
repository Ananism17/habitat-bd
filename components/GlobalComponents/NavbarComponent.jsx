import { useState } from "react";
import Link from "next/link";

//react-bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import RenderMenuItems from "../Services/RenderMenuItems";

const NavbarComponent = ({ menuList }) => {
  const topLevelItems = menuList.filter((item) => !item.parent_id);

  //dropdown-variables
  const [openDropdown, setOpenDropdown] = useState(null);

  //dropdown-functions
  const handleMouseEnter = (itemId) => {
    setOpenDropdown(itemId);
  };
  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <>
      <Navbar sticky="top" expand="lg" className="bg-body-white navbar-custom">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Navbar.Brand>
                <Link href="/">
                  <img
                    src="/images/logo.png"
                    width="200"
                    height="80"
                    className="d-inline-block align-top me-lg-4"
                    alt="habitat_logo"
                    style={{ marginTop: "26px", marginBottom: "26px" }}
                  />
                </Link>
              </Navbar.Brand>
              <RenderMenuItems menuData={topLevelItems} menuList={menuList} />
              <Link
                href="/what-we-do"
                className="ms-lg-3 me-lg-3 navbar-nav-item"
                style={{ fontWeight: "500" }}
              >
                What We Do
              </Link>
              <Link
                href="/impact"
                className="ms-lg-3 me-lg-3 navbar-nav-item"
                style={{ fontWeight: "500" }}
              >
                Impact
              </Link>

              <NavDropdown
                title="Publications"
                onMouseEnter={() => handleMouseEnter("news")}
                onMouseLeave={handleMouseLeave}
                show={openDropdown === "news"}
                className={"mt-lg-5 ms-lg-3 me-lg-3"}
              >
                <Nav.Item className="mt-2">
                  <Link href="/news" className="navbar-nav-item">
                    News
                  </Link>
                </Nav.Item>
                <Nav.Item className="mt-2">
                  <Link href="/reports" className="navbar-nav-item">
                    Reports
                  </Link>
                </Nav.Item>
                <Nav.Item className="mt-2">
                  <Link href="/stories" className="navbar-nav-item">
                    Stories
                  </Link>
                </Nav.Item>
              </NavDropdown>
              <Link
                href="/gallery"
                className="ms-lg-3 me-lg-3 navbar-nav-item"
                style={{ fontWeight: "500" }}
              >
                Gallery
              </Link>
              <Link
                href="/contact"
                className="ms-lg-3 me-lg-3 navbar-nav-item"
                style={{ fontWeight: "500" }}
              >
                Contact
              </Link>

              {/* <Nav.Link href="#" className="mt-lg-4 ms-lg-3 me-lg-3">
                <Button
                  className="button-donate"
                  style={{ fontWeight: "500", marginTop: "13px" }}
                >
                  PLEDGE YOUR VOICE
                </Button>
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
