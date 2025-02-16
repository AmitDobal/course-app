import React from "react";
import Button from "../components/Button";
import Tooltip from "../components/Tooltip";

const Home = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Welcome to Course Platform
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Discover top courses designed to empower your learning journey.
      </p>
      <div className="space-x-4">
        <Tooltip content="Browse our extensive catalog" position="bottom">
          <Button variant="primary" size="large">
            Browse Courses
          </Button>
        </Tooltip>
        <Button variant="outline" size="large">
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default Home;
