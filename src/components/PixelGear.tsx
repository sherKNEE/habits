import React from 'react';

interface PixelGearProps {
  id: 'wateringCan' | 'mutationCrates' | 'cooldownTickets' | 'focusTimer' | 'shovel';
  className?: string;
}

const PALETTE: Record<string, string> = {
  '.': 'transparent',
  'x': '#1c120c', // Outline
  'w': '#ffffff', // White highlights
  'b': '#3498db', // Blue water
  'g': '#2ecc71', // Green
  'y': '#f1c40f', // Gold yellow
  'o': '#e67e22', // Orange
  't': '#7e5109', // Wood brown
  'm': '#bdc3c7', // Steel silver
  'r': '#e74c3c', // Red tomato focus
  'k': '#2c3e50', // Charcoal edge
  'p': '#9b59b6', // Mythic purple crate
  'h': '#d35400', // Darker copper orange
};

const GEAR_GRIDS: Record<string, string[]> = {
  wateringCan: [
    "................",
    "......xxx.......",
    "....xxxxxxx.....",
    "...xoooootxx....",
    "..xoobbbootxx...",
    "xobbbootxxxxxx..",
    "xooootxxxxxxxx..",
    ".xxxxxxxxxxx....",
    "................"
  ],
  mutationCrates: [
    "................",
    "....xxxxxxxx....",
    "...xppppppppx...",
    "..xppppppppppx..",
    ".xptxtxtxtxtpx.",
    ".xpxpppppppxpx.",
    ".xpxpxpxpxpxpx.",
    ".xpxpppppppxpx.",
    ".xptxtxtxtxtpx.",
    "..xppppppppppx..",
    "...xppppppppx...",
    "....xxxxxxxx....",
    "................"
  ],
  cooldownTickets: [
    "................",
    "..xxxxxxxxxxxx..",
    ".xyyyyyyyyyyyyx.",
    "xyyyyyyyyyyyyyyx",
    "xyyxxxyyyyxxxyyx",
    "xyyxxyyyyyxxyyyx",
    "xyyyyyyyyyyyyyyx",
    "xyyxxyyyyyxxyyyx",
    "xyyxxxyyyyxxxyyx",
    "xyyyyyyyyyyyyyyx",
    ".xyyyyyyyyyyyyx.",
    "..xxxxxxxxxxxx..",
    "................"
  ],
  focusTimer: [
    "......xxxx......",
    "....xxrwwrxx....",
    "...xrrmmmrrrx...",
    "..xrmwwwwwwmrx..",
    ".xrmwwmxxmwwmrx.",
    ".xrwwmxmmxmwwrx.",
    ".xrwwmxmxxmwwrx.",
    ".xrwwmxmxxmwwrx.",
    ".xrwwmxxxxmwwrx.",
    "..xrmwwwwwwmrx..",
    "...xrrmmmrrrx...",
    "....xxrwwrxx....",
    "......xxxx......"
  ],
  shovel: [
    "............xx..",
    "...........xmx..",
    "..........xttx..",
    ".........xttx...",
    "........xttx....",
    ".......xmmx.....",
    "......xmmmx.....",
    ".....xmmmmx.....",
    "......xxxx......"
  ]
};

export const PixelGear: React.FC<PixelGearProps> = ({ id, className = 'w-10 h-10' }) => {
  const grid = GEAR_GRIDS[id];

  if (!grid) {
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}>
        <rect x="2" y="2" width="12" height="12" fill="#7f8c8d" stroke="#1c120c" strokeWidth="1" />
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
              key={`${id}-${x}-${y}`} 
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
