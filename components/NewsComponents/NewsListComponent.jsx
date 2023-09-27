import { useState, useEffect } from "react";
import Link from "next/link";

//react-bootstrap
import { Container, Row, Col, Card, Button } from "react-bootstrap";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

//loader
import LoaderBox from "../Services/LoaderBox";

//pagination
import { PaginationControl } from "react-bootstrap-pagination-control";

const NewsListComponent = () => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [newsList, setNewsList] = useState([]);

  //pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);

  //news-list
  useEffect(() => {
    setLoader(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const apiUrl = BASE_URL + "api/v1/public/contents?type=news&page=" + page;

    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.status) {
          setLoader(false);
          res.data.data.data?.map((item) => {
            item.url = `${BASE_URL}storage/contents/${item.cover_photo}`;
          });
          setNewsList(res.data.data.data);
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

  return (
    <>
      {loader ? (
        <LoaderBox />
      ) : (
        <>
          <Container style={{ padding: "10px" }}>
            <Row className="justify-content-center mt-3">
              <Col md lg={9} className="path-header">
                <small>News & Stories / News</small>
              </Col>
            </Row>
            <Row className="justify-content-center mt-4">
              <Col md lg={9} className="header">
                <h1>News</h1>
              </Col>
            </Row>
            <Row className="justify-content-center mt-4">
              <Col md lg={9}>
                <Row>
                  {newsList.map((news, index) => (
                    <Col md lg={12} className="mb-4" key={index}>
                      <Card className="horizontal-card">
                        <div className="horizontal-card-image">
                          <img
                            src={`${BASE_URL}storage/contents/${news.cover_photo}`}
                            alt="Image"
                          />
                        </div>
                        <div className="horizontal-card-content">
                          <Card.Body>
                            <Card.Title>{news.title}</Card.Title>
                            <Button variant="dark" className="mt-5">
                              <Link
                                href={`/news/${news.slug}`}
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                              >
                                Read More →
                              </Link>
                            </Button>
                          </Card.Body>
                        </div>
                      </Card>
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
        </>
      )}
    </>
  );
};

export default NewsListComponent;
