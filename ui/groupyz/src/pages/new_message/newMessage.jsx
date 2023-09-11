import "./styles/newMessage.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Button_c from "../../components/global/Button_c";
import Plus from "./images/plus.svg";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import X from "../add_groups/images/X.svg";
import React, { useState } from "react";
import Clock from "../dashboard/images/clock.svg";
import Arrows from "../dashboard/images/arrows.svg";
import { Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Text from "./images/text.svg";
import parse from "html-react-parser";
import axios from "axios";
import { toast } from "react-toastify";

const NewMessage = () => {
  const location = useLocation();
  let preSelectedGroups = [];
  if (location.state) {
    preSelectedGroups = location.state.selectedGroups;
  }
  const parse = require("html-react-parser");
  const today = dayjs().format("YYYY-MM-DD");
  const now = dayjs().format("HH:mm");
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(now);
  const [selectedGroups, setSelectedGroups] = useState(preSelectedGroups);
  const [headline, setHeadline] = useState("");
  const [message, setMessage] = useState("");
  const [repeat, setRepeat] = useState("");

  const handleGroupDeselection = (groupName) => {
    setSelectedGroups((prevSelectedGroups) =>
      prevSelectedGroups.filter((group) => group.name !== groupName)
    );
  };

  const handleMessage = (newMessage) => {
    const parsedMessage = parse(newMessage);
    setMessage(parsedMessage.props.children);
  };

  const handleSave = () => {
    const destGroupsId = selectedGroups.map((group) => group.id);
    const timeToSend = date + " " + time;
    const messageData = message;
    const messageTitle = headline;
    const repeatSet = repeat;

    const data = JSON.stringify({
      user_id: 1,
      repeat: repeatSet,
      group_ids: destGroupsId,
      time_to_send: timeToSend,
      message_data: messageData,
      message_title: messageTitle,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios.post("http://localhost:5052/message", data, config).catch((error) => {
      if (error.response) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
    window.location.href = "./dashboard";
  };

  const editorModules = {
    toolbar: [
      [{ size: ["normal", "large", "huge"] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  return (
    <newmessage>
      <div class="container">
        <div class="row firstRow">
          <div class="headlineBorder">
            <div class="headline">Schedule & Compose message</div>
            <div class="progressBar"></div>
          </div>
        </div>
        <div class="col">
          <div class="row secondRow">
            <div class="firstCol">
              <div class="buttonPosition">
                <div class="addGroups">
                  <Button_c name=" " image={Plus} />
                </div>
                <div class="borderLine"></div>
              </div>
              <div class="groupsPosition">
                {selectedGroups.map((group) => (
                  <div className="selectedGroups">
                    <Grid container columns={{ xs: 4 }}>
                      <Grid item xs={3}>
                        <span>{group.name}</span>
                      </Grid>
                      <Grid item xs={1}>
                        <div class="xButton">
                          <button
                            onClick={() => handleGroupDeselection(group.name)}
                          >
                            <img src={X} alt="X button" />
                          </button>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </div>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div class="secondColumn">
                <input
                  type="text"
                  placeholder="Add headline to message"
                  onChange={(newHeadline) =>
                    setHeadline(newHeadline.target.value)
                  }
                />
                <div class="multRow">
                  <div class="logoPos">
                    <img src={Clock} alt="clock" />
                  </div>
                  <div class="datePicker">
                    <DatePicker
                      label="Pick date"
                      format="DD/MM/YYYY"
                      disablePast
                      onChange={(newDate) =>
                        setDate(newDate.format("YYYY-MM-DD"))
                      }
                    />
                  </div>
                  <div class="timePicker">
                    <TimePicker
                      label="Pick time"
                      format="hh:mm"
                      onChange={(newTime) =>
                        setTime(newTime.format("HH:mm:ss"))
                      }
                    />
                  </div>
                </div>
                <div class="multRow">
                  <div class="logoPos">
                    <img src={Arrows} alt="arrows" />
                  </div>
                  <div class="selectRepeat">
                    <FormControl fullWidth>
                      <InputLabel id="repeat">repeat</InputLabel>
                      <Select
                        labelId="repeat"
                        value={repeat}
                        onChange={(repeat) => setRepeat(repeat.target.value)}
                      >
                        <MenuItem value="once">Once</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="none">No repeat</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <label>
                    <input type="checkbox" />
                    Everyday
                  </label>
                </div>
                <div class="multRow">
                  <div class="logoPos">
                    <img src={Text} alt="text" />
                  </div>
                  <ReactQuill
                    theme="snow"
                    className="editor"
                    modules={editorModules}
                    onChange={(newMessage) => handleMessage(newMessage)}
                  />
                </div>
              </div>
              <div class="saveButton">
                <Button_c name="Save" onChange={handleSave} />
              </div>
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </newmessage>
  );
};

export default NewMessage;
