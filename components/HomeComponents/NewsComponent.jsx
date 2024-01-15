import React, { useState } from "react";

//react-bootstrap
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

//react-toast
import { toast } from "react-toastify";

const NewsComponent = () => {
  //post-variables
  const [email, setEmail] = useState(null);

  //modal-variables
  const [show, setShow] = useState(false);

  //handle-subscriber-create
  const handleCreate = () => {
    const apiData = {
      email,
    };
    const apiUrl = BASE_URL + "api/v1/public/subscriber";

    axios
      .post(apiUrl, apiData)
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          toast.success("Thanks for Subscribing!", {
            position: "top-right",
            theme: "colored",
          });
          setEmail(null);
          setShow(false);
        } else {
          toast.error(response.data.message, {
            position: "top-right",
            theme: "colored",
          });
          console.log(response.data);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-right",
          theme: "colored",
        });
        console.log(error);
      });
  };

  //handle-modal
  const closeModal = () => {
    setShow(false);
  };

  return (
    <>
      <div style={{ background: "#28b4d3", color: "white", padding: "10px" }}>
        <Container>
          <Row className="justify-content-center mt-3">
            <Col md lg={9}>
              <Row>
                <Col md lg="9">
                  <h2>
                    <b>Habitat Bangladesh News & Updates</b>
                  </h2>
                  <p style={{ fontSize: "20px" }}>
                    Subscribe to us & never miss an update! We'll keep you
                    informed on all our latest volunteering opportunities,
                    advocacy events & ways you can get involved.
                  </p>
                </Col>
                <Col
                  md
                  lg="3"
                  className="d-flex align-items-center justify-content-center"
                >
                  <Button
                    className="button-donate-now"
                    onClick={() => setShow(true)}
                  >
                    <b>Subscribe</b>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal show={show} onHide={closeModal} centered size="lg" scrollable>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Container className="mb-5">
            <Row>
              <Col
                md
                lg={12}
                style={{
                  background: "rgba(40, 180, 211, 0.8)",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="text-center mt-4 p-4"
              >
                <h2 style={{ color: "white" }}>
                  Subscribe Today! You'll get free access to our Quarterly
                  newsletter through your email!
                </h2>
              </Col>
            </Row>
            <Row>
              <Col md lg={12} className="mt-4">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={email || ""}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md lg={12} className="text-end mt-4">
                <Button className="button-donate" onClick={handleCreate}>
                  Subscribe
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewsComponent;
