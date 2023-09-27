import { useEffect, useState } from "react";
import Link from "next/link";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

//pagination
import { PaginationControl } from "react-bootstrap-pagination-control";

//react-bootstrap
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Card,
  Spinner,
} from "react-bootstrap";

//react-icons
import { AiOutlineSearch } from "react-icons/ai";

const PhotoGridComponent = () => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [albumList, setAlbumList] = useState(null);

  //pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);

  //photo-album-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/public/albums?type=photo&page=" + page;
    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.status) {
          const updatedArray = res.data.data.data.map((item) => ({
            ...item,
            cover_photo: BASE_URL + "storage/albums/" + item.cover_photo,
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
        <Container>
          {/* Search Bar */}
          {/* <Row className="justify-content-end mt-3 mb-3">
            <Col xs lg="3" className="text-center">
              <Form className="rounded-pill border">
                <div className="position-relative">
                  <div
                    className="position-absolute"
                    style={{
                      top: "50%",
                      transform: "translateY(-50%)",
                      left: "10px",
                    }}
                  >
                    <AiOutlineSearch className="text-muted" />
                  </div>
                  <FormControl
                    type="text"
                    placeholder="Search the Gallery"
                    className="pl-5 pr-3 rounded-pill"
                    style={{ paddingLeft: "40px" }}
                  />
                </div>
              </Form>
            </Col>
          </Row> */}

          {/* Grid of Photos */}
          <Row className="justify-content-center">
            <Col md lg={9}>
              <Row className="justify-content-center">
                {albumList?.map((album) => (
                  <Col
                    key={album.id}
                    lg={4}
                    md={6}
                    sm={12}
                    className="text-center"
                  >
                    <Link href={`/gallery/${album.slug}`}>
                      <Card className="card-container">
                        <Card.Img
                          variant="top"
                          src={album.cover_photo}
                          alt="Card image"
                        />
                        <div className="card-description">
                          {album.description}
                        </div>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

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
      )}
    </>
  );
};

export default PhotoGridComponent;
