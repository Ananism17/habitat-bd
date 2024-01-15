import { useEffect, useState } from "react";
import Link from "next/link";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

//react-bootstrap
import { Row, Col, Container } from "react-bootstrap";

//html-filter
import DOMPurify from "dompurify";

//loader
import LoaderBox from "../Services/LoaderBox";

//not-ready-page
import UnderConstruction from "../Services/UnderConstruction";

const NewsDetailComponent = ({ slug }) => {
  //helper-variables
  const [loader, setLoader] = useState(true);
  const [newsDetails, setNewsDetails] = useState(null);

  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/public/contents/" + slug;
    axios
      .get(apiUrl)
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          res.data.data.sanitizedHTML = DOMPurify.sanitize(
            res.data.data.description
          );

          setNewsDetails(res.data.data);
          setLoader(false);
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
        <>
          <Container style={{ padding: "10px" }}>
            {/* <Row className="justify-content-center mt-3">
              <Col md lg={9} className="path-header">
                <small>
                  Publications /
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    href="/news"
                  >
                    {" "}News{" "}
                  </Link>
                  / {newsDetails?.title}
                </small>
              </Col>
            </Row> */}
            <Row className="justify-content-center mt-4">
              <Col md lg={9} className="header">
                <h3>{newsDetails?.title}</h3>
              </Col>
            </Row>

            {newsDetails.description == null && (
              <Row className="justify-content-center mt-5">
                <Col xs lg="9" className="text-center">
                  <UnderConstruction />
                </Col>
              </Row>
            )}

            <Row className="justify-content-center">
              <Col xs lg="9">
                <div
                  className="mt-5"
                  dangerouslySetInnerHTML={{
                    __html: newsDetails.sanitizedHTML,
                  }}
                ></div>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default NewsDetailComponent;
