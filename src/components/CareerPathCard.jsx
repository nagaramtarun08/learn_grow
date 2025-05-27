import React from 'react';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { motion } from 'framer-motion';
    import { Briefcase, Youtube, BookOpenCheck, Lightbulb, Users, Link as LinkIcon, Target, Award, ClipboardCheck, UserCheck, Mail, Linkedin } from 'lucide-react';
    import { Badge } from '@/components/ui/badge';

    const SectionIcon = ({ icon: Icon, className }) => <Icon size={22} className={`mr-2 ${className}`} />;

    const CareerPathCard = ({ careerPath, onNavigateToCourses }) => {
      if (!careerPath) return null;

      const { 
        path_name, 
        description, 
        skills_required, 
        potential_roles, 
        learning_resources, 
        estimated_salary_range,
        recommended_trainers,
        suggested_tasks,
        achievements_and_badges 
      } = careerPath;

      const sectionVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
          opacity: 1,
          x: 0,
          transition: {
            delay: i * 0.15,
            duration: 0.5,
            ease: "easeInOut"
          }
        })
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
      };
      
      const renderResourceLink = (item, type) => (
        <motion.custom key={item.link || item.title} variants={itemVariants} initial="hidden" animate="visible" className="block p-4 rounded-lg bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors shadow-sm border border-gray-200 dark:border-slate-700">
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            <p className="font-semibold text-blue-600 dark:text-sky-400 truncate">{item.title || item.name}</p>
            {item.platform && <p className="text-xs text-gray-500 dark:text-gray-400">{item.platform}</p>}
            {item.author && <p className="text-xs text-gray-500 dark:text-gray-400">By {item.author}</p>}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
              <LinkIcon size={12} className="mr-1" /> 
              {type === 'youtube' ? 'Watch on YouTube' : type === 'ebook' ? 'Find e-book' : 'Go to course'}
            </p>
          </a>
        </motion.custom>
      );

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="w-full shadow-xl overflow-hidden glassmorphism border-2 border-blue-500/30 dark:border-sky-500/30">
            <CardHeader className="bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 p-6 md:p-8 text-white">
              <motion.div custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="flex items-center space-x-3">
                <Briefcase size={40} className="text-white/80" />
                <div>
                  <CardTitle className="text-3xl md:text-4xl font-bold text-white">{path_name || "Your Career Path"}</CardTitle>
                  <CardDescription className="text-blue-100 dark:text-sky-200 text-lg mt-1">{description || "Explore your potential career."}</CardDescription>
                </div>
              </motion.div>
            </CardHeader>

            <CardContent className="p-6 md:p-8 space-y-8">
              {skills_required && skills_required.length > 0 && (
                <motion.section custom={1} variants={sectionVariants} initial="hidden" animate="visible">
                  <h3 className="text-xl font-semibold mb-3 text-primary dark:text-sky-400 flex items-center">
                    <SectionIcon icon={Lightbulb} /> Skills to Develop
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills_required.map((skill, index) => (
                      <motion.custom key={index} variants={itemVariants} initial="hidden" animate="visible">
                        <Badge variant="secondary" className="text-sm bg-blue-100 text-blue-700 dark:bg-sky-800 dark:text-sky-200">{skill}</Badge>
                      </motion.custom>
                    ))}
                  </div>
                </motion.section>
              )}

              {potential_roles && potential_roles.length > 0 && (
                <motion.section custom={2} variants={sectionVariants} initial="hidden" animate="visible">
                  <h3 className="text-xl font-semibold mb-3 text-primary dark:text-sky-400 flex items-center">
                    <SectionIcon icon={Users} /> Potential Roles
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    {potential_roles.map((role, index) => (
                      <motion.custom key={index} variants={itemVariants} initial="hidden" animate="visible">
                        <li>{role}</li>
                      </motion.custom>
                    ))}
                  </ul>
                </motion.section>
              )}
              
              {estimated_salary_range && (
                 <motion.section custom={3} variants={sectionVariants} initial="hidden" animate="visible">
                  <h3 className="text-xl font-semibold mb-2 text-primary dark:text-sky-400">Estimated Salary Range</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">{estimated_salary_range}</p>
                </motion.section>
              )}

              {learning_resources && (
                <motion.section custom={4} variants={sectionVariants} initial="hidden" animate="visible">
                  <h3 className="text-xl font-semibold mb-4 text-primary dark:text-sky-400 flex items-center">
                    <SectionIcon icon={BookOpenCheck} /> Learning Resources
                  </h3>
                  <div className="space-y-6">
                    {learning_resources.online_courses && learning_resources.online_courses.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200 flex items-center">
                          <SectionIcon icon={BookOpenCheck} className="text-green-500" /> Online Courses
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {learning_resources.online_courses.slice(0, 4).map((course) => renderResourceLink(course, 'course'))}
                        </div>
                      </div>
                    )}
                     {learning_resources.youtube_videos && learning_resources.youtube_videos.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200 flex items-center">
                          <SectionIcon icon={Youtube} className="text-red-500" /> Recommended YouTube Videos
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {learning_resources.youtube_videos.slice(0, 4).map((video) => renderResourceLink(video, 'youtube'))}
                        </div>
                      </div>
                    )}
                    {learning_resources.ebooks && learning_resources.ebooks.length > 0 && (
                       <div>
                        <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200 flex items-center">
                           <SectionIcon icon={BookOpenCheck} className="text-purple-500" /> E-books
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {learning_resources.ebooks.slice(0, 2).map((ebook) => renderResourceLink(ebook, 'ebook'))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.section>
              )}

              {recommended_trainers && recommended_trainers.length > 0 && (
                <motion.section custom={5} variants={sectionVariants} initial="hidden" animate="visible">
                  <h3 className="text-xl font-semibold mb-3 text-primary dark:text-sky-400 flex items-center">
                    <SectionIcon icon={UserCheck} /> Recommended Trainers
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommended_trainers.map((trainer, index) => (
                      <motion.custom key={index} variants={itemVariants} initial="hidden" animate="visible" className="p-4 rounded-lg bg-gray-50 dark:bg-slate-800 shadow-sm border border-gray-200 dark:border-slate-700">
                        <p className="font-semibold text-blue-700 dark:text-sky-300">{trainer.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{trainer.specialization}</p>
                        {trainer.contact_info && <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center"><Mail size={12} className="mr-1"/> {trainer.contact_info}</p> }
                        {trainer.profile_url && trainer.profile_url !== "#" && (
                           <a href={trainer.profile_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline dark:text-sky-400 mt-1 flex items-center">
                             <Linkedin size={12} className="mr-1"/> View Profile
                           </a>
                        )}
                      </motion.custom>
                    ))}
                  </div>
                   <p className="text-xs text-muted-foreground mt-2">Note: These are initial recommendations. You can find more trainers in the 'Explore' section.</p>
                </motion.section>
              )}

              {suggested_tasks && suggested_tasks.length > 0 && (
                <motion.section custom={6} variants={sectionVariants} initial="hidden" animate="visible">
                  <h3 className="text-xl font-semibold mb-3 text-primary dark:text-sky-400 flex items-center">
                    <SectionIcon icon={ClipboardCheck} /> Suggested Tasks
                  </h3>
                  <div className="space-y-3">
                    {suggested_tasks.slice(0,3).map((task, index) => (
                      <motion.custom key={index} variants={itemVariants} initial="hidden" animate="visible" className="p-4 rounded-lg bg-gray-50 dark:bg-slate-800 shadow-sm border border-gray-200 dark:border-slate-700">
                        <div className="flex justify-between items-start">
                          <p className="font-semibold text-blue-700 dark:text-sky-300">{task.title}</p>
                          <Badge variant={task.difficulty === 'Beginner' ? 'default' : task.difficulty === 'Intermediate' ? 'secondary' : 'outline'} 
                                 className={task.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200' : 
                                            task.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200' :
                                            'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200'}>
                            {task.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-2 text-blue-500 dark:text-sky-400">Mark as Complete (Feature Coming)</Button>
                      </motion.custom>
                    ))}
                  </div>
                </motion.section>
              )}

              {achievements_and_badges && achievements_and_badges.length > 0 && (
                <motion.section custom={7} variants={sectionVariants} initial="hidden" animate="visible">
                  <h3 className="text-xl font-semibold mb-3 text-primary dark:text-sky-400 flex items-center">
                    <SectionIcon icon={Award} /> Achievements & Badges
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {achievements_and_badges.slice(0,3).map((badge, index) => (
                      <motion.custom key={index} variants={itemVariants} initial="hidden" animate="visible" className="flex flex-col items-center p-3 rounded-lg bg-gray-50 dark:bg-slate-800 shadow-sm border border-gray-200 dark:border-slate-700 w-36 text-center">
                        {badge.icon === 'Code' && <Lightbulb size={24} className="mb-1 text-blue-500" />}
                        {badge.icon === 'Rocket' && <Target size={24} className="mb-1 text-purple-500" />}
                        {badge.icon === 'Award' && <Award size={24} className="mb-1 text-yellow-500" />}
                        {badge.icon !== 'Code' && badge.icon !== 'Rocket' && badge.icon !== 'Award' && <Award size={24} className="mb-1 text-gray-500" />}
                        <p className="font-semibold text-sm text-blue-700 dark:text-sky-300">{badge.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{badge.description}</p>
                      </motion.custom>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Complete tasks and courses to earn more badges!</p>
                </motion.section>
              )}

            </CardContent>

            <CardFooter className="p-6 md:p-8 bg-gray-50 dark:bg-slate-800/50 border-t dark:border-slate-700/50">
              <motion.div custom={8} variants={sectionVariants} initial="hidden" animate="visible" className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ready to take the next step? Explore courses and connect with trainers.
                </p>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-sky-500 hover:opacity-90 text-white w-full sm:w-auto" onClick={onNavigateToCourses}>
                  Explore Related Courses
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    export default CareerPathCard;