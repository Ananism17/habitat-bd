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

const SliderListComponent = ({ token }) => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [sliderList, setSliderList] = useState(null);

  //delete-modal
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  //slider-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/slider";
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          const updatedArray = res.data.data.map((item) => ({
            ...item,
            url: BASE_URL + "storage/sliders/" + item.url,
          }));
          setSliderList(updatedArray);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //delete-slider
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
    const apiUrl = BASE_URL + "api/v1/slider/delete";
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
          setSliderList((prevSliders) =>
          prevSliders.filter((slider) => slider.id !== id)
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
          <h4>Slider Image List</h4>
        </Col>
        <Col md lg={6}>
          <Link href={"/admin/sliders/create"}>
            <Button variant="secondary" size="sm" className=" float-end">
              Add Slider Image <IoIosArrowForward />
            </Button>
          </Link>
        </Col>
      </Row>

      {loader ? (
        <Spinner animation="border" />
      ) : (
        <>
          {/* slider-list */}
          <Table responsive="md" striped bordered hover>
            <thead>
              <tr className="table-info">
                <th>#</th>
                <th>Caption</th>
                <th>Slider Photo</th>
                <th>Status</th>
                <th>Serial</th>
                <th>Created</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sliderList?.map((slider, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{slider.caption}</td>
                  <td>
                    {slider.url && (
                      <img
                        src={slider.url}
                        alt="Path not found!"
                        height={60}
                      />
                    )}
                  </td>
                  <td>{slider.status == "1" ? "Active" : "Inactive"}</td>
                  <td>{slider.serial}</td>
                  <td>
                    {moment(slider.created_at).format("DD MMM YYYY - hh:mm A")}
                  </td>
                  <td>
                    {moment(slider.updated_at).format("DD MMM YYYY - hh:mm A")}
                  </td>
                  <td>
                    <Link
                      href={`/admin/sliders/${slider.id}`}
                      className="anchor"
                    >
                      <FaEdit className="ms-3" style={{ cursor: "pointer" }} />
                    </Link>
                    <FaTrash
                      className="ms-3"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        setDeleteId(slider.id);
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
            <Modal.Body>Are you sure you want to delete this slider?</Modal.Body>
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

export default connect(mapStateToProps)(SliderListComponent);
