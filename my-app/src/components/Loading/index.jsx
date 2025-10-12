
import PropTypes from "prop-types";
const LoadingSpinner = ({ message = "Đang tải..." }) => {
  return (
    <div className="h-screen flex justify-center mt-10">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      <span className="ml-3 text-purple-600 font-medium">{message}</span>
    </div>
  );
};

export default LoadingSpinner;
LoadingSpinner.propTypes={
    message: PropTypes.string
}