import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';

const expertiseAreas = [
  "Web Development (Frontend, Backend, Fullstack)",
  "Mobile App Development (iOS, Android, Cross-platform)",
  "Data Science & Machine Learning",
  "Artificial Intelligence",
  "Cybersecurity",
  "Cloud Computing (AWS, Azure, GCP)",
  "DevOps Engineering",
  "UI/UX Design",
  "Digital Marketing (SEO, SEM, Content, Social Media)",
  "Business Analytics",
  "Project Management (Agile, Scrum)",
  "Creative Writing & Content Creation",
  "Graphic Design & Illustration",
  "Photography & Videography",
  "Music Production & Audio Engineering",
  "Language Tutoring (e.g., English, Spanish, French)",
  "Academic Tutoring (Math, Science, History)",
  "Fitness & Wellness Coaching",
  "Culinary Arts & Cooking",
  "Financial Literacy & Investing"
];

const ContentUploadPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const courses = JSON.parse(localStorage.getItem(`trainerCourses_${user.email}`)) || [];
  const [formData, setFormData] = useState({
    courseId: '',
    expertiseArea: '', // New field for expertise area
    fileType: '',
    fileUrl: '',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContent = {
      id: Date.now(),
      courseId: formData.courseId,
      expertiseArea: formData.expertiseArea, // Include expertise area in the content
      fileType: formData.fileType,
      fileUrl: formData.fileUrl || 'default-file-url',
    };

    const existingContent = JSON.parse(localStorage.getItem(`trainerContent_${user.email}`)) || [];
    const updatedContent = [...existingContent, newContent];
    localStorage.setItem(`trainerContent_${user.email}`, JSON.stringify(updatedContent));

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
              <CardTitle className="text-2xl gradient-text">Upload Content</CardTitle>
              <CardDescription>Upload PDFs, videos, or audio for your courses.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Course</label>
                  <select
                    value={formData.expertiseArea}
                    onChange={(e) => handleChange('expertiseArea', e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Select an Course</option>
                    {expertiseAreas.map((area, index) => (
                      <option key={index} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">File Type</label>
                  <select
                    value={formData.fileType}
                    onChange={(e) => handleChange('fileType', e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Select file type</option>
                    <option value="PDF">PDF</option>
                    <option value="Video">Video (MP4)</option>
                    <option value="Audio">Audio (MP3)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">File URL (Simulated)</label>
                  <Input
                    name="fileUrl"
                    value={formData.fileUrl}
                    onChange={(e) => handleChange('fileUrl', e.target.value)}
                    placeholder="Enter file URL (simulated)"
                  />
                </div>
                <Button type="submit" className="bg-gradient-to-r from-blue-500 to-sky-500 text-white hover:opacity-90">
                  Upload Content
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ContentUploadPage;
