import { useState } from "react";
import Router from "next/router";
import Link from "next/link";

//react-bootstraps
import { Row, Col } from "react-bootstrap";
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
import { IoIosArrowBack } from "react-icons/io";

const CreateReportComponent = ({ token }) => {
  //post-variables
  const [name, setName] = useState(null);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(1);
  const [serial, setSerial] = useState(1);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  //handle-report-create
  const handleCreate = () => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("status", status);
    formData.append("serial", serial);
    formData.append("file", file);

    const apiUrl = BASE_URL + "api/v1/report";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(apiUrl, formData, config)
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          toast.success(response.data.message, {
            position: "top-right",
            theme: "colored",
          });
          Router.push({
            pathname: "/admin/reports",
            "Content-Type": "multipart/form-data",
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

  console.log(file);

  return (
    <>
      <Link href={"/admin/reports"}>
        <Button variant="secondary" size="sm" className="mb-3">
          <IoIosArrowBack /> Report List
        </Button>
      </Link>
      <h4 className="mt-2 mb-4">Add a Report</h4>
      <Row>
        <Col md lg={4}>
          <Form.Label className="mt-4">Report Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={name || ""}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <Form.Label className="mt-4">Report Serial</Form.Label>
          <Form.Control
            type="number"
            placeholder="Serial"
            value={serial || ""}
            onChange={(e) => {
              setSerial(e.target.value);
            }}
          />

          <Form.Label className="mt-4">Select a File</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />

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
            onClick={handleCreate}
          >
            Add Report
          </Button>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(CreateReportComponent);
