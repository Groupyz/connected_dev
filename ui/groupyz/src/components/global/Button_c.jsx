import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import "./styles/Button_c.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Button_c = ({
  variant = "contained",
  image,
  width = "25px",
  height = "25px",
  name,
  dest,
  isUseNav = false,
  onChange,
}) => {
  if (!name) {
    throw new Error("The name required Prop missing!");
  }

  const showToastMessage = () => {
    if (dest && !isUseNav) {
      window.location.href = `/${dest}`;
    } else if (isUseNav) {
      return;
    } else {
      toast.error("Not Supported!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  if (!onChange) {
    onChange = showToastMessage;
  }

  if (image) {
    return (
      <div>
        <Button variant={variant} id="Button_c" onClick={onChange}>
          <div class="image">
            <img src={image} width={width} height={height} />
          </div>
          {name}
        </Button>
        <ToastContainer />
      </div>
    );
  } else {
    return (
      <div>
        <Button variant={variant} id="Button_c" onClick={onChange}>
          {name}
        </Button>
        <ToastContainer />
      </div>
    );
  }
};

Button_c.propTypes = {
  name: PropTypes.any.isRequired,
};

export default Button_c;
