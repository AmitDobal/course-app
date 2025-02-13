import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Button = React.forwardRef(
  ({ variant, size, disabled, children, className, ...rest }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium rounded focus:outline-none transition duration-150 cursor-pointer";
    const variantClasses = {
      primary: "bg-primary text-white hover:bg-blue-700",
      secondary: "bg-secondary text-white hover:bg-red-700",
      outline:
        "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200",
    };
    const sizeClasses = {
      small: "px-3 py-1 text-sm",
      medium: "px-4 py-2 text-base",
      large: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={clsx(
          baseClasses,
          variantClasses[variant] || variantClasses.primary,
          sizeClasses[size] || sizeClasses.medium,
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={disabled}
        {...rest}>
        {children}
      </button>
    );
  }
);

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  variant: "primary",
  size: "medium",
  disabled: false,
  className: "",
};

export default Button;
