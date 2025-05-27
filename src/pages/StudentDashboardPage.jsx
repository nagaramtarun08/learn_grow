import React from 'react';
    import { useAuth } from '@/hooks/useAuth';
    import CareerPathCard from '@/components/CareerPathCard';
    import LoadingSpinner from '@/components/LoadingSpinner';
    import { Button } from '@/components/ui/button';
    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Edit3, BookOpen, Users, MessageSquare, CheckSquare, Trophy } from 'lucide-react';

    const StudentDashboardPage = () => {
      const { user, loading } = useAuth();
      const navigate = useNavigate();

      if (loading) {
        return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
      }

      if (!user) {
        navigate('/auth');
        return null;
      }
      
      if (!user.questionnaireCompleted || !user.careerPath) {
        return (
          <div className="container mx-auto px-4 py-12 text-center">
            <motion.div 
              initial={{ opacity: 0, y:20 }}
              animate={{ opacity: 1, y:0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl max-w-md mx-auto glassmorphism"
            >
              <h1 className="text-2xl font-semibold mb-4 gradient-text">Complete Your Profile</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Please complete the questionnaire to get your personalized career path and recommendations.
              </p>
              <Button onClick={() => navigate('/student-questionnaire')} className="bg-gradient-to-r from-blue-600 to-sky-500 hover:opacity-90 text-white">
                Go to Questionnaire
              </Button>
            </motion.div>
          </div>
        );
      }

      const handleNavigateToCourses = () => {
        navigate('/explore-courses');
      };

      return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-blue-900 dark:to-cyan-900 py-8 px-4">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row justify-between items-center mb-8 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md glassmorphism"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Welcome, <span className="gradient-text">{user.name}!</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Here's your personalized career journey.</p>
              </div>
              <Button variant="outline" onClick={() => navigate('/student-questionnaire')} className="mt-4 sm:mt-0 border-primary text-primary hover:bg-primary/10 dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-900/30">
                <Edit3 className="mr-2 h-4 w-4" /> Retake Questionnaire
              </Button>
            </motion.div>

            <CareerPathCard careerPath={user.careerPath} onNavigateToCourses={handleNavigateToCourses} />

            <motion.section 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <DashboardActionCard
                title="Explore Courses"
                description="Browse all available courses and find new skills to learn."
                icon={<BookOpen className="h-8 w-8 text-blue-500" />}
                onClick={handleNavigateToCourses}
                color="blue"
              />
              <DashboardActionCard
                title="Your Tasks"
                description="View and manage tasks related to your career path."
                icon={<CheckSquare className="h-8 w-8 text-green-500" />}
                onClick={() => alert("Tasks section coming soon! Check your career path for suggested tasks.")}
                color="green"
              />
              <DashboardActionCard
                title="Achievements"
                description="See your earned badges and accomplishments."
                icon={<Trophy className="h-8 w-8 text-yellow-500" />}
                onClick={() => alert("Achievements section coming soon! See examples in your career path.")}
                color="yellow"
              />
              <DashboardActionCard
                title="Find Trainers"
                description="Connect with expert trainers in your field of interest."
                icon={<Users className="h-8 w-8 text-sky-500" />}
                onClick={() => alert("Find Trainers feature coming soon! Check your career path for initial recommendations.")}
                color="sky"
              />
            </motion.section>
          </div>
        </div>
      );
    };

    const DashboardActionCard = ({ title, description, icon, onClick, color }) => (
      <motion.div
        whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
        className={`bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg cursor-pointer glassmorphism border-l-4 border-${color}-500 dark:border-${color}-400`}
        onClick={onClick}
      >
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/50`}>
            {icon}
          </div>
          <div>
            <h3 className={`text-xl font-semibold mb-1 text-${color}-700 dark:text-${color}-300`}>{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
          </div>
        </div>
      </motion.div>
    );

    export default StudentDashboardPage;