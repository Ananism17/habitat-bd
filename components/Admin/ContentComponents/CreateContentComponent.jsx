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

const CreateContentComponent = ({ token }) => {
  //post-variables
  const [title, setTitle] = useState(null);
  const [type, setType] = useState("story");
  const [status, setStatus] = useState(1);
  const [is_featured, setIsFeatured] = useState(0);
  const [category, setCategory] = useState(1);
  const [url, setUrl] = useState("");
  const [cover_photo, setCoverPhoto] = useState("");

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
    setCoverPhoto(result);
  };
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  //handle-album-create
  const handleCreate = () => {
    const apiData = {
      title,
      type,
      status,
      is_featured,
      category,
      cover_photo,
      url,
    };
    const apiUrl = BASE_URL + "api/v1/contents";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log(apiData);
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
              pathname: "/admin/contents",
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
      <Link href={"/admin/contents"}>
        <Button variant="secondary" size="sm" className="mb-3">
          <IoIosArrowBack /> Content List
        </Button>
      </Link>
      <h4 className="mt-2 mb-4">Create Content</h4>
      <Row>
        <Col md lg={4}>
          <Form.Label className="mt-4">Content Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title || ""}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Form.Label className="mt-4">Content Type</Form.Label>
          <Form.Select
            defaultValue={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="story">Story</option>
            <option value="news">News</option>
          </Form.Select>
          {type == "story" && (
            <>
              <Form.Label className="mt-4">Category</Form.Label>
              <Form.Select
                defaultValue={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value={1}>Homeowner Story</option>
                <option value={2}>Community Story</option>
                <option value={3}>Human of Habitat</option>
                <option value={4}>Supporter Story</option>
              </Form.Select>
            </>
          )}
          {type == "news" && (
            <>
              <Form.Label className="mt-4">News URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL"
                value={url || ""}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
            </>
          )}
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
          {type == "story" && (
            <>
              <Form.Label className="mt-4">Featured</Form.Label>
              <Form.Select
                value={is_featured}
                onChange={(e) => {
                  setIsFeatured(e.target.value);
                }}
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Form.Select>
            </>
          )}
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
      </Row>
      <Row>
        <Col md lg={12}>
          <Button
            className="mt-5"
            variant="success"
            size="sm"
            onClick={handleCreate}
          >
            Create Content
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

export default connect(mapStateToProps)(CreateContentComponent);
