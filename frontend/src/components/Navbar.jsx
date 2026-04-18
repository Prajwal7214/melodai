import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Music, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLightTheme = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/generate' || location.pathname === '/favorites';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Studio', path: '/generate' },
    { name: 'History', path: '/history' },
    { name: 'Favorites', path: '/favorites' },
    { name: 'Settings', path: '/settings' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className={`text-xl font-bold tracking-tight ${scrolled || isLightTheme ? 'text-black' : 'text-white'}`}>
            MelodAI
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            
            return (
              <Link key={link.name} to={link.path}>
                <motion.span 
                  whileHover={!isActive ? { scale: 1.05 } : {}}
                  className={`text-sm font-semibold transition-colors relative ${
                    isActive 
                      ? `px-5 py-2 rounded-full shadow-md tracking-wide ${scrolled || isLightTheme ? 'bg-black text-white' : 'bg-white text-black'}`
                      : `px-2 py-2 ${scrolled || isLightTheme ? 'text-gray-600 hover:text-black' : 'text-zinc-300 hover:text-white'}`
                  }`}
                >
                  {link.name}
                </motion.span>
              </Link>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <button 
                onClick={logout}
                className={`w-9 h-9 flex items-center justify-center rounded-full font-bold text-sm shadow-sm transition-all transform hover:scale-105 border ${
                  scrolled || isLightTheme 
                    ? 'bg-black text-white hover:bg-gray-800 border-transparent' 
                    : 'bg-white/10 text-white hover:bg-white hover:text-black border-white/20'
                }`}
                title="Log out"
              >
                {user.initials}
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className={`text-sm font-semibold transition-colors ${scrolled || isLightTheme ? 'text-gray-600 hover:text-black' : 'text-white hover:text-gray-300'}`}>
                Log in
              </Link>
              <Link to="/generate">
                <button className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 ${
                    scrolled || isLightTheme 
                      ? 'bg-black text-white hover:bg-gray-800 shadow-md' 
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}>
                  Try for Free
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X color={scrolled || isLightTheme ? 'black' : 'white'} /> : <Menu color={scrolled || isLightTheme ? 'black' : 'white'} />}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
