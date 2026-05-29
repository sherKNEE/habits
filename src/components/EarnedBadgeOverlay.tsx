import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BADGE_DATABASE } from '../badgesData';

interface EarnedBadgeOverlayProps {
  badgeId: string | null;
  onClose: () => void;
}

export const EarnedBadgeOverlay: React.FC<EarnedBadgeOverlayProps> = ({ badgeId, onClose }) => {
  const badge = BADGE_DATABASE.find((b) => b.id === badgeId);

  useEffect(() => {
    if (!badgeId) return;

    // Automatically dismiss after 4 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 4500);

    return () => clearTimeout(timer);
  }, [badgeId, onClose]);

  if (!badge) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-stone-950/85 backdrop-blur-md cursor-pointer select-none"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="w-full max-w-sm bg-gradient-to-b from-stone-900 to-stone-950 rounded-3xl border-4 border-yellow-400 p-8 text-center shadow-[0_0_50px_rgba(250,204,21,0.35)] relative overflow-hidden"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
        >
          {/* Sparkles / ray background animations */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-yellow-300 via-transparent to-pink-500 rounded-full blur-2xl animate-pulse"></div>
          </div>

          <span className="font-heading text-[10px] text-yellow-400 font-extrabold uppercase tracking-widest block mb-2">
            🏆 Badge Unlocked 🏆
          </span>

          {/* Badge Medallion Frame */}
          <motion.div 
            initial={{ rotate: -15, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-b ${badge.bgColor} border-4 ${badge.borderColor} flex items-center justify-center mb-6 shadow-2xl relative group`}
          >
            {/* Outer revolving dotted borders */}
            <div className="absolute inset-1 border-2 border-dashed border-white/40 rounded-full animate-spin" style={{ animationDuration: '24s' }}></div>
            
            {/* Logo Emoji Icon */}
            <span className="text-6xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)] select-none animate-bounce" style={{ animationDuration: '3s' }}>
              {badge.logoEmoji}
            </span>
          </motion.div>

          {/* Badges Info content */}
          <h2 className="font-heading text-2xl font-black text-white uppercase tracking-wider mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {badge.title}
          </h2>

          <div className={`inline-block px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full mb-4 ${badge.accentClass}`}>
            {badge.category} Category
          </div>

          <p className="font-serif italic text-xs text-stone-300/90 leading-relaxed px-4 mb-6">
            "{badge.description}"
          </p>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-600 border-2 border-yellow-250 text-stone-950 font-sans text-xs font-black uppercase tracking-wider py-3.5 rounded-2xl transition-all active:scale-[0.97] shadow-xl hover:shadow-yellow-500/20"
          >
            ✨ Sweet! ✨
          </button>

          <p className="font-sans text-[8px] text-stone-500 uppercase tracking-widest mt-4">
            Tap anywhere to return to your garden
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
