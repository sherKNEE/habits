import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Friend, TradeOffer, MailMessage } from '../types';
import { CROPS } from '../cropsData';
import { FarmerAvatar, getAvatarConfigForUser } from './FarmerAvatar';

const STUDY_TOPICS = [
  {
    topic: "Plant Botany & Cultivation Biology",
    cards: [
      { front: "What is phototropism?", back: "The growth orientation of plants toward a light source." },
      { front: "What is chlorophyll responsible for?", back: "Absorbing light energy for photosynthesis within chloroplasts." },
      { front: "Define stomata.", back: "Microscopic pores on leaf surfaces that control gas exchange and transpiration." }
    ],
    quiz: [
      {
        question: "Which organelle handles plant photosynthesis?",
        options: ["Chloroplast", "Mitochondria", "Ribosome", "Nucleus"],
        answer: "Chloroplast"
      },
      {
        question: "Which primary hormone triggers cell elongation in plant stems?",
        options: ["Auxin", "Ethylene", "Abscisic Acid", "Gibberellin"],
        answer: "Auxin"
      },
      {
        question: "Through which tissue is water transported upward from the roots?",
        options: ["Xylem", "Phloem", "Cortex", "Epidermis"],
        answer: "Xylem"
      }
    ]
  },
  {
    topic: "Online Lecture & Interactive Agronomy Link",
    cards: [
      { front: "What is crop rotation?", back: "The practice of growing different crops in sequence to preserve soil health." },
      { front: "What is hydroponics?", back: "Cultivating plants in nutrient-rich water solutions without soil." },
      { front: "What does nitrogen do for soil?", back: "Promotes leafy green vegetation growth and photosynthesis stability." }
    ],
    quiz: [
      {
        question: "What is the science of soil management and crop production called?",
        options: ["Agronomy", "Horticulture", "Silviculture", "Floriculture"],
        answer: "Agronomy"
      },
      {
        question: "Which macro-nutrient encourages robust plant root development?",
        options: ["Phosphorus", "Nitrogen", "Calcium", "Magnesium"],
        answer: "Phosphorus"
      }
    ]
  },
  {
    topic: "Agriculture & Companion Planting PDF Notes",
    cards: [
      { front: "What is companion planting?", back: "Growing supportive crop species close together for pest control and pollination." },
      { front: "What benefit do sunflowers offer in fields?", back: "They attract useful pollinators and serve as natural trellises." },
      { front: "Define organic mulching.", back: "Applying compost and bark layers to retain soil moisture and stifle weeds." }
    ],
    quiz: [
      {
        question: "Which plant acts as a natural insect repellent when planted next to tomatoes?",
        options: ["Marigolds", "Mint", "Lavender", "Dandelions"],
        answer: "Marigolds"
      },
      {
        question: "What resource do sunflowers provide when planted alongside climbing beans?",
        options: ["Natural trellis support", "Nitrogen fixation", "Clay soil break", "Shading layer"],
        answer: "Natural trellis support"
      }
    ]
  }
];

const BIBLE_VERSES = [
  {
    ref: "Psalm 23:1",
    text: "The Lord is my shepherd; I shall not want.",
    clue: "The _____ is my _______; I shall not ____.",
    blankOptions: ["Lord", "shepherd", "want"],
    choiceCollections: [
      ["Lord", "King", "Friend"],
      ["shepherd", "doctor", "protector"],
      ["want", "sleep", "fail"]
    ]
  },
  {
    ref: "Philippians 4:13",
    text: "I can do all things through Christ who strengthens me.",
    clue: "I can do all ______ through ______ who ___________ me.",
    blankOptions: ["things", "Christ", "strengthens"],
    choiceCollections: [
      ["things", "ideas", "works"],
      ["Christ", "angels", "spirit"],
      ["strengthens", "comforts", "evaluates"]
    ]
  },
  {
    ref: "Matthew 11:28",
    text: "Come to me, all who labor and are heavy laden, and I will give you rest.",
    clue: "Come to me, all who _____ and are _____ laden, and I will give you ____.",
    blankOptions: ["labor", "heavy", "rest"],
    choiceCollections: [
      ["labor", "study", "pray"],
      ["heavy", "weary", "sad"],
      ["rest", "food", "silver"]
    ]
  },
  {
    ref: "Proverbs 3:5",
    text: "Trust in the Lord with all your heart, and do not lean on your own understanding.",
    clue: "_____ in the Lord with all your _____, and do not lean on your own ______________.",
    blankOptions: ["Trust", "heart", "understanding"],
    choiceCollections: [
      ["Trust", "Praise", "Love"],
      ["heart", "mind", "strength"],
      ["understanding", "intelligence", "judgment"]
    ]
  }
];

export const SocialTab: React.FC = () => {
  const {
    coins,
    setCoins,
    friends,
    setFriends,
    harvestedInven,
    setHarvestedInven,
    trades,
    setTrades,
    setProfileOverlayTarget,
    triggerAlert,
    addCoins,
    addXp,
    claimBadge,
    mailMessages,
    setMailMessages,
    username
  } = useApp();

  // Search/Add friend state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Market Stall appraisal states
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [appraisalValue, setAppraisalValue] = useState<number | null>(null);

  // Active micro minigame states ('study' or 'bible' or 'breath')
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  
  // Wellness Wiz Deep Breath State
  const [breathStage, setBreathStage] = useState<'idle' | 'inhale' | 'exhale'>('idle');
  const [breathCount, setBreathCount] = useState(0);

  // Dynamic Study workshop states
  const [studyTopicIdx, setStudyTopicIdx] = useState(0);
  const [studyPhase, setStudyPhase] = useState<'upload' | 'learn' | 'quiz' | 'complete'>('upload');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedPDFName, setUploadedPDFName] = useState('');
  const [uploadedVideoLink, setUploadedVideoLink] = useState('');
  const [studyCardIndex, setStudyCardIndex] = useState(0);
  const [studyCardFlipped, setStudyCardFlipped] = useState(false);
  const [studyQuizIndex, setStudyQuizIndex] = useState(0);
  const [studyQuizSelectedOption, setStudyQuizSelectedOption] = useState<string | null>(null);
  const [studyQuizScore, setStudyQuizScore] = useState(0);

  // Bible verse states (stress-relief memorization replacement)
  const [bibleVerseIdx, setBibleVerseIdx] = useState(0);
  const [bibleViewCount, setBibleViewCount] = useState(1); // 1 to 3
  const [biblePhase, setBiblePhase] = useState<'view' | 'recall' | 'success'>('view');
  const [bibleUserAnswers, setBibleUserAnswers] = useState<string[]>(['', '', '']); // 3 blanks selection

  // Direct Mail Systems
  const [selectedMailFriend, setSelectedMailFriend] = useState<Friend | null>(null);
  const [mailboxOpen, setMailboxOpen] = useState(false);
  const [newMailInput, setNewMailInput] = useState('');
  const [simMessageTimeout, setSimMessageTimeout] = useState<any>(null);

  // Friends Play Together Lounge Modal
  const [playTogetherFriend, setPlayTogetherFriend] = useState<Friend | null>(null);
  const [playTogetherMode, setPlayTogetherMode] = useState<'select' | 'study' | 'bible' | 'done'>('select');
  const [coopStep, setCoopStep] = useState(0); // 0 = talk/warm up, 1 = play together, 2 = finish celebration

  // Custom trade board publisher states
  const [isPostingTrade, setIsPostingTrade] = useState(false);
  const [tradeOfferCrop, setTradeOfferCrop] = useState('');
  const [tradeOfferQty, setTradeOfferQty] = useState(5);
  const [tradeRequestCrop, setTradeRequestCrop] = useState('');
  const [tradeRequestQty, setTradeRequestQty] = useState(5);

  const handleSearchFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const newFriend: Friend = {
      id: `f_${Date.now()}`,
      username: searchQuery,
      avatar: 'https://cdn.phototourl.com/free/2026-05-12-91580f16-e2c3-4b8d-90e5-0c63030847b1.png',
      status: 'online'
    };
    setFriends([...friends, newFriend]);
    triggerAlert(`Sent a friend request to ${searchQuery}! Added to friends.`);
    setSearchQuery('');
  };

  const handleAcceptRequest = (id: string, username: string) => {
    setFriends(prev => prev.map(f => f.id === id ? { ...f, status: 'online' } : f));
    triggerAlert(`You are now friends with ${username}!`);
  };

  const handleDeclineRequest = (id: string) => {
    setFriends(prev => prev.filter(f => f.id !== id));
    triggerAlert("Request dismissed.");
  };

  // Sell Fruit appraisal
  const handleAppraise = () => {
    if (!selectedCrop) {
      triggerAlert("Please select a homegrown crop to appraise!");
      return;
    }

    const count = harvestedInven[selectedCrop] || 0;
    if (count <= 0) {
      triggerAlert(`You do not have any harvested ${selectedCrop} to sell!`);
      return;
    }

    const cropDef = CROPS.find(c => c.id === selectedCrop);
    const base = cropDef ? cropDef.sellBase : 70;

    const multiplier = 0.95 + Math.random() * 0.1;
    const randomizedValue = Math.round(base * multiplier);
    
    setAppraisalValue(randomizedValue);
    triggerAlert(`Appraisal successful: Dynamic price set to ${randomizedValue} Coins!`);
  };

  const handleSellFruit = () => {
    if (!selectedCrop) {
      triggerAlert("Select a crop first!");
      return;
    }
    if (!appraisalValue) {
      triggerAlert("Please appraise the crop first to lock in values!");
      return;
    }

    const count = harvestedInven[selectedCrop] || 0;
    if (count <= 0) {
      triggerAlert("You ran out of this crop to sell!");
      return;
    }

    setHarvestedInven(prev => ({
      ...prev,
      [selectedCrop]: Math.max(0, (prev[selectedCrop] || 0) - 1)
    }));

    addCoins(appraisalValue);
    addXp(40);
    setAppraisalValue(null);
    setSelectedCrop('');
    triggerAlert("Fruit sold to local merchants! Credits synced successfully.");
  };

  // Deep breathing game
  const startBreathSession = () => {
    setBreathStage('inhale');
    setBreathCount(0);
    triggerAlert("Inhale deeply as the circle grows...");
    
    setTimeout(() => {
      setBreathStage('exhale');
      setTimeout(() => {
        setBreathStage('inhale');
        setBreathCount(1);
        setTimeout(() => {
          setBreathStage('exhale');
          setTimeout(() => {
            setBreathStage('idle');
            setBreathCount(2);
            addCoins(75);
            addXp(30);
            setActiveGameId(null);
            triggerAlert("🧘 Calm vibes secured! +75 Coins & 30 XP registered!");
          }, 3000);
        }, 3000);
      }, 3000);
    }, 3000);
  };

  // Study game material processors
  const handleGenerateStudyKit = (topicIndex: number, label: string) => {
    setStudyTopicIdx(topicIndex);
    setStudyPhase('learn');
    setStudyCardIndex(0);
    setStudyCardFlipped(false);
    setStudyQuizIndex(0);
    setStudyQuizScore(0);
    setStudyQuizSelectedOption(null);
    triggerAlert(`✨ Succesfully processed ${label}! Generated 3 Flashcards & study quiz pool!`);
  };

  const handleStudyQuizSubmit = (selected: string) => {
    setStudyQuizSelectedOption(selected);
    const activeTopic = STUDY_TOPICS[studyTopicIdx];
    const correctAns = activeTopic.quiz[studyQuizIndex].answer;
    
    if (selected === correctAns) {
      // "+10 Coins and 5 XP every time they get a question correct"
      addCoins(10);
      addXp(5);
      setStudyQuizScore(prev => prev + 1);
      triggerAlert("🎉 Correct Answer! Gained 10 Coins & 5 XP!");
    } else {
      triggerAlert(`❌ Incorrect. The correct answer was "${correctAns}". Try to study this card!`);
    }

    setTimeout(() => {
      setStudyQuizSelectedOption(null);
      if (studyQuizIndex < activeTopic.quiz.length - 1) {
        setStudyQuizIndex(prev => prev + 1);
      } else {
        setStudyPhase('complete');
      }
    }, 2000);
  };

  // Bible verse memory processor
  const handleReadVerseRound = () => {
    if (bibleViewCount < 3) {
      setBibleViewCount(prev => prev + 1);
      triggerAlert(`📖 Read carefully and memorize! Count ${bibleViewCount + 1}/3.`);
    } else {
      setBiblePhase('recall');
      setBibleUserAnswers(['', '', '']);
      triggerAlert("📝 Test Time! The verse is hidden. Complete the gaps to verify your memory!");
    }
  };

  const handleCheckBibleRecall = () => {
    const activeVerse = BIBLE_VERSES[bibleVerseIdx];
    let allMatches = true;

    for (let i = 0; i < activeVerse.blankOptions.length; i++) {
      if (bibleUserAnswers[i].toLowerCase() !== activeVerse.blankOptions[i].toLowerCase()) {
        allMatches = false;
      }
    }

    if (allMatches) {
      addCoins(120);
      addXp(60);
      setBiblePhase('success');
      triggerAlert("🕊️ Perfect Recall! Memorizing scripture calms the mind. Claimed 120 Coins & 60 XP!");
    } else {
      triggerAlert("❌ Some words are misplaced! Let's examine again.");
    }
  };

  // Private courier mail/chat scroll dispatcher
  const handleSendMail = () => {
    if (!newMailInput.trim() || !selectedMailFriend) return;
    const friendName = selectedMailFriend.username;
    
    const playerMsg: MailMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'You',
      receiver: friendName,
      avatar: 'https://cdn.phototourl.com/free/2026-05-12-91580f16-e2c3-4b8d-90e5-0c63030847b1.png',
      text: newMailInput,
      timestamp: 'Just now',
      isRead: true
    };
    
    setMailMessages([...mailMessages, playerMsg]);
    const userText = newMailInput;
    setNewMailInput('');
    triggerAlert(`🕊️ Carrier pigeon dispatched scroll to ${friendName}!`);

    if (simMessageTimeout) clearTimeout(simMessageTimeout);
    
    const timeout = setTimeout(() => {
      let replyText = `Oh sweet! Thank you for the direct scroll. Let's study or trade some crops later!`;
      if (userText.toLowerCase().includes('sunflower') || userText.toLowerCase().includes('seed') || userText.toLowerCase().includes('grow')) {
        replyText = `Sunflower culture is lovely! Check out the Trading plaza box, let's arrange some swaps!`;
      } else if (userText.toLowerCase().includes('study') || userText.toLowerCase().includes('exam') || userText.toLowerCase().includes('flash')) {
        replyText = `Cool! Let's play the study flashcard quiz cooperatively. I have my botany materials loaded!`;
      } else if (userText.toLowerCase().includes('bible') || userText.toLowerCase().includes('verse') || userText.toLowerCase().includes('stress') || userText.toLowerCase().includes('calm')) {
        replyText = `Thank you so much. Memorizing Holy Scriptures gives absolute spiritual peace. Let's duel!`;
      } else if (userText.toLowerCase().includes('trade') || userText.toLowerCase().includes('swap') || userText.toLowerCase().includes('sell')) {
        replyText = `Excellent! Go to the plaza hub and check if you can fulfill some neighbor barters right now.`;
      }
      
      const friendReplied: MailMessage = {
        id: `msg_reply_${Date.now()}`,
        sender: friendName,
        receiver: 'You',
        avatar: selectedMailFriend.avatar,
        text: replyText,
        timestamp: 'Just now',
        isRead: false
      };
      
      setMailMessages(prev => [...prev, friendReplied]);
      triggerAlert(`📬 Incoming scroll received from ${friendName}!`);
    }, 2000);
    
    setSimMessageTimeout(timeout);
  };

  // Real core trade accept broker
  const handleAcceptTradeOffer = (t: TradeOffer) => {
    if (t.user === 'You') {
      triggerAlert("This is your active trade post escrowed in the village board!");
      return;
    }

    const words = t.item.split(' ');
    const qty = parseInt(words[0]) || 5;
    const cropName = words[1] ? words[1].toLowerCase() : 'sunflower';
    
    const matchedCrop = CROPS.find(c => c.name.toLowerCase().includes(cropName) || cropName.includes(c.id));
    const cropId = matchedCrop ? matchedCrop.id : 'sunflower';
    const userOwned = harvestedInven[cropId] || 0;

    if (t.type === 'request') {
      // Neighbor wants crop, we give crop, we receive cash!
      if (userOwned < qty) {
        triggerAlert(`Trade Details: You need ${qty} ${matchedCrop?.name || 'Sunflowers'} in harvested backpack. You currently only have ${userOwned}!`);
        return;
      }

      setHarvestedInven(prev => ({
        ...prev,
        [cropId]: Math.max(0, prev[cropId] - qty)
      }));

      addCoins(1000);
      addXp(180);
      claimBadge('Trade Tycoon');
      setTrades(prev => prev.filter(tr => tr.id !== t.id));
      triggerAlert(`Accepted Swap: Handed over ${qty} ${matchedCrop?.name} to ${t.user}. Gained +1000 Coins & +180 XP!`);
    } else {
      // Neighbor offers crop, we can buy/swap it for 500 Coins!
      if (coins < 500) {
        triggerAlert(`You need at least 500 Coins to accept this trade offer for ${t.item} from ${t.user}!`);
        return;
      }

      setCoins(c => Math.max(0, c - 500));
      setHarvestedInven(prev => ({
        ...prev,
        [cropId]: (prev[cropId] || 0) + qty
      }));

      claimBadge('Trade Tycoon');
      setTrades(prev => prev.filter(tr => tr.id !== t.id));
      triggerAlert(`Acquired Trade Offer: Gained ${qty} ${matchedCrop?.name} from ${t.user}! Spent 500 Coins.`);
    }
  };

  // Custom trade board submission handler
  const handlePublishTrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tradeOfferCrop || !tradeRequestCrop) {
      triggerAlert("Please select both items you wish to barter!");
      return;
    }

    const ownedCount = harvestedInven[tradeOfferCrop] || 0;
    if (ownedCount < tradeOfferQty) {
      triggerAlert(`You do not have ${tradeOfferQty} ${CROPS.find(c => c.id === tradeOfferCrop)?.name} in your harvested backpack to trade away!`);
      return;
    }

    // Deduct offer items to secure trade escrow
    setHarvestedInven(prev => ({
      ...prev,
      [tradeOfferCrop]: Math.max(0, prev[tradeOfferCrop] - tradeOfferQty)
    }));

    const offerDef = CROPS.find(c => c.id === tradeOfferCrop);
    const reqDef = CROPS.find(c => c.id === tradeRequestCrop);

    const newOffer: TradeOffer = {
      id: `trade_prop_${Date.now()}`,
      user: 'You',
      avatar: 'https://cdn.phototourl.com/free/2026-05-12-91580f16-e2c3-4b8d-90e5-0c63030847b1.png',
      type: 'request', // means others can fulfill the request
      item: `${tradeRequestQty} ${reqDef?.name}`
    };

    setTrades([newOffer, ...trades]);
    setIsPostingTrade(false);
    triggerAlert(`📣 Custom Trade Published! Escrowed ${tradeOfferQty} ${offerDef?.name} to obtain ${tradeRequestQty} ${reqDef?.name}!`);

    // Simulated responsive Neighbor accept
    setTimeout(() => {
      setTrades(prev => {
        const check = prev.find(tr => tr.id === newOffer.id);
        if (check) {
          addCoins(1100);
          addXp(150);
          setHarvestedInven(h => ({
            ...h,
            [tradeRequestCrop]: (h[tradeRequestCrop] || 0) + tradeRequestQty
          }));
          triggerAlert(`🔔 Swap complete! NICOLINE123 accepted your barter! Received ${tradeRequestQty} ${reqDef?.name} and got +1100 Coins!`);
          return prev.filter(tr => tr.id !== newOffer.id);
        }
        return prev;
      });
    }, 18000);
  };

  return (
    <div className="space-y-8">
      {/* Search friends Section */}
      <div className="space-y-4">
        <section className="paper-texture p-4 rounded-xl border-2 border-outline shadow-sm organic-tilt-right relative">
          <div className="absolute -top-3 left-4 bg-[#5e604d] text-white px-3 py-0.5 border border-outline rounded-lg font-sans text-[11px] font-bold">
            FIND FRIENDS
          </div>
          <form onSubmit={handleSearchFriend} className="mt-2 flex items-center bg-white border-2 border-outline-variant rounded-full px-4 py-2 shadow-inner">
            <span className="material-symbols-outlined text-on-surface-variant mr-2">person_search</span>
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by username..."
              className="bg-transparent border-none focus:ring-0 w-full font-serif text-sm focus:outline-none placeholder:text-on-surface-variant/50"
            />
            <button type="submit" className="bg-primary hover:bg-[#2d5a27] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase transition-all">Add</button>
          </form>
        </section>

        {/* Pending Requests Section */}
        {friends.some(f => f.status === 'pending') && (
          <section className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <h2 className="font-sans text-[11px] text-secondary uppercase tracking-widest font-extrabold font-bold">Pending Friend Requests</h2>
              <span className="bg-[#ba1a1a] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">1</span>
            </div>
            
            {friends.filter(f => f.status === 'pending').map(f => (
              <div key={f.id} className="bg-white p-3 rounded-xl border-2 border-outline-variant shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    const cfg = getAvatarConfigForUser(f.username);
                    return (
                      <div className="w-10 h-10 rounded-xl border border-primary overflow-hidden shrink-0">
                        <FarmerAvatar 
                          size="sm" 
                          customBg={cfg.bg} 
                          customOutfit={cfg.outfit} 
                          customHat={cfg.hat} 
                          customProp={cfg.prop} 
                          customGender={cfg.gender} 
                        />
                      </div>
                    );
                  })()}
                  <div>
                    <span className="font-sans text-xs font-bold text-on-surface block">{f.username}</span>
                    <span className="text-[10px] uppercase text-[#72796e] font-bold">Wants with your guild</span>
                  </div>
                </div>
                
                <div className="flex gap-1.5 shrink-0">
                  <button 
                    onClick={() => handleAcceptRequest(f.id, f.username)}
                    className="w-8 h-8 rounded-lg bg-[#2d5a27] text-white flex items-center justify-center shadow-sm hover:brightness-115 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </button>
                  <button 
                    onClick={() => handleDeclineRequest(f.id)}
                    className="w-8 h-8 rounded-lg bg-white border border-outline-variant text-[#ba1a1a] flex items-center justify-center shadow hover:bg-neutral-50 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">close</span>
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* My Friends Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-sans text-[11px] text-secondary uppercase tracking-widest font-extrabold font-bold">My Friends Directory</h2>
            <button 
              onClick={() => {
                const initBuddy = friends.find(f => f.status !== 'pending') || friends[0];
                if (initBuddy) {
                  setSelectedMailFriend(initBuddy);
                  setMailboxOpen(true);
                }
              }}
              className="text-[10px] uppercase text-primary font-bold hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-xs">mail</span> Inbox
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {friends.filter(f => f.status !== 'pending').map(f => (
              <div 
                key={f.id} 
                onClick={() => setProfileOverlayTarget(f.username)}
                className="paper-texture p-3 rounded-xl border-2 border-outline-variant shadow-sm flex items-center justify-between hover:scale-[1.01] transition-transform cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    {(() => {
                      const cfg = getAvatarConfigForUser(f.username);
                      return (
                        <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-[#2d5a27] bg-surface-container flex items-center justify-center">
                          <FarmerAvatar 
                            size="sm" 
                            customBg={cfg.bg} 
                            customOutfit={cfg.outfit} 
                            customHat={cfg.hat} 
                            customProp={cfg.prop} 
                            customGender={cfg.gender} 
                          />
                        </div>
                      );
                    })()}
                    {f.status === 'online' && (
                      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white z-10 animate-pulse"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-on-surface">{f.username}</h4>
                    <p className={`text-[9px] font-bold uppercase tracking-tighter ${f.status === 'online' ? 'text-green-600' : 'text-neutral-400'}`}>
                      {f.status === 'online' ? '● Online' : ' ऑफलाइन / Offline'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => {
                      setPlayTogetherFriend(f);
                      setPlayTogetherMode('select');
                      setCoopStep(0);
                    }}
                    className="flex items-center gap-1 bg-primary hover:bg-[#2d5a27] text-white px-2.5 py-1.5 rounded-lg font-sans text-[10px] uppercase font-bold border border-primary shadow-sm hover:brightness-105 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">sports_esports</span>
                    PLAY TOGETHER
                  </button>
                  
                  <button 
                    onClick={() => {
                      setSelectedMailFriend(f);
                      setMailboxOpen(true);
                    }}
                    className="flex items-center gap-1 bg-surface-container-high text-on-surface-variant hover:bg-[#eaeae2] px-2.5 py-1.5 rounded-lg font-sans text-[10px] font-bold border border-outline-variant shadow-sm hover:bg-neutral-100 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">mail</span>
                    SEND MAIL
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Market Stall Section */}
      <section className="paper-texture p-4 rounded-xl border-2 border-outline shadow-sm organic-tilt-left relative space-y-4">
        <div className="absolute -top-3 left-4 bg-[#263f2a] text-white px-2.5 py-0.5 border border-outline rounded-lg font-sans text-[11px] uppercase tracking-wider font-bold">
          Market Stall
        </div>
        
        <div className="pt-2 flex flex-col items-center gap-4">
          <h2 className="font-serif text-lg font-bold text-[#154212] w-full px-1">Sell Your Harvest</h2>
          
          {/* Select and sell drop down */}
          <div className="w-full space-y-2">
            <label className="block text-[11px] font-sans font-bold text-secondary uppercase">Choose Crops to Appraise</label>
            <select 
              value={selectedCrop}
              onChange={(e) => {
                setSelectedCrop(e.target.value);
                setAppraisalValue(null);
              }}
              className="w-full bg-white border-2 border-outline-variant rounded-xl p-2.5 font-serif text-sm focus:outline-none"
            >
              <option value="">-- Choose Harvest Backpack --</option>
              {CROPS.map(crop => {
                const count = harvestedInven[crop.id] || 0;
                return (
                  <option key={crop.id} value={crop.id}>
                    {crop.name} (Owned: {count})
                  </option>
                );
              })}
            </select>
          </div>

          <div className="w-20 h-20 bg-surface-container-low border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center pixel-border-inset cursor-pointer hover:bg-neutral-50 transition-colors">
            {selectedCrop ? (
              <span className="material-symbols-outlined text-[#154212] text-4xl">inventory_2</span>
            ) : (
              <span className="material-symbols-outlined text-outline text-3xl">add_circle</span>
            )}
            <p className="font-sans text-[10px] font-bold text-on-surface-variant mt-1">
              {selectedCrop ? 'Fruit Loaded' : 'Select Crop'}
            </p>
          </div>

          <div className="bg-secondary-container/60 px-4 py-1.5 rounded-full border border-outline-variant">
            <p className="font-serif text-xs text-on-surface italic text-center">
              Estimated Value:{' '}
              <span className="font-bold text-[#154212] not-italic text-sm">
                {appraisalValue !== null ? `${appraisalValue} Coins` : '--'}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <button 
              onClick={handleAppraise}
              className="flex items-center justify-center gap-1.5 bg-white border-2 border-primary text-primary px-3 py-2.5 rounded-xl font-sans text-xs font-bold hover:bg-primary/5 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">search_check</span>
              APPRAISE
            </button>
            
            <button 
              onClick={handleSellFruit}
              className="flex items-center justify-center gap-1.5 bg-primary text-white px-3 py-2.5 rounded-xl font-sans text-xs font-bold hover:bg-primary/95 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">sell</span>
              SELL FRUIT
            </button>
          </div>
          
          <p className="font-sans text-[9px] text-[#72796e] text-center uppercase tracking-tighter">
            Earn Coins &amp; XP for your homegrown organic produce with town merchants.
          </p>
        </div>
      </section>

      {/* Trading Hub Segment with Custom barter proposal */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="font-heading text-base font-bold text-primary">Trading Plaza</h2>
            <p className="text-[10px] text-gray-500 font-sans">Swap crops directly with fellow agriculturalists</p>
          </div>
          <button 
            onClick={() => setIsPostingTrade(!isPostingTrade)}
            className="bg-primary hover:bg-[#2d5a27] text-white font-sans text-[10px] uppercase font-bold py-1.5 px-3 rounded-lg flex items-center gap-1 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-xs">add_box</span>
            {isPostingTrade ? "CLOSE" : "CREATE TRADE"}
          </button>
        </div>

        {/* Custom Trade Creator */}
        {isPostingTrade && (
          <form onSubmit={handlePublishTrade} className="bg-[#f2f2e4] p-4 rounded-xl border-4 border-[#2d5a27]/30 space-y-4 animate-fade-in text-on-surface">
            <h3 className="font-serif text-sm font-black text-primary uppercase tracking-tight">📜 Pitch a seed/crop barter proposal</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[9px] uppercase font-sans font-bold text-gray-600">What you offer (From inventory):</label>
                <select 
                  value={tradeOfferCrop}
                  onChange={(e) => setTradeOfferCrop(e.target.value)}
                  className="w-full bg-white rounded-lg p-2 border border-outline text-xs text-on-surface focus:outline-none"
                >
                  <option value="">-- Choose Crop --</option>
                  {CROPS.map(c => {
                    const count = harvestedInven[c.id] || 0;
                    return (
                      <option key={c.id} value={c.id}>
                        {c.name} (Owned: {count})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] uppercase font-sans font-bold text-gray-600 font-bold">How many crops:</label>
                <input 
                  type="number"
                  min="1"
                  max="50"
                  value={tradeOfferQty}
                  onChange={(e) => setTradeOfferQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-white rounded-lg p-1.5 border border-outline text-xs text-on-surface focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[9px] uppercase font-sans font-bold text-gray-600">What crop you seek:</label>
                <select 
                  value={tradeRequestCrop}
                  onChange={(e) => setTradeRequestCrop(e.target.value)}
                  className="w-full bg-white rounded-lg p-2 border border-outline text-xs text-on-surface focus:outline-none"
                >
                  <option value="">-- Choose Crop --</option>
                  {CROPS.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] uppercase font-sans font-bold text-gray-600 font-bold">Seek Quantity:</label>
                <input 
                  type="number"
                  min="1"
                  max="50"
                  value={tradeRequestQty}
                  onChange={(e) => setTradeRequestQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-white rounded-lg p-1.5 border border-outline text-xs text-on-surface focus:outline-none"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-[#2d5a27] text-white py-2.5 rounded-xl font-bold font-sans text-xs uppercase"
            >
              Publish Trade Proposal to board 📣
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 gap-4">
          {trades.map((t, idx) => (
            <div 
              key={t.id || idx} 
              className={`bg-[#e1e1c9]/40 p-4 rounded-xl border-2 border-outline flex items-center justify-between shadow-sm transition-all hover:bg-[#e1e1c9]/60 ${idx % 2 === 0 ? 'organic-tilt-left' : 'organic-tilt-right'}`}
            >
              <div className="flex items-center gap-3">
                {(() => {
                  const isUserSelf = t.user === 'You' || t.user === username;
                  if (isUserSelf) {
                    return (
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-primary bg-white shrink-0 shadow-sm flex items-center justify-center">
                        <FarmerAvatar size="sm" />
                      </div>
                    );
                  }
                  
                  const cfg = getAvatarConfigForUser(t.user);
                  return (
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-primary bg-white shrink-0 shadow-sm flex items-center justify-center">
                      <FarmerAvatar 
                        size="sm" 
                        customBg={cfg.bg} 
                        customOutfit={cfg.outfit} 
                        customHat={cfg.hat} 
                        customProp={cfg.prop} 
                        customGender={cfg.gender} 
                      />
                    </div>
                  );
                })()}
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-sans text-xs font-bold text-[#154212] uppercase">{t.user === 'You' ? 'My Trade (Active)' : t.user}</p>
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  </div>
                  <p className="font-serif text-xs text-on-surface-variant leading-relaxed">
                    {t.type === 'offer' ? (
                      <>Offering: <span className="font-extrabold text-primary">{t.item}</span></>
                    ) : (
                      <>Requested item: <span className="font-extrabold text-[#ba1a1a]">{t.item}</span> (Fulfill for 1000 Coins)</>
                    )}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => handleAcceptTradeOffer(t)}
                className={`text-xs px-4 py-2 rounded-xl font-sans font-extrabold shadow-sm active:scale-95 cursor-pointer ${
                  t.user === 'You' 
                    ? "bg-gray-200 text-gray-500 border border-gray-300 relative cursor-not-allowed" 
                    : "bg-primary hover:bg-[#2d5a27] text-white"
                }`}
              >
                {t.user === 'You' ? 'ESCROW' : t.type === 'offer' ? 'BUY Swap' : 'FULFILL Swap'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Minigame Pavilion */}
      <section className="space-y-4 pb-4">
        <h2 className="font-serif text-lg font-bold text-primary px-2">🌿 Minigame Pavilion</h2>
        
        {/* Game 1: Upgraded Studying game with material uploaders and flashcards + quiz */}
        {activeGameId === 'm1' && (
          <div className="bg-white p-5 border-4 border-primary rounded-xl space-y-4 animate-fade-in text-on-surface relative">
            <button 
              onClick={() => setActiveGameId(null)}
              className="absolute top-2 right-2 hover:bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="font-heading text-[10px] text-primary font-black uppercase tracking-widest block">📚 Flashcard &amp; Quiz Academy</span>
              <h3 className="font-serif text-base font-black text-[#154212]">Study Sprinters: Active Session</h3>
            </div>

            {studyPhase === 'upload' && (
              <div className="space-y-4">
                <p className="text-xs text-secondary leading-relaxed">
                  Provide your notes, PDFs, or lecture video links. Our agricultural study wizard will instantly synthesize functional flashcards and quizzes so you can practice under pressure!
                </p>

                {/* Simulated file uploader widgets */}
                <div className="grid grid-cols-2 gap-3">
                  <label className="border-2 border-dashed border-primary/30 p-3 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-primary/5 transition-colors">
                    <span className="material-symbols-outlined text-primary text-2xl">description</span>
                    <span className="font-sans text-[10px] font-bold mt-1 text-on-surface">
                      {uploadedFileName ? uploadedFileName : "Select Note Material"}
                    </span>
                    <input 
                      type="file" 
                      accept=".txt,.doc,.docx"
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploadedFileName(file.name);
                          triggerAlert(`Loaded Note document: ${file.name}`);
                        }
                      }}
                    />
                  </label>

                  <label className="border-2 border-dashed border-purple-500/30 p-3 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-purple-50 transition-colors">
                    <span className="material-symbols-outlined text-purple-600 text-2xl border-purple-500">picture_as_pdf</span>
                    <span className="font-sans text-[10px] font-bold mt-1 text-on-surface">
                      {uploadedPDFName ? uploadedPDFName : "Upload Lectures PDF"}
                    </span>
                    <input 
                      type="file" 
                      accept=".pdf" 
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploadedPDFName(file.name);
                          triggerAlert(`Loaded PDF content: ${file.name}`);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="bg-[#fcfcf9] p-3 rounded-xl border border-secondary/15 space-y-2">
                  <label className="block text-[9px] uppercase tracking-wider font-extrabold text-secondary font-bold">Or Attach Lecture video/Online class link:</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="Paste lecture YouTube/web URLs here..."
                      value={uploadedVideoLink}
                      onChange={(e) => setUploadedVideoLink(e.target.value)}
                      className="bg-white border border-outline rounded-lg p-2 text-xs font-sans focus:outline-none flex-grow text-on-surface"
                    />
                    {uploadedVideoLink && (
                      <button 
                        type="button" 
                        onClick={() => {
                          setUploadedVideoLink('');
                          triggerAlert("Cleared link!");
                        }}
                        className="text-xs font-bold text-red-500 text-on-surface"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2 pt-1 border-t border-gray-100">
                  <span className="font-sans text-[9px] uppercase tracking-wider font-extrabold text-gray-500 block">Quick Starter Kits (Preset Topics):</span>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => handleGenerateStudyKit(0, "Botany notes")}
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 py-1.5 px-3 rounded-lg text-xs font-bold"
                    >
                      Botany &amp; Leaf Biology
                    </button>
                    <button 
                      onClick={() => handleGenerateStudyKit(1, "YouTube agronomy lectures")}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-850 border border-blue-200 py-1.5 px-3 rounded-lg text-xs font-bold"
                    >
                      Soil Science Lecture
                    </button>
                    <button 
                      onClick={() => handleGenerateStudyKit(2, "Agriculture PDF")}
                      className="bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 py-1.5 px-3 rounded-lg text-xs font-bold"
                    >
                      Companion Planting Book
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (uploadedFileName) {
                      handleGenerateStudyKit(0, `your note "${uploadedFileName}"`);
                    } else if (uploadedPDFName) {
                      handleGenerateStudyKit(2, `your PDF "${uploadedPDFName}"`);
                    } else if (uploadedVideoLink) {
                      handleGenerateStudyKit(1, `your lecture link "${uploadedVideoLink}"`);
                    } else {
                      triggerAlert("Please upload notes, PDFs, insert a video link, or select a Botany Starter Kit catalog below to generate your flashcards!");
                    }
                  }}
                  className="w-full bg-primary hover:bg-[#2d5a27] text-white py-3 rounded-xl font-bold font-sans text-xs uppercase"
                >
                  Generate Study Toolkit ✨
                </button>
              </div>
            )}

            {studyPhase === 'learn' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-gray-500 font-bold">
                  <span>FLASHCARD REVIEW PANEL • {studyCardIndex+1}/3</span>
                  <button 
                    onClick={() => setStudyPhase('quiz')}
                    className="text-primary hover:underline"
                  >
                    Skip to Quiz
                  </button>
                </div>

                {/* Double sided flipping card */}
                <div 
                  onClick={() => setStudyCardFlipped(!studyCardFlipped)}
                  className={`min-h-[140px] bg-gradient-to-br from-[#fbfbfa] to-[#f4f4ef] rounded-2xl border-4 ${studyCardFlipped ? 'border-primary' : 'border-secondary/45'} p-6 flex flex-col justify-center items-center text-center shadow-md cursor-pointer transition-transform duration-300 select-none ${studyCardFlipped ? 'rotate-y-180' : ''}`}
                >
                  {studyCardFlipped ? (
                    <div className="space-y-2">
                      <span className="font-heading text-[8px] bg-primary text-white font-extrabold uppercase py-0.5 px-1.5 rounded-full block tracking-widest w-fit mx-auto">ANSWER KEY</span>
                      <p className="font-sans text-xs font-bold text-on-surface-variant">
                        {STUDY_TOPICS[studyTopicIdx].cards[studyCardIndex].back}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <span className="font-heading text-[8px] bg-[#ba1a1a] text-white font-extrabold uppercase py-0.5 px-1.5 rounded-full block tracking-widest w-fit mx-auto">PHRASE TERM</span>
                      <p className="font-serif text-sm font-extrabold text-primary">
                        {STUDY_TOPICS[studyTopicIdx].cards[studyCardIndex].front}
                      </p>
                      <p className="font-sans text-[9px] uppercase text-[#72796e] tracking-tight">Tap card to flip over!</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between gap-3">
                  <button 
                    onClick={() => {
                      setStudyCardFlipped(false);
                      setStudyCardIndex(prev => Math.max(0, prev - 1));
                    }}
                    disabled={studyCardIndex === 0}
                    className="flex-grow py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-xs px-2 font-bold font-sans rounded-xl text-on-surface uppercase border"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => {
                      if (studyCardIndex < 2) {
                        setStudyCardFlipped(false);
                        setStudyCardIndex(prev => prev + 1);
                      } else {
                        setStudyPhase('quiz');
                        triggerAlert("Nice job studying! Initiating Practice quiz...");
                      }
                    }}
                    className="flex-grow py-2 bg-primary hover:bg-[#2d5a27] text-white text-xs px-2 font-bold font-sans rounded-xl uppercase"
                  >
                    {studyCardIndex === 2 ? 'PROCEED TO QUIZ ★' : 'NEXT CARD'}
                  </button>
                </div>
              </div>
            )}

            {studyPhase === 'quiz' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-gray-500 font-bold">
                  <span>TRIVIA PRACTICE CHECKPOINT • Q{studyQuizIndex+1}/3</span>
                  <span className="font-mono text-primary font-bold">Score: {studyQuizScore}/3</span>
                </div>

                <div className="bg-[#fcfcfb] p-4 text-center rounded-xl border">
                  <p className="font-serif text-sm text-primary font-extrabold">
                    {STUDY_TOPICS[studyTopicIdx].quiz[studyQuizIndex].question}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-1">
                  {STUDY_TOPICS[studyTopicIdx].quiz[studyQuizIndex].options.map(option => {
                    const isSelected = studyQuizSelectedOption === option;
                    const correctChoice = STUDY_TOPICS[studyTopicIdx].quiz[studyQuizIndex].answer;
                    
                    return (
                      <button 
                        key={option}
                        disabled={studyQuizSelectedOption !== null}
                        onClick={() => handleStudyQuizSubmit(option)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs font-sans font-bold transition-all flex items-center justify-between ${
                          studyQuizSelectedOption !== null 
                            ? option === correctChoice
                              ? 'bg-green-100 text-green-800 border-green-500' 
                              : isSelected 
                                ? 'bg-red-100 text-red-600 border-red-500'
                                : 'bg-gray-50 text-gray-400 border-gray-200'
                            : 'bg-neutral-50 hover:bg-neutral-100 border-gray-300 text-secondary'
                        }`}
                      >
                        <span>{option}</span>
                        {studyQuizSelectedOption !== null && option === correctChoice && (
                          <span className="material-symbols-outlined text-sm font-bold text-green-600">check</span>
                        )}
                        {studyQuizSelectedOption !== null && isSelected && option !== correctChoice && (
                          <span className="material-symbols-outlined text-sm font-bold text-red-600">close</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {studyPhase === 'complete' && (
              <div className="text-center space-y-4 py-3">
                <span className="text-5xl animate-bounce block">🎓</span>
                <h3 className="font-serif text-base font-black text-primary">Session Finished Successfully</h3>
                
                <p className="font-sans text-xs text-secondary leading-relaxed px-2">
                  Excellent study streak! You completed the academy materials, scored <strong className="text-primary font-bold">{studyQuizScore}/3</strong>, and nurtured your cognitive skills stack.
                </p>

                <div className="bg-yellow-400/10 p-3.5 rounded-xl border border-yellow-400">
                  <p className="font-sans text-[11px] text-amber-900 font-bold uppercase tracking-wider">
                    Total reward secure: {studyQuizScore * 10} Coins &amp; {studyQuizScore * 5} XP!
                  </p>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setStudyPhase('upload');
                      setUploadedFileName('');
                      setUploadedPDFName('');
                      setUploadedVideoLink('');
                    }}
                    className="w-1/2 py-2 bg-white border border-[#2d5a27]/30 hover:bg-neutral-50 rounded-xl font-bold font-sans text-xs text-on-surface uppercase"
                  >
                    Restart
                  </button>
                  <button 
                    onClick={() => setActiveGameId(null)}
                    className="w-1/2 bg-primary hover:bg-[#2d5a27] text-white py-2 rounded-xl font-bold font-sans text-xs uppercase"
                  >
                    Got It
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Game 2: Wellness Wiz deep breathing calming space */}
        {activeGameId === 'm2' && (
          <div className="bg-white p-5 border-4 border-[#2d5a27] rounded-xl space-y-4 text-center animate-fade-in relative text-on-surface">
            <button 
              onClick={() => setActiveGameId(null)}
              className="absolute top-2 right-2 hover:bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold"
            >
              ✕
            </button>
            <h3 className="font-serif text-base font-bold text-[#154212]">Wellness Wiz Breathing Space</h3>
            <p className="text-xs text-[#72796e] max-w-sm mx-auto">Click "Begin Breathing" and let the therapeutic bubble regulate your inhale-exhale rhythms to win +75 Coins!</p>
            
            <div className="flex flex-col items-center justify-center py-6">
              <div 
                className={`rounded-full flex items-center justify-center border-4 border-primary/40 text-primary transition-all duration-[3000ms] ${breathStage === 'inhale' ? 'w-24 h-24 bg-primary/20 scale-125 font-bold' : breathStage === 'exhale' ? 'w-16 h-16 bg-[#bcf0ae]/30 scale-95' : 'w-20 h-20 bg-neutral-100'}`}
              >
                <span className="text-[11px] font-sans font-bold capitalize">{breathStage}</span>
              </div>
              <p className="font-sans text-[10px] text-secondary font-bold uppercase mt-4 tracking-wider">Completed Cycles: {breathCount}/2</p>
            </div>

            {breathStage === 'idle' && (
              <button onClick={startBreathSession} className="bg-primary hover:bg-[#2d5a27] text-white text-xs px-6 py-2.5 rounded-xl font-bold uppercase">BEGIN BREATHING</button>
            )}
          </div>
        )}

        {/* Game 3: Bible Verse Memory Game (stress reliever and calm tool replacing Skill Sage) */}
        {activeGameId === 'm3' && (
          <div className="bg-white p-5 border-4 border-amber-600 rounded-xl space-y-4 animate-fade-in text-on-surface relative">
            <button 
              onClick={() => setActiveGameId(null)}
              className="absolute top-2 right-2 hover:bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="font-heading text-[10px] text-amber-700 font-black uppercase tracking-widest block">🕊️ Calming Scripture Memorizer</span>
              <h3 className="font-serif text-base font-black text-primary">Bible Verse Challenge</h3>
            </div>

            {biblePhase === 'view' && (
              <div className="space-y-4">
                <p className="text-xs text-secondary leading-relaxed">
                  Calm down and release your stress. Read this calming bible verse carefully. You will see it <span className="font-bold text-amber-700">3 times</span>, and then gaps will emerge!
                </p>

                <div className="bg-amber-50 p-5 rounded-2xl border-2 border-amber-300/40 text-center relative overflow-hidden">
                  <div className="absolute right-1 top-1 text-xs text-amber-300">🌸</div>
                  <p className="font-serif italic text-sm text-primary font-bold leading-relaxed px-3">
                    "{BIBLE_VERSES[bibleVerseIdx].text}"
                  </p>
                  <p className="font-sans text-[10px] font-black text-amber-800 uppercase tracking-widest mt-2">
                    — {BIBLE_VERSES[bibleVerseIdx].ref}
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500 font-bold bg-neutral-50 px-3 py-2 rounded-xl">
                  <span>Memorization read count:</span>
                  <span className="bg-amber-600 text-white rounded-full px-2 py-0.5 text-[10px]">{bibleViewCount}/3 Completed</span>
                </div>

                <button 
                  onClick={handleReadVerseRound}
                  className="w-full bg-primary hover:bg-[#2d5a27] text-white py-2.5 rounded-xl font-bold font-sans text-xs uppercase"
                >
                  I've read and memorized this round!
                </button>
              </div>
            )}

            {biblePhase === 'recall' && (
              <div className="space-y-4">
                <p className="text-xs text-secondary leading-relaxed">
                  Fill in the missing words correctly from your short-term memory to satisfy the test and secure peace!
                </p>

                <div className="bg-[#fcfbf9] p-4 rounded-xl border border-amber-500/30 text-center">
                  <p className="font-serif text-xs leading-relaxed text-slate-800">
                    "{BIBLE_VERSES[bibleVerseIdx].clue}"
                  </p>
                  <span className="font-sans text-[9px] uppercase tracking-widest text-[#72796e] block mt-2">
                    — {BIBLE_VERSES[bibleVerseIdx].ref}
                  </span>
                </div>

                {/* Blanks inputs / selectors selector stack */}
                <div className="space-y-3 pt-2">
                  {BIBLE_VERSES[bibleVerseIdx].blankOptions.map((blankWord, index) => (
                    <div key={index} className="grid grid-cols-2 gap-3 items-center">
                      <span className="font-sans text-[10px] font-extrabold uppercase text-gray-600 text-left">
                        Missing word {index + 1}:
                      </span>
                      <select 
                        value={bibleUserAnswers[index]}
                        onChange={(e) => {
                          const nextVals = [...bibleUserAnswers];
                          nextVals[index] = e.target.value;
                          setBibleUserAnswers(nextVals);
                        }}
                        className="bg-white border rounded-lg p-1.5 text-xs focus:outline-none text-on-surface"
                      >
                        <option value="">-- Choose Choice --</option>
                        {BIBLE_VERSES[bibleVerseIdx].choiceCollections[index].map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleCheckBibleRecall}
                  className="w-full bg-primary hover:bg-[#2d5a27] text-white py-2.5 rounded-xl font-bold font-sans text-xs uppercase"
                >
                  Verify scripture memory
                </button>
              </div>
            )}

            {biblePhase === 'success' && (
              <div className="text-center space-y-4 py-3">
                <span className="text-5xl animate-bounce block text-center">🕊️</span>
                <h3 className="font-serif text-base font-black text-[#154212]">Scripture Engraved In Spirit</h3>
                
                <p className="font-sans text-xs text-secondary leading-relaxed px-2">
                  "Let the peace of God, which transcends all understanding, guard your hearts and minds." Your scripture speed memory is stellar.
                </p>

                <div className="bg-[#bcf0ae]/20 p-3 rounded-xl border border-[#2d5a27]">
                  <p className="font-sans text-[11.5px] text-emerald-900 font-extrabold uppercase tracking-widest">
                    REWARD CREDITS: 120 Coins &amp; 60 XP Claimed!
                  </p>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setBibleVerseIdx((bibleVerseIdx + 1) % BIBLE_VERSES.length);
                      setBiblePhase('view');
                      setBibleViewCount(1);
                    }}
                    className="w-1/2 bg-white border hover:bg-neutral-50 py-2 rounded-xl text-xs font-bold font-sans text-on-surface uppercase"
                  >
                    Cycle Verse
                  </button>
                  <button 
                    onClick={() => setActiveGameId(null)}
                    className="w-1/2 bg-primary hover:bg-[#2d5a27] text-white py-2 rounded-xl text-xs font-bold font-sans uppercase"
                  >
                    Close Calm Space
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Closed Minigames Pavilion index grids */}
        {!activeGameId && (
          <div className="space-y-3">
            {/* Upgraded Studying game link */}
            <div 
              onClick={() => {
                setActiveGameId('m1');
                setStudyPhase('upload');
                setUploadedFileName('');
                setUploadedPDFName('');
                setUploadedVideoLink('');
              }}
              className="paper-texture p-4 border-2 border-outline rounded-xl flex items-center gap-4 hover:bg-neutral-50 hover:scale-101 active:scale-99 transition-all cursor-pointer shadow-sm"
            >
              <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center pixel-border-inset overflow-hidden shrink-0">
                <span className="material-symbols-outlined text-primary text-3xl">auto_stories</span>
              </div>
              <div className="flex-grow">
                <h3 className="font-serif text-base font-bold text-[#154212]">Study Flashcard Academy</h3>
                <p className="text-[#42493e] font-sans text-[11px] font-semibold">Upload documents, PDFs, or lecture video links to generate cards &amp; quizzes!</p>
              </div>
              <div className="flex flex-col items-center shrink-0">
                <span className="material-symbols-outlined text-secondary font-bold">monetization_on</span>
                <span className="font-sans text-[11px] font-extrabold text-secondary">Correct Answer: 10</span>
              </div>
            </div>

            {/* Wellness Wiz Trigger Card */}
            <div 
              onClick={() => setActiveGameId('m2')}
              className="paper-texture p-4 border-2 border-outline rounded-xl flex items-center gap-4 hover:bg-neutral-50 hover:scale-101 active:scale-99 transition-all cursor-pointer organic-tilt-right shadow-sm"
            >
              <div className="w-12 h-12 bg-emerald-800/10 rounded-lg flex items-center justify-center pixel-border-inset overflow-hidden shrink-0">
                <img 
                  alt="Landscape" 
                  className="w-full h-full object-cover p-0.5" 
                  src="https://lh3.googleusercontent.com/aida/ADBb0uhszDs3J6KY30qXYchMl-CGgrSIdpwTwbdQtFuJ3c1Go195FDB7kqznw-cjSLwP-AlG-Q8wDmwQX1iyQWi8-hpB6aptKkUG0d1JYnI0xy5pJCuR71v38W1sHEmBLxBblAfaPf8PxefjrXwnxn8lLZOic_SPbKlBbNzNjqnznzdmapYw6RfHSbpA6op-f0DZ1vhy0d0JLxEsCVJJIkrT9ly-ntv5IoC1CJ1E8ygUTLPs-9Z4uLtyRHNMFfU"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-serif text-base font-bold text-[#154212]">Wellness Wiz</h3>
                <p className="text-[#42493e] font-sans text-[11px] font-semibold">Regulate daily breathing to relieve stress and secure calm</p>
              </div>
              <div className="flex flex-col items-center shrink-0">
                <span className="material-symbols-outlined text-secondary font-bold">monetization_on</span>
                <span className="font-sans text-[11px] font-extrabold text-secondary">75</span>
              </div>
            </div>

            {/* UPGRADED Bible Verse Memory Game Trigger Replacement */}
            <div 
              onClick={() => {
                setActiveGameId('m3');
                setBiblePhase('view');
                setBibleViewCount(1);
                setBibleVerseIdx(0);
              }}
              className="paper-texture p-4 border-2 border-outline rounded-xl flex items-center gap-4 hover:bg-neutral-50 hover:scale-101 active:scale-99 transition-all cursor-pointer shadow-sm"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center pixel-border-inset overflow-hidden shrink-0">
                <span className="material-symbols-outlined text-amber-700 text-3xl">menu_book</span>
              </div>
              <div className="flex-grow">
                <h3 className="font-serif text-base font-bold text-[#154212]">Scripture Memory Sanctuary</h3>
                <p className="text-[#42493e] font-sans text-[11px] font-semibold">Bible Verse memory challenge. Speed memorizer calming game!</p>
              </div>
              <div className="flex flex-col items-center shrink-0">
                <span className="material-symbols-outlined text-secondary font-bold">monetization_on</span>
                <span className="font-sans text-[11px] font-extrabold text-secondary">120</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* MODAL 1: Play Together Lounge Modal (With Studying Together or Bible Memory Verse Duels) */}
      {playTogetherFriend && (
        <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in text-on-surface">
          <div className="bg-[#f9f9ee] max-w-md w-full rounded-2xl border-4 border-primary p-6 space-y-4 shadow-2xl relative">
            
            <button 
              onClick={() => {
                setPlayTogetherFriend(null);
                setPlayTogetherMode('select');
              }}
              className="absolute top-2.5 right-2.5 hover:bg-stone-200/50 text-[#154212] font-black cursor-pointer rounded-full w-7 h-7 flex items-center justify-center transition-transform active:scale-90"
            >
              ✕
            </button>

            {playTogetherMode === 'select' && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <span className="text-3xl">🎮</span>
                  <h3 className="font-heading text-lg font-black text-primary uppercase">PLAY TOGETHER LOUNGE</h3>
                  <p className="font-sans text-xs text-gray-500">
                    Welcome! You are connected in the arena with <strong className="text-primary">{playTogetherFriend.username}</strong>
                  </p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-primary/10 text-center flex items-center gap-2 justify-center italic text-xs text-slate-700">
                  <span>"{playTogetherFriend.username} says: 'Hey mate! Ready to gain some extreme study and spiritual stats together?'"</span>
                </div>

                <div className="space-y-3">
                  {/* Option A: Co-operative Flashcard Study and Quiz */}
                  <div 
                    onClick={() => {
                      setPlayTogetherMode('study');
                      setStudyQuizIndex(0);
                      setStudyQuizScore(0);
                      setStudyPhase('learn');
                      setStudyTopicIdx(0);
                    }}
                    className="border-2 border-primary bg-white p-4 rounded-xl cursor-not-allowed hover:bg-neutral-50 transition-all text-left flex items-start gap-3 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-primary text-2xl mt-0.5">school</span>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#154212]">Cooperative Study Flashcard Quiz</h4>
                      <p className="text-[10px] text-gray-500 font-sans mt-0.5 leading-relaxed">
                        Synthesize resources cooperatively! Answer Botany &amp; Agronomy trivia cards back-to-back with your guild buddy.
                      </p>
                    </div>
                  </div>

                  {/* Option B: Bible Verse Memory Duels */}
                  <div 
                    onClick={() => {
                      setPlayTogetherMode('bible');
                      setBibleVerseIdx(0);
                      setBiblePhase('view');
                      setBibleViewCount(1);
                      setCoopStep(0);
                    }}
                    className="border-2 border-amber-500 bg-white p-4 rounded-xl cursor-not-allowed hover:bg-neutral-50 transition-all text-left flex items-start gap-3 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-amber-600 text-2xl mt-0.5">military_tech</span>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-amber-700">Memory Verse speed duel ⚔️</h4>
                      <p className="text-[10px] text-gray-500 font-sans mt-0.5 leading-relaxed">
                        Compete on speed and recall! See who memorizes and fills blank gaps first in Calming Scripture memory.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {playTogetherMode === 'study' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-gray-500 font-bold border-b pb-2">
                  <span>CO-OP STUDY: {playTogetherFriend.username} &amp; You</span>
                  <span className="font-semibold text-primary">Topic: botany</span>
                </div>

                {studyPhase === 'learn' && (
                  <div className="space-y-3">
                    <p className="text-xs text-secondary leading-normal">
                      Here is card 1. Both of you take 5 seconds to analyze, then proceed to the joint study quiz!
                    </p>
                    <div className="bg-white p-5 rounded-xl text-center border-2 border-dashed border-primary">
                      <span className="text-[10px] text-primary uppercase font-black block">BOTANY PRINCIPLE</span>
                      <p className="font-serif italic text-sm font-extrabold text-slate-800 mt-2">
                        "What is Phototropism?"
                      </p>
                      <p className="font-sans text-[11px] text-gray-600 mt-1 leading-relaxed">
                        Answer: The growth orientation of plants toward a light source.
                      </p>
                    </div>
                    
                    <div className="bg-primary/5 p-2 rounded-lg text-center font-sans text-[10px] text-primary italic font-semibold">
                      {playTogetherFriend.username} says: "Ah, got it! Let's hit the joint trivia quiz, I will take question 1!"
                    </div>

                    <button 
                      onClick={() => setStudyPhase('quiz')}
                      className="w-full bg-primary text-white py-2 rounded-xl text-xs font-bold font-sans uppercase"
                    >
                      Initialize Joint Quiz
                    </button>
                  </div>
                )}

                {studyPhase === 'quiz' && (
                  <div className="space-y-4 text-center">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                      {coopStep === 0 ? "Buddy's Turn" : "Your Turn!"}
                    </span>

                    {coopStep === 0 ? (
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded-xl border font-serif text-xs text-primary font-bold">
                          "Which organelle handles plant photosynthesis?"
                        </div>
                        <p className="text-xs text-gray-500 font-sans">
                          {playTogetherFriend.username} is evaluating choice...
                        </p>
                        <div className="p-3 bg-green-500/10 text-green-800 text-xs font-sans font-bold uppercase rounded-xl border border-green-500">
                          🎉 {playTogetherFriend.username} chose "Chloroplast" correctly! (+10 Coins to Team!)
                        </div>
                        <button 
                          onClick={() => setCoopStep(1)}
                          className="w-full bg-primary hover:bg-[#2d5a27] text-white py-2 rounded-xl text-xs font-bold font-sans uppercase"
                        >
                          It is my turn now!
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded-xl border font-serif text-xs text-[#263f2a] font-bold">
                          "Which primary hormone triggers cell elongation in plant stems?"
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {['Auxin', 'Ethylene', 'Abscisic Acid', 'Gibberellin'].map(opt => (
                            <button 
                              key={opt}
                              onClick={() => {
                                if (opt === 'Auxin') {
                                  addCoins(10);
                                  addXp(5);
                                  setPlayTogetherMode('done');
                                  triggerAlert("🎉 Excellent! Answered correctly!");
                                } else {
                                  triggerAlert("Incorrect hormone, try choosing Auxin!");
                                }
                              }}
                              className="p-2 bg-white hover:bg-gray-50 text-xs font-bold border rounded-lg text-secondary"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {playTogetherMode === 'bible' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-gray-500 font-bold border-b pb-2">
                  <span>SCRIPTURE SPEED DUEL • Vs {playTogetherFriend.username}</span>
                  <span className="font-semibold text-amber-700">Verse 1</span>
                </div>

                {biblePhase === 'view' && (
                  <div className="space-y-3">
                    <p className="text-xs text-[#72796e] leading-snug">
                      Analyze the speed target scripture. Memorize it as fast as possible to win the speed duel contest!
                    </p>
                    <div className="bg-amber-50 p-4 rounded-xl border text-center font-serif italic text-xs text-slate-800">
                      "{BIBLE_VERSES[bibleVerseIdx].text}"
                    </div>

                    <div className="bg-[#f0f0f0] p-2 rounded text-center text-[10px] font-sans text-stone-600 font-medium">
                      Recall read count: {bibleViewCount}/3 Completed
                    </div>

                    <button 
                      onClick={() => {
                        if (bibleViewCount < 3) {
                          setBibleViewCount(bibleViewCount + 1);
                        } else {
                          setBiblePhase('recall');
                        }
                      }}
                      className="w-full bg-primary hover:bg-[#2d5a27] text-white py-2 rounded-xl text-xs font-bold font-sans uppercase"
                    >
                      Memorize round view
                    </button>
                  </div>
                )}

                {biblePhase === 'recall' && (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500 leading-snug">
                      Your friend completed the blanks in 14.5 seconds! Select the missing core word fast to claim victory!
                    </p>
                    <div className="bg-white p-3 rounded-xl border text-center font-serif text-xs text-slate-800">
                      "The Lord is my _______"
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {['leader', 'shepherd', 'companion'].map(opt => (
                        <button 
                          key={opt}
                          onClick={() => {
                            if (opt === 'shepherd') {
                              addCoins(150);
                              addXp(50);
                              setPlayTogetherMode('done');
                              triggerAlert("🏆 Duel Won! Gained jackpot +150 Coins & 50 XP!");
                            } else {
                              triggerAlert("Not matching scripture, choose shepherd!");
                            }
                          }}
                          className="p-2 text-xs font-sans font-bold bg-white hover:bg-neutral-50 border rounded-lg active:scale-95 text-secondary"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {playTogetherMode === 'done' && (
              <div className="text-center space-y-4 py-3">
                <span className="text-5xl animate-bounce block">🏆</span>
                <h3 className="font-serif text-base font-black text-[#154212]">Guild Session Accomplished!</h3>
                <p className="font-sans text-xs text-secondary leading-relaxed px-4">
                  Amazing joint efforts! You and <strong className="text-primary font-bold">{playTogetherFriend.username}</strong> have secured pristine accolades together.
                </p>

                <div className="bg-[#bcf0ae]/20 p-3.5 rounded-xl border border-primary text-center">
                  <span className="font-sans text-[10.5px] text-[#154212] uppercase tracking-wider font-extrabold block">CREDITS DISTRIBUTED</span>
                  <p className="font-sans text-[12px] text-amber-950 font-bold mt-1">
                    Gained joint multiplier: +150 Coins &amp; +50 XP synced!
                  </p>
                </div>

                <div className="bg-white border rounded-xl p-3 text-center text-[10.5px] text-gray-600 italic">
                  "{playTogetherFriend.username} says: 'You memory is super sharp! Let's build and trade some exotic crops tomorrow!'"
                </div>

                <button 
                  onClick={() => {
                    setPlayTogetherFriend(null);
                    setPlayTogetherMode('select');
                  }}
                  className="w-full bg-primary hover:bg-[#2d5a27] text-white py-2.5 rounded-xl text-xs font-bold font-sans uppercase"
                >
                  Return to Town Square
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: Inbox chat letters parchment screen */}
      {mailboxOpen && selectedMailFriend && (
        <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in text-on-surface">
          <div className="bg-[#fcfaf2] max-w-md w-full rounded-2xl border-4 border-amber-800 p-6 space-y-4 shadow-2xl relative paper-texture">
            
            <button 
              onClick={() => setMailboxOpen(false)}
              className="absolute top-2.5 right-2.5 hover:bg-stone-200/50 text-[#856404] font-black cursor-pointer rounded-full w-7 h-7 flex items-center justify-center transition-transform active:scale-90"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="font-heading text-[9px] text-[#856404] font-black uppercase tracking-widest block">✉️ Parchment Scroll Courier</span>
              <h3 className="font-serif text-base font-black text-[#5e3a10]">Friend Chat Inbox</h3>
            </div>

            {/* Friend Selector Tabs inside custom Chat Scroll */}
            <div className="flex gap-1.5 border-b pb-2 overflow-x-auto">
              {friends.filter(f => f.status !== 'pending').map(fri => (
                <button 
                  key={fri.id}
                  onClick={() => {
                    setSelectedMailFriend(fri);
                    // Mark messages from this friend as read
                    setMailMessages(prev => prev.map(m => m.sender === fri.username ? { ...m, isRead: true } : m));
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    selectedMailFriend.id === fri.id 
                      ? 'bg-amber-800 text-white' 
                      : 'bg-stone-200/50 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {fri.username}
                  {mailMessages.some(m => m.sender === fri.username && !m.isRead) && (
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full inline-block ml-1"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Letters Stream block */}
            <div className="min-h-[220px] max-h-[300px] overflow-y-auto bg-stone-100/50 rounded-xl border border-[#856404]/20 p-3 space-y-3">
              {mailMessages.filter(m => 
                (m.sender === 'You' && m.receiver === selectedMailFriend.username) || 
                (m.sender === selectedMailFriend.username && m.receiver === 'You')
              ).length === 0 ? (
                <p className="text-center text-xs text-gray-400 italic pt-10">
                  No letters exchanged yet. Draft a scroll letter below to begin carriage!
                </p>
              ) : (
                mailMessages.filter(m => 
                  (m.sender === 'You' && m.receiver === selectedMailFriend.username) || 
                  (m.sender === selectedMailFriend.username && m.receiver === 'You')
                ).map(m => {
                  const isUser = m.sender === 'You';
                  return (
                    <div key={m.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center gap-1.5 mb-1">
                        {!isUser && (
                          <div className="w-4 h-4 rounded-full overflow-hidden border border-amber-800">
                            <img className="w-full h-full object-cover" src={selectedMailFriend.avatar} alt="buddy" />
                          </div>
                        )}
                        <span className="font-sans text-[9px] font-extrabold uppercase text-stone-600">{m.sender}</span>
                        <span className="font-sans text-[8px] text-gray-400 font-medium">{m.timestamp}</span>
                      </div>
                      <div className={`p-3 rounded-2xl max-w-[85%] text-xs font-serif leading-relaxed shadow-sm ${
                        isUser 
                          ? 'bg-[#eae3cb] text-slate-900 rounded-tr-none' 
                          : 'bg-white text-slate-800 rounded-tl-none border'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Compose letter section */}
            <div className="space-y-2">
              <textarea 
                rows={2}
                value={newMailInput}
                onChange={(e) => setNewMailInput(e.target.value)}
                placeholder={`Draft a parchment scroll letter to ${selectedMailFriend.username}... (e.g. mention "sunflower", "study" or "bible")`}
                className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-serif focus:outline-none placeholder:text-stone-400 text-on-surface"
              />
              <button 
                onClick={handleSendMail}
                className="w-full bg-[#5e3a10] hover:bg-[#43290b] text-white py-2 rounded-xl text-xs font-bold font-sans uppercase flex items-center justify-center gap-1 shadow-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">send</span>
                Send Carrier Pigeon 🕊️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
