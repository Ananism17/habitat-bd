import { useRef, useState } from "react";
import Router from "next/router";
import Link from "next/link";

//react-bootstraps
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
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

const AddServiceComponent = ({ token }) => {
  //post-variables
  const [description, setDescription] = useState(null);
  const [message, setMessage] = useState(null);
  const [serial, setSerial] = useState(null);
  const [icon, setIcon] = useState("");
  const [image, setImage] = useState("");

  //references
  const fileInputRef = useRef(null);
  const fileInputRefImage = useRef(null);

  //icon-upload
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
    setIcon(result);
  };
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  //image-upload
  const onChangeImage = async (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (files.length > 0) {
      uploadDocumentsImage(e, files[0]);
    }
  };
  const uploadDocumentsImage = async (event, file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const response = submitFileImage(reader.result, file.name);
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
  const submitFileImage = (result, name) => {
    setImage(result);
  };
  const handleBrowseClickImage = () => {
    fileInputRefImage.current.click();
  };

  //handle-service-create
  const handleCreate = () => {
    const apiData = {
      description,
      message,
      serial,
      icon,
      image,
    };
    const apiUrl = BASE_URL + "api/v1/service";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    console.log(apiData);
    if (icon == "") {
      toast.error("Please select a Icon Image!", {
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
              pathname: "/admin/services",
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
      <Link href={"/admin/services"}>
        <Button variant="secondary" size="sm" className="mb-3">
          <IoIosArrowBack /> Service List
        </Button>
      </Link>
      <h4 className="mt-2 mb-4">Add Service</h4>
      <Row>
        <Col md lg={4}>
          <Form.Label className="mt-4">Service Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            value={description || ""}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <Form.Label className="mt-4">Service Serial</Form.Label>
          <Form.Control
            type="number"
            placeholder="Serial"
            value={serial || ""}
            onChange={(e) => {
              setSerial(e.target.value);
            }}
          />
          <Form.Label className="mt-4">Service Popup Message</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows={3}
            placeholder="Message"
            value={message || ""}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />

          <Form.Label className="mt-5">Add Icon</Form.Label>
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id="tooltip">Please Upload a Square Image!</Tooltip>
            }
          >
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
          </OverlayTrigger>

          <Row>
            <Col md lg={12}>
              {icon && <img className="form-control mt-3" src={icon} />}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md lg={4}>
          <Form.Label className="mt-5">Add Image</Form.Label>

          <Button
            variant="info"
            onClick={handleBrowseClickImage}
            className="ms-4"
            size="sm"
          >
            Browse Your Computer
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={onChangeImage}
              ref={fileInputRefImage}
            />
          </Button>
        </Col>
        <Row>
            <Col md lg={4}>
              {image && <img className="form-control mt-3" src={image} />}
            </Col>
          </Row>
      </Row>
      <Row>
        <Col md lg={12}>
          <Button
            className="mt-5"
            variant="success"
            size="sm"
            onClick={handleCreate}
          >
            Add Service
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

export default connect(mapStateToProps)(AddServiceComponent);
