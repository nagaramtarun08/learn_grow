
    import React from 'react';
    import { Navigate, useLocation } from 'react-router-dom';
    import { useAuth } from '@/hooks/useAuth';
    import LoadingSpinner from '@/components/LoadingSpinner';

    const ProtectedRoute = ({ children, allowedRoles }) => {
      const { user, loading } = useAuth();
      const location = useLocation();

      if (loading) {
        return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
      }

      if (!user) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
      }

      if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to a generic dashboard or home if role not allowed
        // Or to a specific "access denied" page
        return <Navigate to={user.role === 'student' ? '/student-dashboard' : '/trainer-dashboard'} replace />;
      }
      
      // If user is student and hasn't completed questionnaire, redirect
      if (user.role === 'student' && !user.questionnaireCompleted && location.pathname !== '/student-questionnaire') {
        return <Navigate to="/student-questionnaire" replace />;
      }

      // If user is trainer and hasn't completed questionnaire, redirect
      if (user.role === 'trainer' && !user.questionnaireCompleted && location.pathname !== '/trainer-questionnaire') {
         return <Navigate to="/trainer-questionnaire" replace />;
      }


      return children;
    };

    export default ProtectedRoute;
  