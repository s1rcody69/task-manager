import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllTasks, selectFilter, setFilter } from '../features/tasksSlice';
import TaskItem from './TaskItem';
import { Filter, AlertCircle } from 'lucide-react';

const TaskList = ({ onEditTask }) => {
  const dispatch = useDispatch();
  const allTasks = useSelector(selectAllTasks);
  const currentFilter = useSelector(selectFilter);

  // useMemo to optimize filtered tasks calculation
  const filteredTasks = useMemo(() => {
    if (currentFilter === 'all') return allTasks;
    if (currentFilter === 'pending') {
      return allTasks.filter((task) => task.status === 'pending');
    }
    if (currentFilter === 'completed') {
      return allTasks.filter((task) => task.status === 'completed');
    }
    return allTasks;
  }, [allTasks, currentFilter]);

  // useMemo to calculate task statistics
  const taskStats = useMemo(() => {
    return {
      total: allTasks.length,
      pending: allTasks.filter((task) => task.status === 'pending').length,
      completed: allTasks.filter((task) => task.status === 'completed').length,
    };
  }, [allTasks]);

  // useCallback to memoize filter change handler
  const handleFilterChange = useCallback(
    (filter) => {
      dispatch(setFilter(filter));
    },
    [dispatch]
  );

  const filterButtons = [
    { label: 'All Tasks', value: 'all', count: taskStats.total },
    { label: 'Pending', value: 'pending', count: taskStats.pending },
    { label: 'Completed', value: 'completed', count: taskStats.completed },
  ];

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Filter Tasks</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => handleFilterChange(btn.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentFilter === btn.value
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {btn.label}
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-white bg-opacity-20">
                {btn.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="text-sm text-gray-600 font-medium">Total Tasks</div>
          <div className="text-3xl font-bold text-gray-900 mt-1">{taskStats.total}</div>
        </div>
        <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="text-sm text-gray-600 font-medium">Pending Tasks</div>
          <div className="text-3xl font-bold text-gray-900 mt-1">{taskStats.pending}</div>
        </div>
        <div className="card bg-gradient-to-br from-green-50 to-green-100">
          <div className="text-sm text-gray-600 font-medium">Completed Tasks</div>
          <div className="text-3xl font-bold text-gray-900 mt-1">{taskStats.completed}</div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="card text-center py-12">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks found</h3>
            <p className="text-gray-500">
              {currentFilter === 'all'
                ? 'Start by creating your first task!'
                : `No ${currentFilter} tasks at the moment.`}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} onEdit={onEditTask} />
          ))
        )}
      </div>
    </div>
  );
};

// React.memo for performance optimization
export default React.memo(TaskList);