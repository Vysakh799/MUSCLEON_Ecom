# MUSCLEON E-commerce Frontend

A React-based frontend application with JWT authentication for the MUSCLEON E-commerce platform.

## Features

- **User Authentication**: Login and registration with JWT tokens
- **Secure Token Storage**: JWT tokens stored in HTTP-only cookies
- **Automatic Token Refresh**: Automatic token refresh on API calls
- **Protected Routes**: Route protection based on authentication status
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Form Validation**: Client-side validation with error handling
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend Django server running on `http://localhost:8000`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Styling

This project uses **Tailwind CSS** for styling:
- Utility-first CSS framework
- Responsive design out of the box
- Custom color scheme with primary and secondary colors
- Smooth animations and transitions

The application will be available at `http://localhost:5173`

## Authentication Flow

### Registration
1. User fills out registration form with username, email, and password
2. Form validates input (username min 3 chars, password min 6 chars, valid email)
3. On successful registration, user is redirected to login form
4. Success message is displayed

### Login
1. User enters username and password
2. On successful login, JWT tokens are stored in cookies:
   - `access_token`: Valid for 1 day
   - `refresh_token`: Valid for 7 days
3. User is redirected to dashboard
4. User profile is fetched and displayed

### Token Management
- Access tokens are automatically included in API requests
- When access token expires, refresh token is used to get new access token
- If refresh fails, user is logged out and redirected to login

### Logout
- Clears all stored tokens
- Redirects to login page

## API Endpoints

The frontend communicates with these backend endpoints:

- `POST /api/users/register/` - User registration
- `POST /api/users/login/` - User login
- `GET /api/users/me/` - Get user profile
- `POST /api/token/refresh/` - Refresh access token

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── AuthContext.jsx    # Authentication context provider
│   │   ├── AuthPage.jsx       # Main auth page (login/register)
│   │   ├── Login.jsx          # Login component
│   │   └── Register.jsx       # Registration component
│   └── Dashboard/
│       └── Dashboard.jsx      # Dashboard component
├── utils/
│   └── axios.js              # Axios configuration with interceptors
├── App.jsx                   # Main app component with routing
├── App.css                   # Minimal global styles
├── index.css                 # Tailwind CSS directives
└── tailwind.config.js        # Tailwind configuration
```

## Key Components

### AuthContext
- Manages authentication state
- Provides login, logout, and token refresh functions
- Handles automatic token management

### Login/Register Components
- Form validation
- Error handling
- Loading states
- Success messages

### Dashboard
- Displays user information
- Provides logout functionality
- Placeholder for future e-commerce features

### Axios Configuration
- Automatic token inclusion in requests
- Automatic token refresh on 401 errors
- Centralized API configuration

## Security Features

- JWT tokens stored in HTTP-only cookies
- Automatic token refresh
- Protected routes
- Form validation
- Error handling for invalid tokens

## Development

### Adding New Protected Routes
```jsx
import { ProtectedRoute } from './components/Auth/AuthContext';

<Route 
  path="/protected" 
  element={
    <ProtectedRoute>
      <YourComponent />
    </ProtectedRoute>
  } 
/>
```

### Making Authenticated API Calls
```jsx
import api from '../utils/axios';

// The token is automatically included
const response = await api.get('/some-protected-endpoint/');
```

### Accessing User Data
```jsx
import { useAuth } from './components/Auth/AuthContext';

const { user, logout } = useAuth();
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Build for Production

```bash
npm run build
```

## Troubleshooting

### CORS Issues
Make sure the backend has CORS properly configured for `http://localhost:5173`

### Token Issues
- Check browser cookies to ensure tokens are being stored
- Verify backend JWT settings
- Check network tab for API call errors

### Login/Register Issues
- Verify backend endpoints are working
- Check form validation
- Ensure all required fields are filled

## Future Enhancements

- Password reset functionality
- Email verification
- Social authentication
- Remember me functionality
- Session management
- Role-based access control
