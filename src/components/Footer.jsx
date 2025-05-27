import React from 'react';
    import { Github, Linkedin, Twitter } from 'lucide-react';

    const Footer = () => {
      const currentYear = new Date().getFullYear();
      return (
        <footer className="bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-xl font-semibold text-slate-800 dark:text-white">Learn & Grow</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Bridging hobbies and professional careers through guided learning.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Quick Links</p>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 transition-colors">About Us</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 transition-colors">Contact</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 transition-colors">Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Connect With Us</p>
                <div className="mt-4 flex space-x-4">
                  <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 transition-colors">
                    <span className="sr-only">GitHub</span>
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-8 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                &copy; {currentYear} Learn & Grow. All rights reserved.
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Powered by Hostinger Horizons
              </p>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;
