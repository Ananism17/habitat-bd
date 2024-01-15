import { useEffect, useState, useRef } from "react";
import Router from "next/router";
import Link from "next/link";

//redux
import { connect } from "react-redux";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";

//react-bootstraps
import { Row, Col, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//react-toast
import { toast } from "react-toastify";

//react-color
import { SketchPicker } from "react-color";

//icons
import { IoIosArrowBack } from "react-icons/io";
import { MdClear } from "react-icons/md";

const EditImpactComponent = ({ id, token }) => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [impactDetails, setImpactDetails] = useState(null);
  const [effects, setEffects] = useState([]);
  const [image, setImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  //references
  const fileInputRefImage = useRef(null);

  //album-details
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/impact/" + +id;

    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          setEffects(JSON.parse(res.data.data.effects));
          res.data.data.image
            ? setThumbnail(BASE_URL + "storage/impacts/" + res.data.data.image)
            : setThumbnail("");
          setImpactDetails(res.data.data);
          setLoader(false);
        } else {
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //handle-color-change
  const handleColorChange = (newColor) => {
    setImpactDetails({ ...impactDetails, font_color: newColor.hex });
  };

  //update-dynamic-values
  const updateHeader = (newHeader) => {
    setImpactDetails({ ...impactDetails, header: newHeader });
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

  //update-impact
  const handleUpdate = () => {
    const apiUrl = BASE_URL + "api/v1/impact/update";
    const apiData = {
      id,
      header: impactDetails.header,
      font_color: impactDetails.font_color,
      effects,
      image,
    };

    axios
      .post(apiUrl, apiData, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          toast.success(res.data.message, {
            position: "top-right",
            theme: "colored",
          });
          Router.push({
            pathname: "/admin/impacts",
          });
        } else {
          toast.error(res.data.message, {
            position: "top-right",
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        toast.error("Check Console for Error!", {
          position: "top-right",
          theme: "colored",
        });
        console.log(error);
      });
  };

  return (
    <>
      <Link href={"/admin/impacts"}>
        <Button variant="secondary" size="sm" className="mb-3">
          <IoIosArrowBack /> Impact List
        </Button>
      </Link>
      <h4 className="mt-2 mb-4">Update Impact</h4>
      {loader ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Row>
            <Col md lg={4}>
              <Form.Label className="mt-4">Impact Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="header"
                value={impactDetails.header || ""}
                onChange={(e) => {
                  updateHeader(e.target.value);
                }}
              />
              <Form.Label className="mt-4">Font Color</Form.Label>
              <SketchPicker
                className="mt-3"
                color={impactDetails.font_color || ""}
                onChange={handleColorChange}
              />
              <Form.Label className="mt-5">
                <b>Impact Descriptions</b>
              </Form.Label>
              {effects.map((effect, index) => (
                <>
                  <Row>
                    <Col>
                      <Form.Label className="mt-3">
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
                        onChange={(e) =>
                          handleFieldChange(index, e.target.value)
                        }
                        className="mt-1"
                      />
                    </Col>
                    <Col md lg="2">
                      <Button
                        variant="danger"
                        onClick={() => handleClearField(index)}
                        className="mt-1"
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
            <Col md lg={4}>
              <Form.Label className="mt-4">Icon</Form.Label>
              <Button
                variant="info"
                className="ms-4"
                onClick={handleBrowseClickImage}
                size="sm"
              >
                Edit Image
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  ref={fileInputRefImage}
                  onChange={onChangeImage}
                />
              </Button>
              {image ? (
                <img className="form-control mt-3" src={image} />
              ) : (
                <>
                  {thumbnail ? (
                    <img
                      className="form-control mt-3"
                      src={thumbnail}
                      alt="Path not found!"
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control input mt-3"
                      placeholder="Please upload a Image."
                      disabled
                    />
                  )}
                </>
              )}
            </Col>
          </Row>
          <Row>
            <Col md lg={12}>
              <Button
                className="mt-4"
                variant="success"
                size="sm"
                onClick={handleUpdate}
              >
                Update
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

export default connect(mapStateToProps)(EditImpactComponent);
