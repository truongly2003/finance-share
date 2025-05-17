import { createContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  // Hàm hiển thị thông báo
  const notify = (message, type = "info") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      default:
        toast.info(message);
    }
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <ToastContainer position="top-right" autoClose={1000} />
    </NotificationContext.Provider>
  );
};


NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default NotificationContext