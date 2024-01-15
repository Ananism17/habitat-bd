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
import {  FaTrash } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BiDownload } from "react-icons/bi";

const ReportListComponent = ({ token }) => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [reportList, setReportList] = useState(null);

  //delete-modal
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  //pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);

  //album-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/report?page=" + page;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status) {
          const updatedArray = res.data.data.data.map((item) => ({
            ...item,
            file_url: BASE_URL + "storage/reports/" + item.file,
          }));
          setReportList(updatedArray);
          setTotal(res.data.data.total);
          setPerPage(res.data.data.per_page);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  //delete-album
  const handleDelete = () => {
    setShowConfirmation(true);
  };
  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    deleteReport(deleteId);
  };
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };
  const deleteReport = (id) => {
    const apiUrl = BASE_URL + "api/v1/report/delete";
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
          setReportList((prevAlbums) =>
            prevAlbums.filter((album) => album.id !== id)
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
          <h4>Report List</h4>
        </Col>
        <Col md lg={6}>
          <Link href={"/admin/reports/create"}>
            <Button variant="secondary" size="sm" className=" float-end">
              Add Report <IoIosArrowForward />
            </Button>
          </Link>
        </Col>
      </Row>

      {loader ? (
        <Spinner animation="border" />
      ) : (
        <>
          {/* album-list */}
          <Table responsive="md" striped bordered hover>
            <thead>
              <tr className="table-info">
                <th>#</th>
                <th>Title</th>
                <th>File</th>
                <th>Serial</th>
                <th>Status</th>
                <th>Uploaded At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reportList?.map((report, index) => (
                <tr key={index}>
                  <td>{index + 1 + (page - 1) * 20}</td>
                  <td>{report.name}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                    >
                      <a
                        href={report.file_url}
                        download={report.file_name}
                        target="_blank"
                        style={{
                          textDecoration: "none",
                          color: "white"
                        }}
                      >
                        <BiDownload /> Download File
                      </a>
                    </Button>
                  </td>
                  <td>{report.serial}</td>
                  <td>{report.status == "1" ? "Active" : "Inactive"}</td>
                  <td>
                    {moment(report.created_at).format("DD MMM YYYY - hh:mm A")}
                  </td>
                  <td>
                    <FaTrash
                      className="ms-3"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        setDeleteId(report.id);
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
            <Modal.Body>Are you sure you want to delete this album?</Modal.Body>
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

export default connect(mapStateToProps)(ReportListComponent);
