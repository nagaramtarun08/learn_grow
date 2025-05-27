import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
    import { AuthProvider } from '@/contexts/AuthContext';
    import { Toaster } from '@/components/ui/toaster';
    import Navbar from '@/components/Navbar';
    import Footer from '@/components/Footer';
    import ProtectedRoute from '@/components/ProtectedRoute';
    import HomePage from '@/pages/HomePage';
    import AuthPage from '@/pages/AuthPage';
    import StudentQuestionnairePage from '@/pages/StudentQuestionnairePage';
    import StudentDashboardPage from '@/pages/StudentDashboardPage';
    import TrainerQuestionnairePage from '@/pages/TrainerQuestionnairePage';
    import TrainerDashboardPage from '@/pages/TrainerDashboardPage';
    import ExploreCoursesPage from '@/pages/ExploreCoursesPage';
    import ChatbotWidget from '@/components/ChatbotWidget';
    import { useAuth } from '@/hooks/useAuth';
    import LoadingSpinner from '@/components/LoadingSpinner';

    const AppLayout = () => {
      return (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
          <ChatbotWidget />
          <Toaster />
        </div>
      );
    };
    
    const AppRoutes = () => {
      const { user, loading } = useAuth();

      if (loading) {
        return (
          <div className="flex flex-col min-h-screen items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        );
      }
    
      return (
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={
              user ? (
                user.role === 'student' ? (
                  user.questionnaireCompleted ? <Navigate to="/student-dashboard" replace /> : <Navigate to="/student-questionnaire" replace />
                ) : user.role === 'trainer' ? (
                  user.questionnaireCompleted ? <Navigate to="/trainer-dashboard" replace /> : <Navigate to="/trainer-questionnaire" replace />
                ) : <Navigate to="/" replace /> 
              ) : <AuthPage />
            } />
            
            <Route 
              path="/student-questionnaire" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  {user && user.role === 'student' && user.questionnaireCompleted ? <Navigate to="/student-dashboard" replace /> : <StudentQuestionnairePage />}
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                   {user && user.role === 'student' && !user.questionnaireCompleted ? <Navigate to="/student-questionnaire" replace /> : <StudentDashboardPage />}
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/trainer-questionnaire" 
              element={
                <ProtectedRoute allowedRoles={['trainer']}>
                  {user && user.role === 'trainer' && user.questionnaireCompleted ? <Navigate to="/trainer-dashboard" replace /> : <TrainerQuestionnairePage />}
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/trainer-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['trainer']}>
                  {user && user.role === 'trainer' && !user.questionnaireCompleted ? <Navigate to="/trainer-questionnaire" replace /> : <TrainerDashboardPage />}
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/explore-courses"
              element={
                <ProtectedRoute allowedRoles={['student', 'trainer']}>
                  <ExploreCoursesPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      );
    }

    function App() {
      return (
        <AuthProvider>
          <Router>
            <AppRoutes />
          </Router>
        </AuthProvider>
      );
    }

    export default App;