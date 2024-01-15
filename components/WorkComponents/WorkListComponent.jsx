import React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";

//react-bootstrap
import { Container, Row, Col, Card } from "react-bootstrap";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

//loader
import LoaderBox from "../Services/LoaderBox";

const WorkListComponent = () => {
  const [serviceList, setServiceList] = useState([]);
  const [length, setLength] = useState(0);

  //booleans
  const [loader, setLoader] = useState(true);

  //service-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/public/service";

    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.status) {
          res.data.data?.map((item) => {
            item.image = `${BASE_URL}storage/services/${item.image}`;
          });
          setServiceList(res.data.data);
          setLength(res.data.data.length - 1);
          setLoader(false);
        } else {
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {loader ? (
        <LoaderBox />
      ) : (
        <>
          <Container style={{ padding: "10px" }}>
            {/* <Row className="justify-content-center mt-3">
              <Col md lg={9} className="path-header">
                <small>Publications / Stories</small>
              </Col>
            </Row> */}
            <Row className="justify-content-center mt-4">
              <Col md lg={9} className="header">
                <h3>What We Do</h3>
              </Col>
            </Row>
            <Row className="justify-content-center mt-5">
              {serviceList?.map((service, index) => (
                <>
                  {index % 2 === 0 && index != length && (
                    <Col lg={2} className="mb-3" />
                  )}{" "}
                  {/* Add Col at the beginning for even index */}
                  <Col key={index} md={4} className="mb-3">
                    <Card className="image-card mt-4">
                      <Card.Img
                        variant="top"
                        src={service.image}
                        alt="Card background"
                        className="card-img"
                      />
                      <Card.Text className="caption">
                        <span className="caption-background">
                          {service.description}
                        </span>
                      </Card.Text>
                    </Card>
                  </Col>
                  {index % 2 === 1 && <Col lg={2} className="mb-3" />}{" "}
                  {/* Add Col at the end for odd index */}
                </>
              ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default WorkListComponent;
