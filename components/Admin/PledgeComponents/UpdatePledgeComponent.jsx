import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

//react-bootstraps
import { Row, Col, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//redux
import { connect } from "react-redux";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";

//react-toast
import { toast } from "react-toastify";

//icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const UpdatePledgeComponent = ({ token, id }) => {
  //post-variables
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(1);
  const [with_form, setWithForm] = useState(1);

  //helper-variables
  const [loader, setLoader] = useState(true);

  //pledge-details
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/pledge/" + id;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          setTitle(res.data.data.title);
          setMessage(res.data.data.message);
          setWithForm(res.data.data.with_form);
          setStatus(res.data.data.status);
          setLoader(false);
        }
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  }, []);

  //handle-pledge-cUPDATE
  const handleUpdate = () => {
    const apiData = {
      title,
      message,
      status,
      with_form,
      id
    };
    const apiUrl = BASE_URL + "api/v1/pledge/update";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(apiUrl, apiData, config)
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.message, {
            position: "top-right",
            theme: "colored",
          });
          Router.push({
            pathname: "/admin/pledges",
          });
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

  return (
    <>
      {loader ? (
        <Spinner animation="border" />
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
          </Row>
          <h4 className="mt-2 mb-4">Update Pledge</h4>
          <Row>
            <Col md lg={4}>
              <Form.Label className="mt-4">Pledge Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={title || ""}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md lg={4}>
              <Form.Label className="mt-4">Pledge Message</Form.Label>
              <Form.Control
                type="text"
                placeholder="Message"
                value={message || ""}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md lg={4}>
              <Form.Label className="mt-4">Form</Form.Label>
              <Form.Select
                value={with_form}
                onChange={(e) => {
                  setWithForm(e.target.value);
                }}
              >
                <option value={1}>With Form</option>
                <option value={0}>Without Form</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col md lg={4}>
              <Form.Label className="mt-4">Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </Form.Select>
            </Col>
          </Row>

          <Row>
            <Col md lg={12}>
              <Button
                className="mt-5"
                variant="success"
                size="sm"
                onClick={handleUpdate}
              >
                Update Pledge
              </Button>
            </Col>
          </Row>
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

export default connect(mapStateToProps)(UpdatePledgeComponent);
