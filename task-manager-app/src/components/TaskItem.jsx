import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskStatus } from '../features/tasksSlice';
import { Trash2, Edit, CheckCircle, Circle, User, Calendar } from 'lucide-react';

const TaskItem = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  // useCallback to memoize event handlers
  const handleToggleStatus = useCallback(() => {
    dispatch(toggleTaskStatus(task.id));
  }, [dispatch, task.id]);

  const handleDelete = useCallback(() => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  }, [dispatch, task.id]);

  const handleEdit = useCallback(() => {
    onEdit(task);
  }, [onEdit, task]);

  // Format date
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  const isCompleted = task.status === 'completed';

  return (
    <div
      className={`card hover:shadow-lg transition-shadow duration-200 ${
        isCompleted ? 'bg-gray-50 border-l-4 border-green-500' : 'border-l-4 border-primary-500'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <button
            onClick={handleToggleStatus}
            className="mt-1 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            aria-label={isCompleted ? 'Mark as pending' : 'Mark as completed'}
          >
            {isCompleted ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="h-6 w-6 text-gray-400 hover:text-primary-500" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-semibold ${
                isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className={`mt-1 text-sm ${isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{task.createdBy}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(task.createdAt)}</span>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isCompleted
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {isCompleted ? 'Completed' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={handleEdit}
            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            aria-label="Edit task"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// React.memo with custom comparison function for better performance
export default React.memo(TaskItem, (prevProps, nextProps) => {
  // Only re-render if task data or onEdit function changes
  return (
    prevProps.task.id === nextProps.task.id &&
    prevProps.task.title === nextProps.task.title &&
    prevProps.task.description === nextProps.task.description &&
    prevProps.task.status === nextProps.task.status &&
    prevProps.onEdit === nextProps.onEdit
  );
});