import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../features/tasksSlice';
import { selectCurrentUser } from '../features/authSlice';
import { X, Plus, Edit } from 'lucide-react';

const TaskForm = ({ editTask = null, onClose }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  // Load task data if editing
  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title,
        description: editTask.description || '',
      });
    }
  }, [editTask]);

  // useCallback for memoizing input change handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  }, []);

  // Validate form
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Task title must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // useCallback for memoizing submit handler
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      if (editTask) {
        // Update existing task
        dispatch(
          updateTask({
            id: editTask.id,
            title: formData.title,
            description: formData.description,
          })
        );
      } else {
        // Create new task
        dispatch(
          addTask({
            title: formData.title,
            description: formData.description,
            createdBy: currentUser.name,
          })
        );
      }

      // Reset form
      setFormData({ title: '', description: '' });
      setErrors({});
      
      if (onClose) {
        onClose();
      }
    },
    [formData, editTask, validateForm, dispatch, currentUser, onClose]
  );

  // useCallback for memoizing cancel handler
  const handleCancel = useCallback(() => {
    setFormData({ title: '', description: '' });
    setErrors({});
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          {editTask ? (
            <>
              <Edit className="h-6 w-6 text-primary-600" />
              <span>Edit Task</span>
            </>
          ) : (
            <>
              <Plus className="h-6 w-6 text-primary-600" />
              <span>Add New Task</span>
            </>
          )}
        </h2>
        {onClose && (
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className={`input-field ${errors.title ? 'border-red-500' : ''}`}
            placeholder="Enter task title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="input-field resize-none"
            placeholder="Enter task description"
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button type="submit" className="btn-primary flex-1">
            {editTask ? 'Update Task' : 'Add Task'}
          </button>
          {onClose && (
            <button type="button" onClick={handleCancel} className="btn-secondary flex-1">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// React.memo for performance optimization
export default React.memo(TaskForm);