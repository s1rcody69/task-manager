# Team Task Manager

A comprehensive React-based team task management application built with Redux, React Router, and modern performance optimization techniques.

##  Features

- **Authentication System**: Login/Logout functionality with protected routes
- **Task Management**: Full CRUD operations (Create, Read, Update, Delete)
- **State Management**: Redux Toolkit for global state management
- **Performance Optimized**: Implements React.memo, useMemo, and useCallback
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Data Persistence**: LocalStorage integration for data persistence
- **Team Collaboration**: Designed for team workflow with GitHub integration

##  Requirements Met

✅ Component-based architecture with reusable components  
✅ Authentication with login/logout  
✅ Protected routes for authenticated users  
✅ Redux for state management (auth + tasks)  
✅ Performance optimization (React.memo, useCallback, useMemo)  
✅ React Router for navigation  
✅ Clean, responsive UI with Tailwind CSS  
✅ LocalStorage for data persistence  
✅ Ready for GitHub collaboration workflow  

##  Tech Stack

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **State Management**: Redux Toolkit 2.0
- **Routing**: React Router 6.20
- **Styling**: Tailwind CSS 3.3
- **Icons**: Lucide React
- **Storage**: LocalStorage API

##  Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd team-task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

##  Project Structure

```
team-task-manager/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── AuthForm.jsx     # Login/Register form
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── ProtectedRoute.jsx # Route protection
│   │   ├── TaskForm.jsx     # Task creation/editing form
│   │   ├── TaskItem.jsx     # Individual task component
│   │   └── TaskList.jsx     # Task list with filtering
│   ├── features/            # Redux slices
│   │   ├── authSlice.js     # Authentication state
│   │   └── tasksSlice.js    # Tasks state
│   ├── pages/               # Page components
│   │   ├── Dashboard.jsx    # Main dashboard
│   │   ├── Login.jsx        # Login page
│   │   └── Register.jsx     # Registration page
│   ├── styles/              # Global styles
│   │   └── index.css        # Tailwind CSS imports
│   ├── utils/               # Utility functions
│   │   └── store.js         # Redux store configuration
│   ├── App.jsx              # Main App component
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── README.md                # This file
```

##  Key Components

### AuthForm
- Handles both login and registration
- Form validation
- Uses `useCallback` for memoized handlers
- Wrapped with `React.memo`

### TaskForm
- Create and edit tasks
- Form validation
- Performance optimized with `useCallback`
- Wrapped with `React.memo`

### TaskList
- Displays filtered tasks
- Uses `useMemo` for filtering optimization
- Calculates statistics with `useMemo`
- Filter functionality (All, Pending, Completed)

### TaskItem
- Individual task display
- Toggle completion status
- Edit and delete actions
- Custom `React.memo` comparison function

### ProtectedRoute
- Guards authenticated routes
- Redirects unauthenticated users to login

##  Performance Optimizations

### React.memo
All major components are wrapped with `React.memo` to prevent unnecessary re-renders:
- `AuthForm.jsx`
- `Navbar.jsx`
- `TaskForm.jsx`
- `TaskItem.jsx` (with custom comparison)
- `TaskList.jsx`
- `Dashboard.jsx`
- `ProtectedRoute.jsx`

### useCallback
Event handlers are memoized to maintain referential equality:
```javascript
const handleSubmit = useCallback((e) => {
  // Handler logic
}, [dependencies]);
```

### useMemo
Expensive computations are memoized:
```javascript
const filteredTasks = useMemo(() => {
  // Filtering logic
}, [allTasks, currentFilter]);
```

##  Authentication Flow

1. User registers/logs in via AuthForm
2. Credentials are validated
3. User data is stored in Redux + LocalStorage
4. User is redirected to Dashboard
5. Protected routes check authentication status
6. Unauthenticated users are redirected to login

##  State Management

### Auth Slice
```javascript
{
  isAuthenticated: boolean,
  user: {
    id: string,
    name: string,
    email: string
  }
}
```

### Tasks Slice
```javascript
{
  tasks: [
    {
      id: string,
      title: string,
      description: string,
      status: 'pending' | 'completed',
      createdAt: string,
      createdBy: string
    }
  ],
  filter: 'all' | 'pending' | 'completed'
}
```

##  UI Features

- Clean, modern interface
- Responsive design (mobile, tablet, desktop)
- Color-coded task status
- Interactive filters
- Real-time statistics
- Smooth transitions and animations
- Accessible UI with ARIA labels

##  Data Persistence

Data is automatically saved to LocalStorage:
- User authentication state
- All tasks and their states
- Persists across browser sessions
- Automatic sync on state changes

##  Testing the App

### Default Workflow

1. **Register a new user**
   - Navigate to `/register`
   - Fill in name, email, password
   - Submit form

2. **Create tasks**
   - Use TaskForm on Dashboard
   - Add title and optional description
   - Task appears in list immediately

3. **Manage tasks**
   - Toggle completion status
   - Edit task details
   - Delete tasks
   - Filter by status

4. **Logout and persistence**
   - Logout via Navbar
   - Close browser
   - Reopen and login
   - All data persists

##  Deployment

### Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to Netlify:
   ```bash
   npx netlify-cli deploy --prod --dir=dist
   ```

### Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

### GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Update vite.config.js:
   ```javascript
   export default defineConfig({
     base: '/team-task-manager/',
     // ... rest of config
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

##  Team Collaboration Guide

See [GITHUB_WORKFLOW.md](./GITHUB_WORKFLOW.md) for detailed instructions on:
- Branch management
- Pull request workflow
- Code review process
- Commit conventions

##  Known Issues

None currently. Please report issues via GitHub Issues.

##  Future Enhancements

- [ ] Backend integration with REST API
- [ ] Real-time collaboration with WebSockets
- [ ] Task assignment to specific team members
- [ ] Due dates and reminders
- [ ] File attachments
- [ ] Task comments/discussions
- [ ] Advanced filtering and search
- [ ] Dark mode support
- [ ] Email notifications

##  License

MIT License - feel free to use this project for learning and teaching purposes.

##  Contributing

Contributions are welcome! Please read the [GITHUB_WORKFLOW.md](./GITHUB_WORKFLOW.md) for guidelines.

##  Support

For questions or issues, please create a GitHub issue or contact the development team.

---

**Built with  using React, Redux, and modern web technologies**