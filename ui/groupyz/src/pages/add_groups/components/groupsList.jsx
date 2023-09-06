import "../styles/addGroups.css";
import Checkbox from "../../../components/global/Checkbox";
import axios from "axios";
import { useState, useEffect } from "react";

const URL = "http://localhost:5051/groups/1";

const GroupsList = ({
  input,
  selectedGroups,
  setSelectedGroups,
  getDataFromGroupsList,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(URL).then((response) => {
      setData(response.data["groups"]);
    });
  }, []);

  const filteredData = data.filter((el) => {
    //if no input the return the original
    if (input === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.group_name.toLowerCase().includes(input);
    }
  });

  const handleGroupsData = () => {
    getDataFromGroupsList(data);
  };

  return (
    <div className="groupList">
      {handleGroupsData()}
      {filteredData.map((item) => (
        <div key={item.group_id} className="multRow">
          <div className="group">{item.group_name}</div>
          <div className="checkbox">
            <Checkbox
              label={item.group_name}
              selectedGroups={selectedGroups}
              setSelectedGroups={setSelectedGroups}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupsList;
