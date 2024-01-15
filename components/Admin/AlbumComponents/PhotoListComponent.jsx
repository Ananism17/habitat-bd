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
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const PhotoListComponent = ({ token }) => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [albumList, setAlbumList] = useState(null);

  //delete-modal
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  //pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);

  //album-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/albums?type=photo&page=" + page;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status) {
          const updatedArray = res.data.data.data.map((item) => ({
            ...item,
            cover_photo: BASE_URL + "storage/albums/" + item.cover_photo,
          }));
          setAlbumList(updatedArray);
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
    deleteAlbum(deleteId);
  };
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };
  const deleteAlbum = (id) => {
    const apiUrl = BASE_URL + "api/v1/albums/delete";
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
          setAlbumList((prevAlbums) =>
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
          <h4>Photo Album List</h4>
        </Col>
        <Col md lg={6}>
          <Link href={"/admin/albums/photo-albums/create"}>
            <Button variant="secondary" size="sm" className=" float-end">
              Create Album <IoIosArrowForward />
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
                <th>Cover Photo</th>
                <th>Status</th>
                <th>Slug</th>
                <th>Created</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {albumList?.map((album, index) => (
                <tr key={index}>
                  <td>{index + 1 + (page - 1) * 20}</td>
                  <td>{album.title}</td>
                  <td>
                    {album.cover_photo && (
                      <img
                        src={album.cover_photo}
                        alt="Path not found!"
                        height={60}
                      />
                    )}
                  </td>
                  <td>{album.status == "1" ? "Active" : "Inactive"}</td>
                  <td>{album.slug}</td>
                  <td>
                    {moment(album.created_at).format("DD MMM YYYY - hh:mm A")}
                  </td>
                  <td>
                    {moment(album.updated_at).format("DD MMM YYYY - hh:mm A")}
                  </td>
                  <td>
                    <Link
                      href={`/admin/albums/photo-albums/${album.id}`}
                      className="anchor"
                    >
                      <FaEdit className="ms-3" style={{ cursor: "pointer" }} />
                    </Link>
                    <FaTrash
                      className="ms-3"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        setDeleteId(album.id);
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

export default connect(mapStateToProps)(PhotoListComponent);
