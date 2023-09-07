import "./styles/instructionsComponent.css";
import scan from "./images/scan.svg";
import whatsapp from "./images/whatsapp.svg";
import telegram from "./images/telegram.svg";
import facebook from "./images/facebook.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";

const showToastMessage = () => {
  toast.error("Not Supported!", {
    position: toast.POSITION.TOP_CENTER,
  });
};

const InstructionsComponent = () => {
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:3001/qr").then((response) => {
      setQrCode(response.data);
      setLoading(false);
    });
  }, []);
  return (
    <instructionsComponent>
      <div class="instructionsContainer">
        <div class="col">
          <div class="row">
            <div class="titleContainer">
              To sync your WhatsApp groups with Groupyz:
            </div>
          </div>
          <div class="row">
            <div class="stepsContainer">
              <p>
                1. Open WhatsApp on your phone
                <br />
                <br />
                2. Tap <b>Menu</b> or <b>Settings</b> and select{" "}
                <b>Linked Devices</b>
                <br />
                <br />
                3. click <b>'Link Device'</b>
                <br />
                <br />
                4. Point your phone to the screen in order to capture the code
                <br />
                <br />
                5. Please wait, <b>process may take up to 1 minute</b>
              </p>
            </div>
          </div>
        </div>

        <div class="scanContainer">
          <div class="col">
            <div class="row">
              <div class="scanIconContainer">
                <img src={scan} alt="" />
              </div>
              <div class="scanTitleContainer">
                <div>
                  <p>Scan QR code</p>
                </div>
              </div>
              <div class="scanContentContainer">
                <p>Scan this code in-app to verify a device</p>
                <div>
                  {loading ? (
                    <div class="loadingContainer">
                      <p>Loading QR code...</p>
                    </div>
                  ) : (
                    <div class="qrContainer">
                      <img src={qrCode} alt="QR code" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="changeAppContainer">
          <div>
            <p>Change app</p>
          </div>
          <div>
            <div class="whatsappButton">
              <button type="whatsapp" onClick={showToastMessage}>
                <img src={whatsapp} />
              </button>
            </div>
            <div class="telegramButton">
              <button type="telegram" onClick={showToastMessage}>
                <img src={telegram} />
              </button>
            </div>
            <div class="facebookButton">
              <button type="facebook" onClick={showToastMessage}>
                <img src={facebook} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </instructionsComponent>
  );
};

export default InstructionsComponent;
