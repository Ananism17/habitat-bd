import React, { useEffect, useState } from "react";
import Router from "next/router";
import Link from "next/link";

//react-bootstrap
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";

//redux
import { connect } from "react-redux";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";

//html-filter
import DOMPurify from "dompurify";

//react-toast
import { toast } from "react-toastify";

//icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ViewPledgeComponent = ({ token, id }) => {
  //helper-variables
  const [pledgeDetails, setPledgeDetails] = useState(null);
  const [loader, setLoader] = useState(true);

  //pledge-details
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/pledge/" + id;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
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
        setLoader(false);
        console.log(error);
      });
  }, []);

  console.log();

  return (
    <>
      {loader ? (
        <Spinner animation="border" />
      ) : (
        <>
          {pledgeDetails == null ? (
            <h4>Pledge Not Found!</h4>
          ) : (
            <>
              <Row>
                <Col md lg={6} className="mb-5">
                  <Link href={"/admin/pledges"}>
                    <Button variant="secondary" size="sm">
                      <IoIosArrowBack /> Pledges List
                    </Button>
                  </Link>
                </Col>
                <Col md lg={6} className="mb-5 text-end">
                  <Link href={`/admin/pledges/pledgers/${pledgeDetails.id}`}>
                    <Button variant="success" size="sm" className="ms-2">
                      Pledgers List <IoIosArrowForward />
                    </Button>
                  </Link>
                </Col>
              </Row>
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
                        // value={description || ""}
                        // onChange={(e) => {
                        //   setDescription(e.target.value);
                        // }}
                      />
                    </Col>
                    <Col md lg={6} className="mt-4">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        // value={description || ""}
                        // onChange={(e) => {
                        //   setDescription(e.target.value);
                        // }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md lg={12} className="mt-4">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        // value={description || ""}
                        // onChange={(e) => {
                        //   setDescription(e.target.value);
                        // }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md lg={12} className="text-end mt-4">
                      <Button className="button-donate" disabled>
                        Pledge
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(ViewPledgeComponent);
