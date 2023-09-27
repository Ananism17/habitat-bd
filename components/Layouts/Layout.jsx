import React, { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";

//react
import { useState, useEffect } from "react";

//redux
import { connect } from "react-redux";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

//react-bootstrap
import { Button } from "react-bootstrap";

//components
import Navbar from "../GlobalComponents/NavbarComponent";
import FooterComponent from "../GlobalComponents/FooterComponent";

const Layout = ({ children, token }) => {
  const [menuList, setMenuList] = useState([]);
  const [loader, setLoader] = useState(true);

  //menu-list
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/public/pages";
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status) {
          setMenuList(res.data.data);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!loader) {
    return (
      <Fragment>
        <Head>
          <title>Habitat BD</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar menuList={menuList} />
        <div className="content-holder">{children}</div>
        <div className="floating-button-container">
          <Link href="/admin">
            <Button className="button-discover">ADMIN LOGIN</Button>
          </Link>
        </div>
        <FooterComponent />
      </Fragment>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Layout);
