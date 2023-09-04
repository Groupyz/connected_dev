import "../../styles/Header.css";
import Button_c from "./Button_c";

const LoginSignupButtons = () => {
  return (
    <div class="loginSignupContainer">
      <div class="loginButton">
        <Button_c name="Log in" dest="./login" />
      </div>
      <div class="signupButton">
        <Button_c name="Sign up" dest="./signup" />
      </div>
    </div>
  );
};

export default LoginSignupButtons;
