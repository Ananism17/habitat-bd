import { useState } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";

//react-bootstraps
import { Row, Col, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//redux
import { connect } from "react-redux";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";

//react-toast
import { toast } from "react-toastify";

const Editor = dynamic(() => import("../../Services/MyEditor"), {
  ssr: false,
});

const CreatePledgeComponent = ({ token }) => {
  //post-variables
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(1);
  const [with_form, setWithForm] = useState(1);
  const [description, setDescription] = useState(null);

  const manipulateContent = (content) => {
    const base64Images = content.match(/data:image\/[^;]+;base64,([^"]+)"/g);

    const extractedImages = [];

    const base64Regex = /src="data:image\/[^;]+;base64,([^"]+)"/g;

    const modifiedContent = content.replace(
      base64Regex,
      (match, base64Image) => {
        extractedImages.push(base64Image);

        return `src="{{IMAGE_PLACEHOLDER_${extractedImages.length - 1}}}"`;
      }
    );

    return { modifiedContent, base64Images };
  };

  //handle-pledge-create
  const handleCreate = () => {
    const content = manipulateContent(description);
    const apiData = {
      title,
      message,
      description: content.modifiedContent,
      content_photos: content.base64Images ? content.base64Images : [],
      status,
      with_form
    };
    const apiUrl = BASE_URL + "api/v1/pledge";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (content.modifiedContent == "") {
      toast.error("Please create some Page Content!", {
        position: "top-right",
        theme: "colored",
      });
    } else {
      axios
        .post(apiUrl, apiData, config)
        .then((response) => {
          if (response.data.status) {
            toast.success(response.data.message, {
              position: "top-right",
              theme: "colored",
            });
            Router.push({
              pathname: "/admin/pledges",
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
      <h4 className="mt-2 mb-4">Add a Pledge</h4>
      <Row>
        <Col md lg={4}>
          <Form.Label className="mt-4">Pledge Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title || ""}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md lg={4}>
          <Form.Label className="mt-4">Pledge Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Message"
            value={message || ""}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md lg={4}>
          <Form.Label className="mt-4">Form</Form.Label>
          <Form.Select
            value={with_form}
            onChange={(e) => {
              setWithForm(e.target.value);
            }}
          >
            <option value={1}>With Form</option>
            <option value={0}>Without Form</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col md lg={4}>
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
        <Col md lg={8}>
          <Form.Label className="mt-4">Update Pledge Content</Form.Label>
          <Editor
            value={description ? description : ""}
            onChange={(v) => {
              setDescription(v);
            }}
          />
        </Col>
      </Row>
      <h4 className="mt-5">Content Preview</h4>
      <Container>
        <div
          className="mt-5"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </Container>

      <Row>
        <Col md lg={12}>
          <Button
            className="mt-5"
            variant="success"
            size="sm"
            onClick={handleCreate}
          >
            Add Pledge
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

export default connect(mapStateToProps)(CreatePledgeComponent);
