import React, { useState, useEffect } from 'react';
    import { useNavigate, useLocation } from 'react-router-dom';
    import { useAuth } from '@/hooks/useAuth';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
    import { useToast } from '@/components/ui/use-toast';
    import { motion } from 'framer-motion';
    import { Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';

    const AuthPage = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [name, setName] = useState(''); // For signup
      const [role, setRole] = useState('student'); // Default role
      const [isLogin, setIsLogin] = useState(true);
      const [showPassword, setShowPassword] = useState(false);
      
      const { login, signup, user } = useAuth();
      const navigate = useNavigate();
      const location = useLocation();
      const { toast } = useToast();

      const from = location.state?.from?.pathname || '/';
      const urlParams = new URLSearchParams(location.search);
      const action = urlParams.get('action');

      useEffect(() => {
        if (action === 'signup') {
          setIsLogin(false);
        } else {
          setIsLogin(true);
        }
      }, [action]);
      
      useEffect(() => {
        if (user) {
          if (user.role === 'student' && !user.questionnaireCompleted) {
            navigate('/student-questionnaire', { replace: true });
          } else if (user.role === 'trainer' && !user.questionnaireCompleted) {
            navigate('/trainer-questionnaire', { replace: true });
          } else {
            navigate(user.role === 'student' ? '/student-dashboard' : '/trainer-dashboard', { replace: true });
          }
        }
      }, [user, navigate]);


      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (isLogin) {
            const allUsers = JSON.parse(localStorage.getItem('learnAndGrowAllUsers') || '[]');
            const foundUser = allUsers.find(u => u.email === email && u.password === password); 
            if (foundUser) {
              login(foundUser);
              toast({ title: "Login Successful", description: "Welcome back!" });
            } else {
              throw new Error('Invalid email or password.');
            }
          } else {
            if (!name.trim()) throw new Error('Name is required for signup.');
            await signup({ name, email, password, role, questionnaireCompleted: false, careerPath: null });
            toast({ title: "Signup Successful", description: "Welcome to Learn & Grow!" });
          }
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: error.message || "An unexpected error occurred.",
          });
        }
      };
      
      const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 dark:from-slate-900 dark:via-blue-900 dark:to-cyan-900 p-4">
          <motion.div variants={cardVariants} initial="hidden" animate="visible">
            <Tabs defaultValue={isLogin ? "login" : "signup"} 
                  onValueChange={(value) => setIsLogin(value === "login")} 
                  className="w-full max-w-md">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </TabsTrigger>
                <TabsTrigger value="signup">
                  <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Card className="glassmorphism">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold gradient-text">Welcome Back!</CardTitle>
                    <CardDescription>Enter your credentials to access your account.</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input id="login-email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      <div className="space-y-2 relative">
                        <Label htmlFor="login-password">Password</Label>
                        <Input id="login-password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-7 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:opacity-90 text-white">Login</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              <TabsContent value="signup">
                <Card className="glassmorphism">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold gradient-text">Create an Account</CardTitle>
                    <CardDescription>Join Learn & Grow to start your journey.</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <Input id="signup-name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input id="signup-email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      <div className="space-y-2 relative">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input id="signup-password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                         <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-7 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">I am a...</Label>
                        <select
                          id="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          <option value="student">Student</option>
                          <option value="trainer">Trainer</option>
                        </select>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:opacity-90 text-white">Sign Up</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      );
    };

    export default AuthPage;
