import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HabitTask } from '../types';

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
    useCooldownTicketOnTask
  } = useApp();

  const [now, setNow] = useState(Date.now());
  
  React.useEffect(() => {
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

  // New Habit creation
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'HEALTH' | 'MIND' | 'SCHOOL' | 'SKILLS'>('HEALTH');
  const [newTarget, setNewTarget] = useState(1);
  const [newCoins, setNewCoins] = useState(50);
  const [newXp, setNewXp] = useState(15);
  const [showAddForm, setShowAddForm] = useState(false);

  // Filter tasks
  const healthTasks = tasks.filter(t => t.category === 'HEALTH');
  const mindTasks = tasks.filter(t => t.category === 'MIND');
  const schoolTasks = tasks.filter(t => t.category === 'SCHOOL');
  const skillsTasks = tasks.filter(t => t.category === 'SKILLS');

  const pendingCount = tasks.filter(t => !t.completed).length;

  const handleToggleTask = (task: HabitTask) => {
    if (task.completed) {
      // Undo completion
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: false, progress: 0, completedAt: undefined } : t));
      triggerAlert(`Undid ${task.title}.`);
      return;
    }

    // Complete task (for simple checkbox tasks)
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: true, progress: t.target, completedAt: Date.now() } : t));
    addCoins(task.rewardCoins);
    addXp(task.rewardXp);
  };

  const handleIncrementTask = (task: HabitTask) => {
    if (task.completed) return;

    const nextProgress = task.progress + 1;
    if (nextProgress >= task.target) {
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: true, progress: task.target, completedAt: Date.now() } : t));
      addCoins(task.rewardCoins);
      addXp(task.rewardXp);
    } else {
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, progress: nextProgress } : t));
      triggerAlert(`Incremented ${task.title}! (${nextProgress}/${task.target})`);
    }
  };

  const handleAddNewHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      triggerAlert("Please enter a valid habit title!");
      return;
    }

    const newHabit: HabitTask = {
      id: `task_custom_${Date.now()}`,
      title: newTitle,
      subtitle: 'Self-designed personal routine',
      category: newCategory,
      rewardCoins: Number(newCoins),
      rewardXp: Number(newXp),
      progress: 0,
      target: Number(newTarget),
      icon: newCategory === 'HEALTH' ? 'water_full' : newCategory === 'MIND' ? 'spa' : newCategory === 'SCHOOL' ? 'book' : 'terminal',
      completed: false
    };

    setTasks(prev => [...prev, newHabit]);
    triggerAlert(`Successfully created custom Habit: "${newTitle}"!`);
    
    // Reset state
    setNewTitle('');
    setNewCategory('HEALTH');
    setNewTarget(1);
    setNewCoins(50);
    setNewXp(15);
    setShowAddForm(false);
  };

  const renderTaskCard = (task: HabitTask) => {
    const isIncrementable = task.target > 1;

    return (
      <div 
        key={task.id} 
        className="group relative flex items-center gap-4 p-4 bg-white border-2 border-outline-variant rounded-xl hover:bg-surface-container transition-all shadow-sm scrapbook-tilt-right"
      >
        {/* Playful Category/Action Button */}
        <button 
          onClick={() => isIncrementable ? handleIncrementTask(task) : handleToggleTask(task)}
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
          <div className="flex flex-wrap gap-2.5 items-center">
            <span className="flex items-center gap-0.5 text-[#154212] font-sans font-bold text-[10px]">
              <span className="material-symbols-outlined text-[10px] font-bold">star</span>
              +{task.rewardXp} XP
            </span>
            <span className="flex items-center gap-0.5 text-amber-700 font-sans font-bold text-[10px]">
              <span className="material-symbols-outlined text-[10px] font-bold">monetization_on</span>
              +{task.rewardCoins} COINS
            </span>
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
              onClick={() => handleIncrementTask(task)}
              className={`font-sans text-xs font-bold px-2 py-1 rounded-md border border-neutral-300 shadow-sm ${task.completed ? 'bg-neutral-100 text-neutral-400' : 'bg-primary-container/10 border-primary/20 text-[#154212] active:bg-primary-container/20'}`}
            >
              {task.progress}/{task.target} <span className="font-bold text-[10px] ml-0.5">+</span>
            </button>
          ) : (
            <button 
              onClick={() => handleToggleTask(task)}
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
                <span>{xp}/1000</span>
              </div>
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden border border-white/30">
                <div className="h-full bg-on-primary-container" style={{ width: `${xp / 10}%` }}></div>
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
            className="group flex flex-col items-center justify-center gap-2 p-6 w-full max-w-md bg-white border-2 border-dashed border-primary/30 rounded-xl hover:border-primary hover:bg-neutral-50 hover:scale-101 active:scale-99 cursor-pointer transition-all shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-2xl font-bold">add_circle</span>
            </div>
            <span className="font-serif text-lg leading-tight font-bold text-primary">Add New Habit</span>
            <p className="font-sans text-[10px] text-on-surface-variant uppercase tracking-wider">Health, Spirit, School, or Skills</p>
          </button>
        ) : (
          <form 
            onSubmit={handleAddNewHabit}
            className="bg-secondary-container p-6 w-full max-w-md rounded-xl border-2 border-outline pixel-border-inset space-y-4 shadow-sm"
          >
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

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-sans font-bold text-secondary">Coin Reward</label>
                <input 
                  type="number" 
                  min="10" 
                  value={newCoins}
                  onChange={e => setNewCoins(Math.max(10, Number(e.target.value)))}
                  className="w-full bg-white border border-outline-variant rounded-lg p-2 font-sans text-xs focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-sans font-bold text-secondary">XP Reward</label>
                <input 
                  type="number" 
                  min="5" 
                  value={newXp}
                  onChange={e => setNewXp(Math.max(5, Number(e.target.value)))}
                  className="w-full bg-white border border-outline-variant rounded-lg p-2 font-sans text-xs focus:outline-none"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/95 text-white py-2 rounded-xl font-sans text-xs font-bold uppercase transition-all shadow-md active:translate-y-0.5"
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
    </div>
  );
};
