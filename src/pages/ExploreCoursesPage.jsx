import React, { useState, useEffect } from 'react';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Badge } from '@/components/ui/badge';
    import { motion } from 'framer-motion';
    import { Filter, Search, Star, Users, ExternalLink } from 'lucide-react';
    import LoadingSpinner from '@/components/LoadingSpinner';

    const sampleCourses = [
      { id: 1, title: "Introduction to Web Development", category: "Tech", trainer: "Jane Doe", rating: 4.5, students: 1200, price: "Free", image: "web-dev", description: "Learn the basics of HTML, CSS, and JavaScript.", url: "https://www.example.com/web-dev-course" },
      { id: 2, title: "Advanced Python Programming", category: "Tech", trainer: "John Smith", rating: 4.8, students: 850, price: "$49.99", image: "python-course", description: "Master Python with advanced concepts and projects.", url: "https://www.example.com/python-course" },
      { id: 3, title: "Digital Marketing Fundamentals", category: "Business", trainer: "Alice Brown", rating: 4.2, students: 2500, price: "$29.99", image: "digital-marketing", description: "Understand SEO, SEM, and social media marketing.", url: "https://www.example.com/digital-marketing-course" },
      { id: 4, title: "Graphic Design for Beginners", category: "Creative", trainer: "Bob Green", rating: 4.6, students: 1500, price: "Free", image: "graphic-design", description: "Learn design principles and tools like Photoshop.", url: "https://www.example.com/graphic-design-course" },
      { id: 5, title: "Data Science with R", category: "Tech", trainer: "Carol White", rating: 4.7, students: 950, price: "$59.99", image: "data-science", description: "Explore data analysis and visualization using R.", url: "https://www.example.com/data-science-course" },
      { id: 6, title: "Introduction to UI/UX Design", category: "Creative", trainer: "David Black", rating: 4.9, students: 1800, price: "Free", image: "ui-ux", description: "Learn the fundamentals of user interface and user experience design.", url: "https://www.example.com/ui-ux-course" },
    ];


    const ExploreCoursesPage = () => {
      const [courses, setCourses] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [selectedCategory, setSelectedCategory] = useState('All');
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        setTimeout(() => {
          setCourses(sampleCourses);
          setLoading(false);
        }, 1000);
      }, []);

      const categories = ['All', ...new Set(sampleCourses.map(course => course.category))];

      const filteredCourses = courses.filter(course => {
        return (
          (selectedCategory === 'All' || course.category === selectedCategory) &&
          course.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      
      const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.1,
            duration: 0.4,
            ease: "easeInOut"
          }
        })
      };


      return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-blue-900 dark:to-cyan-900 py-8 px-4">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                Explore <span className="gradient-text">Courses</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover a wide range of courses to fuel your passion and advance your career.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg glassmorphism"
            >
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full md:w-auto">
                  <Input 
                    type="text"
                    placeholder="Search for courses..."
                    className="pl-10 text-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <div className="relative w-full md:w-auto">
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full md:w-auto pl-10 pr-4 py-2.5 border border-input bg-background rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </motion.div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredCourses.length === 0 ? (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-xl text-gray-500 dark:text-gray-400 py-10"
              >
                No courses found matching your criteria. Try adjusting your search or filters.
              </motion.p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course, index) => (
                  <motion.custom
                    key={course.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    className="flex"
                  >
                    <Card className="w-full flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 glassmorphism transform hover:-translate-y-1">
                      <div className="relative h-48 bg-gradient-to-br from-blue-300 via-sky-300 to-cyan-300">
                        <img  alt={`Course image for ${course.title}`} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
                        <Badge variant="secondary" className="absolute top-2 right-2 bg-opacity-80">{course.category}</Badge>
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl font-semibold leading-tight h-14 overflow-hidden">{course.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">By {course.trainer}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">{course.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" /> {course.rating}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" /> {course.students}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center pt-3 border-t dark:border-gray-700">
                        <p className="text-lg font-bold text-primary">{course.price}</p>
                        <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:opacity-90">
                          <a href={course.url} target="_blank" rel="noopener noreferrer">
                            View Course <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.custom>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    };

    export default ExploreCoursesPage;
