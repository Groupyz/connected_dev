import "./styles/dashboard.css";
import Button_c from "../../components/global/Button_c";
import dashboard from "./images/dashboard.svg";
import clock from "./images/clock.svg";
import arrows from "./images/arrows.svg";

const Dashboard = () => (
  <dashboard>
    <div class="dashboardCompenent">
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
      <div class="column">
        <div className="messageRow">
          <div className="Messages">
            <p>Messages</p>
          </div>
          <div className="messagesData">
            <div className="messageRectangle" />
          </div>
          <div className="messageTitle">
            <p>Message headline</p>
          </div>
          <div class="row">
            <div className="clock">
              <img src={clock} />
            </div>
            <div className="dateTime">
              <p>Sunday, 2PM</p>
            </div>
            <div className="arrows">
              <img src={arrows} />
            </div>
            <div className="repeat">
              <p>Every week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dashboard>
);

export default Dashboard;
