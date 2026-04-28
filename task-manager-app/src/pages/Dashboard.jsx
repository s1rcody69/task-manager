import React, { useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Dashboard = () => {
  const [editingTask, setEditingTask] = useState(null);

  // useCallback to memoize edit handler
  const handleEditTask = useCallback((task) => {
    setEditingTask(task);
    // Scroll to top where the form is
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // useCallback to memoize close handler
  const handleCloseEdit = useCallback(() => {
    setEditingTask(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Manage your team tasks and collaborate effectively
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Form Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <TaskForm editTask={editingTask} onClose={handleCloseEdit} />
            </div>
          </div>

          {/* Task List Section */}
          <div className="lg:col-span-2">
            <TaskList onEditTask={handleEditTask} />
          </div>
        </div>
      </main>

    </div>
  );
};

// React.memo for performance optimization
export default React.memo(Dashboard);