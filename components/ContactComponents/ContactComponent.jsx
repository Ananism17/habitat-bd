import { useState } from "react";
import Link from "next/link";
import Router from "next/router";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

//react-bootstrap
import { Col, Row, Container, Form, Button } from "react-bootstrap";

//react-toast
import { toast } from "react-toastify";

//icons
import { FiMapPin, FiPhoneCall } from "react-icons/fi";
import { BiWorld } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";

const ContactComponent = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [message, setMessage] = useState(null);

  //send-mail
  const sendMail = () => {
    const apiData = {
      name,
      email,
      subject,
      message,
    };
    const apiUrl = BASE_URL + "api/v1/public/contact";

    axios
      .post(apiUrl, apiData)
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          toast.success(response.data.message, {
            position: "top-right",
            theme: "colored",
          });
          Router.push({
            pathname: "/",
          });
        } else {
          toast.error(response.data?.message, {
            position: "top-right",
            theme: "colored",
          });
          console.log(response.data);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message, {
          position: "top-right",
          theme: "colored",
        });
        console.log(error);
      });
  };

  return (
    <>
      <Container style={{ padding: "10px" }}>
        <Row className="justify-content-center mt-3">
          <Col md lg={9} className="path-header">
            <small>Contact</small>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col md lg={9} className="header">
            <h1>Contact Us</h1>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4 mb-4">
          <Col
            md
            lg={9}
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          >
            <Row>
              <Col md lg={8} style={{ padding: "50px" }}>
                <Row>
                  <Col md lg={8} className="">
                    <Form.Label className="mt-1">Name</Form.Label>
                    <Form.Control
                      type="text"
                      // placeholder="Name"
                      value={name || ""}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md lg={8}>
                    <Form.Label className="mt-1">Email</Form.Label>
                    <Form.Control
                      type="email"
                      // placeholder="Email"
                      value={email || ""}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md lg={8}>
                    <Form.Label className="mt-1">Subject</Form.Label>
                    <Form.Control
                      type="text"
                      // placeholder="Subject"
                      value={subject || ""}
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md lg={8}>
                    <Form.Label className="mt-1">Message</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      rows={3}
                      // placeholder="Message"
                      value={message || ""}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md lg={8}>
                    <Button variant="info" onClick={sendMail}>
                      <AiOutlineSend />
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col
                md
                lg={4}
                style={{
                  background: "#103f6d",
                  color: "white",
                }}
                className="d-flex flex-column justify-content-center align-items-center p-md-5"
              >
                <small className="mb-1">
                  <FiMapPin />
                </small>
                <small>Level 3, House # 12, Road # 16/A,</small>
                <small>Gulshan- 1,</small>
                <small className="mb-3">Dhaka 1212 Bangladesh.</small>
                <small className="mb-3">
                  <FiPhoneCall /> +88 02 9895661
                </small>
                <small>
                  <BiWorld />{" "}
                  <Link
                    href="/"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    www.habitatbangladesh.org
                  </Link>
                </small>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactComponent;
