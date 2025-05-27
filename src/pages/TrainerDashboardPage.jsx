import React from 'react';
    import { useAuth } from '@/hooks/useAuth';
    import LoadingSpinner from '@/components/LoadingSpinner';
    import { Button } from '@/components/ui/button';
    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { PlusCircle, Edit3, Users, BarChart2, FileText, MessageSquare } from 'lucide-react';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

    const TrainerDashboardPage = () => {
      const { user, loading } = useAuth();
      const navigate = useNavigate();

      if (loading) {
        return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
      }

      if (!user) {
        navigate('/auth');
        return null;
      }
      
      if (!user.questionnaireCompleted) {
         return (
          <div className="container mx-auto px-4 py-12 text-center">
            <motion.div 
              initial={{ opacity: 0, y:20 }}
              animate={{ opacity: 1, y:0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl max-w-md mx-auto glassmorphism"
            >
              <h1 className="text-2xl font-semibold mb-4 gradient-text">Complete Your Trainer Profile</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Please complete your profile to start connecting with students and managing your courses.
              </p>
              <Button onClick={() => navigate('/trainer-questionnaire')} className="bg-gradient-to-r from-blue-600 to-sky-500 hover:opacity-90 text-white">
                Go to Profile Setup
              </Button>
            </motion.div>
          </div>
        );
      }

      const courses = JSON.parse(localStorage.getItem(`trainerCourses_${user.email}`)) || [];
      const recommendedStudents = [ ];

      return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-blue-900 dark:to-cyan-900 py-8 px-4">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row justify-between items-center mb-8 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md glassmorphism"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Trainer Dashboard: <span className="gradient-text">{user.name}</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your courses, students, and content.</p>
              </div>
              <Button variant="outline" onClick={() => navigate('/trainer-questionnaire')} className="mt-4 sm:mt-0 border-primary text-primary hover:bg-primary/10 dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-900/30">
                <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <DashboardStatCard title="Total Courses" value={courses.length} icon={<FileText className="text-blue-500" />} />
              <DashboardStatCard title="Enrolled Students" value="0" description="(Feature coming soon)" icon={<Users className="text-green-500" />} />
              <DashboardStatCard title="Overall Rating" value="N/A" description="(Feature coming soon)" icon={<BarChart2 className="text-yellow-500" />} />
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <Card className="glassmorphism">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text">Manage Your Courses</CardTitle>
                  <CardDescription>Create, edit, and publish your educational content.</CardDescription>
                </CardHeader>
                <CardContent>
                  {courses.length === 0 ? (
                    <p className="text-muted-foreground">You haven't created any courses yet.</p>
                  ) : (
                    <ul className="space-y-2">
                      {courses.map(course => <li key={course.id} className="p-2 border rounded">{course.title}</li>)}
                    </ul>
                  )}
                  <Button className="mt-4 bg-gradient-to-r from-blue-500 to-sky-500 text-white hover:opacity-90" onClick={() => alert("Course creation feature coming soon!")}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Course
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Note: Full course creation and content upload (PDFs, MP4s, MP3s) with AI tagging will require backend integration (e.g., Supabase).</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="glassmorphism">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text">Recommended Students</CardTitle>
                  <CardDescription>Students who might be interested in your expertise. (AI-Powered)</CardDescription>
                </CardHeader>
                <CardContent>
                  {recommendedStudents.length === 0 ? (
                    <p className="text-muted-foreground">No specific student recommendations at this time. AI recommendations will appear here based on student interests and your expertise.</p>
                  ) : (
                     <ul className="space-y-2">
                    </ul>
                  )}
                   <p className="text-xs text-muted-foreground mt-2">Note: AI-powered student recommendations require further backend and data analysis capabilities.</p>
                </CardContent>
              </Card>
            </motion.div>
            
             <motion.section 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-12 grid md:grid-cols-2 gap-6"
            >
              <DashboardActionCard
                title="Content Upload"
                description="Upload PDFs, videos, and audio for your courses. (Coming Soon)"
                icon={<PlusCircle className="h-8 w-8 text-blue-500" />}
                onClick={() => alert("Content upload feature coming soon!")}
                color="blue"
              />

            </motion.section>


          </div>
        </div>
      );
    };

    const DashboardStatCard = ({ title, value, icon, description }) => (
      <Card className="glassmorphism">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold gradient-text">{value}</div>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </CardContent>
      </Card>
    );
    
    const DashboardActionCard = ({ title, description, icon, onClick, color }) => (
      <motion.div
        whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
        className={`bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg cursor-pointer glassmorphism border-l-4 border-${color}-500`}
        onClick={onClick}
      >
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/50`}>
            {icon}
          </div>
          <div>
            <h3 className={`text-xl font-semibold mb-1 text-${color}-700 dark:text-${color}-400`}>{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
          </div>
        </div>
      </motion.div>
    );


    export default TrainerDashboardPage;
