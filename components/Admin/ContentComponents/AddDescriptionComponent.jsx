import { useEffect, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";

//redux
import { connect } from "react-redux";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";

//react-bootstraps
import { Row, Col, Container, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//react-toast
import { toast } from "react-toastify";

//icons
import { IoIosArrowBack } from "react-icons/io";

const Editor = dynamic(() => import("../../Services/MyEditor"), {
  ssr: false,
});

const AddDescriptionComponent = ({ id, token }) => {
  //helper-variables
  const [contentDetails, setContentDetails] = useState(null);
  const [pageContent, setPageContent] = useState(null);
  const [loader, setLoader] = useState(true);

  //page-details
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/contents/" + id;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          setContentDetails(res.data.data);
          setPageContent(res.data.data.description);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //modify-image-src
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

  //handle-page-content-update
  const handleUpdate = () => {
    const content = manipulateContent(pageContent);

    const apiData = {
      id,
      description: content.modifiedContent,
      content_photos: content.base64Images ? content.base64Images : [],
    };
    const apiUrl = BASE_URL + "api/v1/contents/update-description";
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
      {loader ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Link href={"/admin/contents"}>
            <Button variant="secondary" size="sm" className="mb-3">
              <IoIosArrowBack /> Content List
            </Button>
          </Link>
          <h4>Update Page Content</h4>
          <Row>
            <Col md lg={8}>
              <Form.Label className="mt-4">Update Content</Form.Label>
              <Editor
                value={pageContent ? pageContent : ""}
                onChange={(v) => {
                  setPageContent(v);
                }}
              />
            </Col>
          </Row>
          <h4 className="mt-5">Content Preview</h4>
          <Container>
            <div
              className="mt-5"
              dangerouslySetInnerHTML={{ __html: pageContent }}
            ></div>
          </Container>

          <Row className="mt-2">
            <Col md lg={12}>
              <Button onClick={handleUpdate} variant="info">
                Update Page Content
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

export default connect(mapStateToProps)(AddDescriptionComponent);
