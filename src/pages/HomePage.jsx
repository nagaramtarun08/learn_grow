import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { motion } from 'framer-motion';
    import { Zap, Users, BookOpen, TrendingUp, Palette } from 'lucide-react';

    const FeatureCard = ({ icon, title, description, delay }) => (
      <motion.div
        className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 glassmorphism"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay, duration: 0.5, type: 'spring', stiffness: 100 }}
      >
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full text-white mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
      </motion.div>
    );

    const HomePage = () => {
      return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 dark:from-slate-900 dark:via-blue-900 dark:to-cyan-900">
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <motion.section
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                <span className="gradient-text">Learn & Grow</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
                Turn your hobbies into a fulfilling career. Connect with expert trainers, discover personalized learning paths, and unlock your potential.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg">
                    Get Started Now
                    <Zap className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.section>

            <section className="py-16 md:py-24">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
                Why Choose <span className="gradient-text">Learn & Grow</span>?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard 
                  icon={<TrendingUp size={24} />} 
                  title="AI-Powered Career Paths" 
                  description="Get personalized career recommendations based on your unique hobbies and interests."
                  delay={0.2}
                />
                <FeatureCard 
                  icon={<Users size={24} />} 
                  title="Expert Trainers" 
                  description="Connect with experienced trainers ready to guide you on your professional journey."
                  delay={0.4}
                />
                <FeatureCard 
                  icon={<BookOpen size={24} />} 
                  title="Curated Content" 
                  description="Access a rich library of courses, videos, and resources tailored to your chosen path."
                  delay={0.6}
                />
                <FeatureCard 
                  icon={<Palette size={24} />} 
                  title="Engaging UI" 
                  description="Experience a modern, intuitive interface with a beautiful blue theme."
                  delay={0.8}
                />
              </div>
            </section>
            
            <section className="py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">Ready to Transform Your Passion?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
                    Join our community of learners and trainers today. Your dream career is just a few clicks away.
                </p>
                <Link to="/auth?action=signup">
                    <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-900/30 font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-md">
                        Sign Up as a Student or Trainer
                    </Button>
                </Link>
            </section>

          </main>
          <div className="text-center pb-8">
            <img  alt="Abstract representation of interconnected learning nodes in blue tones" className="mx-auto w-full max-w-md h-auto rounded-lg shadow-md" src="https://images.unsplash.com/photo-1675627452821-476b9e185a5a" />
          </div>
        </div>
      );
    };

    export default HomePage;
