import "./styles/Header.css";
import Logo from "./assets/images/logo.svg";
import Button_c from "./components/global/Button_c";
import LoginSignupButtons from "./components/global/LoginSignupButtons";
import { useLocation } from "react-router-dom";
import ScheduleButton from "./components/global/ScheduleButton";

const Header = () => {
  const location = useLocation();
  const isLoggedIn =
    location.pathname.toLowerCase() !== "/" &&
    location.pathname.toLowerCase() !== "/login" &&
    location.pathname.toLowerCase() !== "/signup";
  return (
    <header>
      <div class="container">
        <div class="logoContainer">
          <img src={Logo} width={112} height={112} alt="logo" />
        </div>
        <div class="scheduleContainer">{`Schedule messages`}</div>
        {isLoggedIn ? <ScheduleButton /> : <LoginSignupButtons />}
      </div>
    </header>
  );
};

export default Header;
