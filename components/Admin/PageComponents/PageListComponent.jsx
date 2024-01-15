import { useEffect, useState } from "react";
import Link from "next/link";

// redux
import { connect } from "react-redux";

// axios
import axios from "axios";
import { BASE_URL } from "../../../base";

//react-bootstrap
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { Button, Modal, Row, Col } from "react-bootstrap";

//react-toast
import { toast } from "react-toastify";

//icons
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const PageListComponent = ({ token }) => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [pageList, setPageList] = useState(null);

  //delete-modal
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

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
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //delete-page
  const handleDelete = () => {
    setShowConfirmation(true);
  };
  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    deletePage(deleteId);
  };
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };
  const deletePage = (id) => {
    const apiUrl = BASE_URL + "api/v1/pages/delete";
    const apiData = {
      id,
    };

    axios
      .post(apiUrl, apiData, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          setPageList((prevPage) => prevPage.filter((page) => page.id !== id));
          toast.success(res.data.message, {
            position: "top-right",
            theme: "colored",
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
      <Row className="mt-2 mb-4">
        <Col md lg={6}>
          <h4>Page List</h4>
        </Col>
        <Col md lg={6}>
          <Link href="/admin/pages/create">
            <Button variant="secondary" size="sm" className=" float-end">
              Create Page <IoIosArrowForward />
            </Button>
          </Link>
        </Col>
      </Row>

      {loader ? (
        <Spinner animation="border" />
      ) : (
        <>
          {/* page-list */}
          <Table responsive="md" striped bordered hover>
            <thead>
              <tr className="table-info">
                <th>#</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Serial</th>
                <th>Status</th>
                <th>Parent</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pageList?.map((page, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{page.name}</td>
                  <td>{page.slug}</td>
                  <td>{page.serial}</td>
                  <td>{page.status == "1" ? "Active" : "Inactive"}</td>
                  <td>{page.parent?.name}</td>
                  
                  <td>
                    <Link
                      href={`/admin/pages/${page.id}`}
                      className="anchor"
                    >
                      <FaEdit className="ms-3" style={{ cursor: "pointer" }} />
                    </Link>
                    <FaTrash
                      className="ms-3"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        setDeleteId(page.id);
                        handleDelete();
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* delete-modal */}
          <Modal show={showConfirmation} onHide={handleCancelDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this page?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCancelDelete}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleConfirmDelete}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
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

export default connect(mapStateToProps)(PageListComponent)