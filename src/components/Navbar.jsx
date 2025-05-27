import React from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { useAuth } from '@/hooks/useAuth';
    import { Button } from '@/components/ui/button';
    import { LogOut, User, LayoutDashboard, BookOpenCheck, Search } from 'lucide-react';
    import { motion } from 'framer-motion';
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu"
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


    const Navbar = () => {
      const { user, logout } = useAuth();
      const navigate = useNavigate();

      const handleLogout = () => {
        logout();
        navigate('/');
      };

      const getInitials = (name) => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length > 1) {
          return names[0][0] + names[names.length - 1][0];
        }
        return name[0];
      };

      return (
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className="bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 text-white shadow-lg sticky top-0 z-50"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity">
                Learn & Grow
              </Link>
              <div className="flex items-center space-x-4">
                {user && (
                  <Link to="/explore-courses">
                    <Button variant="ghost" className="text-white hover:bg-white/20">
                      <Search className="mr-2 h-5 w-5" /> Explore Courses
                    </Button>
                  </Link>
                )}
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/20">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.avatarUrl || ''} alt={user.name || 'User'} />
                          <AvatarFallback className="bg-sky-500 text-white">{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate(user.role === 'student' ? '/student-dashboard' : '/trainer-dashboard')}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                       {user.role === 'student' && user.questionnaireCompleted && (
                        <DropdownMenuItem onClick={() => navigate('/student-questionnaire')}>
                          <BookOpenCheck className="mr-2 h-4 w-4" />
                          <span>My Career Path</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-600 focus:bg-red-50 dark:text-red-400 dark:focus:text-red-500 dark:focus:bg-red-900/50">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/auth">
                    <Button className="bg-white text-blue-600 hover:bg-gray-100 dark:text-sky-500 dark:hover:bg-slate-700">
                      Login / Sign Up
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.nav>
      );
    };

    export default Navbar;
