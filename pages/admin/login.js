import { useEffect } from "react";
import { useRouter } from "next/router";

//components
import LoginComponent from "@/components/Admin/LoginComponent";

//redux imports
import { connect } from "react-redux";

const Login = ({ isLoggedIn }) => {
  //router
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/admin");
    }
  }, []);

  return <>{!isLoggedIn && <LoginComponent />}</>;
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.token,
  };
};

export default connect(mapStateToProps)(Login);
