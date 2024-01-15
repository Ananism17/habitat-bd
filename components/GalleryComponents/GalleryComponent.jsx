import { useEffect, useState } from "react";
import Link from "next/link";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";
import LoaderBox from "../Services/LoaderBox";

//react-bootstraps
import { Container, Row, Col, Modal, Button } from "react-bootstrap";

//react-multi-carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

//icons
import { IoMdClose } from "react-icons/io";

const GalleryComponent = ({ slug }) => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [albumDetails, setAlbumDetails] = useState(null);
  const [images, setImages] = useState([]);

  //responsive-dimensions-carousel
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  //modal-variables
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  //modal-functions
  const openModal = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  //album-details
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/public/albums/" + slug;

    console.log();

    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.status) {
          setLoader(false);
          setAlbumDetails(res.data.data);

          const temp = res.data.data.album_contents?.map((item) => {
            return {
              url: `${BASE_URL}storage/album-contents/${item.media_path}`,
            };
          });

          setImages(temp);
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
        <Container style={{ padding: "10px" }}>
          {/* <Row className="justify-content-center mt-3">
            <Col md lg={9} className="path-header">
              <small>
                <Link
                  href="/gallery"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Gallery
                </Link>{" "}
                / {albumDetails?.title}
              </small>
            </Col>
          </Row> */}
          <Row className="justify-content-center mt-4">
            <Col md lg={9} className="header">
              <h3>{albumDetails?.title}</h3>
            </Col>
          </Row>

          <Row className="justify-content-center mt-4">
            <Col xs lg="8" className="text-center">
              <p style={{ fontSize: "20px" }}>{albumDetails?.description}</p>
            </Col>
          </Row>

          <Row className="justify-content-center mt-3 mb-5">
            <Col md lg={9} className="text-center">
              <Carousel responsive={responsive} infinite={true}>
                {images.map((image, index) => (
                  <img
                    src={image.url}
                    alt={`image ${index}`}
                    className="image"
                    key={index}
                    onClick={() => openModal(index)}
                  />
                ))}
              </Carousel>
            </Col>
          </Row>

          {/* Modal to display the selected image */}
          <Modal show={showModal} onHide={closeModal} centered size="lg">
            <Modal.Body style={{ padding: 0 }}>
              <Button
                variant="outline-secondary"
                className="position-absolute top-0 end-0 m-3 glass-button"
                onClick={closeModal}
              >
                <IoMdClose />
              </Button>
              <img
                src={images[selectedImageIndex].url}
                alt={`image ${selectedImageIndex}`}
                style={{ width: "100%" }}
              />
            </Modal.Body>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default GalleryComponent;
