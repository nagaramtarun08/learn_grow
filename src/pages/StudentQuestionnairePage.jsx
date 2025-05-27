import React, { useState, useEffect, useCallback } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { useAuth } from '@/hooks/useAuth';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { generateCareerPath } from '@/services/gemini';
    import LoadingSpinner from '@/components/LoadingSpinner';
    import { motion } from 'framer-motion';
    import { Checkbox } from '@/components/ui/checkbox';

    const hobbyOptions = [
      "Reading", "Writing", "Drawing/Painting", "Playing Musical Instruments", "Singing",
      "Dancing", "Photography", "Videography", "Cooking/Baking", "Gardening",
      "Hiking/Camping", "Sports (e.g., Soccer, Basketball)", "Yoga/Meditation", "Gaming (Video/Board)",
      "Coding/Programming", "Robotics", "Electronics", "Debating/Public Speaking",
      "Volunteering", "Learning Languages", "Collecting (e.g., Stamps, Coins)", "DIY Crafts"
    ];


    const StudentQuestionnairePage = () => {
      const { user, updateUser } = useAuth();
      const navigate = useNavigate();
      const { toast } = useToast();
      
      const [selectedHobbies, setSelectedHobbies] = useState([]);
      const [otherHobby, setOtherHobby] = useState('');
      const [careerAspirations, setCareerAspirations] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      useEffect(() => {
        if (user) {
          setSelectedHobbies(user.hobbies || []);
          const other = (user.hobbies || []).find(h => !hobbyOptions.includes(h));
          setOtherHobby(other || '');
          setCareerAspirations(user.careerAspirations || '');
        }
      }, [user?.hobbies, user?.careerAspirations]);


      const handleHobbyChange = (hobby) => {
        setSelectedHobbies(prev => 
          prev.includes(hobby) ? prev.filter(h => h !== hobby) : [...prev, hobby]
        );
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const allHobbies = [...selectedHobbies];
        if (otherHobby.trim() && !allHobbies.includes(otherHobby.trim())) {
          allHobbies.push(otherHobby.trim());
        }

        if (allHobbies.length === 0) {
          toast({ variant: "destructive", title: "No Hobbies Selected", description: "Please select at least one hobby or enter your own." });
          setIsLoading(false);
          return;
        }

        try {
          const careerPathData = await generateCareerPath(allHobbies);
          updateUser({ 
            hobbies: allHobbies, 
            careerAspirations: careerAspirations.trim(), 
            careerPath: careerPathData, 
            questionnaireCompleted: true 
          });
          toast({ title: "Questionnaire Submitted!", description: "Your personalized career path is ready." });
          navigate('/student-dashboard');
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error Generating Career Path",
            description: error.message || "Could not generate career path. Please try again.",
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
          <motion.div variants={cardVariants} initial="hidden" animate="visible" className="w-full max-w-2xl">
            <Card className="shadow-2xl glassmorphism">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold gradient-text">Tell Us About Yourself</CardTitle>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                  Help us understand your interests to suggest the best career path for you.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-8 p-6 md:p-8">
                  <div className="space-y-3">
                    <Label className="text-xl font-semibold text-gray-700 dark:text-gray-200">What are your hobbies and interests?</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Select all that apply. You can add others too!</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-60 overflow-y-auto p-2 border rounded-md bg-white/50 dark:bg-slate-800/50">
                      {hobbyOptions.map(hobby => (
                        <motion.div 
                          key={hobby}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-50 dark:hover:bg-sky-900/30 transition-colors cursor-pointer"
                        >
                          <Checkbox 
                            id={`hobby-${hobby}`} 
                            checked={selectedHobbies.includes(hobby)}
                            onCheckedChange={() => handleHobbyChange(hobby)}
                          />
                          <Label htmlFor={`hobby-${hobby}`} className="font-normal text-gray-700 dark:text-gray-300 cursor-pointer">{hobby}</Label>
                        </motion.div>
                      ))}
                    </div>
                    <Input 
                      placeholder="Other hobbies (e.g., Model Building, Astronomy)" 
                      value={otherHobby} 
                      onChange={(e) => setOtherHobby(e.target.value)} 
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="aspirations" className="text-xl font-semibold text-gray-700 dark:text-gray-200">What are your career aspirations? (Optional)</Label>
                    <Textarea 
                      id="aspirations"
                      placeholder="e.g., I want to become a software developer, start my own business, work in creative arts..."
                      value={careerAspirations}
                      onChange={(e) => setCareerAspirations(e.target.value)}
                      className="min-h-[100px] bg-white/50 dark:bg-slate-800/50"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center p-6 md:p-8">
                  <Button type="submit" disabled={isLoading} size="lg" className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-sky-500 hover:opacity-90 text-white text-lg py-3 px-8">
                    {isLoading ? <LoadingSpinner size="sm" /> : "Generate My Career Path"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default StudentQuestionnairePage;