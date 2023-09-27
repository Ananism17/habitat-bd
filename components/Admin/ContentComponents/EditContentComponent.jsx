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

const EditContentComponent = ({ id, token }) => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [contentDetails, setContentDetails] = useState(null);
  const [cover_photo, setCoverPhoto] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  //references
  const fileInputRef = useRef(null);

  //content-details
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/contents/" + +id;

    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          setLoader(false);
          setContentDetails(res.data.data);
          {
            res.data.data.cover_photo
              ? setThumbnail(
                  BASE_URL + "storage/contents/" + res.data.data.cover_photo
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
  const updateTitle = (newTitle) => {
    setContentDetails({ ...contentDetails, title: newTitle });
  };
  const updateType = (newType) => {
    setContentDetails({ ...contentDetails, type: newType });
  };
  const updateStatus = (newStatus) => {
    setContentDetails({ ...contentDetails, status: newStatus });
  };

  //update-cover-photo
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
    setCoverPhoto(result);
  };
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  //update-content
  const handleUpdate = () => {
    const apiUrl = BASE_URL + "api/v1/contents/update";
    const apiData = {
      id,
      title: contentDetails.title,
      type: contentDetails.type,
      status: contentDetails.status,
      cover_photo,
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
            pathname: "/admin/contents",
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
      <Link href={"/admin/contents"}>
        <Button variant="secondary" size="sm" className="mb-3">
          <IoIosArrowBack /> Content List
        </Button>
      </Link>
      <h4 className="mt-2 mb-4">Update Content</h4>
      {loader ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Row>
            <Col md lg={4}>
              <Form.Label className="mt-4">Content Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={contentDetails.title || ""}
                onChange={(e) => {
                  updateTitle(e.target.value);
                }}
              />
              <Form.Label className="mt-4">Content Type</Form.Label>
              <Form.Select
                defaultValue={contentDetails.type}
                onChange={(e) => {
                  updateType(e.target.value);
                }}
              >
                <option value="story">Story</option>
                <option value="news">News</option>
              </Form.Select>
              <Form.Label className="mt-4">Status</Form.Label>
              <Form.Select
                value={contentDetails.status}
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
              {cover_photo ? (
                <img className="form-control mt-3" src={cover_photo} />
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

export default connect(mapStateToProps)(EditContentComponent);
