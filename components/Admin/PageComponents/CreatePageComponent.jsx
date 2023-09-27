import { useEffect, useState } from "react";
import Router from "next/router";
import Link from "next/link";

//redux
import { connect } from "react-redux";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";

//react-bootstraps
import { Row, Col, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//react-select
import Select from "react-select";

//react-toast
import { toast } from "react-toastify";

//icons
import { IoIosArrowBack } from "react-icons/io";

const CreatePageComponent = ({ token }) => {
  //post-variables
  const [name, setName] = useState(null);
  const [serial, setSerial] = useState(null);
  const [status, setStatus] = useState(1);

  //helper-variables
  const [pageList, setPageList] = useState([]);
  const [selectedParent, setSelectedParent] = useState("");

  //page-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/pages";
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status) {
          setPageList(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //handle-page-create
  const handleCreate = () => {
    const apiData = {
      name,
      serial,
      status,
      parent_id: selectedParent ? selectedParent.value : null,
    };
    const apiUrl = BASE_URL + "api/v1/pages";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(apiUrl, apiData, config)
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.message, {
            position: "top-right",
            theme: "colored",
          });
          Router.push({
            pathname: "/admin/pages",
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
        console.log(error.response);
      });
  };

  return (
    <>
      <Link href={"/admin/pages"}>
        <Button variant="secondary" size="sm" className="mb-3">
          <IoIosArrowBack /> Page List
        </Button>
      </Link>
      <h4 className="mt-2 mb-4">Create Page</h4>
      <Row>
        <Col md lg={4}>
          <Form.Label className="mt-4">Page Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name || ""}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Form.Label className="mt-4">Page Serial</Form.Label>
          <Form.Control
            type="number"
            placeholder="Serial"
            value={serial || ""}
            onChange={(e) => {
              setSerial(e.target.value);
            }}
          />
          <Form.Label className="mt-4">Parent Menu</Form.Label>
          <Select
            options={pageList.map((option) => ({
              label: option.name,
              value: option.id,
            }))}
            value={selectedParent}
            onChange={setSelectedParent}
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
            Create Page
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

export default connect(mapStateToProps)(CreatePageComponent);
