import React, { useState, useEffect } from "react";

//react-bootstrap
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

//redux
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { popUp } from "../../store/actions/popup";

//components
import LoaderBox from "../Services/LoaderBox";
import FooterComponent from "./FooterComponent";

//react-toast
import { toast } from "react-toastify";

//html-filter
import DOMPurify from "dompurify";

const ModalComponent = ({ show }) => {
  //post-variables
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [feedback, setFeedback] = useState(null);

  //helper-variables
  const [pledgeDetails, setPledgeDetails] = useState(null);
  const [loader, setLoader] = useState(true);

  //pledge-details
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/public/pledge";
    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.status) {
          res.data.data.sanitizedHTML = DOMPurify.sanitize(
            res.data.data.description
          );
          setLoader(false);
          setPledgeDetails(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //redux
  const dispatch = useDispatch();

  //close-modal
  const closeModal = () => {
    dispatch(popUp());
  };

  //handle-pledge-submit
  const handleSubmit = () => {
    const apiData = {
      first_name,
      last_name,
      email,
      feedback,
      pledge_id: pledgeDetails.id,
    };
    const apiUrl = BASE_URL + "api/v1/public/pledger";

    axios
      .post(apiUrl, apiData)
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          toast.success("Thanks for Pledging with the Cause!", {
            position: "top-right",
            theme: "colored",
          });
          setFirstName(null);
          setLastName(null);
          setFeedback(null);
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
        console.log(error);
        toast.error(error.response.data.message, {
          position: "top-right",
          theme: "colored",
        });
      });
  };

  if (pledgeDetails == null) return null;
  else {
    return (
      <Modal show={show} onHide={closeModal} centered size="xl" scrollable>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {loader ? (
            <LoaderBox />
          ) : (
            <Container className="mb-5">
              <Row>
                <Col md lg={4} className="mt-2">
                  <img src="/images/logo.png" width="200" height="80" />
                </Col>
                <Col
                  md
                  lg={8}
                  style={{
                    background: "red",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="text-center mt-2 p-4"
                >
                  <h2 style={{ color: "white" }}>{pledgeDetails?.title}</h2>
                </Col>
              </Row>
              <Row>
                <Col md lg={12} className="p-4 mt-2">
                  <div
                    className="mt-5"
                    dangerouslySetInnerHTML={{
                      __html: pledgeDetails.sanitizedHTML,
                    }}
                  ></div>
                </Col>
              </Row>
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
                  <h2 style={{ color: "white" }}>{pledgeDetails?.message}</h2>
                </Col>
              </Row>
              {pledgeDetails.with_form != 0 && (
                <>
                  <Row>
                    <Col md lg={6} className="mt-4">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={first_name || ""}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                    </Col>
                    <Col md lg={6} className="mt-4">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={last_name || ""}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
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
                    <Col md lg={12} className="mt-4">
                      <Form.Label>Feedback</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        type="email"
                        value={feedback || ""}
                        onChange={(e) => {
                          setFeedback(e.target.value);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md lg={12} className="text-end mt-4">
                      <Button className="button-donate" onClick={handleSubmit}>Pledge</Button>
                    </Col>
                  </Row>
                </>
              )}
            </Container>
          )}

          <FooterComponent />
        </Modal.Body>
      </Modal>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    show: state.popup.show,
  };
};

export default connect(mapStateToProps)(ModalComponent);
