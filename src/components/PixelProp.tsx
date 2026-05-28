import React from 'react';

interface PixelPropProps {
  id: string;
  className?: string;
}

const PALETTE: Record<string, string> = {
  '.': 'transparent',
  'x': '#1c120c', // dark sprite outline
  'o': '#d35400', // orange / copper
  't': '#7e5109', // brown wood / handle
  'm': '#bdc3c7', // metal silver
  'g': '#2ecc71', // green
  'l': '#27ae60', // dark green
  'r': '#e74c3c', // red
  'y': '#f1c40f', // gold / yellow
  'w': '#ffffff', // white / light
  'b': '#3498db', // blue water
  'v': '#8e44ad', // purple violet spells
  'k': '#2f3640', // dark grey / charcoal
  'e': '#5c2600', // leather dark / deep brown
  'p': '#ff6b6b', // pink / blush
  'c': '#fdd9af', // skin cream
};

const PROP_GRIDS: Record<string, string[]> = {
  'watering can': [
    "................",
    "......xyx.......",
    "....xxxxxxx.....",
    "...xoooooeex....",
    ".xxooboooeex....",
    "xoboooeexxxxx...",
    "xooooeexxxxx....",
    ".xxxxxxxxx......",
    "................"
  ],
  'gardening trowel': [
    "............xx..",
    "...........xmx..",
    "..........xmmx..",
    ".........xmmx...",
    "........xmmx....",
    ".......xttx.....",
    "......xttx......",
    ".....xttx.......",
    "....xx.........."
  ],
  'hand rake': [
    ".........xxxxx..",
    "........xttttx..",
    ".......xttttx...",
    "......xttttx....",
    ".....xmmx.......",
    "....xmmmmx......",
    "...xmxmxmxmx....",
    "..x..x.x.x......"
  ],
  'empty basket': [
    ".....xxxxxx.....",
    "....xttttttX....",
    "...xt......tx...",
    "..xt........tx..",
    "..xxxxxxxxxxxx..",
    "..xttttttYtttx..",
    "...xtttYttYtx...",
    "....xxxxxxxx...."
  ],
  'herbology book': [
    ".....xxxxxxx....",
    "....xeeeeeex....",
    "...xeyyeeyex....",
    "...xeyggyyex....",
    "...xeggggyex....",
    "...xeyggeyex....",
    "...xeeeeeeex....",
    "....xxxxxxx....."
  ],
  'gardening shears': [
    ".........xx.....",
    "........xmx.....",
    ".......xmx......",
    "......xKx.......",
    ".....xKx........",
    "....xtxtx.......",
    "...xt..xtx......",
    "..x.....x......."
  ],
  'spells pouch': [
    "......xxxx......",
    ".....xteetx.....",
    "....xteeeetx....",
    "...xtvvvvvvtx...",
    "...xtvvyyvvtx...",
    "....xtvvvvmx....",
    ".....xxxxxx....."
  ],
  'magnifying glass': [
    "......xxxx......",
    "....xwwwwxxx....",
    "...xwwwwwmmmx...",
    "...xwwwwwmmmx...",
    "....xxxxxxx.....",
    ".....xttx.......",
    "....xttx........",
    "...xttx.........",
    "..xx............"
  ],
  'adventure compass': [
    "......xxxx......",
    "....xyyyyyyx....",
    "...xyrwwrwyyx...",
    "...xyywrwyyyyx..",
    "....xyyyyyyx....",
    ".....xxxxxx....."
  ],
  'spirit level': [
    "................",
    "xxxxxxxxxxxxxxxx",
    "xttttttwwwwtttxx",
    "xttttttggggtttxx",
    "xxxxxxxxxxxxxxxx",
    "................"
  ],
  'pocket watch': [
    "......xx........",
    "....xyyyyx......",
    "...xywwwwyx.....",
    "...xywwkkyx.....",
    "....xyyyyx......",
    ".....xxxx......."
  ],
  'sapling pot': [
    "......gggg......",
    ".....glglgg.....",
    "......glg.......",
    "....xxxxxxx.....",
    "....xrrrrrx.....",
    ".....xrrrx......",
    ".....xrrrx......",
    "......xxx......."
  ],
  'teddy bear': [
    "....xx....xx....",
    "...xttx..xttx...",
    "...xtttxtttx....",
    "....xtttxx......",
    "....xtttxtx.....",
    ".....xxx.x......"
  ],
  'whisk': [
    "..........mm....",
    "........mmmm....",
    "......mmmm......",
    ".....xttx.......",
    "....xttx........",
    "...xttx.........",
    "..xx............"
  ],
  'thermometer': [
    ".....xxxxxx.....",
    "....xeeeex......",
    "....xeewex......",
    "....xeereex.....",
    "....xerrreex....",
    ".....xxxxxx....."
  ],
  'notebook & pencil': [
    ".....xxxxxx.....",
    "....xwwwwwxx....",
    "...xwwwwwxxxy...",
    "...xwwwwwxx.....",
    "...xwrowwxx.....",
    "....xxxxxx......"
  ],
  'notebook': [
    ".....xxxxxx.....",
    "....xwwwwwxx....",
    "...xwwwwwxxxy...",
    "...xwwwwwxx.....",
    "...xwrowwxx.....",
    "....xxxxxx......"
  ],
  'grim book': [
    ".....xxxxxxx....",
    "....xkkkkkkx....",
    "...xkkvvkkkx....",
    "...xkkvvkkkx....",
    "...xkvvwwvvkx...",
    "...xkkvvkkkx....",
    "....xxxxxxx....."
  ],
  'scythe': [
    "......mmmmmm....",
    "....mmmmmmmm....",
    "..........tx....",
    ".........tx.....",
    "........tx......",
    ".......tx.......",
    "......tx........",
    ".....tx........."
  ],
  'wide trowel': [
    "............xx..",
    "...........xmx..",
    ".........xxmmx..",
    "........xmmmmmx.",
    "........xmmmmmx.",
    ".........xttx...",
    "........xttx....",
    ".......xttx....."
  ],
  'leather satchel': [
    ".....xxxxxx.....",
    "....xeeeeeex....",
    "...xeeeyeeex....",
    "...xeyyyyeex....",
    "...xeeyyeeex....",
    "....xxxxxxx....."
  ],
  // Fallbacks for specific IDs in database
  'vintage rake': [
    ".........xxxxx..",
    "........xttttx..",
    ".......xttttx...",
    "......xttttx....",
    ".....xmmx.......",
    "....xmmmmx......",
    "...xmxmxmxmx....",
    "..x..x.x.x......"
  ],
  'golden shovel': [
    "............xx..",
    "...........xyx..",
    "..........xyyx..",
    ".........xyyx...",
    "........xyyx....",
    ".......xttx.....",
    "......xttx......",
    ".....xttx.......",
    "....xx.........."
  ],
  'cozy mug': [
    ".....xxx........",
    "....xwwwxx......",
    "....xwrrwxwxx...",
    "....xwrrwxxx....",
    "....xwwwxx......",
    ".....xxx........",
    "................",
  ]
};

export const PixelProp: React.FC<PixelPropProps> = ({ id, className = 'w-full h-full' }) => {
  const propIdClean = id?.toLowerCase().trim().replace(/_/g, ' ') || '';
  const grid = PROP_GRIDS[propIdClean];

  if (!grid) {
    // Fallback cute gift box silhouette
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}>
        <rect x="4" y="5" width="8" height="8" rx="1" fill="#1abc9c" stroke="#1c120c" strokeWidth="1.2" />
        <path d="M4 8 H12" stroke="#1c120c" strokeWidth="1.2" />
        <rect x="7" y="3" width="2" height="2" fill="#e74c3c" />
        <path d="M8 5 V13" stroke="#f1c40f" strokeWidth="1.2" />
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
