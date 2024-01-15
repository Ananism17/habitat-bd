import { useState, useEffect } from "react";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

//pagination
import { PaginationControl } from "react-bootstrap-pagination-control";

//react-bootstrap
import { Container, Row, Col, Modal, Card, Spinner } from "react-bootstrap";

const VideoGridComponent = () => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [albumList, setAlbumList] = useState(null);

  //pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);

  //modal-variables
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");

  //modal-functions
  const openModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedVideo("");
  };

  //extract-video-ids
  const extractVideoIdFromYouTubeLink = (link) => {
    // Regular expression to match YouTube video URLs
    const regex = /[?&]v=([a-zA-Z0-9_-]+)/;
    const match = link.match(regex);

    if (match && match[1]) {
      return match[1];
    } else {
      // Handle invalid or unsupported URL formats
      return null;
    }
  };

  //photo-album-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/public/albums?type=video&page=" + page;
    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.status) {
          const updatedArray = res.data.data.data.map((item) => ({
            ...item,
            videoId: extractVideoIdFromYouTubeLink(item.description),
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

  return (
    <>
      {loader ? (
        <Container>
          <Row className="justify-content-center mt-3 mb-3">
            <Col xs lg="3" className="text-center">
              <Spinner animation="border" />
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <Container>
            <Row className="justify-content-center mb-3">
              <Col md lg={9}>
                <Row className="justify-content-center">
                  {albumList?.map((video) => (
                    <Col md lg={6} className="mt-4">
                      <Card className="video-card-container">
                        <div
                          key={video.id}
                          className="video-thumbnail"
                          onClick={() => openModal(video)}
                        >
                          <img
                            src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                            alt={`Video thumbnail for ${video.videoId}`}
                          />
                        </div>
                      </Card>
                      <h5>{video.title}</h5>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
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
          <Modal show={showModal} onHide={closeModal} width>
            <Modal.Header closeButton>
              <h4 className="mt-2">{selectedVideo.title}</h4>
            </Modal.Header>
            <Modal.Body>
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                allowFullScreen
                title="YouTube Video"
              ></iframe>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default VideoGridComponent;
