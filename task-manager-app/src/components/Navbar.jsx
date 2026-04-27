import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrentUser } from '../features/authSlice';
import { LogOut, CheckSquare } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  // useCallback to memoize the logout handler
  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <CheckSquare className="h-8 w-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Team Task Manager
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="text-gray-700">
                  Welcome, <span className="font-semibold">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 btn-secondary"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// React.memo to prevent unnecessary re-renders
export default React.memo(Navbar);