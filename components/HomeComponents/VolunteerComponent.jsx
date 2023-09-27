//react-bootstrap
import { Container, Row, Col, CardGroup, Card, Button } from "react-bootstrap";

//icons
import { AiOutlineEye } from "react-icons/ai";

const VolunteerComponent = () => {
  return (
    <div style={{ padding: "10px" }}>
      <Container className="mb-3">
        <Row className="justify-content-center">
          <Col xs lg="12" className="text-center mt-4">
            <h1>Volunteer & Get Involved!</h1>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs lg="8" className="text-center">
            <p style={{ fontSize: "20px" }}>
              See all our latest updates, announcements & upcoming volunteering
              opportunities in one place.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col md lg="9" className="text-center">
            <Row className="justify-content-center ">
                <CardGroup style={{ columnGap: "40px", rowGap: "10px" }}>
                  <Card style={{ border: "none" }}>
                    <div className="card-image-container">
                      <Card.Img
                        className="card-image"
                        variant="top"
                        src="/images/volunteer_card_image_3.webp"
                      />
                      <div className="card-title-overlay">
                        Project Homeworks
                      </div>
                    </div>
                    <Card.Body style={{ padding: "20px" }} className="mt-3">
                      <Card.Title>Project Homeworks</Card.Title>
                      <Card.Text className="text-start">
                        Every month, we set aside open sessions for individual
                        volunteers who are interested to join us for Project
                        HomeWorks.
                      </Card.Text>
                      <Card.Text className="text-start">
                        Please read through the information on our registration
                        form carefully for the next steps in confirming your
                        participation, as well as updated safety measures.
                      </Card.Text>
                      <Card.Text
                        className="text-start"
                        style={{ fontWeight: "bold" }}
                      >
                        Upcoming Slots:
                      </Card.Text>
                      <Card.Text
                        className="text-start"
                        style={{ fontStyle: "italic" }}
                      >
                        Coming Soon
                      </Card.Text>
                      <Card.Text
                        className="text-start"
                        style={{ color: "maroon" }}
                      >
                        Please note that all volunteers are required to be fully
                        vaccinated (14 days after second jab) before the actual
                        day of the session.
                      </Card.Text>
                    </Card.Body>
                    <Button
                      className="button-discover"
                      style={{ margin: "0px 70px" }}
                    >
                      Slots are Full
                    </Button>
                  </Card>
                  <Card style={{ border: "none" }}>
                    <div className="card-image-container">
                      <Card.Img
                        className="card-image"
                        variant="top"
                        src="/images/volunteer_card_image_2.webp"
                      />
                      <div className="card-title-overlay">BlockWalk</div>
                    </div>
                    <Card.Body style={{ padding: "20px" }} className="mt-3">
                      <Card.Title>BlockWalk</Card.Title>
                      <Card.Text className="text-start">
                        We may not be able to volunteer together as a group for
                        UnLitter Red Dot, but there is still a way for us to
                        take action and be the solution.
                      </Card.Text>
                      <Card.Text className="text-start">
                        Introducing BlockWalk: our virtual volunteering
                        opportunity to clean up your neighbourhood or favourite
                        green space.
                      </Card.Text>
                      <Card.Text className="text-start">
                        Join us virtually over Zoom every last Saturday of the
                        month in our mission to clear trash islandwide. Do it
                        alone or with your kids, family and friends. All you
                        will need is your mask, phone, plastic or garbage bags,
                        a BBQ tong or gloves - and the courage to step forward.
                      </Card.Text>
                      <Card.Text
                        className="text-start"
                        style={{ fontWeight: "bold" }}
                      >
                        Upcoming Sessions:
                      </Card.Text>

                      <Card.Text className="text-start">
                        <b>1. </b>
                        26 Aug 2023, Saturday, 7:30am to 9:30am, Islandwide
                      </Card.Text>
                    </Card.Body>
                    <Button
                      className="button-discover"
                      style={{ margin: "0px 70px" }}
                    >
                      Sign Up Here
                    </Button>
                  </Card>
                  <Card style={{ border: "none" }}>
                    <div className="card-image-container">
                      <Card.Img
                        className="card-image"
                        variant="top"
                        src="/images/volunteer_card_image.webp"
                      />
                      <div className="card-title-overlay">Sew Much Love</div>
                    </div>
                    <Card.Body style={{ padding: "20px" }} className="mt-3">
                      <Card.Title>Sew Much Love</Card.Title>
                      <Card.Text className="text-start">
                        Amidst this COVID-19 pandemic, coming together to
                        volunteer may be difficult, but that does not mean we
                        can’t find other ways to collaborate together as a
                        Habitat community to bring comfort and love into homes
                        of vulnerable families.
                      </Card.Text>
                      <Card.Text className="text-start">
                        Sew Much Love is an initiative by Habitat Singapore to
                        co-create Agape Blankets with our supporters, for
                        low-income families sheltering against colder seasons
                        around the region or vulnerable seniors in Singapore
                        feeling the strain of social isolation.
                      </Card.Text>
                      <Card.Text className="text-start">
                        There is no purer expression of love than Agape love -
                        selfless, all-giving & unconditional. With our Agape
                        Blankets, we can bring warmth, comfort and hope through
                        this practical and heartfelt gift.
                      </Card.Text>
                    </Card.Body>
                    <Button
                      className="button-discover"
                      style={{ margin: "0px 70px" }}
                    >
                      Join Here
                    </Button>
                  </Card>
                </CardGroup>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VolunteerComponent;
