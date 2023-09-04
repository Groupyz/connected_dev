import "./styles/PictureContainer.css";
import DashBoard from "./images/dashBoard.svg";
import LeftGroupNames from "./images/leftGroupNames.svg";
import CreateMessage from "./images/createMessage.svg";
import RightGroupNames from "./images/rightGroupNames.svg";

const PictureContainer = () => {
  return (
    <div className="PhotosContainer">
      <div className="Row">
        <img src={DashBoard} alt="" />
      </div>
      <div className="Row SecondR">
        <img src={LeftGroupNames} alt="" />
        <img src={CreateMessage} alt="" />
        <img src={RightGroupNames} alt="" />
      </div>
    </div>
  );
};

export default PictureContainer;
