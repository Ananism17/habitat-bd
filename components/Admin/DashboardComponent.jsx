import Link from "next/link";
import { Card, Row, Col, Button } from "react-bootstrap";

import { TfiGallery } from "react-icons/tfi";
import { PiYoutubeLogoFill } from "react-icons/pi";
import { RiPagesFill } from "react-icons/ri";
import { FaPager } from "react-icons/fa";

const DashboardComponent = () => {
  return (
    <>
      <h4 className="mt-2 mb-4">Welcome to Habitat Dashboard</h4>
      <Row>
        {/* Albums */}
        <Col md lg={4}>
          <Card className="text-center" bg="light" text="black">
            <Card.Body>
              <Card.Title className="mb-4">Albums</Card.Title>

              <Link href="/admin/albums/photo-albums/create">
                <Button variant="dark">
                  <TfiGallery style={{ color: "white", marginRight: "10px" }} />
                  Create Photo Album
                </Button>
              </Link>

              <Link href="/admin/albums/video-albums/create" className="ms-3">
                <Button variant="dark">
                  <PiYoutubeLogoFill
                    style={{ color: "white", marginRight: "10px" }}
                  />
                  Add Youtube Video
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Pages */}
        <Col md lg={4}>
          <Card className="text-center" bg="light" text="black">
            <Card.Body>
              <Card.Title className="mb-4">Pages</Card.Title>

              <Link href="/admin/pages/create">
                <Button variant="dark">
                  <RiPagesFill
                    style={{ color: "white", marginRight: "10px" }}
                  />
                  Create Page
                </Button>
              </Link>

              <Link href="/admin/pages/page-contents/create" className="ms-3">
                <Button variant="dark">
                  <FaPager style={{ color: "white", marginRight: "10px" }} />
                  Add Page Content
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Contents */}
        <Col md lg={4}>
          <Card className="text-center" bg="light" text="black">
            <Card.Body>
              <Card.Title className="mb-4">News & Stories</Card.Title>

              <Link href="/admin/contents/create">
                <Button variant="dark">
                  <RiPagesFill
                    style={{ color: "white", marginRight: "10px" }}
                  />
                  Create Content
                </Button>
              </Link>

              <Link href="/admin/contents" className="ms-3">
                <Button variant="dark">
                  <FaPager style={{ color: "white", marginRight: "10px" }} />
                  Content List
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* Slider Images */}
        <Col md lg={4}>
          <Card className="text-center" bg="light" text="black">
            <Card.Body>
              <Card.Title className="mb-4">Slider Images</Card.Title>

              <Link href="/admin/sliders/create">
                <Button variant="dark">
                  <RiPagesFill
                    style={{ color: "white", marginRight: "10px" }}
                  />
                  Add Slider Image
                </Button>
              </Link>

              <Link href="/admin/sliders" className="ms-3">
                <Button variant="dark">
                  <FaPager style={{ color: "white", marginRight: "10px" }} />
                 Slider Image List
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardComponent;
