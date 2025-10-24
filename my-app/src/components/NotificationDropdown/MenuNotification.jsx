import PropTypes from "prop-types";

const MenuNotification = ({ notificationId, onClose }) => {
  const handleDelete = () => {
    alert("Delete" + notificationId);
    onClose()
  };

  return (
    <div className="absolute right-10  top-0 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-fadeIn">
      <button
        onClick={handleDelete}
        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 w-full text-gray-700"
      >
        Delete
      </button>

      <button className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 w-full text-gray-700">
        Read
      </button>
    </div>
  );
};

MenuNotification.propTypes = {
  notificationId: PropTypes.string,
  onClose: PropTypes.func,
};

export default MenuNotification;
