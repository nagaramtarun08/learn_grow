import React, { createContext, useState, useEffect, useCallback } from 'react';

    export const AuthContext = createContext(null);

    export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const storedUser = localStorage.getItem('learnAndGrowUser');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (error) {
            console.error("Failed to parse stored user:", error);
            localStorage.removeItem('learnAndGrowUser');
          }
        }
        setLoading(false);
      }, []);

      const login = useCallback((userData) => {
        const userToStore = { ...userData };
        localStorage.setItem('learnAndGrowUser', JSON.stringify(userToStore));
        setUser(userToStore);
      }, []);

      const signup = useCallback((userData) => {
        const existingUsers = JSON.parse(localStorage.getItem('learnAndGrowAllUsers') || '[]');
        if (existingUsers.find(u => u.email === userData.email)) {
          throw new Error('User with this email already exists.');
        }
        const newUserWithDefaults = {
          ...userData,
          hobbies: [],
          careerAspirations: '',
          careerPath: null,
          questionnaireCompleted: false,
          tasks: [], 
        };
        existingUsers.push(newUserWithDefaults);
        localStorage.setItem('learnAndGrowAllUsers', JSON.stringify(existingUsers));
        login(newUserWithDefaults);
      }, [login]);

      const logout = useCallback(() => {
        localStorage.removeItem('learnAndGrowUser');
        setUser(null);
      }, []);

      const updateUser = useCallback((updatedData) => {
        setUser(currentUser => {
          if (!currentUser) return null;

          const newUserData = { ...currentUser, ...updatedData };
          
          // Only update if there's an actual change to prevent infinite loops
          if (JSON.stringify(currentUser) === JSON.stringify(newUserData)) {
            return currentUser; 
          }

          localStorage.setItem('learnAndGrowUser', JSON.stringify(newUserData));
          
          const existingUsers = JSON.parse(localStorage.getItem('learnAndGrowAllUsers') || '[]');
          const userIndex = existingUsers.findIndex(u => u.email === currentUser.email);
          if (userIndex !== -1) {
            existingUsers[userIndex] = { ...existingUsers[userIndex], ...newUserData };
            localStorage.setItem('learnAndGrowAllUsers', JSON.stringify(existingUsers));
          }
          return newUserData;
        });
      }, []);


      return (
        <AuthContext.Provider value={{ user, login, signup, logout, updateUser, loading }}>
          {!loading && children}
        </AuthContext.Provider>
      );
    };