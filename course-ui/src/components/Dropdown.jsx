import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Dropdown = ({ label, options, selected, onChange, className }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div
      className={clsx("relative inline-block text-left", className)}
      ref={dropdownRef}>
      {label && (
        <label className="block mb-1 text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex justify-between w-full px-4 py-2 border rounded bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring"
        aria-haspopup="true"
        aria-expanded={open}>
        <span>{selected ? selected.label : "Select an option"}</span>
        <svg
          className="w-5 h-5 ml-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={open ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
          <ul className="py-1">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Dropdown.defaultProps = {
  label: "",
  selected: null,
  className: "",
};

export default Dropdown;
