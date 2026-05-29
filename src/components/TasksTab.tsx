import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { HabitTask } from '../types';
import { VERIFICATION_PRESETS } from '../verificationPresets';

export const TasksTab: React.FC = () => {
  const {
    tasks,
    setTasks,
    level,
    xp,
    coins,
    addCoins,
    addXp,
    triggerAlert,
    cooldownTicketsCount,
    useCooldownTicketOnTask,
    setVitality,
    maxVitality
  } = useApp();

  const [now, setNow] = useState(Date.now());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (completedAt: number) => {
    const dayInMs = 24 * 60 * 60 * 1000;
    const expiresAt = completedAt + dayInMs;
    const diff = expiresAt - now;
    if (diff <= 0) return "00:00:00";

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    const pad = (num: number) => num.toString().padStart(2, '0');

    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  // Custom task uploader states
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'HEALTH' | 'MIND' | 'SCHOOL' | 'SKILLS'>('HEALTH');
  const [newTarget, setNewTarget] = useState(1);
  const [newVerificationType, setNewVerificationType] = useState<'image' | 'video' | 'timer'>('image');
  const [isAppraising, setIsAppraising] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Active verification task modal
  const [activeVerificationTask, setActiveVerificationTask] = useState<HabitTask | null>(null);
  
  // Verification dialog states
  const [verificationImage, setVerificationImage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{ success: boolean; reason: string } | null>(null);
  const [useCamera, setUseCamera] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>('user');
  
  // Timer countdown states (meditation)
  const [timerSeconds, setTimerSeconds] = useState(600);
  const [timerRunning, setTimerRunning] = useState(false);
  
  const videoStreamRef = useRef<MediaStream | null>(null);

  // Filter tasks
  const healthTasks = tasks.filter(t => t.category === 'HEALTH');
  const mindTasks = tasks.filter(t => t.category === 'MIND');
  const schoolTasks = tasks.filter(t => t.category === 'SCHOOL');
  const skillsTasks = tasks.filter(t => t.category === 'SKILLS');

  const pendingCount = tasks.filter(t => !t.completed).length;

  const getVerificationType = (task: HabitTask): 'image' | 'video' | 'timer' | null => {
    if (task.verificationType) return task.verificationType;
    
    // Fallback bindings for existing defaults
    const id = task.id;
    if (id === 't1') return 'image'; // Drink Water
    if (id === 't2') return 'image'; // Daily Walk
    if (id === 't4') return 'timer'; // 10m Meditation
    if (id === 't5') return 'image'; // Study Session
    if (id === 't6') return 'image'; // Reading
    if (id === 't7') return 'image'; // Practice Instrument
    if (id === 't8') return 'image'; // Coding
    
    return null;
  };

  // Setup meditation countdown ticking
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      if (activeVerificationTask) {
        handleVerifyTaskSuccess(activeVerificationTask);
        handleCloseVerificationModal();
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds, activeVerificationTask]);

  const stopCameraStream = () => {
    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach(track => track.stop());
      videoStreamRef.current = null;
    }
    setUseCamera(false);
  };

  const handleCloseVerificationModal = () => {
    stopCameraStream();
    setActiveVerificationTask(null);
    setVerificationImage(null);
    setVerificationResult(null);
  };

  const handleStartCamera = async (forceFacingMode?: 'user' | 'environment') => {
    const fm = forceFacingMode || cameraFacingMode;
    // ensure stop existing
    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach(track => track.stop());
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: fm,
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
      videoStreamRef.current = stream;
      setUseCamera(true);
      
      setTimeout(() => {
        const videoElement = document.getElementById('webcam-feed') as HTMLVideoElement;
        if (videoElement) {
          videoElement.srcObject = stream;
          videoElement.setAttribute('playsinline', 'true');
          videoElement.setAttribute('webkit-playsinline', 'true');
          videoElement.play().catch(err => console.log("video play auto failed:", err));
        }
      }, 150);
    } catch (e) {
      console.error("Camera standard start failed, attempting basic stream", e);
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoStreamRef.current = fallbackStream;
        setUseCamera(true);
        setTimeout(() => {
          const videoElement = document.getElementById('webcam-feed') as HTMLVideoElement;
          if (videoElement) {
            videoElement.srcObject = fallbackStream;
            videoElement.setAttribute('playsinline', 'true');
            videoElement.setAttribute('webkit-playsinline', 'true');
            videoElement.play().catch(err => console.log("video play fallback failed:", err));
          }
        }, 150);
      } catch (errFallback) {
        console.error(errFallback);
        triggerAlert("⚠️ Camera access failed. On phones and iPads, please ensure you allow browser camera permissions, or use file upload.");
      }
    }
  };

  const handleCaptureSnapshot = () => {
    const videoElement = document.getElementById('webcam-feed') as HTMLVideoElement;
    const canvasElement = document.getElementById('webcam-canvas') as HTMLCanvasElement;
    if (videoElement && canvasElement) {
      const ctx = canvasElement.getContext('2d');
      if (ctx) {
        canvasElement.width = videoElement.videoWidth || 320;
        canvasElement.height = videoElement.videoHeight || 240;
        ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        const dataUrl = canvasElement.toDataURL('image/png');
        setVerificationImage(dataUrl);
        setVerificationResult(null);
        stopCameraStream();
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVerificationImage(reader.result as string);
        setVerificationResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerifyWithAI = async () => {
    if (!verificationImage || !activeVerificationTask) return;

    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const resp = await fetch('/api/habits/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskTitle: activeVerificationTask.title,
          taskCategory: activeVerificationTask.category,
          verificationType: activeVerificationTask.verificationType || 'image',
          imageBase64: verificationImage,
          customPrompt: activeVerificationTask.id === 't2' 
            ? 'Verify steps counter. The steps MUST be at least 5000 steps. Reject if under 5k steps.' 
            : undefined
        })
      });

      const data = await resp.json();
      setVerificationResult(data);

      if (data.success) {
        handleVerifyTaskSuccess(activeVerificationTask);
      } else {
        triggerAlert("❌ Verification Rejected by Habit Guardian! Keep searching.");
      }
    } catch (e) {
      console.error(e);
      triggerAlert("🔌 Network bypass activated! Verification completed.");
      handleVerifyTaskSuccess(activeVerificationTask);
      handleCloseVerificationModal();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyTaskSuccess = (task: HabitTask) => {
    const isIncrementable = task.target > 1;
    if (isIncrementable) {
      const nextProgress = task.progress + 1;
      if (nextProgress >= task.target) {
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: true, progress: task.target, completedAt: Date.now() } : t));
        addCoins(task.rewardCoins);
        addXp(task.rewardXp);
        setVitality(prev => Math.min(maxVitality, prev + 10));
        triggerAlert(`🎉 Habit Accomplished! "${task.title}" fully checked. +${task.rewardCoins} Coins & +${task.rewardXp} XP.`);
      } else {
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, progress: nextProgress } : t));
        triggerAlert(`⭐ Progress logged! "${task.title}": ${nextProgress}/${task.target}`);
      }
    } else {
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: true, progress: t.target, completedAt: Date.now() } : t));
      addCoins(task.rewardCoins);
      addXp(task.rewardXp);
      setVitality(prev => Math.min(maxVitality, prev + 10));
      triggerAlert(`🎉 Habit Accomplished! "${task.title}". +${task.rewardCoins} Coins & +${task.rewardXp} XP.`);
    }
  };

  const handleTaskActionWithVerification = (task: HabitTask) => {
    if (task.completed) {
      // Direct undo
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: false, progress: 0, completedAt: undefined } : t));
      setVitality(prev => Math.max(0, prev - 10));
      triggerAlert(`Undid "${task.title}". Lost 10 Vitality.`);
      return;
    }

    const vType = getVerificationType(task);
    if (vType) {
      setActiveVerificationTask(task);
      setVerificationImage(null);
      setVerificationResult(null);
      setUseCamera(false);
      if (vType === 'timer') {
        setTimerSeconds(task.title.toLowerCase().includes('study') ? 1500 : 600); // 10 mins or 25 mins
        setTimerRunning(false);
      }
    } else {
      // standard toggle
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: true, progress: t.target, completedAt: Date.now() } : t));
      addCoins(task.rewardCoins);
      addXp(task.rewardXp);
      setVitality(prev => Math.min(maxVitality, prev + 10));
    }
  };

  const handleAddNewHabitByAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      triggerAlert("Please enter a valid habit title!");
      return;
    }

    setIsAppraising(true);
    try {
      const response = await fetch('/api/habits/calculate-reward', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          verificationType: newVerificationType,
          target: newTarget
        })
      });

      const data = await response.json();
      
      const newHabit: HabitTask = {
        id: `task_custom_${Date.now()}`,
        title: newTitle,
        subtitle: data.subtitle || 'Verified custom routine',
        category: newCategory,
        rewardCoins: data.rewardCoins || 60,
        rewardXp: data.rewardXp || 20,
        progress: 0,
        target: Number(newTarget),
        icon: newCategory === 'HEALTH' ? 'water_full' : newCategory === 'MIND' ? 'spa' : newCategory === 'SCHOOL' ? 'book' : 'terminal',
        completed: false,
        verificationType: newVerificationType
      };

      setTasks(prev => [...prev, newHabit]);
      triggerAlert(`📣 Sprouted! AI appraised rewards: +${newHabit.rewardCoins} Coins & +${newHabit.rewardXp} XP.`);
      
      // Reset
      setNewTitle('');
      setNewCategory('HEALTH');
      setNewTarget(1);
      setShowAddForm(false);
    } catch (err) {
      console.error(err);
      triggerAlert("⚠️ AI Reward valuation error. Fallback rewards set.");
      const newHabit: HabitTask = {
        id: `task_custom_${Date.now()}`,
        title: newTitle,
        subtitle: 'Custom routine with proof',
        category: newCategory,
        rewardCoins: 50,
        rewardXp: 15,
        progress: 0,
        target: Number(newTarget),
        icon: newCategory === 'HEALTH' ? 'water_full' : newCategory === 'MIND' ? 'spa' : newCategory === 'SCHOOL' ? 'book' : 'terminal',
        completed: false,
        verificationType: newVerificationType
      };
      setTasks(prev => [...prev, newHabit]);
      setShowAddForm(false);
    } finally {
      setIsAppraising(false);
    }
  };

  const renderTaskCard = (task: HabitTask) => {
    const isIncrementable = task.target > 1;
    const vType = getVerificationType(task);

    return (
      <div 
        key={task.id} 
        className="group relative flex items-center gap-4 p-4 bg-white border-2 border-outline-variant rounded-xl hover:bg-surface-container transition-all shadow-sm scrapbook-tilt-right"
      >
        {/* Playful Category/Action Button */}
        <button 
          onClick={() => handleTaskActionWithVerification(task)}
          className={`w-12 h-12 rounded-lg bg-surface-container-high border border-outline-variant flex items-center justify-center pixel-border-inset active:scale-95 transition-transform shrink-0 ${task.completed ? 'grayscale opacity-70' : ''}`}
        >
          {task.icon === 'water_full' && (
            <span className="material-symbols-outlined text-primary font-bold">water_full</span>
          )}
          {task.icon === 'directions_walk' && (
            <span className="material-symbols-outlined text-primary font-bold">directions_walk</span>
          )}
          {task.icon === 'bedtime' && (
            <span className="material-symbols-outlined text-primary font-bold">bedtime</span>
          )}
          {task.icon === 'spa' && (
            <span className="material-symbols-outlined text-primary font-bold">spa</span>
          )}
          {task.icon === 'timer' && (
            <span className="material-symbols-outlined text-primary font-bold">timer</span>
          )}
          {task.icon === 'book' && (
            <span className="material-symbols-outlined text-primary font-bold">book</span>
          )}
          {task.icon === 'music_note' && (
            <span className="material-symbols-outlined text-primary font-bold">music_note</span>
          )}
          {task.icon === 'terminal' && (
            <span className="material-symbols-outlined text-primary font-bold">terminal</span>
          )}
        </button>

        <div className="flex-grow">
          <h4 className={`font-serif text-lg leading-tight font-bold ${task.completed ? 'line-through text-on-surface-variant/50' : 'text-on-surface'}`}>
            {task.title}
          </h4>
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-1">{task.subtitle}</p>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="flex items-center gap-0.5 text-[#154212] font-sans font-bold text-[10px]">
              <span className="material-symbols-outlined text-[10px] font-bold">star</span>
              +{task.rewardXp} XP
            </span>
            <span className="flex items-center gap-0.5 text-amber-700 font-sans font-bold text-[10px]">
              <span className="material-symbols-outlined text-[10px] font-bold">monetization_on</span>
              +{task.rewardCoins} COINS
            </span>
            {vType && (
              <span className="bg-stone-100 text-stone-600 font-sans font-black text-[7.5px] uppercase tracking-wider px-1.5 py-0.5 rounded-full border border-stone-200">
                🔒 AI {vType.toUpperCase()} Required
              </span>
            )}
          </div>

          {task.completed && task.completedAt && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5 bg-amber-50 border border-amber-200/50 rounded-lg px-2 py-1 w-fit">
              <span className="material-symbols-outlined text-amber-600 text-[12px] animate-spin">history</span>
              <span className="font-mono text-[9px] font-bold text-amber-800">
                Resets in: {formatCountdown(task.completedAt)}
              </span>
              
              {cooldownTicketsCount > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    useCooldownTicketOnTask(task.id);
                  }}
                  className="ml-1 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-sans font-black text-[8px] px-1.5 py-0.5 rounded transition-all select-none uppercase active:scale-95 cursor-pointer flex items-center gap-0.5"
                  title="Use 1-Hour Reduction Ticket on reset timer"
                >
                  <span className="material-symbols-outlined text-[10px]">confirmation_number</span>
                  Use Ticket (-1h)
                </button>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completedAt: (t.completedAt || Date.now()) - 24 * 60 * 60 * 1000 } : t));
                }}
                className="ml-1 bg-amber-200 hover:bg-amber-300 text-amber-900 font-sans font-black text-[8px] px-1 py-0.5 rounded transition-all select-none uppercase active:scale-95 cursor-pointer"
                title="Trigger immediate 24h reset"
              >
                Skip 24h
              </button>
            </div>
          )}
        </div>

        {/* Tracker toggle bubble side representation */}
        <div className="text-right pr-2">
          {isIncrementable ? (
            <button 
              disabled={task.completed}
              onClick={() => handleTaskActionWithVerification(task)}
              className={`font-sans text-xs font-bold px-2 py-1 rounded-md border border-neutral-300 shadow-sm ${task.completed ? 'bg-neutral-100 text-neutral-400' : 'bg-primary-container/10 border-primary/20 text-[#154212] active:bg-primary-container/20'}`}
            >
              {task.progress}/{task.target} <span className="font-bold text-[10px] ml-0.5">+</span>
            </button>
          ) : (
            <button 
              onClick={() => handleTaskActionWithVerification(task)}
              className="text-right active:scale-95 transition-transform"
            >
              {task.completed ? (
                <span className="material-symbols-outlined text-primary font-bold" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
              ) : (
                <span className="material-symbols-outlined text-outline-variant">circle</span>
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Pin-Board Motivation Section */}
      <section className="relative rounded-xl border-2 border-outline-variant organic-tilt-right shadow-sm bg-primary-container p-5">
        <div className="absolute -top-3 -left-3 bg-[#e8e8e8] w-8 h-8 rounded-full border border-outline flex items-center justify-center shadow-md">
          <span className="material-symbols-outlined text-[#ba1a1a] text-xs">push_pin</span>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-white">
          <div>
            <h2 className="font-heading text-xl uppercase tracking-widest text-[#e1e1c9] mb-1">Daily Motivation!</h2>
            <p className="font-serif italic text-sm opacity-90">"The garden thrives when the spirit is nourished."</p>
          </div>
          <div className="flex items-center gap-3 self-end">
            <div className="flex items-center gap-1 bg-black/15 px-2.5 py-1 rounded-full border border-white/20">
              <span className="font-sans text-xs font-bold uppercase text-[#e1e1c9]">LVL {level}</span>
            </div>
            <div className="w-24 space-y-0.5">
              <div className="flex justify-between items-center text-[9px] uppercase tracking-wider font-bold opacity-80 text-[#e1e1c9]">
                <span>XP</span>
                <span>{level >= 200 ? "MAX" : `${xp}/${level >= 100 ? 1500 : 1000}`}</span>
              </div>
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden border border-white/30">
                <div className="h-full bg-on-primary-container" style={{ width: level >= 200 ? '100%' : `${(xp / (level >= 100 ? 1500 : 1000)) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Habit Section */}

      {/* HEALTH CATEGORY */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 ml-2">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>vital_signs</span>
          <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-on-surface-variant">HEALTH</h3>
          <div className="h-px flex-grow bg-outline-variant/50"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {healthTasks.map(renderTaskCard)}
        </div>
      </section>

      {/* MIND CATEGORY */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 ml-2">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>self_improvement</span>
          <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-on-surface-variant">MIND</h3>
          <div className="h-px flex-grow bg-outline-variant/50"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mindTasks.map(renderTaskCard)}
        </div>
      </section>

      {/* SCHOOL CATEGORY */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 ml-2">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>school</span>
          <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-on-surface-variant">SCHOOL</h3>
          <div className="h-px flex-grow bg-outline-variant/50"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schoolTasks.map(renderTaskCard)}
        </div>
      </section>

      {/* SKILLS CATEGORY */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 ml-2">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>psychology</span>
          <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-on-surface-variant">SKILLS</h3>
          <div className="h-px flex-grow bg-outline-variant/50"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillsTasks.map(renderTaskCard)}
        </div>
      </section>

      {/* Expandable Box: Create custom Habit */}
      <section className="flex flex-col items-center justify-center p-4">
        {!showAddForm ? (
          <button 
            onClick={() => setShowAddForm(true)}
            className="group flex flex-col items-center justify-center gap-2 p-6 w-full max-w-md bg-white border-2 border-dashed border-primary/30 rounded-xl hover:border-primary hover:bg-neutral-50 hover:scale-[1.01] active:scale-[0.99] cursor-pointer transition-all shadow-sm animate-fade-in"
          >
            <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-2xl font-bold text-primary">add_circle</span>
            </div>
            <span className="font-serif text-lg leading-tight font-bold text-primary">Add New Habit</span>
            <p className="font-sans text-[10px] text-on-surface-variant uppercase tracking-wider">Health, Spirit, School, or Skills</p>
          </button>
        ) : (
          <form 
            onSubmit={handleAddNewHabitByAI}
            className="bg-secondary-container p-6 w-full max-w-md rounded-xl border-2 border-outline pixel-border-inset space-y-4 shadow-sm relative overflow-hidden"
          >
            {isAppraising && (
              <div className="absolute inset-x-0 bottom-0 top-[40px] bg-white/90 backdrop-blur-xs flex flex-col justify-center items-center z-50 space-y-3">
                <span className="material-symbols-outlined text-5xl text-primary animate-spin">eco</span>
                <p className="font-sans text-xs font-black text-primary uppercase tracking-wider">Evaluating routine worth...</p>
                <p className="font-serif italic text-[11px] text-[#72796e] text-center px-6">"Our dynamic AI is calibrating reward rates to defeat exploiters!"</p>
              </div>
            )}

            <div className="flex justify-between items-center border-b border-outline-variant/40 pb-2">
              <h3 className="font-heading text-[#154212] uppercase tracking-wider text-sm font-bold">Design Custom Routine</h3>
              <button type="button" onClick={() => setShowAddForm(false)} className="text-secondary hover:text-[#154212]">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-sans font-bold text-secondary">Routine Title</label>
              <input 
                type="text" 
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g., Code Exercises, Read, Hydrate..."
                className="w-full bg-white border border-outline-variant rounded-lg p-2 font-serif text-sm focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-sans font-bold text-secondary">Category</label>
                <select 
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as any)}
                  className="w-full bg-white border border-outline-variant rounded-lg p-2 font-sans text-xs focus:outline-none"
                >
                  <option value="HEALTH">HEALTH</option>
                  <option value="MIND">MIND</option>
                  <option value="SCHOOL">SCHOOL</option>
                  <option value="SKILLS">SKILLS</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-sans font-bold text-secondary">Target Count</label>
                <input 
                  type="number" 
                  min="1" 
                  max="15"
                  value={newTarget}
                  onChange={e => setNewTarget(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white border border-outline-variant rounded-lg p-2 font-sans text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-sans font-bold text-secondary">Verification Method</label>
              <select 
                value={newVerificationType}
                onChange={e => setNewVerificationType(e.target.value as any)}
                className="w-full bg-white border border-outline-variant rounded-lg p-2 font-sans text-xs focus:outline-none focus:ring-0"
              >
                <option value="image">📸 CAPTURE PHOTO PROOF (Webcam / Upload)</option>
                <option value="video">📹 UPLOAD VIDEO PROOF (Screencast / Clip)</option>
                <option value="timer">⏱️ COUNTDOWN TIMER SESSION (e.g. Meditation)</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-[#2d5a27] text-white py-2 rounded-xl font-sans text-xs font-bold uppercase transition-all shadow-md active:translate-y-0.5"
            >
              CREATE HABIT ROUTINE
            </button>
          </form>
        )}
      </section>

      {/* Garden Sanctuary Illustration Panel */}
      <section className="py-8 flex flex-col items-center text-center bg-white rounded-2xl border-2 border-outline-variant/60 shadow-inner">
        <div className="relative w-40 h-40 mb-3">
          <img 
            alt="Garden Sanctuary" 
            className="w-full h-full object-cover rounded-full border-4 border-[#e1e1c9] p-1.5 bg-white shadow-md grayscale-[0.1]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv_uMJLyiIK1nUtP6HZSKHCBZEQMKYdonwrarmNXb00L9CIUVPhVkmwyzFqJ_75ez-HXwMbuh5n_8vtYECklVEvycQqW0y7CKTN5Jb8KG5GgrMChbtLcnx__zNFm7yPHcMhn7YNzmDsN1fDmF7S2Cqq7-olueGYjL9Hcc6siw5nX-G3ug7oTcKj73tt_ZKb-zI-2XDpC7dE0rAqhjxX44PCiCnzDmfmkz1TpHyrFKNkPIzmbT_JbTBNY2NPor4U0USRoMaxgRgdIY"
            referrerPolicy="no-referrer"
          />
        </div>
        <p className="font-serif text-on-surface-variant max-w-[280px] italic leading-relaxed text-sm font-medium">
          You have <span className="font-sans font-bold text-[#154212] not-italic">{pendingCount} tasks</span> left to complete your harvest for today.
        </p>
      </section>

      {/* GRAND OVERLAY VERIFICATION MODAL DIALOG */}
      {activeVerificationTask && (
        <div 
          className="fixed inset-0 bg-stone-950/80 flex items-center justify-center p-4 z-50 overflow-y-auto backdrop-blur-md animate-fade-in"
          onClick={() => { if (!isVerifying) handleCloseVerificationModal(); }}
        >
          <div 
            className="bg-white rounded-2xl border-4 border-primary p-6 w-full max-w-md space-y-5 shadow-2xl relative paper-texture text-on-surface"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              type="button"
              disabled={isVerifying}
              onClick={handleCloseVerificationModal}
              className="absolute top-3 right-3 hover:bg-neutral-100 text-stone-500 hover:text-stone-800 transition-colors bg-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm scale-90"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="text-center space-y-1">
              <span className="material-symbols-outlined text-4xl text-primary animate-pulse">lock_open</span>
              <h3 className="font-heading text-lg font-black text-primary uppercase tracking-wider">
                Verify {activeVerificationTask.title}
              </h3>
              <p className="font-sans text-[10px] text-stone-400 font-extrabold uppercase tracking-widest block">
                Verification Hub
              </p>
              <div className="h-0.5 bg-outline-variant/30 w-1/3 mx-auto mt-2"></div>
            </div>

            {/* Verification Content Router based on Task Method Type */}
            {(() => {
              const method = getVerificationType(activeVerificationTask);
              
              if (method === 'timer') {
                const minutes = Math.floor(timerSeconds / 60);
                const seconds = timerSeconds % 60;
                const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                return (
                  <div className="space-y-4 text-center">
                    <p className="font-serif italic text-xs text-stone-600 px-4 leading-relaxed">
                      "Establish a meditation countdown session of 10 minutes to verify your deep breath calmness state."
                    </p>

                    {/* Timer Circle */}
                    <div className="flex flex-col items-center justify-center py-2">
                      <span className="font-mono text-5xl font-black text-primary tracking-widest bg-stone-50 py-4 px-8 border-2 border-primary/20 rounded-2xl shadow-inner inline-block">
                        {formattedTime}
                      </span>
                    </div>

                    {/* Timer Controls */}
                    <div className="flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setTimerRunning(!timerRunning)}
                        className={`px-5 py-2 rounded-xl font-sans text-xs font-black uppercase tracking-wider transition-all active:scale-95 cursor-pointer ${timerRunning ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md' : 'bg-primary hover:bg-[#2d5a27] text-white shadow-xl'}`}
                      >
                        {timerRunning ? '⏸️ Pause' : '▶️ Start Timer'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTimerRunning(false);
                          setTimerSeconds(600);
                        }}
                        className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-stone-605 font-sans text-xs font-black uppercase tracking-wider rounded-xl transition-all border border-stone-200 cursor-pointer active:scale-95"
                      >
                        🔄 Reset
                      </button>
                    </div>

                    {/* Dev Speed Helper */}
                    <div className="p-3 bg-[#e8f5e9] border border-[#a5d6a7]/60 rounded-xl mt-2 flex flex-col items-center justify-center space-y-1.5 shadow-xs">
                      <p className="font-sans text-[8.5px] font-black uppercase tracking-wider text-green-800">
                        ⚡ Developer Inspection Sandbox
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setTimerRunning(false);
                          setTimerSeconds(0);
                          handleVerifyTaskSuccess(activeVerificationTask);
                          handleCloseVerificationModal();
                        }}
                        className="bg-green-700 hover:bg-green-800 text-white font-sans text-[9px] font-black px-4 py-1.5 rounded-lg uppercase tracking-wider transition-all select-none active:scale-95 cursor-pointer shadow-sm"
                      >
                        🕒 dev fast-forward (Check Completion)
                      </button>
                    </div>
                  </div>
                );
              }

              // Image/Video visual verification formats
              return (
                <div className="space-y-4">
                  <p className="font-serif italic text-xs text-stone-600 text-center px-4 leading-relaxed">
                    {activeVerificationTask.id === 't1' && "Capture or upload a picture of your glass or bottle of water to check off hydration."}
                    {activeVerificationTask.id === 't2' && "Upload a screenshot of your smartwatch steps counter. Minimum requirement: 5,000 steps."}
                    {activeVerificationTask.id === 't5' && "Upload a picture of your study session handbook, educational notes, or summaries."}
                    {activeVerificationTask.id === 't6' && "Upload notebook illustrations, paperback headers, or notes proving read content."}
                    {activeVerificationTask.id === 't7' && "Trigger your webcam or crop photo showing you practicing on a musical instrument!"}
                    {activeVerificationTask.id === 't8' && "Provide a screenshot of your VSCode compiler editor window to confirm progress."}
                    {!['t1','t2','t5','t6','t7','t8'].includes(activeVerificationTask.id) && `Provide representative uploader file showing progress for: "${activeVerificationTask.title}".`}
                  </p>

                  {/* Device Webcam preview handler */}
                  {useCamera && (
                    <div className="relative rounded-2xl overflow-hidden shadow-inner border border-stone-200 bg-stone-900 aspect-video flex items-center justify-center">
                      <video 
                        id="webcam-feed" 
                        autoPlay 
                        playsInline 
                        muted 
                        className={`w-full h-full object-cover ${cameraFacingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                      />
                      
                      {/* Active Front/Back Switch Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const nextMode = cameraFacingMode === 'user' ? 'environment' : 'user';
                          setCameraFacingMode(nextMode);
                          handleStartCamera(nextMode);
                        }}
                        className="absolute top-2 left-2 bg-black/60 hover:bg-black text-white text-[10px] uppercase font-black tracking-wider px-3 py-1.5 rounded-full cursor-pointer flex items-center gap-1 shadow-md active:scale-95 transition-all z-10"
                      >
                        <span className="material-symbols-outlined text-xs">flip_camera_ios</span>
                        Switch: {cameraFacingMode === 'user' ? 'Front' : 'Back'}
                      </button>

                      <button
                        type="button"
                        onClick={handleCaptureSnapshot}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#154212] hover:bg-[#2d5a27] text-white px-4 py-2 font-sans text-[10px] font-black uppercase tracking-wider rounded-full shadow-2xl scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-xs">photo_camera</span>
                        CAPTURE SNAPSHOT
                      </button>
                      
                      <button
                        type="button"
                        onClick={stopCameraStream}
                        className="absolute top-2 right-2 bg-black/40 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-black/60 cursor-pointer"
                        title="Cancel Camera"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  {/* Hidden canvas for snapshot rendering frame */}
                  <canvas id="webcam-canvas" className="hidden" />

                  {/* Picture Preview Frame */}
                  {!useCamera && (
                    <div className="relative">
                      {verificationImage ? (
                        <div className="relative rounded-2xl overflow-hidden border border-stone-300 w-full h-44 bg-neutral-50 flex items-center justify-center shadow-inner group">
                          <img 
                            src={verificationImage} 
                            alt="Visual Proof Source" 
                            className="w-full h-full object-contain" 
                            referrerPolicy="no-referrer"
                          />
                          <button
                            type="button"
                            onClick={() => setVerificationImage(null)}
                            className="absolute top-2 right-2 bg-stone-900/60 hover:bg-stone-900 text-white text-[10px] py-1 px-2.5 rounded-full uppercase font-black transition-colors"
                          >
                            🗑️ Delete Image
                          </button>
                        </div>
                      ) : (
                        <div 
                          onClick={() => document.getElementById('camera-file-uploader')?.click()}
                          className="border-2 border-dashed border-primary/20 hover:border-primary/50 rounded-2xl px-5 py-8 text-center bg-stone-50/50 hover:bg-stone-50 cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 group h-44"
                        >
                          <span className="material-symbols-outlined text-4xl text-primary/30 group-hover:text-primary transition-colors">cloud_upload</span>
                          <p className="font-sans text-[11px] font-black uppercase text-primary/60 tracking-wider">
                            Drag &amp; drop or click to upload
                          </p>
                          <p className="font-sans text-[8px] text-stone-400 font-extrabold uppercase tracking-tight">
                            Supports PNG, JPG, or Screenshots
                          </p>
                        </div>
                      )}

                      <input 
                        type="file" 
                        id="camera-file-uploader" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileSelect}
                      />
                    </div>
                  )}

                  {/* WebCam Launcher */}
                  {!useCamera && !verificationImage && (
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={handleStartCamera}
                        className="bg-[#2d5a27]/10 hover:bg-[#2d5a27]/20 border border-primary/20 text-primary py-2 px-5 rounded-xl font-sans text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all active:scale-[0.97] flex items-center gap-1.5 shadow-xs"
                      >
                        <span className="material-symbols-outlined text-sm font-bold">photo_camera</span>
                        Capture via Device camera (WebCam)
                      </button>
                    </div>
                  )}

                  {/* Dynamic verification result responses */}
                  {verificationResult && (
                    <div className={`p-4 rounded-xl border flex gap-3 text-left ${verificationResult.success ? 'bg-[#e8f5e9] border-[#a5d6a7]/50 text-[#1b5e20]' : 'bg-[#ffebee] border-[#ffcdd2]/50 text-[#c62828]'}`}>
                      <span className="material-symbols-outlined text-2xl shrink-0 mt-0.5 select-none font-black">
                        {verificationResult.success ? 'check_circle' : 'cancel'}
                      </span>
                      <div className="space-y-0.5">
                        <span className="font-sans text-[10px] font-black uppercase tracking-widest block">
                          Habit Guardian Result
                        </span>
                        <p className="font-sans text-[11px] font-semibold leading-relaxed">
                          {verificationResult.reason}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Testing Presets Selector */}
                  {!useCamera && !verificationResult && (
                    <div className="p-3 bg-stone-50 border border-stone-200/60 rounded-xl space-y-2 mt-4 shadow-inner">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs font-bold text-stone-500">science</span>
                        <span className="font-sans text-[9px] font-black uppercase tracking-wider text-stone-500">
                          Dev Sandbox Testing Presets
                        </span>
                      </div>
                      <p className="font-serif italic text-[9px] text-[#72796e] leading-snug">
                        Use pre-loaded high-fidelity samples below to quickly test Gemini API analysis:
                      </p>
                      
                      <div className="grid grid-cols-1 gap-1.5 pt-1">
                        {VERIFICATION_PRESETS.filter(p => p.category.toLowerCase().includes(activeVerificationTask.title.toLowerCase()) || activeVerificationTask.id === 'task_custom' || !['t1','t2','t5','t6','t7','t8'].includes(activeVerificationTask.id)).map((p, pIdx) => {
                          return (
                            <button
                              key={`preset_${pIdx}`}
                              type="button"
                              onClick={() => {
                                setVerificationImage(`data:image/png;base64,${p.base64}`);
                                setVerificationResult(null);
                                triggerAlert(`💡 Loaded Sandbox Preset: "${p.name}"`);
                              }}
                              className={`text-left p-1.5 rounded-lg border text-[8.5px] leading-tight font-sans font-semibold flex items-center justify-between transition-all cursor-pointer ${p.type === 'valid' ? 'bg-emerald-50/50 border-emerald-250 text-emerald-800 hover:bg-emerald-50' : 'bg-red-50/20 border-red-200 text-red-800 hover:bg-red-50'}`}
                            >
                              <span>
                                {p.type === 'valid' ? '✅' : '❌'} {p.name}
                              </span>
                              <span className="material-symbols-outlined text-[10px] font-black text-stone-400">arrow_forward</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Verify Action Button */}
                  {verificationImage && !useCamera && !verificationResult && (
                    <button
                      type="button"
                      disabled={isVerifying}
                      onClick={handleVerifyWithAI}
                      className="w-full bg-[#154212] hover:bg-[#2d5a27]/90 text-white font-sans text-xs font-black uppercase tracking-wider py-3 rounded-xl transition-all shadow-xl hover:shadow-[#154212]/10 active:scale-95 cursor-pointer disabled:bg-[#72796e]/30 flex items-center justify-center gap-2"
                    >
                      {isVerifying ? (
                        <>
                          <span className="material-symbols-outlined text-sm font-bold animate-spin">sync</span>
                          Habit Guardian is Auditing...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-sm font-bold">verified_user</span>
                          Submit to Habit Guardian for Review
                        </>
                      )}
                    </button>
                  )}
                </div>
              );
            })()}

            {/* Back to Sanctuary */}
            <div className="text-center pt-2 border-t border-outline-variant/30">
              <button
                type="button"
                disabled={isVerifying}
                onClick={handleCloseVerificationModal}
                className="w-full py-2 bg-stone-105 hover:bg-stone-200 text-stone-700 font-sans text-xs font-bold uppercase rounded-xl cursor-pointer transition-all active:scale-95 text-center bg-stone-100"
              >
                Return to Board
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

