import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    signup(email, name);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-200/50 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-200/50 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-10 md:p-12 relative z-10 my-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
            <span className="text-xl font-bold tracking-tight text-zinc-900 group-hover:text-violet-600 transition-colors">
              MelodAI
            </span>
          </Link>
          <h1 className="font-instrument italic text-4xl text-zinc-900 mb-3">Join the rhythm.</h1>
          <p className="text-zinc-500 font-medium tracking-tight">Create your account to start generating.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-zinc-700 tracking-tight">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Maestro"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium placeholder-zinc-400"
            />
          </div>

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

          <div className="space-y-1.5 pt-1">
            <label className="block text-sm font-bold text-zinc-700 tracking-tight">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              required
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium placeholder-zinc-400"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-zinc-900 hover:bg-zinc-800 mt-4 text-white rounded-xl px-4 py-4 font-bold tracking-tight shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_25px_rgba(0,0,0,0.12)] transition-all flex items-center justify-center gap-2"
          >
            Create Account <span className="font-serif italic font-normal text-lg">→</span>
          </button>
        </form>

        <div className="mt-8 text-center mb-2">
          <p className="text-sm font-medium text-zinc-500">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-600 hover:text-violet-700 font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
        <p className="text-[10px] text-zinc-400 text-center mx-auto max-w-[200px] mt-6">
            By joining, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
