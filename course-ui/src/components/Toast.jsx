import PropTypes from "prop-types";
import clsx from "clsx";

const Toast = ({ id, message, type, onClose }) => {
  // Define background colors for different types of toasts.
  const bgClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-between w-full max-w-sm p-4 mb-4 text-white rounded shadow-lg",
        bgClasses[type] || bgClasses.info
      )}>
      <span>{message}</span>
      <button
        onClick={() => onClose(id)}
        aria-label="Close"
        className="ml-4 text-white focus:outline-none">
        &times;
      </button>
    </div>
  );
};

Toast.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info", "warning"]),
  onClose: PropTypes.func.isRequired,
};

Toast.defaultProps = {
  type: "info",
};

export default Toast;
