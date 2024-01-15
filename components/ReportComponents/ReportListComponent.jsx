import { useState, useEffect, useRef } from "react";
import Link from "next/link";

//react-bootstrap
import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

//loader
import LoaderBox from "../Services/LoaderBox";

//pagination
import { PaginationControl } from "react-bootstrap-pagination-control";

//icons
import { IoMdClose } from "react-icons/io";
import { BiDownload } from "react-icons/bi";


const ReportListComponent = () => {
  //helper-variables
  const [loader, setLoader] = useState(false);
  const [reportList, setReportList] = useState([]);
  const [title, setTitle] = useState(null);
  const [url, setUrl] = useState("");

  //boolean
  const [showModal, setShowModal] = useState(false);

  //pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);


  // reports-list
  useEffect(() => {
    setLoader(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const apiUrl = BASE_URL + "api/v1/public/report?page=" + page;

    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.status) {
          setLoader(false);
          const updatedArray = res.data.data.data.map((item) => ({
            ...item,
            file_url: BASE_URL + "storage/reports/" + item.file,
          }));
          setReportList(updatedArray);
          setTotal(res.data.data.total);
          setPerPage(res.data.data.per_page);
        } else {
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  // handle-modal
  const handleModal = (item) => {
    setTitle(item.name);
    setUrl(item.file_url);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {loader ? (
        <LoaderBox />
      ) : (
        <>
          <Container style={{ padding: "10px" }}>
            {/* <Row className="justify-content-center mt-3">
              <Col md lg={9} className="path-header">
                <small>Publications / Reports</small>
              </Col>
            </Row> */}
            <Row className="justify-content-center mt-4">
              <Col md lg={9} className="header">
                <h3>Reports</h3>
              </Col>
            </Row>
            <Row className="justify-content-center mt-4">
              <Col md lg={9}>
                <Table responsive="md" striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Preview</th>
                      <th>Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportList?.map((report, index) => (
                      <tr key={index}>
                        <td>{report.name}</td>
                        <td>
                          <iframe src={report.file_url} width={500} />
                        </td>
                        <td>
                          <Button
                            variant="success"
                            onClick={(e) => {
                              handleModal(report);
                            }}
                          >
                            {/* <a
                              href={report.file_url}
                              target="_blank"
                              style={{
                                textDecoration: "none",
                                color: "white",
                              }}
                            >
                          </a> */}
                            <BiDownload />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>

            <Modal
              show={showModal}
              onHide={handleClose}
              centered
              contentClassName="popup"
            >
              <Modal.Header>{title}</Modal.Header>
              <Modal.Body>
                <Row>
                  <Col className="mt-2">
                    Do you want to Download the report?
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-4">
                    <a
                      href={url}
                      style={{
                        textDecoration: "none",
                        color: "white",
                      }}
                      target="_blank"
                    >
                      <Button
                        variant="success"
                        className="float-end"
                        onClick={handleClose}
                      >
                        Yes
                      </Button>
                    </a>

                    <Button
                      variant="danger"
                      className="float-end me-2"
                      onClick={handleClose}
                    >
                      No
                    </Button>
                  </Col>
                </Row>
              </Modal.Body>
            </Modal>

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
          </Container>
        </>
      )}
    </>
  );
};

export default ReportListComponent;
