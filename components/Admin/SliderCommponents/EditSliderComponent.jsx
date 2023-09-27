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

const EditSliderComponent = ({ id, token }) => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [sliderDetails, setSliderDetails] = useState(null);
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  //references
  const fileInputRef = useRef(null);

  //album-details
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/slider/" + +id;

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
            res.data.data.url
              ? setThumbnail(
                  BASE_URL + "storage/sliders/" + res.data.data.url
                )
              : setThumbnail("");
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
  
  const updateCaption = (newCaption) => {
    setSliderDetails({ ...sliderDetails, caption: newCaption });
  };
  const updateSerial = (newSerial) => {
    setSliderDetails({ ...sliderDetails, serial: newSerial });
  };
  const updateStatus = (newStatus) => {
    setSliderDetails({ ...sliderDetails, status: newStatus });
  };

  //update-url
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
    setUrl(result);
  };
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };


  //update-slider
  const handleUpdate = () => {
    const apiUrl = BASE_URL + "api/v1/slider/update";
    const apiData = {
      id,
      caption: sliderDetails.caption,
      serial: sliderDetails.serial,
      status: sliderDetails.status,
      url,
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
            pathname: "/admin/sliders",
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
      <Link href={"/admin/sliders"}>
        <Button variant="secondary" size="sm" className="mb-3">
          <IoIosArrowBack /> Slider Image List
        </Button>
      </Link>
      <h4 className="mt-2 mb-4">Update Slider</h4>
      {loader ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Row>
            <Col md lg={6}>
              <Form.Label className="mt-4">Slider Caption</Form.Label>
              <Form.Control
                type="text"
                placeholder="Caption"
                value={sliderDetails.caption || ""}
                onChange={(e) => {
                  updateCaption(e.target.value);
                }}
              />
              <Form.Label className="mt-4">Slider Serial</Form.Label>
              <Form.Control
                
                type="number"
                placeholder="Serial"
                value={sliderDetails.serial || ""}
                onChange={(e) => {
                  updateSerial(e.target.value);
                }}
              />
              <Form.Label className="mt-4">Status</Form.Label>
              <Form.Select
                value={sliderDetails.status}
                onChange={(e) => {
                  updateStatus(e.target.value);
                }}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </Form.Select>
              <Form.Label className="mt-4">Cover Photo</Form.Label>
              <Button
                variant="info"
                className="ms-4"
                onClick={handleBrowseClick}
                size="sm"
              >
                Edit Cover Photo
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  ref={fileInputRef}
                  onChange={onChange}
                />
              </Button>
              {url ? (
                <img className="form-control mt-3" src={url} />
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

export default connect(mapStateToProps)(EditSliderComponent);
