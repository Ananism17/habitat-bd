import { useEffect, useState, useRef } from "react";
import Router from "next/router";
import Link from "next/link";

//redux
import { connect } from "react-redux";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";

//react-bootstraps
import { Row, Col, Spinner, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//react-toast
import { toast } from "react-toastify";

//icons
import { IoIosArrowBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const EditServiceComponent = ({ id, token }) => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [sliderDetails, setSliderDetails] = useState(null);
  const [icon, setIcon] = useState("");
  const [image, setImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");

  //references
  const fileInputRef = useRef(null);
  const fileInputRefImage = useRef(null);

  //album-details
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/service/" + +id;

    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          setLoader(false);
          setSliderDetails(res.data.data);
          {
            res.data.data.icon
              ? setThumbnail(
                  BASE_URL + "storage/services/" + res.data.data.icon
                )
              : setThumbnail("");
            res.data.data.image
              ? setThumbnailImage(
                  BASE_URL + "storage/services/" + res.data.data.image
                )
              : setThumbnailImage("");
          }
        } else {
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //update-dynamic-values
  
  const updateDescription = (newDescription) => {
    setSliderDetails({ ...sliderDetails, description: newDescription });
  };
  const updateSerial = (newSerial) => {
    setSliderDetails({ ...sliderDetails, serial: newSerial });
  };
  const updateMessage = (newMessage) => {
    setSliderDetails({ ...sliderDetails, message: newMessage });
  };

  //update-icon
  const onChange = async (e) => {
    let files = e.target.files || e.dataTransfer.files;
    // console.log(files);
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
    // console.log(result, name);
    setIcon(result);
  };
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  //update-image
  const onChangeImage = async (e) => {
    let files = e.target.files || e.dataTransfer.files;
    // console.log(files);
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
    // console.log(result, name);
    setImage(result);
  };
  const handleBrowseClickImage = () => {
    fileInputRefImage.current.click();
  };


  //update-service
  const handleUpdate = () => {
    const apiUrl = BASE_URL + "api/v1/service/update";
    const apiData = {
      id,
      description: sliderDetails.description,
      serial: sliderDetails.serial,
      message: sliderDetails.message,
      icon,
      image
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
            pathname: "/admin/services",
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
      <Link href={"/admin/services"}>
        <Button variant="secondary" size="sm" className="mb-3">
          <IoIosArrowBack /> Service Image List
        </Button>
      </Link>
      <h4 className="mt-2 mb-4">Update Service</h4>
      {loader ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Row>
            <Col md lg={4}>
              <Form.Label className="mt-4">Service Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descrition"
                value={sliderDetails.description || ""}
                onChange={(e) => {
                  updateDescription(e.target.value);
                }}
              />
              <Form.Label className="mt-4">Service Serial</Form.Label>
              <Form.Control
                
                type="number"
                placeholder="Serial"
                value={sliderDetails.serial || ""}
                onChange={(e) => {
                  updateSerial(e.target.value);
                }}
              />
              <Form.Label className="mt-4">Service Popup Message</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={3}
                placeholder="Descrition"
                value={sliderDetails.message || ""}
                onChange={(e) => {
                  updateMessage(e.target.value);
                }}
              />
              <Form.Label className="mt-4">Icon</Form.Label>
              <Button
                variant="info"
                className="ms-4"
                onClick={handleBrowseClick}
                size="sm"
              >
                Edit Icon
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  ref={fileInputRef}
                  onChange={onChange}
                />
              </Button>
              {icon ? (
                <img className="form-control mt-3" src={icon}/>
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
              <Form.Label className="mt-4">Image</Form.Label>
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
                <img className="form-control mt-3" src={image}/>
              ) : (
                <>
                  {thumbnailImage ? (
                    <img
                      className="form-control mt-3"
                      src={thumbnailImage}
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

export default connect(mapStateToProps)(EditServiceComponent);
