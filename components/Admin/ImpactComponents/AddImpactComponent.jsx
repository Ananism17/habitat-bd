import { useState, useRef } from "react";
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

//react-color
import { SketchPicker } from "react-color";

//icons
import { IoIosArrowBack } from "react-icons/io";
import { MdClear } from "react-icons/md";

const AddImpactComponent = ({ token }) => {
  //post-variables
  const [header, setHeader] = useState("");
  const [fontColor, setFontColor] = useState("#ffffff");
  const [image, setImage] = useState("");
  const [effects, setEffects] = useState([""]);

  //references
  const fileInputRefImage = useRef(null);

  //handle-color-change
  const handleColorChange = (newColor) => {
    setFontColor(newColor.hex);
  };

  //handle-image
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

  //handle-effects
  const handleAddField = () => {
    setEffects([...effects, ""]);
  };
  const handleFieldChange = (index, value) => {
    const newEffects = [...effects];
    newEffects[index] = value;
    setEffects(newEffects);
  };
  const handleClearField = (index) => {
    const newEffects = [...effects];
    newEffects.splice(index, 1);
    setEffects(newEffects);
  };

  //handle-impact-create
  const handleCreate = () => {
    const apiData = {
      header,
      font_color: fontColor,
      effects,
      image,
    };
    const apiUrl = BASE_URL + "api/v1/impact";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    console.log(apiData);
    if (header == "") {
      toast.error("Please input a Header!", {
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
              pathname: "/admin/impacts",
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
      <Link href={"/admin/impacts"}>
        <Button variant="secondary" size="sm" className="mb-3">
          <IoIosArrowBack /> Impact List
        </Button>
      </Link>
      <h4 className="mt-2 mb-4">Add Impact</h4>
      <Row>
        <Col md lg={4}>
          <Form.Label className="mt-4">Impact Header</Form.Label>
          <Form.Control
            type="text"
            placeholder="Header"
            value={header || ""}
            onChange={(e) => {
              setHeader(e.target.value);
            }}
          />
          <Form.Label className="mt-4">Font Color</Form.Label>
          <SketchPicker
            className="mt-3"
            color={fontColor}
            onChange={handleColorChange}
          />
          <Form.Label className="mt-5">
            <b>Impact Descriptions</b>
          </Form.Label>
          {effects.map((effect, index) => (
            <>
              <Row>
                <Col>
                  <Form.Label className="mt-1">
                    Description {index + 1}
                  </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col md lg="10">
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    value={effect}
                    onChange={(e) => handleFieldChange(index, e.target.value)}
                    className="mt-2"
                  />
                </Col>
                <Col md lg="2">
                  <Button
                    variant="danger"
                    onClick={() => handleClearField(index)}
                    className="mt-2"
                  >
                    <MdClear />
                  </Button>
                </Col>
              </Row>
            </>
          ))}
          <Row>
            <Col>
              <Button
                variant="info"
                className="mt-4"
                onClick={handleAddField}
                size="sm"
              >
                Add More Description
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md lg={1}></Col>
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
          {image && <img className="form-control" src={image} />}
        </Col>
      </Row>
      <Row>
        <Col md lg={12}>
          <Button className="mt-5" variant="success" onClick={handleCreate}>
            Add Impact
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

export default connect(mapStateToProps)(AddImpactComponent);
