import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface SettingsTabProps {
  onSignOut: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ onSignOut }) => {
  const {
    username, setUsername,
    email, setEmail,
    musicOn, setMusicOn,
    sfxOn, setSfxOn,
    vibrationOn, setVibrationOn,
    friendRequestsOn, setFriendRequestsOn,
    language, setLanguage,
    triggerAlert,
    addCoins,
    addXp
  } = useApp();

  const [editUserMode, setEditUserMode] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);
  const [promoCode, setPromoCode] = useState('');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState(email);

  const handleSaveUsername = () => {
    if (!tempUsername.trim()) {
      triggerAlert("Username cannot be empty!");
      return;
    }
    setUsername(tempUsername);
    setEditUserMode(false);
    triggerAlert(`Username updated to "${tempUsername}"!`);
  };

  const handleRedeemCode = () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) {
      triggerAlert("Please enter a valid coupon code!");
      return;
    }

    if (code === 'GROW' || code === 'GROWAHABIT') {
      addCoins(5000);
      triggerAlert("🎁 Code redeemed! Claimed bonus 5,000 Coins for your harvest!");
      setPromoCode('');
    } else if (code === 'SUNSHINE') {
      addXp(1000);
      triggerAlert("🌞 Code redeemed! Claimed 1,000 XP instantly. Level Increased!");
      setPromoCode('');
    } else if (code === 'SPRINGTIME') {
      addCoins(10000);
      addXp(500);
      triggerAlert("🌸 Code redeemed! Claimed 10,000 Coins & 500 XP. Sprouting strong!");
      setPromoCode('');
    } else {
      triggerAlert("Invalid code! Try entering 'GROW', 'SUNSHINE', or 'SPRINGTIME'.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <section className="mb-4">
        <h2 className="font-heading text-lg font-bold text-primary mb-1">Settings</h2>
        <p className="font-serif text-sm text-on-surface-variant italic">Tend to your personal sanctuary's atmosphere.</p>
      </section>

      {/* Audio Panel Section */}
      <section className="bg-surface-container-low rounded-xl border border-outline p-6 organic-tilt-xs relative shadow-sm">
        <div className="absolute -top-3 -left-2 transform -rotate-12 w-8 h-8 bg-tertiary-fixed opacity-40 rounded-sm"></div>
        <h3 className="font-sans text-xs font-bold text-primary uppercase mb-4 flex items-center gap-2 tracking-wider">
          <span className="material-symbols-outlined text-lg">volume_up</span>
          Audio Controls
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-serif text-base text-on-surface-variant">Background Music</span>
            <button 
              onClick={() => {
                setMusicOn(!musicOn);
                triggerAlert(musicOn ? 'Muted ambient melodies.' : 'Playing greenhouse tunes!');
              }}
              className={`w-12 h-6 rounded-full relative transition-all cursor-pointer ${musicOn ? 'bg-primary-container' : 'bg-neutral-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full border shadow-sm transition-all ${musicOn ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-serif text-base text-on-surface-variant">Sound Effects</span>
            <button 
              onClick={() => {
                setSfxOn(!sfxOn);
                triggerAlert(sfxOn ? 'Deactivated sfx chords.' : 'Sfx sounds enabled.');
              }}
              className={`w-12 h-6 rounded-full relative transition-all cursor-pointer ${sfxOn ? 'bg-primary-container' : 'bg-neutral-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full border shadow-sm transition-all ${sfxOn ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-serif text-base text-on-surface-variant">Vibration</span>
            <button 
              onClick={() => {
                setVibrationOn(!vibrationOn);
                triggerAlert(vibrationOn ? 'Vibration muted.' : 'Vibrations enabled!');
              }}
              className={`w-12 h-6 rounded-full relative transition-all cursor-pointer ${vibrationOn ? 'bg-primary-container' : 'bg-neutral-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full border shadow-sm transition-all ${vibrationOn ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Account Profile Section */}
      <section className="bg-white rounded-xl border border-outline p-6 organic-tilt-xs relative shadow-sm">
        <h3 className="font-sans text-xs font-bold text-primary uppercase mb-4 flex items-center gap-2 tracking-wider">
          <span className="material-symbols-outlined text-lg">person</span>
          Account Profiles
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/35 pb-3">
            <div>
              <p className="font-sans text-[9px] text-[#72796e] uppercase tracking-wider font-extrabold">Username</p>
              {editUserMode ? (
                <div className="flex items-center gap-2 mt-1">
                  <input 
                    type="text" 
                    value={tempUsername}
                    onChange={e => setTempUsername(e.target.value)}
                    className="bg-neutral-50 border border-outline rounded p-1 font-sans text-xs focus:outline-none"
                  />
                  <button onClick={handleSaveUsername} className="bg-primary text-white text-[10px] px-2.5 py-1 rounded-md">Save</button>
                </div>
              ) : (
                <p className="font-serif text-base font-bold text-on-surface">{username}</p>
              )}
            </div>
            
            {!editUserMode && (
              <button onClick={() => setEditUserMode(true)} className="p-2 hover:bg-neutral-50 rounded-full cursor-pointer">
                <span className="material-symbols-outlined text-on-surface-variant text-base">edit</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-between border-b border-outline-variant/35 pb-3">
            <div>
              <p className="font-sans text-[9px] text-[#72796e] uppercase tracking-wider font-extrabold">Registered Email</p>
              <p className="font-serif text-base text-on-surface">{email}</p>
            </div>
            <span className="text-[10px] bg-[#bcf0ae] text-[#23501e] px-2.5 py-0.5 rounded-full font-sans font-black">Verified</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button 
              type="button" 
              onClick={() => {
                setTempEmail(email);
                setIsEditingEmail(true);
              }}
              className="border border-outline text-on-surface-variant font-sans text-xs font-bold py-2.5 rounded-lg hover:bg-neutral-50 cursor-pointer"
            >
              CHANGE EMAIL
            </button>
            <button 
              type="button" 
              onClick={() => triggerAlert("A reset password email has been safely routed to your inbox.")}
              className="border border-outline text-on-surface-variant font-sans text-xs font-bold py-2.5 rounded-lg hover:bg-neutral-50 cursor-pointer"
            >
              CHANGE PASSWORD
            </button>
          </div>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="bg-white rounded-xl border border-outline p-6 organic-tilt-sm shadow-sm">
        <h3 className="font-sans text-xs font-bold text-primary uppercase mb-4 flex items-center gap-2 tracking-wider">
          <span className="material-symbols-outlined text-lg">settings</span>
          Preferences & Layout
        </h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-on-surface-variant text-base">language</span>
              <span className="font-serif text-base text-on-surface">Language Setup</span>
            </div>
            <select 
              value={language} 
              onChange={e => {
                setLanguage(e.target.value);
                triggerAlert(`Localization toggled to ${e.target.value}!`);
              }}
              className="bg-[#eeeeee] border border-outline-variant text-[#1a1c1c] font-sans text-xs font-bold rounded-lg px-2.5 py-1 focus:ring-0 focus:outline-none"
            >
              <option value="English">English</option>
              <option value="Français">Français</option>
              <option value="日本語">日本語</option>
              <option value="Español">Español</option>
            </select>
          </div>

          <div className="flex items-center justify-between border-t border-outline-variant/35 pt-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-on-surface-variant text-base">switch_account</span>
              <span className="font-serif text-base text-on-surface">Log in with other credentials</span>
            </div>
            <span className="material-symbols-outlined text-outline">chevron_right</span>
          </div>
        </div>
      </section>

      {/* Social Settings Section */}
      <section className="bg-white rounded-xl border border-outline p-6 shadow-sm relative">
        <div className="absolute -top-2 right-4 w-10 h-4 bg-secondary-fixed-dim/30 rotate-2 border-b border-outline-variant"></div>
        <h3 className="font-sans text-xs font-bold text-primary uppercase mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">groups</span>
          Social Safety Mode
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-on-surface-variant text-base">person_add</span>
            <span className="font-serif text-base text-on-surface">Enable incoming Friend requests</span>
          </div>
          <button 
            onClick={() => setFriendRequestsOn(!friendRequestsOn)}
            className={`w-12 h-6 rounded-full relative transition-all cursor-pointer ${friendRequestsOn ? 'bg-primary-container' : 'bg-neutral-300'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full border shadow-sm transition-all ${friendRequestsOn ? 'right-0.5' : 'left-0.5'}`} />
          </button>
        </div>
      </section>

      {/* Garden rewards code panel */}
      <section className="bg-primary-container text-white rounded-xl p-8 border-2 border-primary shadow-inner relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <span className="material-symbols-outlined text-6xl">redeem</span>
        </div>
        
        <h3 className="font-sans text-xs font-bold text-on-primary-container uppercase mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">card_giftcard</span>
          Sanctuary Giftcodes
        </h3>
        <p className="font-serif text-sm text-neutral-250 mb-6 leading-relaxed">
          Enter code 'GROW' to claim 5k Coins or 'SUNSHINE' to boost level by 1,000 XP!
        </p>
        
        <div className="flex flex-col gap-3">
          <input 
            type="text" 
            placeholder="ENTER SPECIAL CODE..."
            value={promoCode}
            onChange={e => setPromoCode(e.target.value)}
            className="bg-white border-2 border-primary text-primary font-sans text-xs font-bold rounded-xl px-4 py-3 focus:outline-none placeholder:text-outline/40 uppercase tracking-widest"
          />
          <button 
            type="button" 
            onClick={handleRedeemCode}
            className="bg-[#2d5a27] hover:bg-[#23501e] text-white font-sans text-xs font-bold py-3 rounded-xl border-b-4 border-black/30 active:border-b-0 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            REDEEM CODE
            <span className="material-symbols-outlined text-sm">bolt</span>
          </button>
        </div>
      </section>

      {/* Sign out */}
      <div className="px-1 mt-4">
        <button 
          onClick={onSignOut}
          className="w-full py-3.5 rounded-xl border-2 border-[#ba1a1a]/20 text-[#ba1a1a] font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#ba1a1a]/5 cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <span className="material-symbols-outlined text-base">logout</span>
          Sign Out of Sanctuary
        </button>
      </div>

      {/* HTML Custom Email Editing Modal */}
      {isEditingEmail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-on-surface">
          <div className="bg-white rounded-2xl border-4 border-primary p-6 w-full max-w-sm space-y-4 shadow-2xl relative paper-texture">
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl text-primary animate-pulse">mail</span>
              <h3 className="font-heading text-lg font-bold text-primary uppercase tracking-wider mt-2">Change Email</h3>
              <p className="font-serif italic text-xs text-[#72796e] mt-1">
                Enter your new registered email address below.
              </p>
            </div>
            <input 
              type="email" 
              value={tempEmail}
              onChange={e => setTempEmail(e.target.value)}
              placeholder="grower@example.com"
              className="w-full bg-[#eeeeee] border border-outline-variant rounded-lg p-2.5 font-sans text-xs focus:ring-0 focus:outline-none"
            />
            <div className="flex gap-3 justify-center pt-2">
              <button 
                onClick={() => setIsEditingEmail(false)}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-on-surface-variant font-sans text-xs font-bold uppercase rounded-xl border border-outline-variant cursor-pointer transition-all active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (tempEmail && tempEmail.includes('@')) {
                    setEmail(tempEmail);
                    triggerAlert("Verification link sent! Email updated.");
                    setIsEditingEmail(false);
                  } else {
                    triggerAlert("Please enter a valid email address!");
                  }
                }}
                className="px-4 py-2 bg-primary hover:bg-[#23501e] text-white font-sans text-xs font-bold uppercase rounded-xl border-b-4 border-black/30 cursor-pointer transition-all active:scale-95"
              >
                Update Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
