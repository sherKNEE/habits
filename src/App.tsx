import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { GardenTab } from './components/GardenTab';
import { TasksTab } from './components/TasksTab';
import { ShopTab } from './components/ShopTab';
import { SocialTab } from './components/SocialTab';
import { SettingsTab } from './components/SettingsTab';
import { ProfileView } from './components/ProfileView';

type Tab = 'garden' | 'tasks' | 'shop' | 'social' | 'settings';

const AppContent: React.FC = () => {
  const {
    coins,
    username,
    setUsername,
    email,
    setEmail,
    alertMsg,
    setProfileOverlayTarget,
    profileOverlayTarget,
    triggerAlert
  } = useApp();

  const [activeTab, setActiveTab] = useState<Tab>('garden');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Sign out simulation
  const handleSignOut = () => {
    setIsAuthenticated(false);
    triggerAlert("Logged out of personal sanctuary!");
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) {
      triggerAlert("Please enter valid credentials to access your garden!");
      return;
    }
    setIsAuthenticated(true);
    triggerAlert(`Welcome back, Master Gardener ${username}! Your sanctuary is active.`);
  };

  // Render Overlay Modal for Screen 6 Profile details
  if (profileOverlayTarget) {
    return <ProfileView />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-gutter bg-cover bg-center bg-radial from-[#cceacd] to-[#f9f9f9]">
        <div className="absolute inset-0 bg-[#f9f9f9]/70 backdrop-blur-xs z-0 pointer-events-none"></div>
        
        <form 
          onSubmit={handleSignIn}
          className="bg-white p-8 rounded-2xl border-4 border-[#154212]/30 w-full max-w-sm space-y-6 shadow-2xl relative z-10 paper-texture"
        >
          <div className="text-center">
            <span className="material-symbols-outlined text-4xl text-[#154212] fill animate-pulse">eco</span>
            <h1 className="font-heading text-[#154212] text-xl font-bold uppercase tracking-wider mt-2">The Seasons</h1>
            <p className="font-serif italic text-sm text-[#72796e] mt-1">"Tend to your personal sanctuary's atmosphere."</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-sans font-bold text-secondary tracking-widest">Gardener Name</label>
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter Nickname..."
                className="w-full bg-[#eeeeee] border-b-2 border-outline-variant rounded-lg p-2.5 font-sans text-xs focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-sans font-bold text-secondary tracking-widest">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="shernee_mo@gmail.com"
                className="w-full bg-[#eeeeee] border-b-2 border-outline-variant rounded-lg p-2.5 font-[#1a1c1c] text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button 
              type="submit" 
              className="w-full bg-[#154212] hover:bg-[#23501e] text-white py-3 rounded-xl font-sans text-xs font-bold uppercase transition-all shadow-md active:translate-y-0.5 cursor-pointer"
            >
              SPROUT SANCTUARY ENTRY
            </button>
            <button 
              type="button"
              onClick={() => {
                setUsername('sherKNEE');
                setEmail('sherknee_mo@gmail.com');
                setIsAuthenticated(true);
                triggerAlert("Logged in as Guest Master!");
              }}
              className="w-full bg-[#e1e1c9] hover:bg-neutral-100 text-[#154212] py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              GUEST QUICK ACCESS
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-28">
      {/* Dynamic Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-outline-variant flex justify-between items-center w-full px-margin h-16 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#154212] fill animate-pulse">eco</span>
          <span className="font-heading text-lg lg:text-xl text-[#154212] tracking-widest font-black uppercase">
            {activeTab === 'garden' ? 'Grow A Habit' : activeTab === 'tasks' ? 'Habits Board' : activeTab === 'shop' ? 'Greenhouse Depot' : activeTab === 'social' ? 'Guild Plaza' : 'Settings'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#e1e1c9] rounded-full px-3 py-1 border border-[#c2c9bb]">
            <span className="material-symbols-outlined text-[#154212] text-sm mr-1">monetization_on</span>
            <span className="font-sans text-[11px] text-secondary font-extrabold">{coins.toLocaleString()}</span>
          </div>

          <button 
            type="button"
            onClick={() => setProfileOverlayTarget(username)}
            className="material-symbols-outlined text-[#42493e] hover:bg-neutral-100 transition-colors p-1.5 rounded-full cursor-pointer flex items-center justify-center shrink-0 fill"
          >
            account_circle
          </button>
        </div>
      </header>

      {/* Floating alert message */}
      {alertMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce bg-white border-2 border-[#154212] text-[#154212] px-5 py-3 rounded-full flex items-center gap-2 font-sans font-bold text-xs shadow-2xl">
          <span className="material-symbols-outlined text-[#154212] text-sm animate-spin">eco</span>
          {alertMsg}
        </div>
      )}

      {/* Core Component Canvas Router */}
      <main className="pt-24 px-4 max-w-2xl mx-auto">
        {activeTab === 'garden' && <GardenTab />}
        {activeTab === 'tasks' && <TasksTab />}
        {activeTab === 'shop' && <ShopTab />}
        {activeTab === 'social' && <SocialTab />}
        {activeTab === 'settings' && <SettingsTab onSignOut={handleSignOut} />}
      </main>

      {/* Persistent Bottom Bar component */}
      <nav className="fixed bottom-0 left-0 w-full z-50 border-t-4 border-outline flex justify-around items-center h-20 pb-safe rounded-t-xl bg-[#e4e4cc] shadow-xl">
        {/* Garden Tab Button */}
        <button 
          onClick={() => setActiveTab('garden')}
          className={`flex flex-col items-center justify-center transition-all px-4 py-1.5 rounded-xl cursor-pointer ${
            activeTab === 'garden' 
              ? 'bg-[#2d5a27] text-white border-2 border-[#154212] shadow-inner -translate-y-1 font-bold' 
              : 'text-on-secondary-fixed-variant hover:bg-white/10'
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'garden' ? '"FILL" 1' : '' }}>potted_plant</span>
          <span className="font-sans text-[9px] uppercase tracking-wider mt-0.5 font-bold">Garden</span>
        </button>

        {/* Tasks Tab Button */}
        <button 
          onClick={() => setActiveTab('tasks')}
          className={`flex flex-col items-center justify-center transition-all px-4 py-1.5 rounded-xl cursor-pointer ${
            activeTab === 'tasks' 
              ? 'bg-[#2d5a27] text-white border-2 border-[#154212] shadow-inner -translate-y-1 font-bold' 
              : 'text-on-secondary-fixed-variant hover:bg-white/10'
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'tasks' ? '"FILL" 1' : '' }}>assignment_turned_in</span>
          <span className="font-sans text-[9px] uppercase tracking-wider mt-0.5 font-bold">Tasks</span>
        </button>

        {/* Shop Tab Button */}
        <button 
          onClick={() => setActiveTab('shop')}
          className={`flex flex-col items-center justify-center transition-all px-4 py-1.5 rounded-xl cursor-pointer ${
            activeTab === 'shop' 
              ? 'bg-[#2d5a27] text-white border-2 border-[#154212] shadow-inner -translate-y-1 font-bold' 
              : 'text-on-secondary-fixed-variant hover:bg-white/10'
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'shop' ? '"FILL" 1' : '' }}>shopping_basket</span>
          <span className="font-sans text-[9px] uppercase tracking-wider mt-0.5 font-bold">Shop</span>
        </button>

        {/* Social Tab Button */}
        <button 
          onClick={() => setActiveTab('social')}
          className={`flex flex-col items-center justify-center transition-all px-4 py-1.5 rounded-xl cursor-pointer ${
            activeTab === 'social' 
              ? 'bg-[#2d5a27] text-white border-2 border-[#154212] shadow-inner -translate-y-1 font-bold' 
              : 'text-on-secondary-fixed-variant hover:bg-white/10'
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'social' ? '"FILL" 1' : '' }}>groups</span>
          <span className="font-sans text-[9px] uppercase tracking-wider mt-0.5 font-bold">Social</span>
        </button>

        {/* Settings Tab Button */}
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center justify-center transition-all px-4 py-1.5 rounded-xl cursor-pointer ${
            activeTab === 'settings' 
              ? 'bg-[#2d5a27] text-white border-2 border-[#154212] shadow-inner -translate-y-1 font-bold' 
              : 'text-on-secondary-fixed-variant hover:bg-white/10'
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'settings' ? '"FILL" 1' : '' }}>settings</span>
          <span className="font-sans text-[9px] uppercase tracking-wider mt-0.5 font-bold">Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
