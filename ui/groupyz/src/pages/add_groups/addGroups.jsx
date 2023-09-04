import "./styles/addGroups.css";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Search from "./images/search.svg";
import GroupsList from "./components/groupsList.jsx";
import { useState } from "react";
import Button_c from "../../components/global/Button_c";
import arrow from "./images/arrow.svg";
import X from "./images/X.svg";
import { useNavigate } from "react-router";

const AddGroups = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);

  const getDataFromGroupsList = (data) => {
    setAllGroups(data);
  };

  const handleContinue = () => {
    const selectedGroupsInfo = selectedGroups.map((groupName) => {
      const group = allGroups.find((item) => item.group_name === groupName);
      return {
        id: group.group_id,
        name: group.group_name,
      };
    });
    navigate("/newmessage", { state: { selectedGroups: selectedGroupsInfo } });
  };

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const handleGroupDeselection = (groupName) => {
    setSelectedGroups((prevSelectedGroups) =>
      prevSelectedGroups.filter((group) => group !== groupName)
    );
  };

  return (
    <addgroups>
      <div class="container">
        <div class="row firstRow">
          <div class="headlineBorder">
            <div class="headline">Add groups</div>
            <div class="progressBar"></div>
          </div>
        </div>
        <div class="col">
          <div class="row secondRow">
            <div class="firstCol">
              <div class="searchBar">
                <TextField
                  id="searchBar"
                  onChange={inputHandler}
                  variant="outlined"
                  fullWidth
                  placeholder="Search a group"
                  InputProps={{
                    startAdornment: <img src={Search} alt="" />,
                    disableUnderline: true,
                  }}
                />
              </div>
              <GroupsList
                input={inputText}
                selectedGroups={selectedGroups}
                setSelectedGroups={setSelectedGroups}
                getDataFromGroupsList={getDataFromGroupsList}
              />
            </div>
            <div class="secondCol">
              {selectedGroups.map((group) => (
                <div className="selectedGroups">
                  <Grid container columns={{ xs: 4 }}>
                    <Grid item xs={3}>
                      <span>{group}</span>
                    </Grid>
                    <Grid item xs={1}>
                      <div class="xButton">
                        <button onClick={() => handleGroupDeselection(group)}>
                          <img src={X} alt="X button" />
                        </button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </div>
            <div class="thirdCol">
              <div class="continueButton">
                <button className="custom-button" onClick={handleContinue}>
                  <Button_c
                    name=" "
                    image={arrow}
                    width="34px"
                    height="34px"
                    isUseNav={true}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </addgroups>
  );
};

export default AddGroups;
