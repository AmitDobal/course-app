import React from "react";
import Loader from "./Loader";

const LoadingWrapper = ({ children, loading }) => {
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingWrapper;
