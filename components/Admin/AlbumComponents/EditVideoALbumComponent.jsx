import { useEffect, useState } from "react";
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

const EditVideoALbumComponent = ({ id, token }) => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [albumDetails, setAlbumDetails] = useState(null);

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
  const updateStatus = (newStatus) => {
    setAlbumDetails({ ...albumDetails, status: newStatus });
  };

  //update-album
  const handleUpdate = () => {
    const apiUrl = BASE_URL + "api/v1/albums/update";
    const apiData = {
      id,
      title: albumDetails.title,
      description: albumDetails.description,
      status: albumDetails.status,
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
            pathname: "/admin/albums/video-albums",
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
      <Link href={"/admin/albums/video-albums"}>
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

export default connect(mapStateToProps)(EditVideoALbumComponent);
