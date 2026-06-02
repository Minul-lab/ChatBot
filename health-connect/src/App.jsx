import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import Login from './pages/Login';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientProfile from './pages/PatientProfile';
import './index.css';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, currentUser } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (role && currentUser?.role !== role) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function AppRoutes() {
  const { checkAuth } = useAuth();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/patient" 
        element={
          <ProtectedRoute role="patient">
            <PatientDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/doctor" 
        element={
          <ProtectedRoute role="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/patient/profile/:id" 
        element={
          <ProtectedRoute>
            <PatientProfile />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
