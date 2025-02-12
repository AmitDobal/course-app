import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Button from '../components/Button';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Admin Dashboard
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Welcome, {user ? user.name : 'Admin'}! Here you can manage courses, users, and orders.
      </p>
      <div className="space-x-4">
        <Button variant="primary">Manage Courses</Button>
        <Button variant="secondary">Manage Users</Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
