import { useState, useEffect } from "react";
import Link from "next/link";

//react-bootstrap
import { Container, Row, Col, Card } from "react-bootstrap";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

//loader
import LoaderBox from "../Services/LoaderBox";

//pagination
import { PaginationControl } from "react-bootstrap-pagination-control";

const StoryListComponent = () => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [storyList, setStoryList] = useState([]);

  //pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);

  //story-list
  useEffect(() => {
    setLoader(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const apiUrl = BASE_URL + "api/v1/public/contents?type=story&page=" + page;

    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.status) {
          setLoader(false);
          res.data.data.data?.map((item) => {
            item.url = `${BASE_URL}storage/contents/${item.cover_photo}`;
          });
          setStoryList(res.data.data.data);
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
                <small>News & Stories / Stories</small>
              </Col>
            </Row>
            <Row className="justify-content-center mt-4">
              <Col md lg={9} className="header">
                <h1>Stories</h1>
              </Col>
            </Row>
            <Row className="justify-content-center mt-4">
              <Col md lg={9} className="mb-3">
                <Row>
                  {storyList[0] && (
                    <Col md lg={12} className="mb-4">
                      <Card className="custom-card">
                        <Card.Img src={storyList[0]?.url} />
                        <div className="card-overlay">
                          <Card.Title className="card-title">
                            {storyList[0]?.title}
                          </Card.Title>
                          <Card.Text
                            style={{ fontSize: 12, cursor: "pointer" }}
                          ><Link
                          href={`/stories/${storyList[0]?.slug}`}
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          {`Read The Story →`}
                        </Link></Card.Text>
                        </div>
                      </Card>
                    </Col>
                  )}
                </Row>

                <Row>
                  {storyList[1] && (
                    <Col md lg={6} className="mb-4">
                      <Card className="custom-card">
                        <Card.Img src={storyList[1]?.url} />
                        <div className="card-overlay">
                          <Card.Title className="card-title">
                            {storyList[1]?.title}
                          </Card.Title>
                          <Card.Text
                            style={{ fontSize: 12, cursor: "pointer" }}
                          ><Link
                          href={`/stories/${storyList[1]?.slug}`}
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          {`Read The Story →`}
                        </Link></Card.Text>
                        </div>
                      </Card>
                    </Col>
                  )}
                  {storyList[2] && (
                    <Col md lg={6} className="mb-4">
                      <Card className="custom-card">
                        <Card.Img src={storyList[2]?.url} />
                        <div className="card-overlay">
                          <Card.Title className="card-title">
                            {storyList[2]?.title}
                          </Card.Title>
                          <Card.Text
                            style={{ fontSize: 12, cursor: "pointer" }}
                          ><Link
                          href={`/stories/${storyList[2]?.slug}`}
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          {`Read The Story →`}
                        </Link></Card.Text>
                        </div>
                      </Card>
                    </Col>
                  )}
                </Row>

                <Row>
                  {storyList[3] && (
                    <Col md lg={6} className="mb-4">
                      <Card className="custom-card">
                        <Card.Img src={storyList[3]?.url} />
                        <div className="card-overlay">
                          <Card.Title className="card-title">
                            {storyList[3]?.title}
                          </Card.Title>
                          <Card.Text
                            style={{ fontSize: 12, cursor: "pointer" }}
                          ><Link
                          href={`/stories/${storyList[3]?.slug}`}
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          {`Read The Story →`}
                        </Link></Card.Text>
                        </div>
                      </Card>
                    </Col>
                  )}
                  {storyList[4] && (
                    <Col md lg={6} className="mb-4">
                      <Card className="custom-card">
                        <Card.Img src={storyList[4]?.url} />
                        <div className="card-overlay">
                          <Card.Title className="card-title">
                            {storyList[4]?.title}
                          </Card.Title>
                          <Link href={`/stories/${storyList[4]?.slug}`}></Link>
                          <Card.Text
                            style={{ fontSize: 12, cursor: "pointer" }}
                          >
                            <Link
                              href={`/stories/${storyList[4]?.slug}`}
                              style={{ color: "white", textDecoration: "none" }}
                            >
                              {`Read The Story →`}
                            </Link>
                          </Card.Text>
                        </div>
                      </Card>
                    </Col>
                  )}
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

export default StoryListComponent;
