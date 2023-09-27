import { useState } from "react";
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

const CreateVideoAlbumComponent = ({ token }) => {
  //post-variables
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [status, setStatus] = useState(1);

  //tooltip
  const [showTooltip, setShowTooltip] = useState(false);

  //tooltip-functions
  const handleFocus = () => {
    setShowTooltip(true);
  };
  const handleBlur = () => {
    setShowTooltip(false);
  };

  //handle-album-create
  const handleCreate = () => {
    const apiData = {
      title,
      description,
      type: "video",
      status
    };
    const apiUrl = BASE_URL + "api/v1/albums";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

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
            pathname: "/admin/albums/video-albums",
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
  };

  return (
    <>
      <Link href={"/admin/albums/video-albums"}>
        <Button variant="secondary" size="sm" className="mb-3">
          <IoIosArrowBack /> Video List
        </Button>
      </Link>
      <h4 className="mt-2 mb-4">Add Youtube Video</h4>
      <Row>
        <Col md lg={4}>
          <Form.Label className="mt-4">Video Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title || ""}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Form.Label className="mt-4">Video URL</Form.Label>
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id="tooltip">
                Format: https://www.youtube.com/watch?v=Q1VWUL0G0uU
              </Tooltip>
            }
          >
            <Form.Control
              type="text"
              placeholder="URL"
              value={description || ""}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </OverlayTrigger>
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
            Add Video
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

export default connect(mapStateToProps)(CreateVideoAlbumComponent);
