import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Tooltip = ({ content, children, position, className }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div
          className={clsx(
            "absolute z-20 px-2 py-1 text-xs text-white bg-gray-700 rounded shadow-lg",
            position === "top" &&
              "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
            position === "bottom" &&
              "top-full mt-2 left-1/2 transform -translate-x-1/2",
            position === "left" &&
              "right-full mr-2 top-1/2 transform -translate-y-1/2",
            position === "right" &&
              "left-full ml-2 top-1/2 transform -translate-y-1/2",
            className
          )}>
          {content}
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  content: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  className: PropTypes.string,
};

Tooltip.defaultProps = {
  position: "top",
  className: "",
};

export default Tooltip;
