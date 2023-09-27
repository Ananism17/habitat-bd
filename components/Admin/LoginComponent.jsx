import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

//react-bootstrap
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

//react-toast
import { toast } from "react-toastify";

//redux imports
import { useDispatch } from "react-redux";
import { auth } from "../../store/actions/";

//icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginComponent = () => {
  //login-variables
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

   // REDUX
   const dispatch = useDispatch(auth(email, password));
   

  //boolean
  const [passwordVisible, setPasswordVisible] = useState(false);

  //password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  //login function
  const login = (e) => {
    e.preventDefault();
    dispatch(auth(email, password));
  };

  //signup function
  const signUp = () => {
    toast.error("Sign Up is Disabled right now!", {
      position: "top-right",
      theme: "colored",
    });
  };

  return (
    <>
      <div className="loginPage">
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="loginCard">
                <div className="frostedCircle">
                  <Image
                    src="/images/logo.png"
                    width={160}
                    height={80}
                    alt="Picture of the author"
                  />
                </div>
                <Card.Body>
                  {/* <h2 className="text-center mt-4">Login</h2> */}
                  <Form className="mt-5">
                    <Form.Group>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email || ""}
                        onChange={(e) => {setEmail(e.target.value)}}
                      />
                    </Form.Group>

                    <Form.Group className="mt-4">
                      <Form.Label>Password</Form.Label>
                      <div className="passwordInput">
                        <Form.Control
                          type={passwordVisible ? "text" : "password"}
                          placeholder="Password"
                          value={password || ""}
                          onChange={(e) => {setPassword(e.target.value)}}
                        />
                        <span
                          className="passwordIcon"
                          onClick={togglePasswordVisibility}
                        >
                          {passwordVisible ? (
                            <AiOutlineEyeInvisible />
                          ) : (
                            <AiOutlineEye />
                          )}
                        </span>
                      </div>
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="button-login mt-4"
                      onClick={login}
                    >
                      Sign In
                    </Button>
                  </Form>
                  <div className="signUpLink">
                    <p className="mt-4">
                      Don't have an account?{" "}
                      <span
                        style={{ color: "white", cursor: "pointer" }}
                        onClick={signUp}
                      >
                        Sign Up
                      </span>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="floating-button-container">
            <Link href="/">
              <Button className="button-website">Website</Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default LoginComponent;
