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
import { Button, Modal, Row, Col, Form } from "react-bootstrap";

//moment
import moment from "moment/moment";

//react-toast
import { toast } from "react-toastify";

//pagination
import { PaginationControl } from "react-bootstrap-pagination-control";

//icons
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const ContentListComponent = ({ token }) => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [contentList, setContentList] = useState(null);
  const [type, setType] = useState("");

  //delete-modal
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  //pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);

  //content-list
  useEffect(() => {
    setLoader(true);
    const apiUrl = BASE_URL + "api/v1/contents?type=" + type + "&page=" + page;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status) {
          const updatedArray = res.data.data.data.map((item) => ({
            ...item,
            cover_photo: BASE_URL + "storage/contents/" + item.cover_photo,
          }));
          setContentList(updatedArray);
          setTotal(res.data.data.total);
          setPerPage(res.data.data.per_page);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, type]);

  //delete-content
  const handleDelete = () => {
    setShowConfirmation(true);
  };
  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    deleteContent(deleteId);
  };
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };
  const deleteContent = (id) => {
    const apiUrl = BASE_URL + "api/v1/contents/delete";
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
          setContentList((prevContents) =>
            prevContents.filter((content) => content.id !== id)
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
          <h4>Content List</h4>
        </Col>
        <Col md lg={6}>
          <Link href={"/admin/contents//create"}>
            <Button variant="secondary" size="sm" className=" float-end">
              Create Content <IoIosArrowForward />
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="mt-2 mb-4">
        <Col md lg={3}>
          <Form.Select
            defaultValue={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="story">Story</option>
            <option value="news">News</option>
          </Form.Select>
        </Col>
      </Row>

      {loader ? (
        <Spinner animation="border" />
      ) : (
        <>
          {/* content-list */}
          <Table responsive="md" striped bordered hover>
            <thead>
              <tr className="table-info">
                <th>#</th>
                <th>Title</th>
                <th>Cover Photo</th>
                <th>Type</th>
                <th>Status</th>
                <th>Created</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contentList?.map((content, index) => (
                <tr key={index}>
                  <td>{index + 1 + (page - 1) * 20}</td>
                  <td>{content.title}</td>
                  <td>
                    {content.cover_photo && (
                      <img
                        src={content.cover_photo}
                        alt="Path not found!"
                        height={60}
                      />
                    )}
                  </td>
                  <td>
                    {content.type[0].toUpperCase() + content.type.slice(1)}
                  </td>
                  <td>
                    {content.status ? "Active" : "Inactive"}
                  </td>
                  <td>
                    {moment(content.created_at).format("DD MMM YYYY - hh:mm A")}
                  </td>
                  <td>
                    {moment(content.updated_at).format("DD MMM YYYY - hh:mm A")}
                  </td>
                  <td>
                    <Link
                      href={`/admin/contents/${content.id}`}
                      className="anchor"
                    >
                      <FaEdit className="ms-3" style={{ cursor: "pointer" }} />
                    </Link>
                    <FaTrash
                      className="ms-3"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        setDeleteId(content.id);
                        handleDelete();
                      }}
                    />
                    <Link
                      href={`/admin/contents/add-description/${content.id}`}
                      style={{ color: "black" }}
                    >
                      <FaPlus className="ms-3" style={{ cursor: "pointer" }} />
                    </Link>
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
              Are you sure you want to delete this content?
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

export default connect(mapStateToProps)(ContentListComponent);
