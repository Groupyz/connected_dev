import "../styles/dashboard.css";
import clock from "../images/clock.svg";
import arrows from "../images/arrows.svg";
import { useState, useEffect } from "react";
import axios from "axios";

const MSG_URL = "http://localhost:5052/message/1?allMessages=true";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState(false);
  useEffect(() => {
    axios
      .get(MSG_URL)
      .then((res) => {
        setMessages(res.data["messages"]);
        setData(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        console.log(error);
      });
  }, []);

  const getRealTime = (time_to_send) => {
    const time = new Date(time_to_send);
    const realTime = new Date(time.getTime() + 6 * 60 * 60 * 1000);
    const newTime = realTime.toISOString().slice(0, 19).replace("T", " ");
    return newTime;
  };

  return (
    <messages>
      <div class="column">
        <div className="messageRow">
          <div className="Messages">
            <p>Messages</p>
          </div>
          {data
            ? messages.map((message) => (
                <div className="column messagesCol">
                  <div className="messageRectangle">
                    <div className="column messagesCol messageTitle">
                      <p>{message["message_title"]}</p>
                    </div>
                    <div class="row">
                      <div className="clock">
                        <img src={clock} alt=" " />
                      </div>
                      <div className="dateTime">
                        <p>{getRealTime(message["time_to_send"])}</p>
                      </div>
                      <div className="arrows">
                        <img src={arrows} alt=" " />
                      </div>
                      <div className="repeat">
                        <p>{message["repeat"]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </messages>
  );
};

export default Messages;
