import { useState, useEffect } from "react";

//react-bootstrap
import { Container, Row, Col } from "react-bootstrap";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

import PopupComponent from "../WorkComponents/PopupComponent";

const WorkComponent = () => {
  const [serviceList, setServiceList] = useState([]);

  const [selectedService, setSelectedService] = useState(null);

  //modal-functions
  const handleServiceClick = (title, bodyText) => {
    setSelectedService({ title, bodyText });
  };
  const handleClose = () => {
    setSelectedService(null);
  };

  //service-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/public/service/featured";

    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.status) {
          res.data.data?.map((item) => {
            item.icon = `${BASE_URL}storage/services/${item.icon}`;
          });
          setServiceList(res.data.data);
        } else {
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs lg="9" className="text-center">
            <h1>How We Address the Needs</h1>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs lg="10" className="text-center">
            <p style={{ fontSize: "20px" }}>
              At Habitat for Humanity Bangladesh, we build homes to support
              families take control of their lives.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs lg="9" className="text-center">
            <Row>
              {serviceList?.map((service, index) => (
                <Col
                  md
                  key={index}
                  onClick={() =>
                    handleServiceClick(service.description, service.message)
                  }
                  style={{ cursor: "pointer" }}
                  className="work-container"
                >
                  <img
                    src={service.icon}
                    alt="service_icon"
                    height={100}
                    width={100}
                    style={{ borderRadius: "3px" }}
                    className="mt-1"
                  />
                  <p
                    style={{ fontSize: "17px" }}
                    className="mt-2"
                  >
                    {service.description}
                  </p>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      {selectedService && (
        <PopupComponent
          show={!!selectedService}
          handleClose={handleClose}
          title={selectedService.title}
          bodyText={selectedService.bodyText}
        />
      )}
    </div>
  );
};

export default WorkComponent;
