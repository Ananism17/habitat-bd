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

const CreatePhotoAlbum = ({ token }) => {
  //post-variables
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [cover_photo, setCoverPhoto] = useState("");
  const [album_photos, setAlbumPhotos] = useState([]);
  const [status, setStatus] = useState(1);

  //references
  const fileInputRef = useRef(null);
  const fileInputRefAlbum = useRef(null);

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
    setCoverPhoto(result);
  };
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // album-photos-upload
  const onAlbumChange = async (e) => {
    setAlbumPhotos([]);
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

  //handle-album-create
  const handleCreate = () => {
    const apiData = {
      title,
      description,
      type: 'photo',
      cover_photo,
      album_photos,
      status
    };
    const apiUrl = BASE_URL + "api/v1/albums";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if (cover_photo == "") {
      toast.error("Please select a Cover Photo!", {
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
              pathname: "/admin/albums/photo-albums",
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
      <Link href={"/admin/albums/photo-albums"}>
        <Button variant="secondary" size="sm" className="mb-3">
          <IoIosArrowBack /> Album List
        </Button>
      </Link>
      <h4 className="mt-2 mb-4">Create Photo Album</h4>
      <Row>
        <Col md lg={4}>
          <Form.Label className="mt-4">Album Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title || ""}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Form.Label className="mt-4">Album Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            placeholder="Description"
            value={description || ""}
            onChange={(e) => {
              setDescription(e.target.value);
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
          <Form.Label className="mt-5">Add Cover Photo</Form.Label>
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
              {cover_photo && (
                <img className="form-control mt-3" src={cover_photo} />
              )}
            </Col>
          </Row>
        </Col>
        <Col md lg={8}>
          <Form.Label className="mt-5">Add Album Photos</Form.Label>
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
          <Row>
            {album_photos.map((photo, index) => (
              <Col key={index} lg={4} md={12} sm={12} className="text-center">
                <Card className="card-container">
                  <Card.Img variant="top" src={photo} alt="Card image" />
                </Card>
              </Col>
            ))}
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
            Create Album
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

export default connect(mapStateToProps)(CreatePhotoAlbum);
