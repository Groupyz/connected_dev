import "./styles/dashboard.css";
import Button_c from "../../components/global/Button_c";
import dashboard from "./images/dashboard.svg";
import Messages from "./components/messages.jsx";

const Dashboard = () => (
  <dashboard>
    <div className="dashboardCompenent">
      <div class="column">
        <div className="dashboardLeft">
          <div className="myDashboard">
            <p>My dashboard</p>
          </div>
          <div className="rectangleLeft" />
          <div className="hiName">
            <p>Hi, Stav!</p>
          </div>
          <div className="hiText">
            <p>
              Sending messages at the perfect time is easy
              <br />
              with our new scheduling feature!
              <br />
              Click the button and get started!
            </p>
          </div>
          <div className="createButton">
            <Button_c name=" +  Schedule a new message" dest="./addgroups" />
          </div>
          <div className="img">
            <img src={dashboard} alt="" />
          </div>
        </div>
      </div>
      <Messages />
    </div>
  </dashboard>
);

export default Dashboard;
