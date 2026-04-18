import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    login(email);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-200/50 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-200/50 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-10 md:p-12 relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
            <span className="text-xl font-bold tracking-tight text-zinc-900 group-hover:text-violet-600 transition-colors">
              MelodAI
            </span>
          </Link>
          <h1 className="font-instrument italic text-4xl text-zinc-900 mb-3">Welcome back.</h1>
          <p className="text-zinc-500 font-medium tracking-tight">Log in to continue generating music.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-zinc-700 tracking-tight">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium placeholder-zinc-400"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-bold text-zinc-700 tracking-tight">Password</label>
              <a href="#" className="text-xs font-bold text-violet-600 hover:text-violet-700 hover:underline">Forgot?</a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              required
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium placeholder-zinc-400"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl px-4 py-4 font-bold tracking-tight shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_25px_rgba(0,0,0,0.12)] transition-all flex items-center justify-center gap-2"
          >
            Log In <span className="font-serif italic font-normal text-lg">→</span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm font-medium text-zinc-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-violet-600 hover:text-violet-700 font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
