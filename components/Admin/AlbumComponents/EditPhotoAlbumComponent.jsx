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

const EditPhotoAlbumComponent = ({ id, token }) => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [albumDetails, setAlbumDetails] = useState(null);
  const [cover_photo, setCoverPhoto] = useState("");
  const [albumContents, setAlbumContents] = useState(null);
  const [album_photos, setAlbumPhotos] = useState([]);
  const [thumbnail, setThumbnail] = useState("");

  //references
  const fileInputRef = useRef(null);
  const fileInputRefAlbum = useRef(null);

  //album-details
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/albums/" + +id;

    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          setLoader(false);
          setAlbumDetails(res.data.data);
          setAlbumContents(res.data.data.album_contents);
          {
            res.data.data.cover_photo
              ? setThumbnail(
                  BASE_URL + "storage/albums/" + res.data.data.cover_photo
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
    setAlbumDetails({ ...albumDetails, title: newTitle });
  };
  const updateDescription = (newDesc) => {
    setAlbumDetails({ ...albumDetails, description: newDesc });
  };
  const updateStatus = (newStatus) => {
    setAlbumDetails({ ...albumDetails, status: newStatus });
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

  // album-photos-upload
  const onAlbumChange = async (e) => {
    // setAlbumPhotos([]);
    let files = e.target.files || e.dataTransfer.files;
    if (files.length > 0) {
      uploadAlbumPhotos(files);
    }
  };
  const uploadAlbumPhotos = async (files) => {
    const uploadPromises = [];

    for (let i = 0; i < files.length; i++) {
      uploadPromises.push(uploadAlbumPhoto(files[i]));
    }

    try {
      const responses = await Promise.all(uploadPromises);
      // Update the albumPhotos state with the responses
      const albumResults = responses.map((response) => response.result);
      setAlbumPhotos((prevPhotos) => [...prevPhotos, ...albumResults]);
    } catch (err) {
      // Handle errors
      console.error(err);
    }
  };
  const uploadAlbumPhoto = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const response = await submitAlbumFile(reader.result, file.name);
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
  const submitAlbumFile = async (result, name) => {
    return { result, name };
  };
  const handleBrowseClickAlbum = () => {
    fileInputRefAlbum.current.click();
  };

  //delete-image
  const handleDeleteImage = (imageId) => {
    const apiUrl = BASE_URL + "api/v1/albums/image/delete";
    const apiData = {
      id: imageId,
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
          setAlbumContents((prevAlbums) =>
            prevAlbums.filter((album) => album.id !== imageId)
          );
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

  //remove-image
  const handleRemoveImage = (idx) => {
    const updatedPhotos = album_photos.filter((_, index) => index !== idx);
    setAlbumPhotos(updatedPhotos);
  };

  //update-album
  const handleUpdate = () => {
    const apiUrl = BASE_URL + "api/v1/albums/update";
    const apiData = {
      id,
      title: albumDetails.title,
      description: albumDetails.description,
      status: albumDetails.status,
      cover_photo,
      album_photos,
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
            pathname: "/admin/albums/photo-albums",
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
      <Link href={"/admin/albums/photo-albums"}>
        <Button variant="secondary" size="sm" className="mb-3">
          <IoIosArrowBack /> Album List
        </Button>
      </Link>
      <h4 className="mt-2 mb-4">Update Photo Album</h4>
      {loader ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Row>
            <Col md lg={4}>
              <Form.Label className="mt-4">Album Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={albumDetails.title || ""}
                onChange={(e) => {
                  updateTitle(e.target.value);
                }}
              />
              <Form.Label className="mt-4">Album Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder="Description"
                value={albumDetails.description || ""}
                onChange={(e) => {
                  updateDescription(e.target.value);
                }}
              />
              <Form.Label className="mt-4">Status</Form.Label>
              <Form.Select
                value={albumDetails.status}
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
            <Col md lg={8}>
              <Form.Label className="mt-4">Gallery Photos</Form.Label>
              <Row>
                {albumContents.length ? (
                  <>
                    {albumContents.map((photo) => (
                      <Col
                        key={photo.id}
                        lg={4}
                        md={12}
                        sm={12}
                        className="text-center"
                      >
                        <Card className="card-container">
                          <Card.Img
                            variant="top"
                            src={`${BASE_URL}storage/album-contents/${photo.media_path}`}
                            alt="Card image"
                          />
                          <div className="card-description">
                            <MdDelete
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                handleDeleteImage(photo.id);
                              }}
                            />
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </>
                ) : (
                  <>
                    <h6>No image added.</h6>
                  </>
                )}
              </Row>
              <Row>
                <Col md lg={12}>
                  <Form.Label className="mt-4">Add More Photos</Form.Label>
                  <Button
                    variant="info"
                    onClick={handleBrowseClickAlbum}
                    className="ms-4"
                    size="sm"
                  >
                    Browse Your Computer
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={onAlbumChange}
                      ref={fileInputRefAlbum}
                    />
                  </Button>
                </Col>
              </Row>
              <Row>
                {album_photos.map((photo, index) => (
                  <Col
                    key={index}
                    lg={4}
                    md={12}
                    sm={12}
                    className="text-center"
                  >
                    <Card className="card-container">
                      <Card.Img
                        variant="top"
                        src={photo}
                        alt="Card image"
                        className="form-control"
                      />
                      <div className="card-description">
                        <RxCross2
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            handleRemoveImage(index);
                          }}
                        />
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
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

export default connect(mapStateToProps)(EditPhotoAlbumComponent);
