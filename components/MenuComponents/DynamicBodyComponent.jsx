import { useEffect, useState } from "react";

//react-bootstrap
import { Container, Row, Col } from "react-bootstrap";

//redux
import { connect } from "react-redux";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

//html-filter
import DOMPurify from "dompurify";

//loader
import LoaderBox from "../Services/LoaderBox";

//not-ready-page
import UnderConstruction from "../Services/UnderConstruction";

const DynamicBodyComponent = ({ slug, token, path }) => {
  //helper-variables
  const [pageDetails, setPageDetails] = useState(null);
  const [loader, setLoader] = useState(true);

  //menu-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/public/pages/" + slug;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status) {
          {
            res.data.data.page_contents?.map((pc) => {
              pc.sanitizedHTML = DOMPurify.sanitize(pc.description);
            });
            setLoader(false);
          }
          setPageDetails(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);

  return (
    <>
      {loader ? (
        <LoaderBox />
      ) : (
        <Container style={{ padding: "10px" }}>
          <Row className="justify-content-center mt-3">
            <Col md lg={9} className="path-header">
              {path?.map((menu, index) => (
                <small key={index}>{`${menu} / `}</small>
              ))}
              <small>{pageDetails?.name}</small>
            </Col>
          </Row>

          <Row className="justify-content-center mt-4">
            <Col md lg={9} className="header">
              <h1>{pageDetails?.name}</h1>
            </Col>
            {/* <hr /> */}
          </Row>

          {pageDetails?.page_contents.length == 0 && (
            <Row className="justify-content-center mt-5">
              <Col xs lg="9" className="text-center">
                <UnderConstruction />
              </Col>
            </Row>
          )}

          <Row className="justify-content-center">
            <Col xs lg="9">
              {pageDetails?.page_contents?.map((PageContent, index) => (
                <div
                  key={index}
                  className="mt-5"
                  dangerouslySetInnerHTML={{
                    __html: PageContent.sanitizedHTML,
                  }}
                ></div>
              ))}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    path: state.menu.path,
  };
};

export default connect(mapStateToProps)(DynamicBodyComponent);
