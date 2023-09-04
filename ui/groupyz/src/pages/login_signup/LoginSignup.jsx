import { useLocation } from "react-router-dom";
import "./styles/LoginSignup.css";
import Message from "./images/Message.svg";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";

const Login = () => {
  const location = useLocation();
  const isSignupRoute = location.pathname === "/signup";

  return (
    <loginsignup>
      <div class="container">
        <div class="loginSignupCompContainer">
          {isSignupRoute ? <SignupComponent /> : <LoginComponent />}
        </div>
        <div class="imageContainer">
          <img src={Message} alt="" />
        </div>
      </div>
    </loginsignup>
  );
};

export default Login;
