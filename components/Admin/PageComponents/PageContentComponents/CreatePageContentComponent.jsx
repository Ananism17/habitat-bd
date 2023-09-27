import { useEffect, useState } from "react";
import Router from "next/router";
import Link from "next/link";

//redux
import { connect } from "react-redux";

//axios
import axios from "axios";
import { BASE_URL } from "../../../../base";

//react-bootstraps
import { Row, Col, Card, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//react-select
import Select from "react-select";

//react-toast
import { toast } from "react-toastify";

//icons
import { IoIosArrowBack } from "react-icons/io";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../../Services/MyEditor"), {
  ssr: false,
});

const CreatePageContentComponent = ({ token }) => {
  //post-variables
  const [title, setTitle] = useState("");

  //helper-variables
  const [pageContent, setPageContent] = useState(null);
  const [pageList, setPageList] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");

  //page-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/pages";
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status) {
          setPageList(
            res.data.data.filter(
              (item) => !item.children || item.children.length === 0
            )
          );
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

  //handle-page-content-create
  const handleCreate = () => {
    const content = manipulateContent(pageContent);

    const apiData = {
      title,
      id: selectedPage?.value,
      description: content.modifiedContent,
      content_photos: content.base64Images ? content.base64Images : [],
    };
    const apiUrl = BASE_URL + "api/v1/page-contents";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log(apiData);
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
              pathname: "/admin/pages/page-contents",
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
      <Link href={"/admin/pages/page-contents"}>
        <Button variant="secondary" size="sm" className="mb-3">
          <IoIosArrowBack /> Page Content List
        </Button>
      </Link>
      <h4>Create Page Content</h4>
      <Row>
        <Col md lg={4}>
          <Form.Label className="mt-4">Page Content Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title || ""}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Form.Label className="mt-4">Select Page</Form.Label>
          <Select
            options={pageList.map((option) => ({
              label: option.name,
              value: option.id,
            }))}
            value={selectedPage}
            onChange={setSelectedPage}
          />
        </Col>
        <Col md lg={8}>
          <Form.Label className="mt-4">Create Content</Form.Label>
          <Editor
            value=""
            onChange={(v) => {
              setPageContent(v);
            }}
          />
        </Col>
      </Row>
      <h4 className="mt-5">Preview Content</h4>
      <Container>
        <div
          className="mt-5"
          dangerouslySetInnerHTML={{ __html: pageContent }}
        ></div>
      </Container>
      <Row className="mt-5">
        <Col md lg={12}>
          <Button onClick={handleCreate} variant="info" className="mt-5">
            Create Page Content
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

export default connect(mapStateToProps)(CreatePageContentComponent);
