import "./styles/LoginComponent.css";
import Button_c from "../../components/global/Button_c";
import google from "./images/google.svg";
import line from "./images/Line.svg";

const LoginComponent = () => (
  <loginComponent>
    <div class="loginContainer">
      <div class="row">
        <div class="welcomeContainer">Welcome back!</div>
      </div>
      <div class="row">
        <div class="subWelcomeContainer">
          welcome back! please enter your details.
        </div>
      </div>
      <div class="row">
        <div class="googleButton">
          <Button_c image={google} name="Log in with Google" />
        </div>
      </div>
      <div class="row">
        <div class="seperator">
          <img src={line} alt="seperator" />
          <div class="text">or</div>
        </div>
      </div>
      <div class="row">
        <input type="text" placeholder="Email" />
      </div>
      <div class="row">
        <input type="text" placeholder="Password" />
      </div>
      <div class="multRow">
        <div class="label">
          <label>
            <input type="checkbox" />
            Keep me logged in
          </label>
        </div>
        <div class="forgotPassword">
          <Button_c variant="text" name="Forgot your password?" />
        </div>
      </div>
      <div class="row">
        <div class="loginButton">
          <Button_c name="Log in" />
        </div>
      </div>
      <div class="row">
        <div class="seperator">
          <img src={line} alt="seperator" />
          <div class="text">or</div>
        </div>
      </div>
      <div class="multRow">
        <div class="signup">Don't have an account?</div>
        <div class="signupButton">
          <Button_c variant="text" name="Sign up" dest="./signup" />
        </div>
      </div>
    </div>
  </loginComponent>
);

export default LoginComponent;
