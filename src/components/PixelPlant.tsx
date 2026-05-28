import React from 'react';

interface PixelPlantProps {
  id: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const PixelPlant: React.FC<PixelPlantProps> = ({ id, className = 'w-full h-full', size = 'md' }) => {
  const plantId = id?.toLowerCase().trim() || '';

  // Class sizing helpers if needed
  let sizeClass = className;
  if (!className.includes('w-') && !className.includes('h-')) {
    if (size === 'sm') sizeClass = 'w-6 h-6';
    else if (size === 'md') sizeClass = 'w-10 h-10';
    else if (size === 'lg') sizeClass = 'w-16 h-16';
    else if (size === 'xl') sizeClass = 'w-24 h-24';
  }

  switch (plantId) {
    case 'lettuce':
      return (
        <svg id="plant-lettuce" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outermost clean pixel border */}
          <path d="M22 45 C22 28, 78 28, 78 45 C78 72, 22 72, 22 45 Z" fill="#2d7a43" stroke="#0e3215" strokeWidth="3" />
          {/* Inner primary leaves */}
          <path d="M26 48 C26 34, 74 34, 74 48 C74 68, 26 68, 26 48 Z" fill="#41b461" />
          {/* Ruffled layered outer folds */}
          <path d="M20 45 C16 55, 30 70, 40 68" stroke="#1d5229" strokeWidth="4" strokeLinecap="round" />
          <path d="M80 45 C84 55, 70 70, 60 68" stroke="#1d5229" strokeWidth="4" strokeLinecap="round" />
          {/* Golden/light-green central curly heart */}
          <path d="M38 50 C38 42, 62 42, 62 50 C62 60, 38 60, 38 50 Z" fill="#a4e45c" stroke="#2d7a43" strokeWidth="2.5" />
          {/* Crispy leaf vein details */}
          <path d="M50 40 V64 M34 46 Q50 54, 66 46 M38 56 Q50 62, 62 56" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
        </svg>
      );

    case 'apple':
    case 'apples':
      return (
        <svg id="plant-apple" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Two apples side by side: a Red Apple and a Green Apple on a tiny brown branch */}
          {/* Shared brown branch */}
          <path d="M32 30 Q50 34, 72 32" stroke="#5c3818" strokeWidth="4.5" strokeLinecap="round" />
          
          {/* Red Apple (Left) */}
          {/* Red Apple Body shadow */}
          <circle cx="36" cy="56" r="21" fill="#9e1b1b" stroke="#3d0303" strokeWidth="3.5" />
          {/* Red Apple Flesh color */}
          <circle cx="35" cy="55" r="18" fill="#e74c3c" />
          {/* Red Apple indents */}
          <path d="M30 38 Q35 44, 40 38" fill="none" stroke="#e74c3c" strokeWidth="2" />
          {/* Apple Stem */}
          <path d="M35 38 Q32 44, 35 48" stroke="#5c3818" strokeWidth="3.5" strokeLinecap="round" />
          {/* Green Leaf */}
          <path d="M35 38 Q25 28, 26 38 Z" fill="#2ecc71" stroke="#27ae60" strokeWidth="1.5" />
          {/* Red Apple Glow highlight */}
          <circle cx="28" cy="48" r="3.5" fill="#f5b041" opacity="0.6" />
          <circle cx="28" cy="48" r="1.5" fill="#ffffff" />

          {/* Green Apple (Right - Slightly overlapping) */}
          {/* Green Apple Body shadow */}
          <circle cx="64" cy="59" r="21" fill="#1b5e20" stroke="#0a2a0d" strokeWidth="3.5" />
          {/* Green Apple Flesh */}
          <circle cx="63" cy="58" r="18" fill="#2ecc71" />
          {/* Green Apple Stem */}
          <path d="M63 41 Q66 46, 63 51" stroke="#5c3818" strokeWidth="3.5" strokeLinecap="round" />
          {/* Green Apple Leaf */}
          <path d="M63 41 Q73 34, 70 44 Z" fill="#27ae60" stroke="#1b5e20" strokeWidth="1.5" />
          {/* White Glow highlight */}
          <circle cx="56" cy="51" r="3" fill="#ffffff" opacity="0.75" />
        </svg>
      );

    case 'orange':
      return (
        <svg id="plant-orange" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Orange Body shadow */}
          <circle cx="50" cy="54" r="26" fill="#b25300" stroke="#4c1e00" strokeWidth="4" />
          {/* Orange core color */}
          <circle cx="50" cy="53" r="23" fill="#ff8a00" />
          
          {/* Brown woodsy stem on top */}
          <path d="M50 28 V19" stroke="#5c3818" strokeWidth="4" strokeLinecap="round" />
          {/* Big organic green leaf */}
          <path d="M50 24 C50 12, 72 16, 70 28 C56 32, 50 24, 50 24 Z" fill="#27ae60" stroke="#1b5e20" strokeWidth="2" />
          
          {/* Orange skin dimple textures */}
          <circle cx="38" cy="48" r="1.5" fill="#b25300" />
          <circle cx="62" cy="48" r="1.5" fill="#b25300" />
          <circle cx="48" cy="68" r="1.5" fill="#b25300" />
          <circle cx="58" cy="62" r="1.5" fill="#b25300" />

          {/* Vivid shiny lens highlight */}
          <path d="M38 40 Q40 36, 46 38" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
        </svg>
      );

    case 'banana':
      return (
        <svg id="plant-banana" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stem crown / grip */}
          <path d="M34 22 C34 18, 54 18, 54 22 L46 32 Z" fill="#4d3319" stroke="#1a0d00" strokeWidth="3.5" />

          {/* Banana 1 (Left background) */}
          <path d="M38 28 Q18 42, 22 68 Q28 82, 36 84 C34 76, 32 58, 44 32 Z" fill="#e1b12c" stroke="#1a0d00" strokeWidth="3" strokeLinejoin="round" />
          
          {/* Banana 2 (Center primary) */}
          <path d="M42 28 Q26 48, 38 78 Q48 88, 56 86 C50 74, 44 54, 48 32 Z" fill="#fbc531" stroke="#1a0d00" strokeWidth="3" strokeLinejoin="round" />
          {/* Banana 2 ridge detail */}
          <path d="M36 50 Q42 68, 50 82" stroke="#e1b12c" strokeWidth="2" fill="none" />

          {/* Banana 3 (Right foreground) */}
          <path d="M46 28 Q44 45, 58 70 Q68 80, 75 75 C68 64, 52 48, 50 32 Z" fill="#ffeaa7" stroke="#1a0d00" strokeWidth="3" strokeLinejoin="round" />

          {/* Tips under bananas */}
          <circle cx="34" cy="83" r="3" fill="#4d3319" />
          <circle cx="53" cy="85" r="3" fill="#4d3319" />
          <circle cx="73" cy="74" r="3" fill="#4d3319" />
        </svg>
      );

    case 'berry':
    case 'berries':
      return (
        <svg id="plant-berries" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Red Raspberry / Strawberry (Bottom Left) */}
          {/* Shadow casing */}
          <path d="M22 45 C18 64, 46 84, 46 84 C46 84, 60 64, 56 45 Z" fill="#b31212" stroke="#3a0202" strokeWidth="3" />
          <path d="M25 46 C22 62, 46 80, 46 80 C46 80, 56 62, 53 46 Z" fill="#d63031" />
          {/* Cute seeds/bumps */}
          <circle cx="32" cy="54" r="1.5" fill="#f1c40f" />
          <circle cx="44" cy="58" r="1.5" fill="#f1c40f" />
          <circle cx="38" cy="68" r="1.5" fill="#f1c40f" />
          <circle cx="48" cy="68" r="1.5" fill="#f1c40f" />
          {/* Leaf on red berry */}
          <path d="M32 46 L38 34 L44 46" stroke="#27ae60" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

          {/* Blueberries (Right & Top) */}
          {/* Blueberry 1 (Back right) */}
          <circle cx="68" cy="56" r="18" fill="#1b3a4b" stroke="#081824" strokeWidth="3" />
          <circle cx="66" cy="54" r="15" fill="#2471a3" />
          {/* Crown indents */}
          <circle cx="66" cy="54" r="3.5" fill="#112d42" />
          {/* Blueberry 1 shimmer */}
          <circle cx="58" cy="46" r="2.5" fill="#ffffff" opacity="0.6" />

          {/* Blueberry 2 (Upper left) */}
          <circle cx="48" cy="38" r="14" fill="#1b3a4b" stroke="#081824" strokeWidth="3" />
          <circle cx="46" cy="36" r="11" fill="#1f618d" />
          {/* Crown */}
          <circle cx="46" cy="36" r="2" fill="#112d42" />
          {/* Shimmer */}
          <circle cx="42" cy="30" r="1.5" fill="#ffffff" opacity="0.75" />

          {/* Nice ambient green background leaves */}
          <path d="M68 38 Q82 24, 82 42 Z" fill="#2ecc71" stroke="#27ae60" strokeWidth="1.5" />
        </svg>
      );

    case 'carrot':
      return (
        <svg id="plant-carrot" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Giant majestic leafy green top-right brush */}
          <path d="M54 46 Q70 24, 82 12 C72 26, 62 38, 54 46" stroke="#1b5e20" strokeWidth="8.5" strokeLinecap="round" />
          <path d="M54 46 Q80 34, 88 28 C74 38, 64 42, 54 46" stroke="#2ecc71" strokeWidth="6.5" strokeLinecap="round" />
          <path d="M54 46 Q58 20, 64 8 C58 24, 56 36, 54 46" stroke="#26ae60" strokeWidth="4.5" strokeLinecap="round" />

          {/* Carrot Orange root diagonally downward */}
          {/* Dark border */}
          <path d="M58 42 L18 82 Q12 88, 16 84 L56 40 Z" fill="#c35100" stroke="#4a1500" strokeWidth="4.5" strokeLinejoin="round" />
          {/* Primary Carrot Body */}
          <path d="M54 44 L16 82 C14 84, 18 80, 52 40 Z" fill="#e67e22" />
          {/* Bright highlighted stripe on the side */}
          <path d="M48 42 L22 68" stroke="#ffaa66" strokeWidth="4" strokeLinecap="round" />

          {/* Traditional horizontal root texture rib lines */}
          <path d="M44 54 L38 52" stroke="#c35100" strokeWidth="3" strokeLinecap="round" />
          <path d="M34 64 L28 62" stroke="#c35100" strokeWidth="3" strokeLinecap="round" />
          <path d="M24 74 L20 72" stroke="#c35100" strokeWidth="3" strokeLinecap="round" />

          {/* Soft connection point wrap detail */}
          <path d="M52 42 C50 44, 58 48, 60 44" stroke="#2ecc71" strokeWidth="2.5" />
        </svg>
      );

    case 'corn':
      return (
        <svg id="plant-corn" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Corn core silhouette */}
          <path d="M38 78 C32 60, 52 18, 62 2() C70 28, 68 64, 58 78" /> {/* anchor fallback */}
          
          {/* Outer dark frame of corn body */}
          <path d="M35 74 C26 55, 48 18, 58 18 C68 18, 80 55, 62 74 Z" fill="#d4ac0d" stroke="#5d4037" strokeWidth="3.5" strokeLinejoin="round" />
          {/* Corn golden yellow ear */}
          <path d="M38 70 C30 54, 48 22, 58 22 C68 22, 74 54, 59 70 Z" fill="#f1c40f" />

          {/* Individual corn kernels grid dots */}
          <g fill="#f39c12">
            <circle cx="48" cy="34" r="2.5" />
            <circle cx="56" cy="30" r="2.5" />
            <circle cx="62" cy="36" r="2" />
            
            <circle cx="44" cy="46" r="3" />
            <circle cx="52" cy="44" r="3" />
            <circle cx="60" cy="42" r="3" />
            
            <circle cx="42" cy="56" r="3" />
            <circle cx="50" cy="54" r="3.5" />
            <circle cx="58" cy="54" r="3" />

            <circle cx="44" cy="66" r="3" />
            <circle cx="52" cy="64" r="3" />
            <circle cx="58" cy="64" r="2" />
          </g>

          <g fill="#ffeaa7" opacity="0.8">
            <circle cx="52" cy="34" r="1.5" />
            <circle cx="48" cy="44" r="1.5" />
            <circle cx="54" cy="50" r="2" />
            <circle cx="48" cy="60" r="1.5" />
          </g>

          {/* Green leafy husks framing corn peel-open on left and right */}
          <path d="M24 78 Q22 55, 42 34 C36 48, 32 64, 40 76 Z" fill="#2ecc71" stroke="#1b5e20" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M72 78 Q74 55, 54 30 C60 45, 64 60, 56 76 Z" fill="#27ae60" stroke="#1b5e20" strokeWidth="2.5" strokeLinejoin="round" />

          {/* Cute stalks on bottom */}
          <path d="M48 74 V84" stroke="#5c3818" strokeWidth="5.5" strokeLinecap="round" />
        </svg>
      );

    case 'broccoli':
      return (
        <svg id="plant-broccoli" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Thick sturdy trunk stem */}
          <path d="M44 80 L40 50 L60 50 L56 80 Z" fill="#bcd793" stroke="#5d6e43" strokeWidth="3" strokeLinejoin="round" />
          <path d="M44 80 L40 50 L50 50 L48 80 Z" fill="#a4c278" />

          {/* Fluffy leafy florets grouped together */}
          {/* Background florets */}
          <circle cx="34" cy="42" r="16" fill="#1e5128" stroke="#0e2f14" strokeWidth="3" />
          <circle cx="66" cy="42" r="16" fill="#1e5128" stroke="#0e2f14" strokeWidth="3" />
          {/* Core high-contrast florets */}
          <circle cx="50" cy="32" r="20" fill="#4e9f3d" stroke="#0e2f14" strokeWidth="3" />
          <circle cx="38" cy="34" r="14" fill="#4e9f3d" stroke="#0e2f14" strokeWidth="2.5" />
          <circle cx="62" cy="34" r="14" fill="#4e9f3d" stroke="#0e2f14" strokeWidth="2.5" />

          {/* Bright healthy light green updates */}
          <circle cx="48" cy="26" r="11" fill="#d8ebb5" opacity="0.35" />
          <circle cx="36" cy="30" r="8" fill="#d8ebb5" opacity="0.35" />
          <circle cx="60" cy="30" r="8" fill="#d8ebb5" opacity="0.35" />
        </svg>
      );

    case 'pumpkin':
      return (
        <svg id="plant-pumpkin" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stout curved brown top stem */}
          <path d="M50 36 Q42 22, 52 18" fill="none" stroke="#5c3818" strokeWidth="6" strokeLinecap="round" />
          <path d="M50 34 Q54 28, 54 22" fill="none" stroke="#7d5024" strokeWidth="2" strokeLinecap="round" />

          {/* Big heavy Pumpkin body (layered ribs) */}
          {/* Outer circle frame */}
          <ellipse cx="50" cy="60" rx="42" ry="28" fill="#c35100" stroke="#3d1500" strokeWidth="4.5" />
          
          {/* Intermediate concentric curves */}
          <ellipse cx="50" cy="60" rx="34" ry="28" fill="#e67e22" stroke="#3d1500" strokeWidth="3" />
          <ellipse cx="50" cy="60" rx="24" ry="28" fill="#ff9f43" stroke="#3d1500" strokeWidth="2.5" />
          <ellipse cx="50" cy="60" rx="12" ry="28" fill="#ffb8b8" stroke="#3d1500" strokeWidth="2" />
          <ellipse cx="50" cy="60" rx="11" ry="27.5" fill="#fbc531" />

          {/* Shading/texture details */}
          <path d="M20 54 Q34 78, 50 82" stroke="#c35100" strokeWidth="2" fill="none" />
          <path d="M80 54 Q66 78, 50 82" stroke="#c35100" strokeWidth="2" fill="none" />
        </svg>
      );

    case 'tomato':
      return (
        <svg id="plant-tomato" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Round tomato shadow */}
          <circle cx="50" cy="56" r="28" fill="#b31212" stroke="#4a0404" strokeWidth="4" />
          {/* Primary red color */}
          <circle cx="50" cy="55" r="25" fill="#e74c3c" />
          
          {/* High-quality glossy white light crescent */}
          <path d="M34 42 Q38 36, 46 38" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
          <circle cx="34" cy="42" r="1.5" fill="#ffffff" />

          {/* Star-shaped green crown on top */}
          <path d="M50 24 L50 34 M34 32 L46 30 M66 32 L54 30 M40 24 L48 28 M60 24 L52 28" stroke="#27ae60" strokeWidth="4.5" strokeLinecap="round" />
          {/* Center core */}
          <circle cx="50" cy="28" r="4.5" fill="#2ecc71" stroke="#1b5e20" strokeWidth="1.5" />
        </svg>
      );

    case 'cherry':
      return (
        <svg id="plant-cherry" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Double cherry linked by green stalks */}
          {/* Stem anchor point on top-left */}
          <path d="M48 18 Q52 14, 56 16" stroke="#27ae60" strokeWidth="4" strokeLinecap="round" />
          {/* Green leaf */}
          <path d="M54 16 Q72 12, 64 24 Z" fill="#2ecc71" stroke="#1b5e20" strokeWidth="1.5" />

          {/* Left stalk */}
          <path d="M50 16 Q36 34, 30 52" stroke="#27ae60" strokeWidth="3" strokeLinecap="round" />
          {/* Right stalk */}
          <path d="M50 16 Q60 38, 70 52" stroke="#27ae60" strokeWidth="3" strokeLinecap="round" />

          {/* Left Cherry */}
          <circle cx="28" cy="58" r="18" fill="#780820" stroke="#2c0005" strokeWidth="3" />
          <circle cx="27" cy="57" r="15" fill="#c0392b" />
          {/* Gloss */}
          <path d="M19 51 Q21 47, 25 49" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />

          {/* Right Cherry */}
          <circle cx="70" cy="58" r="18" fill="#780820" stroke="#2c0005" strokeWidth="3" />
          <circle cx="69" cy="57" r="15" fill="#d63031" />
          {/* Gloss */}
          <path d="M61 51 Q63 47, 67 49" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
        </svg>
      );

    case 'pineapple':
      return (
        <svg id="plant-pineapple" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Spiky green top crown */}
          {/* Backdrop spikes */}
          <path d="M42 36 L50 8 L58 36" fill="#1b5e20" stroke="#0a2a0d" strokeWidth="3" strokeLinejoin="round" />
          <path d="M30 40 L44 14 L48 40" fill="#27ae60" stroke="#1b5e20" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M70 40 L56 14 L52 40" fill="#27ae60" stroke="#1b5e20" strokeWidth="2.5" strokeLinejoin="round" />
          
          {/* Pineapple Body */}
          <rect x="26" y="38" width="48" height="48" rx="24" fill="#e67e22" stroke="#4a1500" strokeWidth="4.5" />
          <rect x="29" y="41" width="42" height="42" rx="21" fill="#f1c40f" />

          {/* Cross hatch spike textures representing armor scales */}
          <path d="M34 46 L66 78 M32 58 L58 84 M42 38 L68 64" stroke="#d35400" strokeWidth="2.5" />
          <path d="M66 46 L34 78 M68 58 L42 84 M58 38 L32 64" stroke="#d35400" strokeWidth="2.5" />

          {/* Scale center spikes dots */}
          <g fill="#e67e22">
            <circle cx="42" cy="52" r="2" />
            <circle cx="58" cy="52" r="2" />
            <circle cx="50" cy="62" r="2.5" />
            <circle cx="42" cy="72" r="2" />
            <circle cx="58" cy="72" r="2" />
          </g>
        </svg>
      );

    case 'lavender':
      return (
        <svg id="plant-lavender" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Nice healthy green base leaves */}
          <path d="M26 82 Q50 64, 46 84 M74 82 Q50 64, 54 84" stroke="#27ae60" strokeWidth="5.5" strokeLinecap="round" />
          
          {/* Central main stem */}
          <path d="M50 82 V22" stroke="#218c53" strokeWidth="4" strokeLinecap="round" />

          {/* Lavender blossom clusters stacking vertically up the stem */}
          {/* Cluster Row 1 bottom */}
          <circle cx="44" cy="62" r="6" fill="#a55eea" />
          <circle cx="56" cy="62" r="6" fill="#a55eea" />
          <circle cx="50" cy="58" r="4.5" fill="#d1d8e0" />

          {/* Cluster Row 2 middle */}
          <circle cx="42" cy="48" r="6.5" fill="#8854d0" />
          <circle cx="58" cy="48" r="6.5" fill="#8854d0" />
          <circle cx="50" cy="44" r="5" fill="#f5f6fa" />

          {/* Cluster Row 3 upper */}
          <circle cx="44" cy="34" r="6" fill="#9b59b6" />
          <circle cx="56" cy="34" r="6" fill="#9b59b6" />
          <circle cx="50" cy="30" r="4" fill="#a55eea" />

          {/* Tip single blossom */}
          <circle cx="50" cy="20" r="5.5" fill="#8854d0" />
          <circle cx="50" cy="20" r="2" fill="#fff" />
        </svg>
      );

    // --- RARE PLANTS ---
    case 'lychee':
      return (
        <svg id="plant-lychee" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Lychee 1: Closed in rough pink/red shell (Left) */}
          <circle cx="34" cy="58" r="20" fill="#a01934" stroke="#42030d" strokeWidth="3" />
          <circle cx="32" cy="56" r="17" fill="#d63031" />
          {/* Rough scale texturing marks */}
          <path d="M22 52 Q26 50, 24 58 M36 44 Q38 48, 42 46 M30 68 Q34 70, 32 74" stroke="#780820" strokeWidth="2.5" strokeLinecap="round" />

          {/* Lychee 2: Peeled showing pure translucent white pulp (Right) */}
          {/* Outer red shell backing/half */}
          <circle cx="68" cy="58" r="20" fill="#a01934" stroke="#42030d" strokeWidth="3" />
          {/* Snowy jelly white inside pulp */}
          <circle cx="66" cy="56" r="15" fill="#f5f6fa" />
          <ellipse cx="64" cy="54" r="11" fill="#ffffff" />
          {/* Glistening juice spot */}
          <circle cx="58" cy="48" r="2.5" fill="#30a2ff" opacity="0.3" />

          {/* Leaf / branch bundle on top */}
          <path d="M50 38 Q32 20, 48 24 C54 28, 50 38, 50 38 Z" fill="#2ecc71" stroke="#1b5e20" strokeWidth="1.5" />
          <path d="M50 38 Q68 20, 52 24 C46 28, 50 38, 50 38 Z" fill="#27ae60" stroke="#1b5e20" strokeWidth="1.5" />
        </svg>
      );

    case 'peach':
      return (
        <svg id="plant-peach" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base peach juicy shadow */}
          <path d="M50 82 C22 82, 18 50, 42 34 C46 32, 54 32, 58 34 C82 50, 78 82, 50 82 Z" fill="#d35400" stroke="#4a1c02" strokeWidth="3.5" />
          {/* Primary body color gradients */}
          <path d="M50 80 C26 80, 22 52, 44 36 C46 34, 54 34, 56 36 C78 52, 74 80, 50 80 Z" fill="#ff7979" />
          
          {/* Golden sweet base cheek reflection */}
          <path d="M50 80 Q70 76, 68 58 Q60 52, 50 80" fill="#fbc531" opacity="0.85" />

          {/* Seductive distinct central peach cleft/crease */}
          <path d="M50 34 Q46 56, 50 78" stroke="#780820" strokeWidth="3" strokeLinecap="round" />

          {/* Sweet leaf on stem */}
          <path d="M50 34 Q54 20, 68 24 Z" fill="#2ecc71" stroke="#1b5e20" strokeWidth="1.5" />
          <circle cx="36" cy="48" r="3.5" fill="#ffffff" opacity="0.65" />
        </svg>
      );

    case 'watermelon':
      return (
        <svg id="plant-watermelon" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Giant round green watermelon behind */}
          <circle cx="44" cy="46" r="28" fill="#1b5e20" stroke="#0a2a0d" strokeWidth="3.5" />
          
          {/* Characteristic dark stripes curving around melon */}
          <path d="M30 24 Q44 46, 30 68" stroke="#0a2a0d" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M44 18 Q54 46, 44 74" stroke="#0a2a0d" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M58 24 Q64 46, 58 68" stroke="#0a2a0d" strokeWidth="4.5" fill="none" strokeLinecap="round" />

          {/* Wedge melon slice in front */}
          {/* Dark Green rind slice */}
          <path d="M26 62 Q56 82, 86 62 Z" fill="#27ae60" stroke="#0a2a0d" strokeWidth="3" />
          {/* White inner rim layer */}
          <path d="M29 61 Q56 78, 83 61 Z" fill="#f5f6fa" />
          {/* Delicious red sweet flesh */}
          <path d="M32 59 Q56 74, 80 59 Z" fill="#e74c3c" />

          {/* Miniature black watermelon seeds */}
          <circle cx="44" cy="62" r="1.5" fill="#2c3e50" />
          <circle cx="52" cy="65" r="1.5" fill="#2c3e50" />
          <circle cx="60" cy="64" r="1.5" fill="#2c3e50" />
          <circle cx="68" cy="61" r="1.5" fill="#2c3e50" />
        </svg>
      );

    case 'pear':
      return (
        <svg id="plant-pear" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glowing blue back aura */}
          <circle cx="50" cy="55" r="34" fill="#30a2ff" opacity="0.2" filter="blur(2px)" />

          {/* Bell shaped pear body */}
          <path d="M50 26 C40 26, 38 42, 28 52 C18 62, 22 84, 50 84 C78 84, 82 62, 72 52 C62 42, 60 26, 50 26 Z" fill="#81c784" stroke="#1b5e20" strokeWidth="4" strokeLinejoin="round" />
          
          {/* Highlight juicy interior block */}
          <path d="M50 29 C44 29, 41 42, 32 52 C24 62, 28 81, 50 81 Z" fill="#a4f4ad" opacity="0.9" />

          {/* Long curved brown stem and leaf */}
          <path d="M50 26 Q46 14, 54 10" stroke="#5c3818" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M52 14 Q68 12, 62 22 Z" fill="#2ecc71" stroke="#1b5e20" strokeWidth="1.5" />

          {/* Delicate glistening spot */}
          <circle cx="36" cy="64" r="3" fill="#ffffff" opacity="0.8" />
        </svg>
      );

    case 'dragonfruit':
    case 'dragon fruit':
      return (
        <svg id="plant-dragon" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Striking oval neon pink core bud */}
          <rect x="26" y="32" width="48" height="54" rx="24" fill="#d81b60" stroke="#4a001f" strokeWidth="4" />
          
          {/* Overlapping layered retro green scale petals curving upwards */}
          {/* Row 1 bottom scales */}
          <path d="M34 76 Q42 66, 42 78" stroke="#2ecc71" strokeWidth="3" fill="#27ae60" strokeLinecap="round" />
          <path d="M66 76 Q58 66, 58 78" stroke="#2ecc71" strokeWidth="3" fill="#27ae60" strokeLinecap="round" />

          {/* Row 2 mid scales */}
          <path d="M26 56 Q36 44, 34 58" stroke="#2ecc71" strokeWidth="3.5" fill="#2ecc71" />
          <path d="M74 56 Q64 44, 66 58" stroke="#2ecc71" strokeWidth="3.5" fill="#2ecc71" />
          <path d="M50 62 Q50 48, 50 66" stroke="#2ecc71" strokeWidth="3.5" fill="#2ecc71" />

          {/* Row 3 top crest crown */}
          <path d="M42 32 Q50 14, 50 30" stroke="#2ecc71" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M58 32 Q50 14, 50 30" stroke="#218c53" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          
          {/* Gloss shimmer */}
          <circle cx="38" cy="46" r="3.5" fill="#ffb8d2" />
        </svg>
      );

    case 'peppers':
      return (
        <svg id="plant-peppers" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Two peppers: a Red curved Chili Pepper (Left) and a Green Bell Pepper (Right) */}
          
          {/* Left: Red Chili Pepper */}
          <path d="M44 34 Q34 32, 36 38 C38 44, 20 62, 18 72 C16 80, 24 82, 28 80 C36 78, 48 56, 46 42 Q45 35, 44 34 Z" fill="#e74c3c" stroke="#4a0707" strokeWidth="3" strokeLinejoin="round" />
          <path d="M36 34 L38 24" stroke="#27ae60" strokeWidth="3.5" strokeLinecap="round" />
          {/* Glisten on red pepper */}
          <path d="M38 44 Q32 52, 26 62" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.65" />

          {/* Right: Round Green Bell Pepper */}
          <rect x="52" y="44" width="34" height="34" rx="10" fill="#27ae60" stroke="#0d3a18" strokeWidth="3" />
          {/* Stem on green pepper */}
          <path d="M69 44 Q72 32, 66 32" stroke="#1b5e20" strokeWidth="4.5" strokeLinecap="round" />
          {/* Lobes rib details */}
          <path d="M63 46 Q64 62, 63 76" stroke="#1b5e20" strokeWidth="2.5" fill="none" />
          <circle cx="61" cy="54" r="2.5" fill="#ffffff" opacity="0.75" />
        </svg>
      );

    case 'mushroom':
      return (
        <svg id="plant-mushroom" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Fat sturdy organic white stem */}
          <path d="M42 55 H58 L55 86 H45 Z" fill="#eae3d2" stroke="#5d4c37" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M42 55 H50 V86 H45 Z" fill="#dcd1b4" />

          {/* Giant majestic broad brown cap on top */}
          <path d="M16 54 C16 24, 84 24, 84 54 H16 Z" fill="#8e5a32" stroke="#3d210a" strokeWidth="4" strokeLinejoin="round" />
          
          {/* Cute cap spots */}
          <ellipse cx="32" cy="38" rx="6" ry="4.5" fill="#dfc09c" />
          <ellipse cx="68" cy="38" rx="6.5" ry="5.5" fill="#dfc09c" />
          <ellipse cx="50" cy="30" rx="4.5" ry="3.5" fill="#dfc09c" />
          <ellipse cx="50" cy="46" rx="5" ry="3" fill="#dfc09c" />
        </svg>
      );

    case 'coconut':
      return (
        <svg id="plant-coconut" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Perfect textured deep brown sphere */}
          <circle cx="50" cy="54" r="26" fill="#5c3818" stroke="#251202" strokeWidth="4" />
          
          {/* Shading ring */}
          <path d="M26 48 C26 72, 74 72, 74 48" fill="none" stroke="#251202" strokeWidth="3" opacity="0.3" />

          {/* Three characteristic neat circular white/black indents near top */}
          <circle cx="42" cy="38" r="4.5" fill="#251202" />
          <circle cx="42" cy="38" r="2" fill="#000000" />

          <circle cx="58" cy="38" r="4.5" fill="#251202" />
          <circle cx="58" cy="38" r="2" fill="#000000" />

          <circle cx="50" cy="48" r="4.5" fill="#251202" />
          <circle cx="50" cy="48" r="2" fill="#000000" />

          {/* Fibrous hair sketch streaks on shell */}
          <line x1="28" y1="56" x2="34" y2="62" stroke="#3d210a" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="72" y1="56" x2="66" y2="62" stroke="#3d210a" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    // --- LEGENDARY PLANTS ---
    case 'oak':
      return (
        <svg id="plant-oak" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Golden glowing border box representing high legendary rarity status */}
          <rect x="6" y="6" width="88" height="88" rx="16" fill="#0a1d13" stroke="#ffd700" strokeWidth="3.5" />
          
          {/* Magical green particle swirls in background */}
          <circle cx="28" cy="36" r="3" fill="#2ecc71" opacity="0.5" />
          <circle cx="72" cy="62" r="4" fill="#a4e45c" opacity="0.5" />

          {/* Ancient gnarled brown oak trunk */}
          <path d="M42 82 L42 56 Q36 48, 30 52 M58 82 L58 56 Q64 48, 70 52 M42 56 H58 Z" stroke="#3d210a" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M46 82 V58 H54 V82 Z" fill="#5a3818" />

          {/* Robust thick bushy rich green leafy canopy canopy layers */}
          {/* Base shadow foliage */}
          <circle cx="34" cy="38" r="16" fill="#1b5e20" />
          <circle cx="66" cy="38" r="16" fill="#1b5e20" />
          <circle cx="50" cy="28" r="21" fill="#114015" />
          <circle cx="50" cy="48" r="15" fill="#1b5e20" />

          {/* Foreground highlighted foliage */}
          <circle cx="34" cy="38" r="13" fill="#2ecc71" />
          <circle cx="66" cy="38" r="13" fill="#2ecc71" />
          <circle cx="50" cy="28" r="17" fill="#a4e45c" />
          <circle cx="50" cy="44" r="12" fill="#2ecc71" />

          {/* Little golden acorn accessory sitting on the bottom side */}
          <ellipse cx="74" cy="74" rx="4.5" ry="6" fill="#f1c40f" stroke="#9a7d0a" strokeWidth="1.5" />
          <path d="M70 70 Q74 66, 78 70" stroke="#5c3818" strokeWidth="3.5" fill="none" />
        </svg>
      );

    case 'mango':
      return (
        <svg id="plant-mango" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Golden frame */}
          <rect x="6" y="6" width="88" height="88" rx="16" fill="#2e1b00" stroke="#ffae00" strokeWidth="3.5" />

          {/* Celestial background glows */}
          <circle cx="50" cy="50" r="32" fill="#ffd57c" opacity="0.15" />

          {/* Glistening mango body (curved asymmetrical shape) */}
          <path d="M48 24 C34 24, 24 38, 24 54 C24 74, 40 84, 52 84 C68 84, 76 70, 76 50 C76 34, 62 24, 48 24 Z" fill="#e67e22" stroke="#4a1500" strokeWidth="4" strokeLinejoin="round" />
          {/* Half sunrise red-orange blush */}
          <path d="M48 24 C34 24, 24 38, 24 54 C24 74, 38 82, 44 82 Z" fill="#d35400" />
          {/* Half glorious bright yellow flesh reflection */}
          <path d="M52 84 C68 84, 76 70, 76 50 C76 34, 64 26, 52 26 Z" fill="#f1c40f" />

          {/* Dynamic bright sparkles twinkling */}
          <polygon points="18,22 21,28 27,29 22,34 23,40 18,36 13,40 14,34 9,29 15,28" fill="#ffd700" />
          <polygon points="80,58 82,62 86,63 83,66 84,70 80,68 76,70 77,66 74,63 78,62" fill="#ffd700" />

          {/* Sweet single green leaf on stem */}
          <path d="M48 24 Q44 14, 34 16" stroke="#5c3818" strokeWidth="3" />
          <path d="M38 15 Q30 8, 24 16 Z" fill="#2ecc71" stroke="#1b5e20" strokeWidth="1.5" />
        </svg>
      );

    case 'grapes':
      return (
        <svg id="plant-grapes" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Golden legendary frame */}
          <rect x="6" y="6" width="88" height="88" rx="16" fill="#1b002c" stroke="#9327e2" strokeWidth="3.5" />

          {/* Ambient swirling magical violet mist backdrops */}
          <path d="M18 48 Q50 20, 82 48 C82 76, 18 76, 18 48 Z" fill="none" stroke="#d580ff" strokeWidth="2.5" strokeDasharray="5 5" opacity="0.6" />

          {/* Main stem */}
          <path d="M50 32 V21 Q44 16, 42 21" stroke="#27ae60" strokeWidth="4.5" strokeLinecap="round" />
          {/* Small curly leaf */}
          <path d="M50 28 Q64 18, 58 34 Z" fill="#2ecc71" stroke="#1b5e20" strokeWidth="1.5" />

          {/* Layered clusters of royal purple Muscat Grapes (V-shape grouping) */}
          {/* Row 1 top */}
          <circle cx="38" cy="40" r="9" fill="#4a154b" stroke="#1e0022" strokeWidth="2.5" />
          <circle cx="36" cy="38" r="7.5" fill="#8854d0" />
          
          <circle cx="50" cy="40" r="10" fill="#4a154b" stroke="#1e0022" strokeWidth="2.5" />
          <circle cx="48" cy="38" r="8.5" fill="#a55eea" />

          <circle cx="62" cy="40" r="9" fill="#4a154b" stroke="#1e0022" strokeWidth="2.5" />
          <circle cx="60" cy="38" r="7.5" fill="#8854d0" />

          {/* Row 2 middle */}
          <circle cx="44" cy="52" r="10" fill="#4a154b" stroke="#1e0022" strokeWidth="2.5" />
          <circle cx="42" cy="50" r="8.5" fill="#a55eea" />

          <circle cx="56" cy="52" r="10" fill="#4a154b" stroke="#1e0022" strokeWidth="2.5" />
          <circle cx="54" cy="50" r="8.5" fill="#d1d8e0" />

          {/* Row 3 lower */}
          <circle cx="50" cy="64" r="9.5" fill="#4a154b" stroke="#1e0022" strokeWidth="2.5" />
          <circle cx="48" cy="62" r="8" fill="#8854d0" />

          {/* Tip single bottom grape */}
          <circle cx="50" cy="74" r="8.5" fill="#4a154b" stroke="#1e0022" strokeWidth="2.5" />
          <circle cx="48" cy="72" r="7" fill="#a55eea" />

          {/* Glistening stars on muscat grapes */}
          <circle cx="32" cy="34" r="1.5" fill="#fff" />
          <circle cx="44" cy="46" r="1.5" fill="#fff" />
          <circle cx="45" cy="58" r="1.5" fill="#fff" />
        </svg>
      );

    case 'starfruit':
    case 'star fruit':
      return (
        <svg id="plant-starfruit" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Deep celestial infinite space border box */}
          <rect x="6" y="6" width="88" height="88" rx="16" fill="#080d26" stroke="#24a0ff" strokeWidth="3.5" />
          
          {/* Sparkling constellation lines backing */}
          <line x1="16" y1="16" x2="84" y2="84" stroke="#ffea00" strokeWidth="1" strokeDasharray="2 4" opacity="0.3" />
          <line x1="84" y1="16" x2="16" y2="84" stroke="#ffea00" strokeWidth="1" strokeDasharray="2 4" opacity="0.3" />

          {/* Sparkling cosmic backdrop ring */}
          <circle cx="50" cy="50" r="30" fill="none" stroke="#24a0ff" strokeWidth="2.5" opacity="0.5" />

          {/* Large star pentagram slice glowing with astronomical value (Celestial Star Fruit) */}
          {/* Shadow thick back border */}
          <path d="M50 16 L61 38 L84 38 L66 54 L72 78 L50 64 L28 78 L34 54 L16 38 L39 38 Z" fill="#1b4f72" stroke="#001833" strokeWidth="4.5" strokeLinejoin="round" />
          
          {/* Golden-Yellow core Star body */}
          <path d="M50 18 L60 39 L82 39 L64 54 L71 76 L50 63 L29 76 L36 54 L18 39 L40 39 Z" fill="#ffd700" />
          
          {/* Inner sparkling glowing cyan core */}
          <path d="M50 28 L55 42 L69 42 L58 51 L62 65 L50 56 L38 65 L42 51 L31 42 L45 42 Z" fill="#24d7ff" />
          <path d="M50 34 L52 44 L62 44 L54 50 L56 60 L50 54 L44 60 L46 50 L38 44 L48 44 Z" fill="#ffffff" />

          {/* Twinkly celestial sparkles at the five points */}
          <circle cx="50" cy="14" r="2.5" fill="#ffffff" className="animate-ping" />
          <circle cx="86" cy="38" r="2" fill="#24d7ff" />
          <circle cx="74" cy="80" r="2.5" fill="#ffd700" />
          <circle cx="26" cy="80" r="2" fill="#24d7ff" />
          <circle cx="14" cy="38" r="2.5" fill="#ffd700" />
        </svg>
      );

    case 'sunflower':
    default:
      // Standard iconic bright sunflower matching style
      return (
        <svg id="plant-sunflower" className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stem on bottom */}
          <path d="M50 68 V86" stroke="#218c53" strokeWidth="6" strokeLinecap="round" />
          <path d="M50 74 Q32 68, 38 66" stroke="#2ecc71" strokeWidth="3.5" strokeLinecap="round" />

          {/* Beautiful golden radiant petals surrounding central core */}
          <g fill="#ffd700" stroke="#b7950b" strokeWidth="1.5" strokeLinejoin="round">
            {/* Horizontal and Vertical Petals */}
            <path d="M50 50 Q50 14, 50 16" stroke="#d5b00c" strokeWidth="6.5" strokeLinecap="round" />
            <path d="M50 50 Q50 86, 50 84" stroke="#d5b00c" strokeWidth="6.5" strokeLinecap="round" />
            <path d="M50 50 Q14 50, 16 50" stroke="#d5b00c" strokeWidth="6.5" strokeLinecap="round" />
            <path d="M50 50 Q86 50, 84 50" stroke="#d5b00c" strokeWidth="6.5" strokeLinecap="round" />
            
            {/* Diagonal Petals */}
            <path d="M48 48 Q22 22, 24 24" stroke="#d5b00c" strokeWidth="6" strokeLinecap="round" />
            <path d="M52 52 Q78 78, 76 76" stroke="#d5b00c" strokeWidth="6" strokeLinecap="round" />
            <path d="M48 52 Q22 78, 24 76" stroke="#d5b00c" strokeWidth="6" strokeLinecap="round" />
            <path d="M52 48 Q78 22, 76 24" stroke="#d5b00c" strokeWidth="6" strokeLinecap="round" />
          </g>

          {/* Giant brown central textured seed head */}
          <circle cx="50" cy="50" r="17" fill="#5c3818" stroke="#3d210a" strokeWidth="3" />
          <circle cx="50" cy="50" r="12" fill="#3d210a" />
          
          {/* Golden seeds details */}
          <circle cx="45" cy="46" r="1.5" fill="#f1c40f" />
          <circle cx="54" cy="45" r="1" fill="#f1c40f" />
          <circle cx="46" cy="54" r="1.2" fill="#f1c40f" />
          <circle cx="54" cy="52" r="1.5" fill="#f1c40f" />
        </svg>
      );
  }
};
