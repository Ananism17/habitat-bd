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

//icons
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const ImpactListComponent = ({ token }) => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [impactList, setImpactList] = useState(null);

  //delete-modal
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  //impact-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/impact";
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          const updatedArray = res.data.data.map((item) => ({
            ...item,
            image: BASE_URL + "storage/impacts/" + item.image,
          }));
          setImpactList(updatedArray);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //delete-impact
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
    const apiUrl = BASE_URL + "api/v1/impact/delete";
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
          setImpactList((prevSliders) =>
            prevSliders.filter((impact) => impact.id !== id)
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
          <h4>Impact List</h4>
        </Col>
        <Col md lg={6}>
          <Link href={"/admin/impacts/create"}>
            <Button variant="secondary" size="sm" className=" float-end">
              Add Impact <IoIosArrowForward />
            </Button>
          </Link>
        </Col>
      </Row>

      {loader ? (
        <Spinner animation="border" />
      ) : (
        <>
          {/* impact-list */}
          <Table responsive="md" striped bordered hover>
            <thead>
              <tr className="table-info">
                <th>#</th>
                <th>Header</th>
                <th>Font Color</th>
                <th>Image</th>
                <th>Created</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {impactList?.map((impact, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{impact.header}</td>
                  <td className="text-center">
                    <div className="circle-container" style={{ background: `${impact.font_color}` }}></div>
                  </td>
                  <td>
                    {impact.image && (
                      <img
                        src={impact.image}
                        alt="Path not found!"
                        height={60}
                      />
                    )}
                  </td>

                  <td>
                    {moment(impact.created_at).format("DD MMM YYYY - hh:mm A")}
                  </td>
                  <td>
                    {moment(impact.updated_at).format("DD MMM YYYY - hh:mm A")}
                  </td>
                  <td>
                    <Link
                      href={`/admin/impacts/${impact.id}`}
                      className="anchor"
                    >
                      <FaEdit className="ms-3" style={{ cursor: "pointer" }} />
                    </Link>
                    <FaTrash
                      className="ms-3"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        setDeleteId(impact.id);
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
            <Modal.Body>
              Are you sure you want to delete this impact?
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

export default connect(mapStateToProps)(ImpactListComponent);
