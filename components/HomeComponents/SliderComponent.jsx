import { useState, useEffect } from "react";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

//react-bootstrap
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

const SliderComponent = () => {
  //helper-variables
  const [index, setIndex] = useState(0);
  const [sliderImages, setSliderImages] = useState(null);

  //slider-mage-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/public/slider";

    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.status) {
          res.data.data?.map((item) => {
            item.path = `${BASE_URL}storage/sliders/${item.url}`;
          });
          setSliderImages(res.data.data);
        } else {
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //handle-slider
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs lg="12" className="text-center">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {sliderImages?.map((slider, index) => (
              <Carousel.Item key={index}>
                <div className="carousel-image-container">
                  <img
                    src={slider.path}
                    alt="First slide"
                    className="carousel-image"
                  />
                </div>

                <Carousel.Caption
                  style={{
                    background: "rgba(40, 180, 211, 0.8)",
                    borderRadius: "10px",
                  }}
                >
                  <h3>{slider.caption}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default SliderComponent;
