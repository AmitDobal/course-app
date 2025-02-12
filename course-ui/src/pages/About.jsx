import React from 'react';
import Button from '../components/Button';

const About = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        About Us
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Course Platform is dedicated to providing high-quality, industry-relevant courses that empower learners to achieve their professional goals.
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Our platform combines expert instructors, interactive content, and a supportive community to create a comprehensive learning experience.
      </p>
      <Button variant="primary">Get Started</Button>
    </div>
  );
};

export default About;
