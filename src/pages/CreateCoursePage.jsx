// CreateCoursePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';

const CreateCoursePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      id: Date.now(), // Unique ID based on timestamp
      title: formData.title,
      category: formData.category,
      trainer: user.name,
      rating: 0, // Default rating
      students: 0, // Default student count
      price: formData.price || 'Free',
      image: formData.image || 'default-course-image', // Fallback image
      description: formData.description,
      url: `/course/${formData.title.toLowerCase().replace(/\s+/g, '-')}`, // Generate a simple URL
    };

    // Retrieve existing courses from localStorage
    const existingCourses = JSON.parse(localStorage.getItem(`trainerCourses_${user.email}`)) || [];
    const updatedCourses = [...existingCourses, newCourse];
    localStorage.setItem(`trainerCourses_${user.email}`, JSON.stringify(updatedCourses));

    // Navigate back to the dashboard
    navigate('/trainer-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-blue-900 dark:to-cyan-900 py-8 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">Create a New Course</CardTitle>
              <CardDescription>Fill in the details to create your educational content.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Course Title</label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter course title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                  <Input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g., Tech, Business, Creative"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your course"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                  <Input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g., Free, $49.99"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL (Optional)</label>
                  <Input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                  />
                </div>
                <Button type="submit" className="bg-gradient-to-r from-blue-500 to-sky-500 text-white hover:opacity-90">
                  Create Course
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
