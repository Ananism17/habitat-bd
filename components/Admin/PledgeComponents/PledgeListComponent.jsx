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

//pagination
import { PaginationControl } from "react-bootstrap-pagination-control";

//moment
import moment from "moment/moment";

//react-toast
import { toast } from "react-toastify";

//icons
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdPreview } from "react-icons/md";

const PledgeListComponent = ({ token }) => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [pledgeList, setPledgeList] = useState(null);

  //pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);

  //delete-modal
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  //pledge-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/pledge?page=" + page;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          setPledgeList(res.data.data.data);
          setTotal(res.data.data.total);
          setPerPage(res.data.data.per_page);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  //delete-pledge
  const handleDelete = () => {
    setShowConfirmation(true);
  };
  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    deletePledge(deleteId);
  };
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };
  const deletePledge = (id) => {
    const apiUrl = BASE_URL + "api/v1/pledge/delete";
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
          setPledgeList((prevSliders) =>
            prevSliders.filter((pledge) => pledge.id !== id)
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
          <h4>Pledge List</h4>
        </Col>
        <Col md lg={6}>
          <Link href={"/admin/pledges/create"}>
            <Button variant="secondary" size="sm" className=" float-end">
              Add Pledge <IoIosArrowForward />
            </Button>
          </Link>
        </Col>
      </Row>

      {loader ? (
        <Spinner animation="border" />
      ) : (
        <>
          {/* pledge-list */}
          <Table responsive="md" striped bordered hover>
            <thead>
              <tr className="table-info">
                <th>#</th>
                <th>Title</th>
                <th>Message</th>
                <th>Form</th>
                <th>Status</th>
                <th>Created</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pledgeList?.map((pledge, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{pledge.title}</td>
                  <td>{pledge.message}</td>
                  <td>{pledge.with_form ? "Yes" : "No"}</td>
                  <td>{pledge.status == "1" ? "Active" : "Inactive"}</td>
                  <td>
                    {moment(pledge.created_at).format("DD MMM YYYY - hh:mm A")}
                  </td>
                  <td>
                    {moment(pledge.updated_at).format("DD MMM YYYY - hh:mm A")}
                  </td>
                  <td>
                    <Link
                      href={`/admin/pledges/${pledge.id}`}
                      className="anchor"
                    >
                      <MdPreview className="ms-3" style={{ cursor: "pointer" }} />
                    </Link>
                    <Link
                      href={`/admin/pledges/update/${pledge.id}`}
                      className="anchor"
                    >
                      <FaEdit className="ms-3" style={{ cursor: "pointer" }} />
                    </Link>
                    <FaTrash
                      className="ms-3"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        setDeleteId(pledge.id);
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
            <Modal.Body>
              Are you sure you want to delete this pledge?
            </Modal.Body>
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

export default connect(mapStateToProps)(PledgeListComponent);
