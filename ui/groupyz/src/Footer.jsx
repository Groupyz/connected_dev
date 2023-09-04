import "./styles/Footer.css";
import Logo from "./assets/images/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const showToastMessage = () => {
    toast.error("Not supported!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <footer>
      <div class="footerContainer">
        <div class="row">
          <div class="logoContainer">
            <img src={Logo} width={66} height={66} alt="logo" />
          </div>
        </div>
        <hr class="line" />
        <div class="row">
          <div class="rightsContainer">{`© Groupyz All rights reserved 2023`}</div>
          <div class="linksContainer">
            <button type="button" onClick={showToastMessage}>
              Terms
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" onClick={showToastMessage}>
              Privacy
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
