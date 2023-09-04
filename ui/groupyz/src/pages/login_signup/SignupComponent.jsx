import "./styles/LoginComponent.css";
import "./styles/SignupComponent.css";
import Button_c from "../../components/global/Button_c";
import google from "./images/google.svg";
import line from "./images/Line.svg";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SignupComponent = () => {
  const [name, setName] = useState([]);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value.split(" "));
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const post_users_to_db = () => {
    const data = JSON.stringify({
      first_name: name[0],
      last_name: name[1],
      email: email,
      password: password,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios.post("http://localhost:5050/user", data, config).catch((error) => {
      if (error.response) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  };

  return (
    <signupComponent>
      <loginComponent>
        <div class="signupContainer">
          <div class="row">
            <div class="welcomeContainer">Create an account</div>
          </div>
          <div class="row">
            <input type="text" placeholder="Name" onChange={handleNameChange} />
          </div>
          <div class="row">
            <input
              type="text"
              placeholder="Email"
              onChange={handleEmailChange}
            />
          </div>
          <div class="row">
            <input
              type="text"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <div class="row">
            <div class="loginButton">
              <Button_c name="Create account" onChange={post_users_to_db} />
            </div>
          </div>
          <div class="row">
            <div class="seperator">
              <img src={line} alt="seperator" />
              <div class="text">or</div>
            </div>
          </div>
          <div class="row">
            <div class="googleButton">
              <Button_c image={google} name="Log in with Google" />
            </div>
          </div>
          <div class="multRow">
            <div class="signup">already have an account?</div>
            <div class="signupButton">
              <Button_c variant="text" name="Log in" dest="./login" />
            </div>
          </div>
        </div>
      </loginComponent>
    </signupComponent>
  );
};

export default SignupComponent;
