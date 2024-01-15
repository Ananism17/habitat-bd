import Link from "next/link";
import { Card, Row, Col, Button } from "react-bootstrap";

import { TfiGallery } from "react-icons/tfi";
import { PiYoutubeLogoFill } from "react-icons/pi";
import { RiPagesFill } from "react-icons/ri";
import { FaPager } from "react-icons/fa";

const DashboardComponent = () => {
  return (
    <>
      <h4 className="mt-2">Welcome to Habitat Dashboard</h4>
      <Row>
        {/* Albums */}
        <Col md lg={4} className="mt-4">
          <Card className="text-center" bg="light" text="black">
            <Card.Body>
              <Card.Title className="mb-4">Albums</Card.Title>
              <Row>
                <Col md lg={6} className="text-lg-end mt-2">
                  <Link href="/admin/albums/photo-albums/create">
                    <Button variant="dark">
                      <TfiGallery
                        style={{ color: "white", marginRight: "10px" }}
                      />
                      Photo Album
                    </Button>
                  </Link>
                </Col>
                <Col md lg={6} className="text-lg-start mt-2">
                  <Link href="/admin/albums/video-albums/create">
                    <Button variant="dark">
                      <PiYoutubeLogoFill
                        style={{ color: "white", marginRight: "10px" }}
                      />
                      Youtube Video
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Pages */}
        <Col md lg={4} className="mt-4">
          <Card className="text-center" bg="light" text="black">
            <Card.Body>
              <Card.Title className="mb-4">Pages</Card.Title>

              <Row>
                <Col md lg={6} className="text-lg-end mt-2">
                  <Link href="/admin/pages/create">
                    <Button variant="dark">
                      <RiPagesFill
                        style={{ color: "white", marginRight: "10px" }}
                      />
                      Create Page
                    </Button>
                  </Link>
                </Col>
                <Col md lg={6} className="text-lg-start mt-2">
                  <Link href="/admin/pages/page-contents/create">
                    <Button variant="dark">
                      <FaPager
                        style={{ color: "white", marginRight: "10px" }}
                      />
                      Page Content
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Contents */}
        <Col md lg={4} className="mt-4">
          <Card className="text-center" bg="light" text="black">
            <Card.Body>
              <Card.Title className="mb-4">Publications</Card.Title>

              <Row>
                <Col md lg={6} className="text-lg-end mt-2">
                  <Link href="/admin/contents/create">
                    <Button variant="dark">
                      <RiPagesFill
                        style={{ color: "white", marginRight: "10px" }}
                      />
                      Add Content
                    </Button>
                  </Link>
                </Col>
                <Col md lg={6} className="text-lg-start mt-2">
                  <Link href="/admin/contents">
                    <Button variant="dark">
                      <FaPager
                        style={{ color: "white", marginRight: "10px" }}
                      />
                      Content List
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Slider Images */}
        <Col md lg={4} className="mt-4">
          <Card className="text-center" bg="light" text="black">
            <Card.Body>
              <Card.Title className="mb-4">Slider Images</Card.Title>

              <Row>
                <Col md lg={6} className="text-lg-end mt-2">
                  <Link href="/admin/sliders/create">
                    <Button variant="dark">
                      <RiPagesFill
                        style={{ color: "white", marginRight: "10px" }}
                      />
                      Add Image
                    </Button>
                  </Link>
                </Col>
                <Col md lg={6} className="text-lg-start mt-2">
                  <Link href="/admin/sliders">
                    <Button variant="dark">
                      <FaPager
                        style={{ color: "white", marginRight: "10px" }}
                      />
                      Image List
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Slider Images */}
        <Col md lg={4} className="mt-4">
          <Card className="text-center" bg="light" text="black">
            <Card.Body>
              <Card.Title className="mb-4">Services</Card.Title>

              <Row>
                <Col md lg={6} className="text-lg-end mt-2">
                  <Link href="/admin/services/create">
                    <Button variant="dark">
                      <RiPagesFill
                        style={{ color: "white", marginRight: "10px" }}
                      />
                      Add Service
                    </Button>
                  </Link>
                </Col>
                <Col md lg={6} className="text-lg-start mt-2">
                  <Link href="/admin/services">
                    <Button variant="dark">
                      <FaPager
                        style={{ color: "white", marginRight: "10px" }}
                      />
                      Service List
                    </Button>
                  </Link>
                </Col>

                
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Slider Images */}
        <Col md lg={4} className="mt-4">
          <Card className="text-center" bg="light" text="black">
            <Card.Body>
              <Card.Title className="mb-4">Pledges</Card.Title>

              <Row>
                <Col md lg={6} className="text-lg-end mt-2">
                  <Link href="/admin/pledges/create">
                    <Button variant="dark">
                      <RiPagesFill
                        style={{ color: "white", marginRight: "10px" }}
                      />
                      Add Pledge
                    </Button>
                  </Link>
                </Col>
                <Col md lg={6} className="text-lg-start mt-2">
                  <Link href="/admin/pledges">
                    <Button variant="dark">
                      <FaPager
                        style={{ color: "white", marginRighttoty: "10px" }}
                      />
                      Pledge List
                    </Button>
                  </Link>
                </Col>

                
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardComponent;
