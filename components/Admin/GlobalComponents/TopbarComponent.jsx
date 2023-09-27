import Router from "next/router";

//react-bootstrap
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

//react-icons
import { FaBars } from "react-icons/fa";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";

//redux imports
import { useDispatch } from "react-redux";
import { logout } from "../../../store/actions/auth";
import { connect } from "react-redux";

function TopbarComponent({ handleToggleSidebar, token, name }) {
  //redux
  const dispatch = useDispatch();


  const submitHandler = () => {
    const apiUrl = BASE_URL + "api/v1/auth/logout";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(apiUrl, "", config)
      .then(() => {
        Router.push({
          pathname: "/admin/login",
        });
        dispatch(logout());
      })
      .catch((error) => {
        if (error.response?.status == 401) {
          dispatch(logout());
          Router.push({
            pathname: "/admin/login",
          });
        }
        console.log(error);
      });
  };

  return (
    <Navbar style={{ backgroundColor: "#3ae284" }}>
      {/* <Navbar.Brand href="#home">Habitat BD</Navbar.Brand> */}
      <Nav className="me-auto">
        <FaBars
          style={{ marginLeft: "50px" }}
          className="d-lg-none"
          onClick={() => handleToggleSidebar(true)}
        />
      </Nav>
      <Nav>
        <NavDropdown title={name} style={{ marginRight: "100px" }}>
          <NavDropdown.Item href="#">Profile</NavDropdown.Item>
          {/* <NavDropdown.Divider /> */}
          <NavDropdown.Item onClick={submitHandler}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    name: state.auth.user.name,
  };
};

export default connect(mapStateToProps)(TopbarComponent);
