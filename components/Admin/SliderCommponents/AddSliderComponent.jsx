import { useRef, useState } from "react";
import Router from "next/router";
import Link from "next/link";

//react-bootstraps
import { Row, Col, Card } from "react-bootstrap";
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

const AddSliderComponent = ({ token }) => {
  //post-variables
  const [caption, setCaption] = useState(null);
  const [serial, setSerial] = useState(null);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(1);

  //references
  const fileInputRef = useRef(null);

  //cover-photo-upload
  const onChange = async (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (files.length > 0) {
      uploadDocuments(e, files[0]);
    }
  };
  const uploadDocuments = async (event, file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const response = submitFile(reader.result, file.name);
          resolve(response);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };
  const submitFile = (result, name) => {
    setUrl(result);
  };
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  //handle-slider-create
  const handleCreate = () => {
    const apiData = {
      caption,
      serial,
      url,
      status
    };
    const apiUrl = BASE_URL + "api/v1/slider";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    console.log(apiData);
    if (url == "") {
      toast.error("Please select a Slider Image!", {
        position: "top-right",
        theme: "colored",
      });
    } else {
      axios
        .post(apiUrl, apiData, config)
        .then((response) => {
          console.log(response.data);
          if (response.data.status) {
            toast.success(response.data.message, {
              position: "top-right",
              theme: "colored",
            });
            Router.push({
              pathname: "/admin/sliders",
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
    }
  };

  return (
    <>
      <Link href={"/admin/sliders"}>
        <Button variant="secondary" size="sm" className="mb-3">
          <IoIosArrowBack /> Slider Image List
        </Button>
      </Link>
      <h4 className="mt-2 mb-4">Add Slider Image</h4>
      <Row>
        <Col md lg={6}>
          <Form.Label className="mt-4">Slider Caption</Form.Label>
          <Form.Control
            type="text"
            placeholder="Caption"
            value={caption || ""}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
          />
          <Form.Label className="mt-4">Slider Serial</Form.Label>
          <Form.Control
            type="number"
            placeholder="Serial"
            value={serial || ""}
            onChange={(e) => {
              setSerial(e.target.value);
            }}
          />
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
          <Form.Label className="mt-5">Add Slider Image</Form.Label>
          <Button
            variant="info"
            onClick={handleBrowseClick}
            className="ms-4"
            size="sm"
          >
            Browse Your Computer
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={onChange}
              ref={fileInputRef}
            />
          </Button>
          <Row>
            <Col md lg={12}>
              {url && <img className="form-control mt-3" src={url} />}
            </Col>
          </Row>
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
            Add Image
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

export default connect(mapStateToProps)(AddSliderComponent);
