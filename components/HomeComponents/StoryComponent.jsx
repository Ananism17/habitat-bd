import { useState, useEffect } from "react";
import Link from "next/link";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

//react-bootstrap
import { Container, Row, Col, Card, Button } from "react-bootstrap";

//icons
import { AiOutlineEye } from "react-icons/ai";

const StoryComponent = () => {
  const [storyList, setStoryList] = useState([]);

  //story-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/public/contents/featured?type=story";

    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.status) {
          res.data.data?.map((item) => {
            item.url = `${BASE_URL}storage/contents/${item.cover_photo}`;
          });
          setStoryList(res.data.data);
        } else {
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ background: "#eaeaea", padding: "10px" }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs lg="12" className="text-center mt-4">
            <h1>Who We Serve</h1>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs lg="9" className="text-center">
            <p style={{ fontSize: "20px" }}>
              Read about the stories of families who are empowered
              to build a better life for themselves with safe and decent
              housing.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs lg="12" className="text-center">
            <Row className="justify-content-center g-4">
              {storyList.map(
                (story, index) =>
                  index < 3 && (
                    <Col md lg="3" key={index}>
                      <Link
                        href={`/stories/${story.slug}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <Card className="custom-story-card">
                          <Card.Img
                            variant="top"
                            src={story.url}
                            className="story-image"
                          />
                          <Card.Body style={{ padding: "20px" }}>
                            <Card.Title className="truncate-lines">
                              {story.title}
                            </Card.Title>
                            {/* <hr />
                            <Card.Text className="text-start">
                              <AiOutlineEye style={{ fontSize: "20px" }} />{" "}
                              {story.count}
                            </Card.Text> */}
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  )
              )}
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs lg="12" className="text-center mt-5 mb-3">
            <Link href="/stories">
              <Button className="button-discover">Discover More Stories</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StoryComponent;
