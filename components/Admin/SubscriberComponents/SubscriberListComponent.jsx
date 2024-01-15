import { useEffect, useState } from "react";
import Link from "next/link";

//redux
import { connect } from "react-redux";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";

//react-bootstrap
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { Button, Modal, Row, Col } from "react-bootstrap";

//moment
import moment from "moment/moment";

//react-toast
import { toast } from "react-toastify";

//pagination
import { PaginationControl } from "react-bootstrap-pagination-control";

//icons
import { FaTrash } from "react-icons/fa";

const SubscriberListComponent = ({ token }) => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [subscriberList, setSubscriberList] = useState(null);

  //delete-modal
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  //pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);

  //subscriber-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/subscriber?page=" + page;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          setSubscriberList(res.data.data.data);
          setTotal(res.data.data.total);
          setPerPage(res.data.data.per_page);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  //delete-subscriber
  const handleDelete = () => {
    setShowConfirmation(true);
  };
  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    deleteSlider(deleteId);
  };
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };
  const deleteSlider = (id) => {
    const apiUrl = BASE_URL + "api/v1/subscriber/delete";
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
          setSubscriberList((prevSliders) =>
          prevSliders.filter((subscriber) => subscriber.id !== id)
          );
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
          <h4>Subscriber List</h4>
        </Col>
      </Row>

      {loader ? (
        <Spinner animation="border" />
      ) : (
        <>
          {/* subscriber-list */}
          <Table responsive="md" striped bordered hover>
            <thead>
              <tr className="table-info">
                <th>#</th>
                <th>Email</th>
                <th>Created</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subscriberList?.map((subscriber, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{subscriber.email}</td>
                  <td>
                    {moment(subscriber.created_at).format("DD MMM YYYY - hh:mm A")}
                  </td>
                  <td>
                    {moment(subscriber.updated_at).format("DD MMM YYYY - hh:mm A")}
                  </td>
                  <td>
                    <FaTrash
                      className="ms-3"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        setDeleteId(subscriber.id);
                        handleDelete();
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* pagination */}
          <PaginationControl
            page={page}
            // between={4}
            total={total}
            limit={perPage}
            changePage={(page) => {
              setPage(page);
            }}
            ellipsis={1}
          />


          {/* delete-modal */}
          <Modal show={showConfirmation} onHide={handleCancelDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this subscriber?</Modal.Body>
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

export default connect(mapStateToProps)(SubscriberListComponent);
