import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { useAuth } from '@/hooks/useAuth';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import LoadingSpinner from '@/components/LoadingSpinner';
    import { motion } from 'framer-motion';
    import { Checkbox } from '@/components/ui/checkbox';

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


    const TrainerQuestionnairePage = () => {
      const { user, updateUser } = useAuth();
      const navigate = useNavigate();
      const { toast } = useToast();
      
      const [selectedExpertise, setSelectedExpertise] = useState([]);
      const [otherExpertise, setOtherExpertise] = useState('');
      const [bio, setBio] = useState('');
      const [experienceYears, setExperienceYears] = useState('');
      const [linkedInProfile, setLinkedInProfile] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      useEffect(() => {
        if (user && user.questionnaireCompleted) { // Pre-fill if already completed
          setSelectedExpertise(user.expertise || []);
          setOtherExpertise((user.expertise || []).find(e => !expertiseAreas.includes(e)) || '');
          setBio(user.bio || '');
          setExperienceYears(user.experienceYears || '');
          setLinkedInProfile(user.linkedInProfile || '');
        }
      }, [user]);

      const handleExpertiseChange = (expertiseItem) => {
        setSelectedExpertise(prev => 
          prev.includes(expertiseItem) ? prev.filter(e => e !== expertiseItem) : [...prev, expertiseItem]
        );
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const allExpertise = [...selectedExpertise];
        if (otherExpertise.trim() && !allExpertise.includes(otherExpertise.trim())) {
          allExpertise.push(otherExpertise.trim());
        }

        if (allExpertise.length === 0) {
          toast({ variant: "destructive", title: "No Expertise Selected", description: "Please select at least one area of expertise or enter your own." });
          setIsLoading(false);
          return;
        }
        if (!bio.trim()) {
          toast({ variant: "destructive", title: "Bio is Required", description: "Please tell students a bit about yourself." });
          setIsLoading(false);
          return;
        }
        if (!experienceYears.trim() || isNaN(parseInt(experienceYears)) || parseInt(experienceYears) < 0) {
            toast({ variant: "destructive", title: "Invalid Experience", description: "Please enter a valid number of years for experience." });
            setIsLoading(false);
            return;
        }


        try {
          // In a real app, this would likely involve an API call.
          // For now, we update localStorage directly via AuthContext.
          updateUser({ 
            expertise: allExpertise, 
            bio: bio.trim(),
            experienceYears: parseInt(experienceYears),
            linkedInProfile: linkedInProfile.trim(),
            questionnaireCompleted: true 
          });
          toast({ title: "Profile Updated!", description: "Your trainer profile is now set up." });
          navigate('/trainer-dashboard');
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error Updating Profile",
            description: error.message || "Could not update your profile. Please try again.",
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeInOut" } },
      };

      if (!user) {
        return <LoadingSpinner />; 
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 dark:from-slate-900 dark:via-blue-900 dark:to-cyan-900 p-4 py-12">
          <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    className="w-full max-w-2xl"
  >
    <Card className="shadow-2xl glassmorphism">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold gradient-text">
          Set Up Your Trainer Profile
        </CardTitle>
        <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
          Share your expertise and experience to connect with students.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-8 p-6 md:p-8">

          {/* Expertise Section */}
          <div className="space-y-3">
            <Label className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Areas of Expertise
            </Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Select all that apply. You can add others too.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-60 overflow-y-auto p-2 border rounded-md bg-white/50 dark:bg-slate-800/50">
              {expertiseAreas.map((area) => (
                <motion.div
                  key={area}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-50 dark:hover:bg-sky-900/30 transition-colors cursor-pointer"
                >
                  <Checkbox
                    id={`expertise-${area.replace(/\s+/g, '-')}`}
                    checked={selectedExpertise.includes(area)}
                    onCheckedChange={() => handleExpertiseChange(area)}
                  />
                  <Label
                    htmlFor={`expertise-${area.replace(/\s+/g, '-')}`}
                    className="font-normal text-gray-700 dark:text-gray-300 cursor-pointer text-sm"
                  >
                    {area}
                  </Label>
                </motion.div>
              ))}
            </div>
            <Input
              placeholder="Other expertise (comma separated)"
              value={otherExpertise}
              onChange={(e) => setOtherExpertise(e.target.value)}
              className="mt-2 bg-white/50 dark:bg-slate-800/50"
            />
          </div>

          {/* Bio Section */}
          <div className="space-y-3">
            <Label htmlFor="bio" className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Your Bio
            </Label>
            <Textarea
              id="bio"
              placeholder="Tell students about your background, teaching style, and passion for your subjects..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="min-h-[120px] bg-white/50 dark:bg-slate-800/50"
              required
            />
          </div>

          {/* Experience & LinkedIn */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="experienceYears" className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Years of Experience
              </Label>
              <Input
                id="experienceYears"
                type="number"
                placeholder="e.g., 5"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="bg-white/50 dark:bg-slate-800/50"
                required
                min="0"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="linkedin" className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                LinkedIn Profile URL (Optional)
              </Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                value={linkedInProfile}
                onChange={(e) => setLinkedInProfile(e.target.value)}
                className="bg-white/50 dark:bg-slate-800/50"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center p-6 md:p-8">
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-sky-500 hover:opacity-90 text-white text-lg py-3 px-8"
          >
            {isLoading ? <LoadingSpinner size="sm" /> : "Save Trainer Profile"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  </motion.div>
        </div>
      );
    };

    export default TrainerQuestionnairePage;
