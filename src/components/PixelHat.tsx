import React from 'react';

interface PixelHatProps {
  id: string;
  className?: string;
}

export const PALETTE: Record<string, string> = {
  '.': 'transparent',
  'x': '#1c120c', // dark sprite outline
  'w': '#ebdcb5', // straw light
  's': '#caab7a', // straw shadow
  'b': '#3498db', // blue primary
  'd': '#1b4f72', // blue shadow
  'r': '#e74c3c', // red primary
  'h': '#78281f', // red shadow
  'g': '#2ecc71', // green primary
  'l': '#27ae60', // green shadow
  'k': '#2f3640', // dark grey / charcoal
  'f': '#ffffff', // white / fluff
  'y': '#f1c40f', // gold
  'o': '#e67e22', // orange
  't': '#cd853f', // vintage brown bear / leather
  'u': '#a0522d', // dark brown
  'p': '#ff4757', // pink / rose
  'v': '#5f27cd', // purple
  'm': '#8e44ad', // deep purple shadow
  'e': '#e3f2fd', // glass / cyan
};

export const HAT_GRIDS: Record<string, string[]> = {
  'bucket hat': [
    "................",
    "....xxxxxx......",
    "...xbbbbbbx.....",
    "..xbbbbbbbbx....",
    "..xdbddddbdx....",
    "xxxxxxxxxxxxxx..",
    "xbbbbbbbbbbbbdx.",
    "xxxxxxxxxxxxxx..",
    "................"
  ],
  'classic cap': [
    "................",
    ".....xxxxx......",
    "....xfffffxx....",
    "...xffffffffx...",
    "...xffgffffffx..",
    "...xfffffxxxx...",
    "xxxxxxxxxxxxx...",
    "................"
  ],
  'pirate hat': [
    "................",
    "....xxxxxxxxx...",
    "...xkkkxxxxxxxx.",
    "..xkkkkkkkkkkkkx",
    "..xkkkkffkkkkkkx",
    "..xkkkfxfkkkkkkx",
    "xxxxxxxxxxxxxxxx",
    "...xxxxrrrrxxx..",
    ".......xxxxx....",
    "................"
  ],
  'bowler hat': [
    "................",
    ".....xxxxx......",
    "....xkkkkkxx....",
    "...xkkkkkkkkx...",
    "...xkkkkkkkkx...",
    "...xggggggggx...",
    "..xxxxxxxxxxxd..",
    "..xkkkkkkkkkkxd.",
    "...xxxxxxxxxx...",
    "................"
  ],
  'santa hat': [
    "................",
    ".......xxxx.....",
    "......xrrryy....",
    ".....xrrrrryy...",
    "....xrrrrrxx....",
    "...xrrrrrxx.....",
    "..xffffffffx....",
    "..xffffffffx....",
    "...xxxxxxxx.....",
    "................"
  ],
  'flower wreath': [
    "................",
    "....g..g..g.....",
    "...gpxgpxgpxg...",
    "..g.y.g.y.g.p.g.",
    "..g...g...g...g.",
    "................"
  ],
  'witch hat': [
    ".......xx.......",
    "......xvvx......",
    "......xvvx......",
    ".....xvvvvx.....",
    ".....xvvvvx.....",
    "....xvvvvvvmx...",
    "....xyyyyyyyx...",
    "xxxxxxxxxxxxxxxx",
    "vvvvvvvvvvvvvvvx",
    "xxxxxxxxxxxxxxxx",
    "................"
  ],
  'party hat': [
    ".......yy.......",
    "......xxxx......",
    ".....xvvvvx.....",
    "....xooovvox....",
    "....xrrorrox....",
    "...xvvvvvrrx....",
    "..xxxxxxxxxx....",
    "................"
  ],
  'leprechaun hat': [
    ".....xxxxxx.....",
    "....xggggggxx...",
    "....xgggggglxx..",
    "....xgggggglxx..",
    "....xkkkkkkkxx..",
    "....xkkkykkkxx..",
    "..xxxxxxxxxxxxx.",
    "..xgggggggggglx.",
    "...xxxxxxxxxx...",
    "................"
  ],
  'construction hardhat': [
    "................",
    ".....xxxxxx.....",
    "....xoooooox....",
    "...xoooooooox...",
    "...xoooooooox...",
    "xxxxxxxxxxxxxx..",
    "xoooooooooooodx.",
    "xxxxxxxxxxxxxx..",
    "................"
  ],
  'royal crown': [
    "...xx..xx..xx...",
    "...xyxxxyxxxy...",
    "..xyyyyyyyyyy...",
    "..xyrxybxygxy...",
    "..xyyyyyyyyyy...",
    "..xxxxxxxxxx....",
    "................"
  ],
  'sprout clip': [
    ".....g....g.....",
    "....ggxl.gg.....",
    ".....ggg.g......",
    "......ggg.......",
    "......xx........",
    ".....xxxx.......",
    "................"
  ],
  'bear ears headband': [
    "..xxxx....xxxx..",
    ".xttttx..xttttx.",
    ".xtfxtx..xtfxtx.",
    "..xxx......xxx..",
    "....xxxxxxxx....",
    "................"
  ],
  'chef hat': [
    ".....xxxxxx.....",
    "....xffffffx....",
    "....xffffffx....",
    "...xffffffffx...",
    "...xffffffffx...",
    "....xffffffx....",
    "....xffffffx....",
    "....xxyyxxxf....",
    "....xxxxxx......",
    "................"
  ],
  'knitted beanie': [
    ".......yy.......",
    ".....xxxxxx.....",
    "....xbbbbbbx....",
    "...xbbdbdbdbx...",
    "...xdbdbdbdbdx..",
    "..xxxxxxxxxxxx..",
    "..xbbbbbbbbbbdx.",
    "...xxxxxxxxxx...",
    "................"
  ],
  'chic glasses': [
    "................",
    "..xxxxxxxxxxxx..",
    "..xtteexxeeettx..",
    "..xtteexxeeettx..",
    "...xxxxxxxxxx...",
    "................"
  ],
  'elegant headband': [
    "......xxxxx.....",
    "....xxkkkkkxx...",
    "...xkkkkkkkkk...",
    "...xkxxxxxxxk...",
    "................"
  ],
  'conical straw hat': [
    ".......xx.......",
    "......xwwx......",
    ".....xwwwwx.....",
    "....xwwswwwx....",
    "...xwwswwwswx...",
    "..xwwswwwswwsx..",
    ".xxxxxxxxxxxxxx.",
    "................"
  ],
  'classic sun hat': [
    "................",
    ".....xxxxxx.....",
    "....xwwwwwwx....",
    "....xwwwwwwx....",
    "....xoooooox....",
    "xxxxxxxxxxxxxx..",
    "xwwwwwwwwwwwwx..",
    "xxxxxxxxxxxxxx..",
    "................"
  ],
  'floppy straw hat': [
    "................",
    ".....xxxxxx.....",
    "....xwwwwwwx....",
    "....xwwwwwwx....",
    "....xwwwwwwx....",
    "xxxxxxxxxxxxxxxx",
    "xwwswwswswwswwxx",
    ".xxxxxxxxxxxxxx.",
    "................"
  ]
};

export const PixelHat: React.FC<PixelHatProps> = ({ id, className = 'w-full h-full' }) => {
  const hatIdClean = id?.toLowerCase().trim().replace(/_/g, ' ') || '';
  const grid = HAT_GRIDS[hatIdClean];

  if (!grid) {
    // Fallback cute standard seed bundle silhouette
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}>
        <circle cx="8" cy="8" r="6" fill="#bcf0ae" stroke="#1c120c" strokeWidth="1.5" />
        <path d="M8 4 L5 8 H11 Z M8 8 V13" stroke="#1c120c" strokeWidth="1.5" />
      </svg>
    );
  }

  const height = grid.length;
  const width = grid[0]?.length || 16;

  return (
    <svg 
      className={className} 
      viewBox={`0 0 ${width} ${height}`} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}
    >
      {grid.map((row, y) => {
        return Array.from(row).map((char, x) => {
          if (char === '.' || !PALETTE[char]) return null;
          return (
            <rect 
              key={`${x}-${y}`} 
              x={x} 
              y={y} 
              width="1.05" 
              height="1.05" 
              fill={PALETTE[char]} 
            />
          );
        });
      })}
    </svg>
  );
};
