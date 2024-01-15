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
  const [impactList, setImpactList] = useState([]);
  const [length, setLength] = useState(0);

  //booleans
  const [loader, setLoader] = useState(true);

  //service-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/public/impact";

    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.status) {
          res.data.data?.map((item) => {
            item.image = `${BASE_URL}storage/impacts/${item.image}`;
            item.effects = JSON.parse(item.effects);
          });
          setImpactList(res.data.data);
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

  console.log(impactList);

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
                <h3>Impact</h3>
              </Col>
            </Row>
            <Row className="justify-content-center mt-5">
              {impactList?.map((impact, index) => (
                <>
                  {index % 2 === 0 && index != length && (
                    <Col lg={2} className="mb-3" />
                  )}{" "}
                  <Col key={index} md={4} className="mb-3">
                    <Card
                      className="impact-image-card"
                      style={{
                        backgroundImage: `url(${impact.image})`,
                        color: `${impact.font_color}`,
                      }}
                    >
                      <Card.Body>
                        <Card.Title className="impact-card-title">
                          {impact.header}
                        </Card.Title>
                        {impact.effects?.map((effect, index) => (
                          <Card.Text
                            key={index}
                            className="impact-card-effects"
                          >
                            {effect}
                          </Card.Text>
                        ))}
                      </Card.Body>
                    </Card>
                  </Col>
                  {index % 2 === 1 && <Col lg={2} className="mb-3" />}{" "}
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
