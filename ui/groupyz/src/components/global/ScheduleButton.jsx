import "./styles/ScheduleButton.css";
import Button_c from "./Button_c";
import plus from "../../assets/images/plus.svg";

const ScheduleButton = () => {
  return (
    <div class="schedule">
      <Button_c image={plus} name="Schedule a new message" dest="./addgroups" />
    </div>
  );
};

export default ScheduleButton;
