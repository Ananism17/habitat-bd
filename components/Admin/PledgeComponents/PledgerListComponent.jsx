import React, { useEffect, useState } from "react";
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

//icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const PledgerListComponent = ({ token, id }) => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [pledgerList, setPledgerList] = useState(null);
  const [pledgeDetails, setPledgeDetails] = useState(null);

  //pledger-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/pledge/" + id;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status) {
          setPledgerList(res.data.data.pledgers);
          setPledgeDetails(res.data.data);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Row className="mt-2 mb-4">
        <Col md lg={6}>
          <Link href={`/admin/pledges/${id}`}>
            <Button variant="secondary" size="sm">
              <IoIosArrowBack /> View Pledge
            </Button>
          </Link>
        </Col>
        <Col md lg={6}>
          <Link href={"/admin/pledges"}>
            <Button variant="secondary" size="sm" className=" float-end">
              Pledge List <IoIosArrowForward />
            </Button>
          </Link>
        </Col>
      </Row>

      {loader ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Row className="mt-2 mb-2">
            <Col md lg={6}>
              <h4>Pledge Details</h4>
            </Col>
          </Row>
          <Row>
            <Col md lg={12} className="mb-1">
              <h6>Title: {pledgeDetails?.title}</h6>
            </Col>
          </Row>
          <Row>
            <Col md lg={12} className="mb-3">
              <h6>Message: {pledgeDetails?.message}</h6>
            </Col>
          </Row>
          <Row className="mt-2 mb-4">
            <Col md lg={6}>
              <h4>Pledger List</h4>
            </Col>
          </Row>

          {/* pledger-list */}
          {pledgeDetails?.with_form != 0  ? (
            <>
              <Table responsive="md" striped bordered hover>
                <thead>
                  <tr className="table-info">
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Feedback</th>
                    <th>Pledging Time</th>
                  </tr>
                </thead>
                <tbody>
                  {pledgerList?.map((pledge, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{pledge.first_name}</td>
                      <td>{pledge.last_name}</td>
                      <td>{pledge.email}</td>
                      <td>{pledge.feedback}</td>
                      <td>
                        {moment(pledge.created_at).format(
                          "DD MMM YYYY - hh:mm A"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <>
              <h4>This pledge does not have a form</h4>
            </>
          )}
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

export default connect(mapStateToProps)(PledgerListComponent);
