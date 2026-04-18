import React, { useState, useEffect } from 'react';
import { Camera, Save, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [mood, setMood] = useState("Focus");

  useEffect(() => {
    if (user) {
      setName(user.name || '');
    }
  }, [user]);

  const MOODS = ['All', 'Happy', 'Sad', 'Calm', 'Energetic', 'Romantic', 'Focus'];

  const handleSave = () => {
    alert("Settings saved!");
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-32 px-6">
      <div className="max-w-2xl mx-auto space-y-10">
        
        {/* Header */}
        <div>
          <span className="inline-block bg-zinc-800 text-zinc-300 rounded-full px-3 py-1 text-xs font-semibold tracking-wide mb-3">
            ACCOUNT & PREFERENCES
          </span>
          <h1 className="text-4xl md:text-5xl font-bold -tracking-[0.05em] text-white mb-2">Settings</h1>
          <p className="font-instrument italic text-zinc-400 text-2xl">Adjust your preferences and account details.</p>
        </div>

        {/* Profile Section */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-6">Profile</h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-violet-600 to-pink-500 p-1 cursor-pointer group">
                 <div className="w-full h-full bg-black rounded-full overflow-hidden relative font-bold text-3xl flex items-center justify-center text-white">
                    {user?.initials || '??'}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                 </div>
              </div>
              <span className="text-xs text-zinc-500">Change Avatar</span>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Display Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-200 focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email Address</label>
                <input 
                  type="text" 
                  value={user?.email || ''}
                  readOnly
                  placeholder="No email found"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-500 cursor-not-allowed opacity-70"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-6">Preferences</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Default Generation Mood</label>
              <select 
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-200 focus:outline-none focus:border-violet-500/50 transition-colors appearance-none"
              >
                {MOODS.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-zinc-800/60">
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
              
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-500 hover:opacity-90 transition-opacity text-white px-6 py-2.5 rounded-xl font-semibold"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
};

export default Settings;
