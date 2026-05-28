import React from 'react';
import { useApp } from '../context/AppContext';
import { CLOTHING_DATABASE } from '../clothingData';
import { PixelHat, PALETTE as HAT_PALETTE, HAT_GRIDS } from './PixelHat';
import { PixelProp } from './PixelProp';

interface FarmerAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customBg?: string;
  customOutfit?: string;
  customProp?: string;
  customHat?: string;
  customGender?: 'male' | 'female';
}

interface Pixel {
  x: number;
  y: number;
  color: string;
}

const HAT_OFFSETS: Record<string, { x: number; y: number }> = {
  'bucket hat': { x: 4, y: 3 },
  'classic cap': { x: 4, y: 4 },
  'pirate hat': { x: 4, y: 2 },
  'bowler hat': { x: 4, y: 2 },
  'santa hat': { x: 4, y: 2 },
  'flower wreath': { x: 4, y: 7 },
  'witch hat': { x: 4, y: 0 },
  'party hat': { x: 4, y: 3 },
  'leprechaun hat': { x: 4, y: 2 },
  'construction hardhat': { x: 4, y: 3 },
  'royal crown': { x: 4, y: 4 },
  'sprout clip': { x: 6, y: 3 },
  'bear ears headband': { x: 4, y: 6 },
  'chef hat': { x: 4, y: 1 },
  'knitted beanie': { x: 4, y: 3 },
  'chic glasses': { x: 4, y: 10 },
  'elegant headband': { x: 4, y: 7 },
  'conical straw hat': { x: 4, y: 4 },
  'classic sun hat': { x: 4, y: 3 },
  'floppy straw hat': { x: 4, y: 3 }
};

export interface UserAvatarConfig {
  bg: string;
  outfit: string;
  hat: string;
  prop: string;
  gender: 'male' | 'female';
}

export function getAvatarConfigForUser(username: string): UserAvatarConfig {
  const norm = username.trim().toUpperCase();
  if (norm === 'MR MARK' || norm === 'MR. MARK') {
    return {
      bg: 'Cozy Supply Workshop',
      outfit: 'Winter Overalls',
      hat: 'Construction Hardhat',
      prop: 'Golden Shovel',
      gender: 'male'
    };
  }
  if (norm === 'SAM_EEE' || norm === 'SAM_EE') {
    return {
      bg: 'Busy Bee Sanctuary',
      outfit: 'Beekeeper Suit',
      hat: 'Flower Wreath',
      prop: 'Cozy Mug',
      gender: 'female'
    };
  }
  if (norm === 'NICOLINE123' || norm === 'NICOLINE') {
    return {
      bg: "Blooming Florist's Corner",
      outfit: 'Floral Overalls',
      hat: 'Floppy Straw Hat',
      prop: 'Sapling Pot',
      gender: 'female'
    };
  }
  if (norm === 'SH3RM4Y0' || norm === 'SHERMAYO') {
    return {
      bg: 'Apple Orchard Walk',
      outfit: 'Master Farmer Overalls',
      hat: 'Royal Crown',
      prop: 'Scythe',
      gender: 'male'
    };
  }
  if (norm === 'SHAYI_Y' || norm === 'SHAYI') {
    return {
      bg: 'Plentiful Vineyard Rows',
      outfit: 'Peasant Blouse',
      hat: 'Classic Sun Hat',
      prop: 'Notebook & Pencil',
      gender: 'female'
    };
  }
  
  let hashVal = 0;
  for (let i = 0; i < norm.length; i++) {
    hashVal += norm.charCodeAt(i);
  }
  
  const bgs = ['Default Greenhouse', 'Autumn Row', 'Sunny Garden Beds', 'Strawberry Fenced Garden'];
  const outfits = ['Standard Overalls', 'Garden Apron', 'Autumn Stripe Knit', 'Mustard Hoodie', 'Crimson Pullover'];
  const hats = ['Classic Cap', 'Bucket Hat', 'Sprout Clip', 'Knitted Beanie', 'Chic Glasses', 'Elegant Headband', 'Conical Straw Hat'];
  const props = ['Vintage Rake', 'Watering Can', 'Gardening Trowel', 'Hand Rake', 'Empty Basket', 'Magnifying Glass'];
  const genders: Array<'male' | 'female'> = ['male', 'female'];

  return {
    bg: bgs[hashVal % bgs.length],
    outfit: outfits[(hashVal + 1) % outfits.length],
    hat: hats[(hashVal + 2) % hats.length],
    prop: props[(hashVal + 3) % props.length],
    gender: genders[hashVal % genders.length]
  };
}

export const FarmerAvatar: React.FC<FarmerAvatarProps> = ({
  size = 'md',
  customBg,
  customOutfit,
  customProp,
  customHat,
  customGender,
}) => {
  const {
    equippedBg,
    equippedOutfit,
    equippedProp,
    equippedHat,
    avatarGender,
  } = useApp();

  // Pick what actually to render
  const activeBg = customBg !== undefined ? customBg : equippedBg;
  const activeOutfit = customOutfit !== undefined ? customOutfit : equippedOutfit;
  const activeProp = customProp !== undefined ? customProp : equippedProp;
  const activeHat = customHat !== undefined ? customHat : equippedHat;
  const activeGender = customGender !== undefined ? customGender : (avatarGender || 'male');

  // Retrieve item definitions from the database to see custom uploaded image URLs
  const bgDef = CLOTHING_DATABASE.find(item => item.id === activeBg && item.category === 'backgrounds');
  const outfitDef = CLOTHING_DATABASE.find(item => item.id === activeOutfit && item.category === 'outfits');
  const propDef = CLOTHING_DATABASE.find(item => item.id === activeProp && item.category === 'props');
  const hatDef = CLOTHING_DATABASE.find(item => item.id === activeHat && item.category === 'props');

  // Let's check if the hat equipped is a hat
  const hatIdClean = activeHat?.toLowerCase().trim() || '';
  const HATS_LIST = [
    'bucket hat', 'classic cap', 'pirate hat', 'bowler hat', 'santa hat', 
    'flower wreath', 'witch hat', 'party hat', 'leprechaun hat', 'construction hardhat', 
    'royal crown', 'sprout clip', 'bear ears headband', 'chef hat', 'knitted beanie', 
    'chic glasses', 'elegant headband', 'conical straw hat', 'classic sun hat', 'floppy straw hat'
  ];
  const isNoneHat = !hatIdClean || hatIdClean === 'none' || hatIdClean === 'none hat';
  const hasHatEquipped = !!hatIdClean && HATS_LIST.includes(hatIdClean) && !isNoneHat;
  const hasFloppyStraw = hatIdClean === 'floppy straw hat';
  const hasStrawHat = isNoneHat;

  // Let's decide dimensions
  let sizeClass = 'w-16 h-16';
  if (size === 'sm') sizeClass = 'w-10 h-10';
  if (size === 'md') sizeClass = 'w-24 h-24';
  if (size === 'lg') sizeClass = 'w-32 h-32 md:w-36 md:h-36';
  if (size === 'xl') sizeClass = 'w-48 h-48';

  // Background visual themes fallback styles matching the game's locations
  let bgFill = 'url(#stardew-floral)'; // Default Greenhouse / fallback uses the floral wallpaper!
  let bgStyles = '';

  if (activeBg === 'Autumn Harvest Field') {
    bgStyles = 'bg-linear-to-b from-amber-100 to-orange-200';
    bgFill = '';
  } else if (activeBg === 'Astral Canopy Room') {
    bgStyles = 'bg-[#1a1c35]';
    bgFill = '';
  } else {
    // Standard Greenhouse is rural floral wallpaper pattern!
    bgStyles = 'bg-[#89a579]';
  }

  // Dynamic pixel coordinates for base body, clothing colors and accessories
  const characterPixels = React.useMemo(() => {
    const list: Pixel[] = [];

    // Base color tones
    const skin = '#fdd9af'; // warm tone rosy cream Stardew aesthetic skin
    const skinShadow = '#e2aa7f';
    const hair = '#5e3817'; // warm rich chestnut brown hair
    const hairShadow = '#3e1e0a';
    const eyes = '#1c120c'; // custom black charcoal eyes
    const blush = '#f4a397'; // rosy cheeks blush
    const mouth = '#3c1c0c'; // tiny cute mouth
    const out = '#1c120c'; // default black/dark brown sprite border

    // Outfit values - Default Denim is beautiful green theme from photo
    let overalls = '#528350'; // Sage Green leaf tone from image
    let overallsShadow = '#345531';
    let overallsLight = '#78a374';
    let pocket = '#355331';
    let buckles = '#eed059'; // gold buckles
    let shirt = '#faf7ec'; // white/off-white cream shirt
    let shirtShadow = '#dfdad0';
    let bootsColor = '#543118';

    const isCustomOutfit = [
      'autumn stripe knit',
      'peasant blouse',
      'explorer gear',
      'formal tweed',
      'space-farm jumpsuit',
      'mustard hoodie',
      'crimson pullover',
      'wool cable-knit',
      'tweed blazer'
    ].includes(activeOutfit?.toLowerCase().trim() || '');

    const getTopColor = (cx: number, cy: number, outfitClean: string, isShadow = false): string => {
      const id = outfitClean.toLowerCase().trim();
      if (id === 'autumn stripe knit') {
        if (cy === 17 || cy === 18 || cy === 22) {
          return isShadow ? '#1d3b1b' : '#2e572b'; // Forest Green stripe
        } else if (cy === 19 || cy === 20 || cy === 23) {
          return isShadow ? '#8e3d10' : '#cc5a1b'; // Rustic Orange stripe
        } else {
          return isShadow ? '#aa8014' : '#e5b022'; // Golden Yellow stripe
        }
      }
      if (id === 'peasant blouse') {
        return isShadow ? '#e3ded3' : '#faf6eb'; // cream puff blouse
      }
      if (id === 'explorer gear') {
        const isArm = cx === 6 || cx === 7 || cx === 16 || cx === 17;
        if (isArm) {
          return isShadow ? '#cfc9bf' : '#eae6df'; // safari shirt long sleeves
        } else {
          return isShadow ? '#85734a' : '#b2a072'; // khaki multi-pocket vest
        }
      }
      if (id === 'formal tweed' || id === 'tweed blazer') {
        const baseColor = isShadow ? '#2d2520' : '#453a32'; // tweed charcoal brown
        if ((cy === 19 && (cx === 7 || cx === 16)) || (cy === 22 && (cx === 9 || cx === 14))) {
          return '#af9e88'; // textured weave flecks
        }
        return baseColor;
      }
      if (id === 'space-farm jumpsuit') {
        if (cy === 20 || cy === 21) {
          if (cx === 6 || cx === 7) return '#3498db'; // blue bio-seal left sleeve
          if (cx === 16 || cx === 17) return '#e74c3c'; // red bio-seal right sleeve
        }
        return isShadow ? '#cbd5e0' : '#f8f9f9'; // spacesuit white
      }
      if (id === 'mustard hoodie') {
        return isShadow ? '#c79105' : '#f39c12'; // warm mustard yellow
      }
      if (id === 'crimson pullover') {
        if (cy === 21) {
          return isShadow ? '#d9534f' : '#f08080'; // pinkish horizontal stripe accent
        }
        return isShadow ? '#78281f' : '#b03a2e'; // crimson fleece
      }
      if (id === 'wool cable-knit') {
        if ((cx === 9 || cx === 11 || cx === 13) && (cy === 19 || cy === 21 || cy === 23)) {
          return '#d4cbb3'; // braided texture shadows
        }
        return isShadow ? '#ebdca5' : '#faf8f2'; // thick warm bone white
      }
      return isShadow ? '#3e1e0a' : '#5e3817';
    };

    const getPantsColors = (outfitClean: string) => {
      const id = outfitClean.toLowerCase().trim();
      let pant = '#34495e'; // slate denim
      let pantShadow = '#212f3d';
      
      if (id === 'autumn stripe knit') {
        pant = '#5c4028'; // chocolate corduroy
        pantShadow = '#382516';
      } else if (id === 'peasant blouse') {
        pant = '#4682b4'; // vintage sky wash denim
        pantShadow = '#2f5d82';
      } else if (id === 'explorer gear') {
        pant = '#807250'; // khaki utility cargo trousers
        pantShadow = '#594e36';
      } else if (id === 'formal tweed' || id === 'tweed blazer') {
        pant = '#2b2724'; // dressy tweed charcoal trousers
        pantShadow = '#1c1917';
      } else if (id === 'space-farm jumpsuit') {
        pant = '#f0f3f4'; // white pressure pants
        pantShadow = '#cbd5e0';
      } else if (id === 'mustard hoodie') {
        pant = '#2c3e50'; // relaxed dark sweatpants
        pantShadow = '#1b2631';
      } else if (id === 'crimson pullover') {
        pant = '#34495e'; // dark wash jeans
        pantShadow = '#212f3d';
      } else if (id === 'wool cable-knit') {
        pant = '#212f3d'; // charcoal thick winter sweatpants
        pantShadow = '#17202a';
      }
      return { pant, pantShadow };
    };

    const getBootsColorForSweater = (outfitClean: string): string => {
      const id = outfitClean.toLowerCase().trim();
      if (id === 'autumn stripe knit') return '#3e2715'; 
      if (id === 'peasant blouse') return '#50311a'; 
      if (id === 'explorer gear') return '#212b2e'; 
      if (id === 'formal tweed' || id === 'tweed blazer') return '#111111'; 
      if (id === 'space-farm jumpsuit') return '#95a5a6'; 
      if (id === 'mustard hoodie') return '#eaecee'; 
      if (id === 'crimson pullover') return '#5d4037'; 
      if (id === 'wool cable-knit') return '#4e342e'; 
      return '#543118';
    };

    // Overwrite depending on outfits
    if (activeOutfit === 'Beekeeper Suit') {
      shirt = '#fcf8f2';
      shirtShadow = '#e9e3d8';
      overalls = '#dfb53f'; // gold honey
      overallsShadow = '#ab8522';
      overallsLight = '#f5da75';
      pocket = '#c29b28';
      buckles = '#fff5cf';
    } else if (activeOutfit === 'Master Farmer Overalls') {
      shirt = '#ffffff';
      shirtShadow = '#dfdfdf';
      overalls = '#235939'; // emerald green
      overallsShadow = '#143821';
      overallsLight = '#3c8c5c';
      pocket = '#1b472c';
      buckles = '#ebd05a';
    } else if (activeOutfit === 'Celestial Hood') {
      shirt = '#121428';
      shirtShadow = '#0a0d17';
      overalls = '#221e3d'; // stellar purple
      overallsShadow = '#110f21';
      overallsLight = '#433c7a';
      pocket = '#18152c';
      buckles = '#cbd1fc';
    } else if (activeOutfit === 'Cowboy Gear') {
      shirt = '#3a5160'; // slate blue denim shirt
      shirtShadow = '#283a47';
      overalls = '#1a3350'; // indigo work dungarees
      overallsShadow = '#0d1e34';
      overallsLight = '#2a4c75';
      pocket = '#0d1e34';
      buckles = '#dfb53f'; // gold buckles
    } else if (activeOutfit === 'Garden Apron') {
      shirt = '#658d60'; // sage green shirt
      shirtShadow = '#486644';
      overalls = '#2f5b5f'; // dark teal apron
      overallsShadow = '#1d3b3e';
      overallsLight = '#447d82';
      pocket = '#122628';
      buckles = '#cfbe8c'; 
    } else if (activeOutfit === 'Floral Overalls') {
      shirt = '#fbfcfc'; // white shirt
      shirtShadow = '#cbd5e0';
      overalls = '#eed893'; // sunflower warm yellow
      overallsShadow = '#cca743';
      overallsLight = '#fdf2cb';
      pocket = '#cca743';
      buckles = '#e5b022';
    } else if (activeOutfit === 'Winter Overalls') {
      shirt = '#195b28'; // green fleece inner
      shirtShadow = '#103f19';
      overalls = '#cb4335'; // crimson outer
      overallsShadow = '#922b21';
      overallsLight = '#ec7063';
      pocket = '#782117';
      buckles = '#fbfcfc'; // fuzzy white pompoms
    }

    // 1. HEAD AREA (FACE, HAIR & ACCESSORIES)
    // Default Hair crown (so accessories and no-hat hair look complete!)
    // Top-most row of hair (y=8)
    list.push({ x: 8, y: 8, color: out });
    for (let x = 9; x <= 11; x++) list.push({ x, y: 8, color: hair });
    for (let x = 12; x <= 14; x++) list.push({ x, y: 8, color: hairShadow });
    list.push({ x: 15, y: 8, color: out });

    // Mid row of hair (y=9)
    list.push({ x: 7, y: 9, color: out });
    for (let x = 8; x <= 11; x++) list.push({ x, y: 9, color: hair });
    for (let x = 12; x <= 15; x++) list.push({ x, y: 9, color: hairShadow });
    list.push({ x: 16, y: 9, color: out });

    // Back Hair behind neck/ears (y=12 to 16 for male, 12 to 18 for female to fill shoulder gap)
    if (activeGender === 'female') {
      for (let y = 12; y <= 18; y++) {
        list.push({ x: 7, y, color: hairShadow });
        list.push({ x: 16, y, color: hairShadow });
      }
    } else {
      for (let y = 12; y <= 16; y++) {
        list.push({ x: 7, y, color: hairShadow });
        list.push({ x: 16, y, color: hairShadow });
      }
    }

    // Ears
    list.push({ x: 6, y: 13, color: out });
    list.push({ x: 7, y: 13, color: skin });
    list.push({ x: 16, y: 13, color: skinShadow });
    list.push({ x: 17, y: 13, color: out });

    list.push({ x: 6, y: 14, color: out });
    list.push({ x: 7, y: 14, color: skinShadow });
    list.push({ x: 16, y: 14, color: skinShadow });
    list.push({ x: 17, y: 14, color: out });

    // Base Face skin rows
    for (let y = 10; y <= 15; y++) {
      list.push({ x: 7, y, color: out });
      for (let x = 8; x <= 15; x++) {
        // Simple light-to-shadow gradient: left side skin, right side skinShadow for 3D retro feel
        const col = x <= 11 ? skin : skinShadow;
        list.push({ x, y, color: col });
      }
      list.push({ x: 16, y, color: out });
    }

    // Neck / Chin Row (y=16)
    list.push({ x: 8, y: 16, color: out });
    for (let x = 9; x <= 14; x++) {
      list.push({ x, y: 16, color: skinShadow });
    }
    list.push({ x: 15, y: 16, color: out });

    // Front Hair bangs overlay (Forehead rows y=11)
    // Symmetrical bangs: center bangs on 11, 12, side bangs on 8 and 15
    list.push({ x: 8, y: 11, color: hair });
    list.push({ x: 11, y: 11, color: hair });
    list.push({ x: 12, y: 11, color: hairShadow });
    list.push({ x: 15, y: 11, color: hairShadow });

    // Eyes: 1 pixel wide, 2 pixels high vertical lines (Stardew charm)
    // Columns 10 and 13 are fully symmetrical
    list.push({ x: 10, y: 12, color: eyes });
    list.push({ x: 10, y: 13, color: eyes });
    list.push({ x: 13, y: 12, color: eyes });
    list.push({ x: 13, y: 13, color: eyes });

    // Cute peach cheek blush at y=14
    list.push({ x: 8, y: 14, color: blush });
    list.push({ x: 15, y: 14, color: blush });

    // Note: No mouth is drawn for that cute anonymous/quiet retro aesthetic!

    if (isCustomOutfit) {
      const outfitClean = activeOutfit || '';
      const id = outfitClean.toLowerCase().trim();
      // 2. TORSO & SLEEVES (Rows 17 to 25)
      for (let y = 17; y <= 25; y++) {
        if (y === 17) {
          list.push({ x: 7, y: 17, color: out });
          list.push({ x: 16, y: 17, color: out });
          
          list.push({ x: 10, y: 17, color: out });
          list.push({ x: 11, y: 17, color: skinShadow });
          list.push({ x: 12, y: 17, color: skinShadow });
          list.push({ x: 13, y: 17, color: out });
          
          for (let x = 8; x <= 9; x++) list.push({ x, y: 17, color: getTopColor(x, y, outfitClean) });
          for (let x = 14; x <= 15; x++) list.push({ x, y: 17, color: getTopColor(x, y, outfitClean, true) });
        } else if (y === 18) {
          list.push({ x: 7, y: 18, color: out });
          list.push({ x: 16, y: 18, color: out });
          for (let x = 8; x <= 15; x++) {
            if (id === 'peasant blouse' && (x === 11 || x === 12)) {
              list.push({ x, y: 18, color: x === 11 ? skin : skinShadow });
            } else if ((id === 'formal tweed' || id === 'tweed blazer') && (x === 11 || x === 12)) {
              list.push({ x, y: 18, color: '#800020' }); // tie center
            } else {
              list.push({ x, y: 18, color: getTopColor(x, y, outfitClean, x >= 12) });
            }
          }
        } else if (y === 19) {
          list.push({ x: 6, y: 19, color: out });
          list.push({ x: 17, y: 19, color: out });
          
          list.push({ x: 7, y: 19, color: getTopColor(7, y, outfitClean) });
          list.push({ x: 8, y: 19, color: out });
          for (let x = 9; x <= 14; x++) {
            if ((id === 'formal tweed' || id === 'tweed blazer') && (x === 11 || x === 12)) {
              list.push({ x, y: 19, color: '#800020' }); // tie
            } else if (id === 'mustard hoodie' && (x === 10 || x === 13)) {
              list.push({ x, y: 19, color: '#fcfcfc' }); // white drawstrings
            } else {
              list.push({ x, y: 19, color: getTopColor(x, y, outfitClean, x >= 12) });
            }
          }
          list.push({ x: 15, y: 19, color: out });
          list.push({ x: 16, y: 19, color: getTopColor(16, y, outfitClean, true) });
        } else if (y === 20) {
          list.push({ x: 5, y: 20, color: out });
          list.push({ x: 18, y: 20, color: out });
          
          list.push({ x: 6, y: 20, color: getTopColor(6, y, outfitClean) });
          list.push({ x: 7, y: 20, color: getTopColor(7, y, outfitClean, true) });
          list.push({ x: 8, y: 20, color: out });
          list.push({ x: 9, y: 20, color: out });
          for (let x = 10; x <= 13; x++) {
            list.push({ x, y: 20, color: getTopColor(x, y, outfitClean, x >= 12) });
          }
          list.push({ x: 14, y: 20, color: out });
          list.push({ x: 15, y: 20, color: out });
          
          list.push({ x: 16, y: 20, color: getTopColor(16, y, outfitClean) });
          list.push({ x: 17, y: 20, color: getTopColor(17, y, outfitClean, true) });
        } else if (y >= 21 && y <= 24) {
          list.push({ x: 5, y, color: out });
          list.push({ x: 6, y, color: getTopColor(6, y, outfitClean) });
          list.push({ x: 7, y, color: getTopColor(7, y, outfitClean, true) });
          list.push({ x: 8, y, color: out });

          for (let x = 9; x <= 14; x++) {
            let col = getTopColor(x, y, outfitClean, x >= 12);
            
            if (id === 'formal tweed' || id === 'tweed blazer') {
              if (y === 21 && x === 13) col = '#c0392b'; // silk red pocket square accent!
              else if (y === 23 && (x === 10 || x === 13)) col = '#221d1a'; // pocket flap line
            }
            if (id === 'explorer gear') {
              if (y === 21 && (x === 10 || x === 13)) col = '#5a4f32'; // harness metal buckles
              if (y === 23 && (x === 9 || x === 14)) col = '#4c4228'; // cargo chest flaps
            }
            if (id === 'mustard hoodie') {
              if (y >= 22 && y <= 24 && x >= 10 && x <= 13) {
                col = x >= 12 ? '#c79105' : '#eed05a'; // hand pouch shading
              }
            }
            if (id === 'space-farm jumpsuit') {
              if (y === 21 && x === 10) col = '#27ae60'; // plant green base patch
              if (y === 22 && x === 10) col = '#ebd05a'; // gold wheat element
            }
            
            list.push({ x, y, color: col });
          }

          list.push({ x: 15, y, color: out });
          list.push({ x: 16, y, color: getTopColor(16, y, outfitClean) });
          list.push({ x: 17, y, color: getTopColor(17, y, outfitClean, true) });
          list.push({ x: 18, y, color: out });
        } else if (y === 25) {
          list.push({ x: 5, y: 25, color: out });
          list.push({ x: 6, y: 25, color: out });
          list.push({ x: 7, y: 25, color: out });
          list.push({ x: 8, y: 25, color: out });
          
          for (let x = 9; x <= 14; x++) {
            let col = getTopColor(x, y, outfitClean, x >= 12);
            if (id === 'peasant blouse') {
              col = x >= 12 ? '#533d1c' : '#7d5c2b'; // leather hip belt
            } else if (id === 'formal tweed' || id === 'tweed blazer') {
              col = '#211c19'; 
            }
            list.push({ x, y: 25, color: col });
          }
          
          list.push({ x: 15, y: 25, color: out });
          list.push({ x: 16, y: 25, color: out });
          list.push({ x: 17, y: 25, color: out });
          list.push({ x: 18, y: 25, color: out });
        }
      }

      // 3. LOWER LEGS & HANDS (Rows 26 to 28)
      const pantsColors = getPantsColors(outfitClean);
      for (let y = 26; y <= 28; y++) {
        if (y === 26) {
          list.push({ x: 5, y: 26, color: out });
          list.push({ x: 6, y: 26, color: id === 'explorer gear' ? '#70461a' : skin }); 
          list.push({ x: 7, y: 26, color: id === 'explorer gear' ? '#4d2d10' : skinShadow });
          list.push({ x: 8, y: 26, color: out });
        } else if (y === 27) {
          list.push({ x: 6, y: 27, color: out });
          list.push({ x: 7, y: 27, color: out });
        }

        list.push({ x: 8, y, color: out });
        list.push({ x: 9, y, color: pantsColors.pant });
        list.push({ x: 10, y, color: (y === 27 && id === 'space-farm jumpsuit') ? '#34495e' : pantsColors.pant });
        
        list.push({ x: 11, y, color: out });
        list.push({ x: 12, y, color: out });

        list.push({ x: 13, y, color: pantsColors.pantShadow });
        list.push({ x: 14, y, color: (y === 27 && id === 'space-farm jumpsuit') ? '#212f3d' : pantsColors.pantShadow });
        list.push({ x: 15, y, color: out });

        if (y === 26) {
          list.push({ x: 15, y: 26, color: out });
          list.push({ x: 16, y: 26, color: id === 'explorer gear' ? '#70461a' : skin });
          list.push({ x: 17, y: 26, color: id === 'explorer gear' ? '#4d2d10' : skinShadow });
          list.push({ x: 18, y: 26, color: out });
        } else if (y === 27) {
          list.push({ x: 16, y: 27, color: out });
          list.push({ x: 17, y: 27, color: out });
        }
      }

      bootsColor = getBootsColorForSweater(outfitClean);
      // Row 29 (Boot tops)
      list.push({ x: 8, y: 29, color: out });
      list.push({ x: 9, y: 29, color: bootsColor });
      list.push({ x: 10, y: 29, color: bootsColor });
      list.push({ x: 11, y: 29, color: out });
      list.push({ x: 12, y: 29, color: out });
      list.push({ x: 13, y: 29, color: bootsColor });
      list.push({ x: 14, y: 29, color: bootsColor });
      list.push({ x: 15, y: 29, color: out });

      // Row 30 (Soles flared outwards)
      list.push({ x: 7, y: 30, color: out });
      list.push({ x: 8, y: 30, color: bootsColor });
      list.push({ x: 9, y: 30, color: bootsColor });
      list.push({ x: 10, y: 30, color: bootsColor });
      list.push({ x: 11, y: 30, color: out });
      list.push({ x: 12, y: 30, color: out });
      list.push({ x: 13, y: 30, color: bootsColor });
      list.push({ x: 14, y: 30, color: bootsColor });
      list.push({ x: 15, y: 30, color: bootsColor });
      list.push({ x: 16, y: 30, color: out });

      // Row 31 (Under boot outlines)
      for (let x = 7; x <= 11; x++) list.push({ x, y: 31, color: out });
      for (let x = 12; x <= 16; x++) list.push({ x, y: 31, color: out });

    } else {
      // 2. TORSO & SHEATH (Rows 17 to 25)
      // Row 17 (Shirt V-neck / upper shoulders)
      list.push({ x: 7, y: 17, color: out });
      list.push({ x: 8, y: 17, color: shirt });
      list.push({ x: 9, y: 17, color: shirt });
      
      if (activeOutfit === 'Cowboy Gear') {
        list.push({ x: 10, y: 17, color: '#cc2a1a' }); // Red Bandana
        list.push({ x: 11, y: 17, color: '#cc2a1a' });
        list.push({ x: 12, y: 17, color: '#941a0e' });
        list.push({ x: 13, y: 17, color: '#941a0e' });
      } else {
        list.push({ x: 10, y: 17, color: out }); // neckline borders
        list.push({ x: 11, y: 17, color: skinShadow }); // neck center
        list.push({ x: 12, y: 17, color: skinShadow }); // neck center
        list.push({ x: 13, y: 17, color: out }); // neckline borders
      }
      
      list.push({ x: 14, y: 17, color: shirtShadow });
      list.push({ x: 15, y: 17, color: shirtShadow });
      list.push({ x: 16, y: 17, color: out });

      // Row 18 (Overalls Straps / Shoulder tops)
      list.push({ x: 7, y: 18, color: out });
      list.push({ x: 8, y: 18, color: activeOutfit === 'Cowboy Gear' ? '#941a0e' : shirt });
      list.push({ x: 9, y: 18, color: overalls });
      list.push({ x: 10, y: 18, color: overalls });
      
      if (activeOutfit === 'Cowboy Gear') {
        list.push({ x: 11, y: 18, color: '#cc2a1a' });
        list.push({ x: 12, y: 18, color: '#941a0e' });
      } else {
        list.push({ x: 11, y: 18, color: shirt });
        list.push({ x: 12, y: 18, color: shirtShadow });
      }
      
      list.push({ x: 13, y: 18, color: overallsShadow });
      list.push({ x: 14, y: 18, color: overallsShadow });
      list.push({ x: 15, y: 18, color: activeOutfit === 'Cowboy Gear' ? '#cc2a1a' : shirtShadow });
      list.push({ x: 16, y: 18, color: out });

      // Row 19 (Overalls Straps row 2 / Arm sleeves start)
      list.push({ x: 6, y: 19, color: out });
      list.push({ x: 7, y: 19, color: shirt });
      list.push({ x: 8, y: 19, color: out });
      list.push({ x: 9, y: 19, color: overalls });
      list.push({ x: 10, y: 19, color: overalls });
      
      if (activeOutfit === 'Cowboy Gear') {
        list.push({ x: 11, y: 19, color: '#cc2a1a' }); // Bandana tip
        list.push({ x: 12, y: 19, color: overallsShadow });
      } else {
        list.push({ x: 11, y: 19, color: shirt });
        list.push({ x: 12, y: 19, color: shirtShadow });
      }
      
      list.push({ x: 13, y: 19, color: overallsShadow });
      list.push({ x: 14, y: 19, color: overallsShadow });
      list.push({ x: 15, y: 19, color: out });
      list.push({ x: 16, y: 19, color: shirtShadow });
      list.push({ x: 17, y: 19, color: out });

      // Row 20 (Yellow Buckles / Arm sleeves wide)
      list.push({ x: 5, y: 20, color: out });
      list.push({ x: 6, y: 20, color: shirt });
      list.push({ x: 7, y: 20, color: shirtShadow });
      list.push({ x: 8, y: 20, color: out });
      list.push({ x: 9, y: 20, color: out });
      list.push({ x: 10, y: 20, color: buckles }); // Left buckle yellow pixel
      list.push({ x: 11, y: 20, color: overalls });
      list.push({ x: 12, y: 20, color: overallsShadow });
      list.push({ x: 13, y: 20, color: buckles }); // Right buckle yellow pixel
      list.push({ x: 14, y: 20, color: out });
      list.push({ x: 15, y: 20, color: out });
      list.push({ x: 16, y: 20, color: shirtShadow });
      list.push({ x: 17, y: 20, color: shirtShadow });
      list.push({ x: 18, y: 20, color: out });

      // Rows 21 to 24 (Overalls Bib & Pocket & Sleeves mid to lower)
      for (let y = 21; y <= 24; y++) {
        // Left arm sleeve
        list.push({ x: 5, y, color: out });
        list.push({ x: 6, y, color: shirt });
        list.push({ x: 7, y, color: shirtShadow });
        list.push({ x: 8, y, color: out });

        // Overalls bib main content
        list.push({ x: 9, y, color: overalls });
        for (let x = 10; x <= 13; x++) {
          let col = x <= 11 ? overalls : overallsShadow;
          if (activeOutfit === 'Floral Overalls') {
            if (y === 22 && x === 10) col = '#ca6f1e'; // Sunflower centre
            if (y === 22 && x === 11) col = '#f5b041'; // Yellow petal
            if (y === 23 && x === 12) col = '#f5b041'; // Yellow petal
          } else {
            if (y === 22) {
              // Pocket top border
              col = pocket;
            } else if (y === 23) {
              // Pocket bottom corners
              if (x === 10 || x === 13) {
                col = pocket;
              }
            }
          }
          list.push({ x, y, color: col });
        }
        list.push({ x: 14, y, color: overallsShadow });

        // Right arm sleeve
        list.push({ x: 15, y, color: out });
        list.push({ x: 16, y, color: shirtShadow });
        list.push({ x: 17, y, color: shirtShadow });
        list.push({ x: 18, y, color: out });
      }

      // Row 25 (Sleeve cuffs / Groin wrap)
      list.push({ x: 5, y: 25, color: out });
      list.push({ x: 6, y: 25, color: out });
      list.push({ x: 7, y: 25, color: out });
      list.push({ x: 8, y: 25, color: out });
      for (let x = 9; x <= 14; x++) {
        list.push({ x, y: 25, color: x <= 11 ? overalls : overallsShadow });
      }
      list.push({ x: 15, y: 25, color: out });
      list.push({ x: 16, y: 25, color: out });
      list.push({ x: 17, y: 25, color: out });
      list.push({ x: 18, y: 25, color: out });

      // 3. LOWER LEGS & HANDS (Rows 26 to 28)
      for (let y = 26; y <= 28; y++) {
        // Left Hand (rendered at Row 26 only, bordered at Row 27)
        if (y === 26) {
          list.push({ x: 5, y: 26, color: out });
          list.push({ x: 6, y: 26, color: skin });
          list.push({ x: 7, y: 26, color: skinShadow });
          list.push({ x: 8, y: 26, color: out });
        } else if (y === 27) {
          list.push({ x: 6, y: 27, color: out });
          list.push({ x: 7, y: 27, color: out });
        }

        // Left trouser leg
        list.push({ x: 8, y, color: out });
        list.push({ x: 9, y, color: overalls });
        list.push({ x: 10, y, color: overalls });
        
        // Middle leg split
        list.push({ x: 11, y, color: out });
        list.push({ x: 12, y, color: out });

        // Right trouser leg
        list.push({ x: 13, y, color: overallsShadow });
        list.push({ x: 14, y, color: overallsShadow });
        list.push({ x: 15, y, color: out });

        // Right Hand (rendered at Row 26 only, bordered at Row 27)
        if (y === 26) {
          list.push({ x: 15, y: 26, color: out });
          list.push({ x: 16, y: 26, color: skin });
          list.push({ x: 17, y: 26, color: skinShadow });
          list.push({ x: 18, y: 26, color: out });
        } else if (y === 27) {
          list.push({ x: 16, y: 27, color: out });
          list.push({ x: 17, y: 27, color: out });
        }
      }

      // 4. BOOTS & GROUND GRIP (Rows 29 to 31)
      // Row 29 (Boot tops)
      list.push({ x: 8, y: 29, color: out });
      list.push({ x: 9, y: 29, color: bootsColor });
      list.push({ x: 10, y: 29, color: bootsColor });
      list.push({ x: 11, y: 29, color: out });
      list.push({ x: 12, y: 29, color: out });
      list.push({ x: 13, y: 29, color: bootsColor });
      list.push({ x: 14, y: 29, color: bootsColor });
      list.push({ x: 15, y: 29, color: out });

      // Row 30 (Soles flared outwards)
      list.push({ x: 7, y: 30, color: out });
      list.push({ x: 8, y: 30, color: bootsColor });
      list.push({ x: 9, y: 30, color: bootsColor });
      list.push({ x: 10, y: 30, color: bootsColor });
      list.push({ x: 11, y: 30, color: out });
      list.push({ x: 12, y: 30, color: out });
      list.push({ x: 13, y: 30, color: bootsColor });
      list.push({ x: 14, y: 30, color: bootsColor });
      list.push({ x: 15, y: 30, color: bootsColor });
      list.push({ x: 16, y: 30, color: out });

      // Row 31 (Under boot outlines)
      for (let x = 7; x <= 11; x++) list.push({ x, y: 31, color: out });
      for (let x = 12; x <= 16; x++) list.push({ x, y: 31, color: out });
    }

    // 5. INTUITIVE FLOATING STRAW HAT DRAWING
    if (hasStrawHat) {
      const strawColor = '#ebdcb5';
      const strawShadow = '#caab7a';
      const strawHighlight = '#fcf2dd';
      const strawOutline = '#2c1608';
      const bandColor = '#416340'; // green band in photo!
      const bandOutline = '#1e331e';

      // Crown top outline (y=3)
      for (let x = 11; x <= 13; x++) {
        list.push({ x, y: 3, color: strawOutline });
      }

      // Upper crown (y=4)
      list.push({ x: 10, y: 4, color: strawOutline });
      list.push({ x: 11, y: 4, color: strawHighlight });
      list.push({ x: 12, y: 4, color: strawColor });
      list.push({ x: 13, y: 4, color: strawShadow });
      list.push({ x: 14, y: 4, color: strawOutline });

      // Mid crown (y=5)
      list.push({ x: 9, y: 5, color: strawOutline });
      list.push({ x: 10, y: 5, color: strawHighlight });
      list.push({ x: 11, y: 5, color: strawColor });
      list.push({ x: 12, y: 5, color: strawColor });
      list.push({ x: 13, y: 5, color: strawShadow });
      list.push({ x: 14, y: 5, color: strawOutline });

      // Lower crown (y=6)
      list.push({ x: 8, y: 6, color: strawOutline });
      list.push({ x: 9, y: 6, color: strawHighlight });
      for (let x = 10; x <= 13; x++) {
        list.push({ x, y: 6, color: strawColor });
      }
      list.push({ x: 14, y: 6, color: strawShadow });
      list.push({ x: 15, y: 6, color: strawOutline });

      // Lower crown close (y=7)
      list.push({ x: 8, y: 7, color: strawOutline });
      list.push({ x: 9, y: 7, color: strawColor });
      for (let x = 10; x <= 13; x++) {
        list.push({ x, y: 7, color: strawColor });
      }
      list.push({ x: 14, y: 7, color: strawShadow });
      list.push({ x: 15, y: 7, color: strawOutline });

      // Green ribbon Hatband! (y=8)
      list.push({ x: 8, y: 8, color: bandOutline });
      for (let x = 9; x <= 12; x++) {
        list.push({ x, y: 8, color: bandColor });
      }
      list.push({ x: 13, y: 8, color: '#4d754c' }); // highlight point
      list.push({ x: 14, y: 8, color: bandOutline });

      // Brim top row (y=9)
      list.push({ x: 5, y: 9, color: strawOutline });
      list.push({ x: 6, y: 9, color: strawShadow });
      for (let x = 7; x <= 13; x++) {
        list.push({ x, y: 9, color: x <= 9 ? strawHighlight : strawColor });
      }
      for (let x = 14; x <= 17; x++) {
        list.push({ x, y: 9, color: strawShadow });
      }
      list.push({ x: 18, y: 9, color: strawOutline });

      // Brim curve row (y=10)
      list.push({ x: 3, y: 10, color: strawOutline });
      list.push({ x: 4, y: 10, color: strawShadow });
      for (let x = 5; x <= 18; x++) {
        list.push({ x, y: 10, color: x <= 8 ? strawHighlight : (x >= 14 ? strawShadow : strawColor) });
      }
      list.push({ x: 19, y: 10, color: strawShadow });
      list.push({ x: 20, y: 10, color: strawOutline });

      // Brim under boundary shadow (y=11 ends)
      list.push({ x: 3, y: 11, color: strawOutline });
      list.push({ x: 4, y: 11, color: strawOutline });
      list.push({ x: 19, y: 11, color: strawOutline });
      list.push({ x: 20, y: 11, color: strawOutline });
    }

    // 6. CUSTOM PIXEL HAT DRAWING FOR EQUIPPED ACCESSORY ON TOP OF THE HEAD
    if (!hasStrawHat) {
      const hatGrid = HAT_GRIDS[hatIdClean];
      const offsets = HAT_OFFSETS[hatIdClean] || { x: 4, y: 3 };
      if (hatGrid) {
        hatGrid.forEach((row, hatY) => {
          Array.from(row).forEach((char, hatX) => {
            if (char !== '.' && char !== ' ' && HAT_PALETTE[char]) {
              list.push({
                x: hatX + offsets.x,
                y: hatY + offsets.y,
                color: HAT_PALETTE[char]
              });
            }
          });
        });
      }
    }

    // 7. FEMALE HAIR FRONT DRAPE OVERLAY
    if (activeGender === 'female') {
      // Left side locks cascading in front of torso
      list.push({ x: 5, y: 15, color: out });
      list.push({ x: 6, y: 15, color: hair });
      list.push({ x: 7, y: 15, color: hair });

      list.push({ x: 5, y: 16, color: out });
      list.push({ x: 6, y: 16, color: hair });
      list.push({ x: 7, y: 16, color: hairShadow });

      list.push({ x: 6, y: 17, color: out });
      list.push({ x: 7, y: 17, color: hair });
      list.push({ x: 8, y: 17, color: hairShadow });

      list.push({ x: 6, y: 18, color: out });
      list.push({ x: 7, y: 18, color: hair });
      list.push({ x: 8, y: 18, color: hairShadow });

      list.push({ x: 6, y: 19, color: out });
      list.push({ x: 7, y: 19, color: hairShadow });
      list.push({ x: 8, y: 19, color: out });

      list.push({ x: 7, y: 20, color: out });
      list.push({ x: 8, y: 20, color: hairShadow });
      list.push({ x: 9, y: 20, color: out });

      // Right side locks cascading in front of torso (shaded)
      list.push({ x: 16, y: 15, color: hairShadow });
      list.push({ x: 17, y: 15, color: hairShadow });
      list.push({ x: 18, y: 15, color: out });

      list.push({ x: 16, y: 16, color: hairShadow });
      list.push({ x: 17, y: 16, color: hairShadow });
      list.push({ x: 18, y: 16, color: out });

      list.push({ x: 15, y: 17, color: hairShadow });
      list.push({ x: 16, y: 17, color: hairShadow });
      list.push({ x: 17, y: 17, color: out });

      list.push({ x: 15, y: 18, color: hairShadow });
      list.push({ x: 16, y: 18, color: hairShadow });
      list.push({ x: 17, y: 18, color: out });

      list.push({ x: 15, y: 19, color: out });
      list.push({ x: 16, y: 19, color: hairShadow });
      list.push({ x: 17, y: 19, color: out });

      list.push({ x: 14, y: 20, color: out });
      list.push({ x: 15, y: 20, color: hairShadow });
      list.push({ x: 16, y: 20, color: out });
    }

    return list;
  }, [activeOutfit, activeHat, hasStrawHat, hatIdClean, activeGender]);

  return (
    <div className={`relative ${sizeClass} rounded-2xl overflow-hidden border-2 border-primary/40 shadow-md select-none`}>
      
      {/* 2. SVG DEFINITIONS & FLORAL WALLPAPER PATTERN */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none select-none z-0" style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}>
        <defs>
          <pattern id="stardew-floral" width="48" height="48" patternUnits="userSpaceOnUse">
            {/* Sage Wallpaper Background */}
            <rect width="48" height="48" fill="#89a579" />
            
            {/* Vine Stems */}
            <path d="M12 0 v48 M36 0 v48" stroke="#40583a" strokeWidth="2" strokeDasharray="4,6" opacity="0.8" />
            
            {/* Stem leaves branching left & right */}
            <rect x="8" y="6" width="4" height="2" fill="#40583a" />
            <rect x="14" y="14" width="4" height="2" fill="#40583a" />
            <rect x="8" y="22" width="4" height="2" fill="#40583a" />
            <rect x="14" y="30" width="4" height="2" fill="#40583a" />
            <rect x="8" y="38" width="4" height="2" fill="#40583a" />

            <rect x="32" y="4" width="4" height="2" fill="#40583a" />
            <rect x="38" y="12" width="4" height="2" fill="#40583a" />
            <rect x="32" y="20" width="4" height="2" fill="#40583a" />
            <rect x="38" y="28" width="4" height="2" fill="#40583a" />
            <rect x="32" y="36" width="4" height="2" fill="#40583a" />
            <rect x="38" y="44" width="4" height="2" fill="#40583a" />

            {/* Light pastel micro-leaves */}
            <rect x="7" y="5" width="2" height="2" fill="#587650" />
            <rect x="15" y="13" width="2" height="2" fill="#587650" />
            <rect x="31" y="3" width="2" height="2" fill="#587650" />
            <rect x="39" y="11" width="2" height="2" fill="#587650" />
            <rect x="7" y="37" width="2" height="2" fill="#587650" />
            <rect x="15" y="29" width="2" height="2" fill="#587650" />

            {/* Vintage 5-pixelated white/cream floral heads with golden hubs */}
            {/* Flower 1 at x=24 y=10 */}
            <rect x="23" y="9" width="4" height="4" fill="#fffef7" />
            <rect x="21" y="10" width="8" height="2" fill="#fffef7" />
            <rect x="24" y="10" width="2" height="2" fill="#d9ad4c" />

            {/* Flower 2 at x=6 y=28 */}
            <rect x="5" y="27" width="4" height="4" fill="#fffef7" />
            <rect x="3" y="28" width="8" height="2" fill="#fffef7" />
            <rect x="6" y="28" width="2" height="2" fill="#d9ad4c" />

            {/* Flower 3 at x=42 y=32 */}
            <rect x="41" y="31" width="4" height="4" fill="#fffef7" />
            <rect x="39" y="32" width="8" height="2" fill="#fffef7" />
            <rect x="42" y="32" width="2" height="2" fill="#d9ad4c" />
          </pattern>
        </defs>
      </svg>

      {/* 1. LAYER ONE: BACKGROUND */}
      {bgDef?.imageUrl ? (
        <img 
          src={bgDef.imageUrl} 
          alt={activeBg} 
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300" 
          referrerPolicy="no-referrer"
        />
      ) : (activeBg === 'Autumn Harvest Field' || activeBg === 'Autumn Row') ? (
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 24 32" 
          style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}
        >
          {/* Sky background */}
          <rect x="0" y="0" width="24" height="13" fill="#ffeaa7" />
          <rect x="0" y="5" width="24" height="4" fill="#ffb347" />
          <rect x="0" y="9" width="24" height="4" fill="#f39c12" />
          
          {/* Distant mountains/trees */}
          <rect x="1" y="11" width="4" height="3" fill="#d35400" />
          <rect x="3" y="12" width="6" height="2" fill="#e67e22" />
          <rect x="8" y="10" width="5" height="4" fill="#d35400" />
          <rect x="12" y="11" width="7" height="3" fill="#e67e22" />
          <rect x="17" y="10" width="6" height="4" fill="#d35400" />

          {/* Dirt Ground rows */}
          <rect x="0" y="13" width="24" height="19" fill="#5c3a21" />
          {/* Tilled ridges */}
          <rect x="0" y="15" width="24" height="1" fill="#422510" />
          <rect x="0" y="19" width="24" height="1" fill="#422510" />
          <rect x="0" y="23" width="24" height="1" fill="#422510" />
          <rect x="0" y="27" width="24" height="1" fill="#422510" />
          <rect x="0" y="31" width="24" height="1" fill="#422510" />

          {/* Golden leaves drifting */}
          <rect x="4" y="3" width="1" height="1" fill="#e67e22" />
          <rect x="18" y="4" width="1" height="1" fill="#d35400" />
          <rect x="12" y="7" width="1" height="1" fill="#f1c40f" />
          <rect x="7" y="10" width="1" height="1" fill="#e67e22" />

          {/* Pumpkins on the ground! */}
          {/* Pumpkin 1 (bottom left) */}
          <rect x="2" y="25" width="3" height="3" fill="#e67e22" />
          <rect x="3" y="24" width="1" height="1" fill="#27ae60" />
          <rect x="2" y="26" width="1" height="1" fill="#d35400" />

          {/* Pumpkin 2 (bottom right) */}
          <rect x="19" y="26" width="3" height="3" fill="#e67e22" />
          <rect x="20" y="25" width="1" height="1" fill="#27ae60" />
          <rect x="21" y="27" width="1" height="1" fill="#d35400" />
        </svg>
      ) : (activeBg === 'Astral Canopy Room' || activeBg === 'Celestial Canopy') ? (
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 24 32" 
          style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}
        >
          {/* Dark space base */}
          <rect x="0" y="0" width="24" height="32" fill="#151329" />
          
          {/* Glowing purple nebulas */}
          <rect x="2" y="4" width="8" height="6" fill="#2e1137" />
          <rect x="3" y="5" width="5" height="4" fill="#3c1c48" />
          <rect x="12" y="14" width="10" height="8" fill="#2e1137" />
          <rect x="14" y="16" width="6" height="4" fill="#3c1c48" />

          {/* Big mystical yellow-gold crescent planet on top-right */}
          <rect x="16" y="5" width="5" height="5" fill="#f1c40f" />
          <rect x="17" y="4" width="3" height="7" fill="#f1c40f" />
          <rect x="15" y="6" width="7" height="3" fill="#f1c40f" />
          {/* crescent overlap shadow */}
          <rect x="15" y="5" width="2" height="2" fill="#151329" />
          <rect x="16" y="4" width="1" height="4" fill="#151329" />
          <rect x="15" y="4" width="3" height="2" fill="#151329" />

          {/* Scattered pixelated bright yellow & white stars */}
          <rect x="3" y="12" width="1" height="1" fill="#ffffff" />
          <rect x="19" y="3" width="1" height="1" fill="#ffd07b" />
          <rect x="11" y="8" width="1" height="1" fill="#ffffff" />
          <rect x="1" y="24" width="1" height="1" fill="#ffd07b" />
          <rect x="21" y="28" width="1" height="1" fill="#ffffff" />
          <rect x="13" y="25" width="1" height="1" fill="#f1c40f" />
          <rect x="8" y="20" width="1" height="1" fill="#ffffff" />

          {/* Deep celestial elements */}
          <rect x="5" y="2" width="1" height="1" fill="#34495e" />
          <rect x="14" y="12" width="1" height="1" fill="#34495e" />
        </svg>
      ) : activeBg === 'Vintage Foliage Wallpaper' ? (
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 24 32" 
          style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}
        >
          <rect x="0" y="0" width="24" height="32" fill="#729c66" />
          {/* Vertical vining leaf chains */}
          <rect x="6" y="0" width="1" height="32" fill="#395c33" />
          <rect x="5" y="4" width="1" height="1" fill="#395c33" />
          <rect x="7" y="5" width="1" height="1" fill="#395c33" />
          <rect x="5" y="12" width="1" height="1" fill="#395c33" />
          <rect x="7" y="13" width="1" height="1" fill="#395c33" />
          <rect x="5" y="20" width="1" height="1" fill="#395c33" />
          <rect x="7" y="21" width="1" height="1" fill="#395c33" />
          <rect x="5" y="28" width="1" height="1" fill="#395c33" />
          <rect x="7" y="29" width="1" height="1" fill="#395c33" />

          <rect x="18" y="0" width="1" height="32" fill="#395c33" />
          <rect x="17" y="2" width="1" height="1" fill="#395c33" />
          <rect x="19" y="3" width="1" height="1" fill="#395c33" />
          <rect x="17" y="10" width="1" height="1" fill="#395c33" />
          <rect x="19" y="11" width="1" height="1" fill="#395c33" />
          <rect x="17" y="18" width="1" height="1" fill="#395c33" />
          <rect x="19" y="19" width="1" height="1" fill="#395c33" />
          <rect x="17" y="26" width="1" height="1" fill="#395c33" />
          <rect x="19" y="27" width="1" height="1" fill="#395c33" />

          {/* Golden buttercup flowers */}
          <rect x="11" y="8" width="2" height="2" fill="#fddb53" />
          <rect x="12" y="8" width="1" height="1" fill="#e69c24" />
          <rect x="12" y="9" width="1" height="1" fill="#e69c24" />

          <rect x="2" y="16" width="2" height="2" fill="#fddb53" />
          <rect x="3" y="16" width="1" height="1" fill="#e69c24" />

          <rect x="14" y="24" width="2" height="2" fill="#fddb53" />
          <rect x="15" y="24" width="1" height="1" fill="#e69c24" />
        </svg>
      ) : activeBg === 'Sunny Garden Beds' ? (
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 24 32" 
          style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}
        >
          {/* Clear Sky */}
          <rect x="0" y="0" width="24" height="11" fill="#89cbf0" />
          <rect x="17" y="2" width="4" height="4" fill="#fdf057" />
          <rect x="15" y="4" width="8" height="1" fill="#fdf057" opacity="0.6" />
          <rect x="19" y="1" width="1" height="6" fill="#fdf057" opacity="0.6" />
          
          {/* Grassy ground */}
          <rect x="0" y="11" width="24" height="21" fill="#5eac3b" />
          <rect x="0" y="10" width="8" height="1" fill="#5eac3b" />
          <rect x="16" y="10" width="8" height="1" fill="#5eac3b" />

          {/* Wooden Raised Planter Beds and Sprouting Plants */}
          <rect x="1" y="13" width="9" height="7" fill="#4c321b" />
          <rect x="2" y="14" width="7" height="5" fill="#735639" />
          <rect x="3" y="13" width="1" height="2" fill="#229124" />
          <rect x="3" y="15" width="1" height="1" fill="#e65924" />
          <rect x="5" y="12" width="1" height="2" fill="#229124" />
          <rect x="7" y="13" width="1" height="2" fill="#229124" />

          <rect x="14" y="13" width="9" height="7" fill="#4c321b" />
          <rect x="15" y="14" width="7" height="5" fill="#735639" />
          <rect x="16" y="12" width="1" height="2" fill="#229124" />
          <rect x="18" y="13" width="1" height="2" fill="#229124" />
          <rect x="18" y="15" width="1" height="1" fill="#e65924" />
          <rect x="20" y="13" width="1" height="2" fill="#229124" />

          <rect x="1" y="23" width="9" height="7" fill="#4c321b" />
          <rect x="2" y="24" width="7" height="5" fill="#735639" />
          <rect x="4" y="23" width="1" height="2" fill="#229124" />
          <rect x="7" y="22" width="1" height="3" fill="#229124" />

          <rect x="14" y="23" width="9" height="7" fill="#4c321b" />
          <rect x="15" y="24" width="7" height="5" fill="#735639" />
          <rect x="16" y="22" width="1" height="3" fill="#229124" />
          <rect x="19" y="23" width="1" height="2" fill="#229124" />
        </svg>
      ) : activeBg === 'Busy Bee Sanctuary' ? (
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 24 32" 
          style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}
        >
          <rect x="0" y="0" width="24" height="32" fill="#84a675" />
          {/* Subtle floral motifs on the sage wall */}
          <rect x="4" y="3" width="2" height="2" fill="#678a59" />
          <rect x="18" y="5" width="2" height="2" fill="#678a59" />
          <rect x="12" y="15" width="2" height="2" fill="#678a59" />
          <rect x="3" y="22" width="2" height="2" fill="#678a59" />

          {/* Left Apiary Beehive */}
          <rect x="2" y="11" width="7" height="9" fill="#8e5917" />
          <rect x="3" y="12" width="5" height="7" fill="#c08432" />
          <rect x="3" y="14" width="5" height="1" fill="#8e5917" />
          <rect x="3" y="16" width="5" height="1" fill="#8e5917" />
          <rect x="5" y="18" width="1" height="1" fill="#151329" />

          {/* Fresh summer honey jar */}
          <rect x="10" y="17" width="3" height="3" fill="#ffffff" />
          <rect x="10" y="18" width="3" height="2" fill="#e4aa23" />
          <rect x="11" y="19" width="1" height="1" fill="#cc241a" />

          {/* Right taller Box hive */}
          <rect x="16" y="10" width="6" height="11" fill="#8e5917" />
          <rect x="17" y="11" width="4" height="9" fill="#c08432" />
          <rect x="17" y="13" width="4" height="1" fill="#8e5917" />
          <rect x="17" y="16" width="4" height="1" fill="#8e5917" />
          <rect x="18" y="18" width="2" height="1" fill="#151329" />

          {/* Pixelated honeybees wandering in the wild */}
          <rect x="12" y="5" width="2" height="1" fill="#eed14c" />
          <rect x="13" y="5" width="1" height="1" fill="#1a1a15" />
          <rect x="12" y="4" width="1" height="1" fill="#ffffff" opacity="0.8" />

          <rect x="5" y="7" width="2" height="1" fill="#eed14c" />
          <rect x="5" y="7" width="1" height="1" fill="#1a1a15" />
          <rect x="6" y="6" width="1" height="1" fill="#ffffff" opacity="0.8" />

          <rect x="15" y="14" width="2" height="1" fill="#eed14c" />
          <rect x="16" y="14" width="1" height="1" fill="#1a1a15" />
          <rect x="15" y="13" width="1" height="1" fill="#ffffff" opacity="0.8" />

          {/* Base Wildflowers */}
          <rect x="1" y="27" width="1" height="2" fill="#40583a" />
          <rect x="1" y="26" width="1" height="1" fill="#b35ecf" />
          <rect x="22" y="28" width="1" height="2" fill="#40583a" />
          <rect x="22" y="27" width="1" height="1" fill="#d8372b" />
        </svg>
      ) : activeBg === 'Apple Orchard Walk' ? (
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 24 32" 
          style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}
        >
          {/* Sky background */}
          <rect x="0" y="0" width="24" height="12" fill="#a5dbf3" />
          <rect x="4" y="3" width="6" height="2" fill="#ffffff" opacity="0.5" />
          <rect x="5" y="2" width="4" height="4" fill="#ffffff" opacity="0.5" />

          {/* Grass Floor */}
          <rect x="0" y="12" width="24" height="20" fill="#6da94e" />

          {/* Apple Tree Left */}
          <rect x="1" y="9" width="3" height="11" fill="#583a24" />
          <rect x="2" y="11" width="2" height="9" fill="#8c5c36" />
          <rect x="0" y="3" width="6" height="7" fill="#2d6632" />
          <rect x="1" y="2" width="4" height="9" fill="#3d7931" />
          <rect x="1" y="5" width="1" height="1" fill="#cc2817" />
          <rect x="4" y="4" width="1" height="1" fill="#cc2817" />
          <rect x="2" y="8" width="1" height="1" fill="#cc2817" />
          <rect x="4" y="7" width="1" height="1" fill="#ec503e" />

          {/* Apple Tree Right */}
          <rect x="20" y="9" width="3" height="11" fill="#583a24" />
          <rect x="20" y="10" width="2" height="10" fill="#8c5c36" />
          <rect x="18" y="3" width="6" height="7" fill="#2d6632" />
          <rect x="19" y="2" width="4" height="9" fill="#3d7931" />
          <rect x="19" y="5" width="1" height="1" fill="#cc2817" />
          <rect x="22" y="4" width="1" height="1" fill="#cc2817" />
          <rect x="20" y="8" width="1" height="1" fill="#ec503e" />

          {/* Apples on lawn */}
          <rect x="5" y="15" width="1" height="1" fill="#cc2817" />
          <rect x="8" y="18" width="1" height="1" fill="#ec503e" />
          <rect x="18" y="16" width="1" height="1" fill="#cc2817" />
          <rect x="15" y="19" width="1" height="1" fill="#cc2817" />
        </svg>
      ) : activeBg === 'Plentiful Vineyard Rows' ? (
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 24 32" 
          style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}
        >
          {/* Sunset glow sky */}
          <rect x="0" y="0" width="24" height="10" fill="#ffd294" />
          <rect x="0" y="8" width="24" height="3" fill="#cc82a1" />
          <rect x="3" y="7" width="8" height="2" fill="#cc82a1" />
          <rect x="15" y="7" width="9" height="2" fill="#cc82a1" />

          {/* Ground fields with soil paths */}
          <rect x="0" y="10" width="24" height="22" fill="#7cb058" />
          <polygon points="10,10 14,10 21,32 3,32" fill="#7d5b41" />

          {/* Left Grape Trellis rows */}
          <rect x="1" y="9" width="1" height="23" fill="#583a24" />
          <rect x="0" y="13" width="4" height="1" fill="#8a8a8a" />
          <rect x="0" y="20" width="4" height="1" fill="#8a8a8a" />
          <rect x="0" y="11" width="3" height="5" fill="#2d6632" />
          <rect x="1" y="18" width="2" height="6" fill="#3d7931" />
          <rect x="1" y="14" width="2" height="2" fill="#5d247d" />
          <rect x="2" y="15" width="1" height="2" fill="#8137a6" />
          <rect x="0" y="21" width="2" height="3" fill="#5d247d" />
          <rect x="1" y="22" width="1" height="1" fill="#8137a6" />

          {/* Right Grape Trellis rows */}
          <rect x="22" y="9" width="1" height="23" fill="#583a24" />
          <rect x="20" y="13" width="4" height="1" fill="#8a8a8a" />
          <rect x="20" y="20" width="4" height="1" fill="#8a8a8a" />
          <rect x="21" y="11" width="3" height="6" fill="#2d6632" />
          <rect x="20" y="18" width="3" height="5" fill="#3d7931" />
          <rect x="22" y="14" width="2" height="3" fill="#5d247d" />
          <rect x="23" y="15" width="1" height="1" fill="#8137a6" />
          <rect x="20" y="21" width="2" height="2" fill="#5d247d" />
        </svg>
      ) : activeBg === "Blooming Florist's Corner" ? (
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 24 32" 
          style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}
        >
          {/* Wooden Backdrop Fence panel walls */}
          <rect x="0" y="0" width="24" height="12" fill="#fceff0" />
          <rect x="2" y="4" width="1" height="8" fill="#dfc0a5" />
          <rect x="6" y="4" width="1" height="8" fill="#dfc0a5" />
          <rect x="10" y="4" width="1" height="8" fill="#dfc0a5" />
          <rect x="14" y="4" width="1" height="8" fill="#dfc0a5" />
          <rect x="18" y="4" width="1" height="8" fill="#dfc0a5" />
          <rect x="22" y="4" width="1" height="8" fill="#dfc0a5" />
          <rect x="0" y="6" width="24" height="1" fill="#bc9878" />

          {/* Rich Grass Bed base */}
          <rect x="0" y="12" width="24" height="20" fill="#5ea346" />

          {/* Vibrant colorful flower lines */}
          <rect x="1" y="11" width="1" height="4" fill="#327c28" />
          <rect x="1" y="10" width="1" height="1" fill="#e53b47" />
          <rect x="3" y="13" width="1" height="3" fill="#327c28" />
          <rect x="3" y="12" width="1" height="1" fill="#f979b0" />
          <rect x="0" y="15" width="1" height="4" fill="#327c28" />
          <rect x="0" y="14" width="1" height="1" fill="#f7c233" />

          <rect x="20" y="12" width="1" height="5" fill="#327c28" />
          <rect x="20" y="11" width="1" height="1" fill="#547cf2" />
          <rect x="22" y="14" width="1" height="4" fill="#327c28" />
          <rect x="22" y="13" width="1" height="1" fill="#e53b47" />

          {/* Fresh Cut bouquet centered */}
          <polygon points="8,31 16,31 18,22 6,22" fill="#faf5dc" />
          <rect x="9" y="27" width="6" height="1" fill="#8854ef" />
          <rect x="11" y="26" width="2" height="3" fill="#8854ef" />
          <rect x="7" y="21" width="2" height="2" fill="#e53b47" />
          <rect x="10" y="20" width="2" height="2" fill="#f7c233" />
          <rect x="13" y="21" width="3" height="2" fill="#f979b0" />
          <rect x="9" y="19" width="1" height="2" fill="#ffffff" />
          <rect x="12" y="19" width="1" height="2" fill="#547cf2" />
        </svg>
      ) : activeBg === 'Strawberry Fenced Garden' ? (
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 24 32" 
          style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}
        >
          {/* Summer skies and floating clouds */}
          <rect x="0" y="0" width="24" height="11" fill="#a7e6e3" />
          <rect x="2" y="3" width="4" height="2" fill="#ffffff" opacity="0.6" />

          {/* Wooden Picket boundary fence */}
          <rect x="0" y="11" width="24" height="8" fill="#ae8057" />
          <rect x="3" y="11" width="1" height="8" fill="#8c582c" />
          <rect x="7" y="11" width="1" height="8" fill="#8c582c" />
          <rect x="11" y="11" width="1" height="8" fill="#8c582c" />
          <rect x="15" y="11" width="1" height="8" fill="#8c582c" />
          <rect x="19" y="11" width="1" height="8" fill="#8c582c" />
          <rect x="23" y="11" width="1" height="8" fill="#8c582c" />

          {/* Ladybug Signpost on Fence */}
          <rect x="15" y="13" width="1" height="7" fill="#583a24" />
          <rect x="13" y="11" width="5" height="4" fill="#f5eedc" />
          <rect x="13" y="10" width="5" height="1" fill="#8c582c" />
          <rect x="15" y="12" width="2" height="2" fill="#e11b1b" />
          <rect x="15" y="11" width="1" height="1" fill="#1a1a24" />

          {/* Strawberry field floor */}
          <rect x="0" y="19" width="24" height="13" fill="#67a94d" />
          <rect x="1" y="21" width="6" height="4" fill="#288a38" />
          <rect x="3" y="22" width="1" height="1" fill="#ff0c24" />
          <rect x="5" y="23" width="1" height="1" fill="#ff0c24" />

          <rect x="16" y="22" width="7" height="4" fill="#288a38" />
          <rect x="18" y="23" width="1" height="1" fill="#ff0c24" />
          <rect x="21" y="22" width="1" height="1" fill="#ff0c24" />

          <rect x="8" y="26" width="8" height="4" fill="#288a38" />
          <rect x="10" y="27" width="1" height="1" fill="#ff0c24" />
          <rect x="13" y="28" width="1" height="1" fill="#ff0c24" />
        </svg>
      ) : activeBg === 'Cozy Supply Workshop' ? (
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 24 32" 
          style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}
        >
          {/* Deep brown-red brick walls in potting house background */}
          <rect x="0" y="0" width="24" height="32" fill="#582f25" />
          <rect x="0" y="1" width="11" height="3" fill="#b66551" />
          <rect x="13" y="1" width="11" height="3" fill="#b66551" />
          <rect x="0" y="5" width="5" height="3" fill="#b66551" />
          <rect x="7" y="5" width="12" height="3" fill="#b66551" />
          <rect x="21" y="5" width="3" height="3" fill="#b66551" />
          <rect x="0" y="9" width="14" height="3" fill="#b66551" />
          <rect x="16" y="9" width="8" height="3" fill="#b66551" />
          <rect x="0" y="13" width="7" height="3" fill="#b66551" />
          <rect x="9" y="13" width="15" height="3" fill="#b66551" />
          <rect x="0" y="17" width="17" height="3" fill="#b66551" />
          <rect x="19" y="17" width="5" height="3" fill="#b66551" />
          <rect x="0" y="21" width="10" height="3" fill="#b66551" />
          <rect x="12" y="21" width="12" height="3" fill="#b66551" />

          {/* Hanging trailing vines */}
          <rect x="0" y="0" width="3" height="5" fill="#227027" />
          <rect x="1" y="4" width="2" height="3" fill="#328a38" />
          <rect x="3" y="1" width="2" height="2" fill="#227027" />
          <rect x="5" y="0" width="3" height="1" fill="#227027" />

          {/* Gardening supplies cabinet shelf */}
          <rect x="15" y="6" width="8" height="18" fill="#4d2c18" />
          <rect x="16" y="7" width="6" height="5" fill="#2b1a10" />
          <rect x="17" y="9" width="1" height="2" fill="#3b9bf1" />
          <rect x="19" y="10" width="2" height="1" fill="#f1da3b" />

          <rect x="16" y="13" width="6" height="5" fill="#2b1a10" />
          <rect x="17" y="16" width="2" height="1" fill="#f15b3b" />
          <rect x="20" y="15" width="1" height="2" fill="#5bf13b" />

          <rect x="16" y="19" width="6" height="4" fill="#2b1a10" />
          <rect x="15" y="12" width="8" height="1" fill="#4d2c18" />
          <rect x="15" y="18" width="8" height="1" fill="#4d2c18" />

          {/* Workbench with starter seedling trays */}
          <rect x="1" y="20" width="12" height="12" fill="#4a2c14" />
          <rect x="2" y="21" width="10" height="11" fill="#6d4221" />
          <rect x="3" y="18" width="3" height="3" fill="#b5622a" />
          <rect x="4" y="17" width="1" height="1" fill="#4eb92f" />
          <rect x="8" y="19" width="2" height="2" fill="#b5622a" />
          <rect x="9" y="18" width="1" height="1" fill="#4eb92f" />
        </svg>
      ) : bgFill ? (
        <div className="absolute inset-0 w-full h-full" style={{ background: bgFill }} />
      ) : (
        <div className={`absolute inset-0 w-full h-full ${bgStyles} transition-all duration-300 flex items-center justify-center overflow-hidden`} />
      )}

      {/* 2. LAYER TWO: BASE CHARACTER BODY (CUTE RETRO PIXEL GRID IN 24x32 RESOLUTION) */}
      <div className="absolute inset-x-0 bottom-[4%] top-[8%] flex justify-center items-end">
        <svg 
          viewBox="0 0 24 32" 
          className="w-[90%] h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] select-none"
          style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}
        >
          {characterPixels.map((p, idx) => (
            <rect 
              key={idx} 
              x={p.x} 
              y={p.y} 
              width="1.03" // slightly overlapping to avoid rendering subpixel line gaps in browser rendering engines
              height="1.03" 
              fill={p.color} 
            />
          ))}
        </svg>
      </div>

      {/* 3. LAYER THREE: CUSTOM HAT OVERLAYS FOR GACHA ACCESSORIES WITH UPLOADED IMAGE URLS (STANDARD PIXEL HATS ARE NOW INTEGRATED ON-GRID) */}
      {hasHatEquipped && !hasStrawHat && hatDef?.imageUrl && (
        <div className={
          hatIdClean === 'chic glasses' 
            ? "absolute top-[41%] left-1/2 -translate-x-1/2 w-[34%] h-[34%] z-30 select-none"
            : hatIdClean === 'sprout clip'
            ? "absolute top-[21%] left-[58%] -translate-x-1/2 w-[18%] h-[18%] z-30 select-none animate-pulse"
            : "absolute top-[3%] left-1/2 -translate-x-1/2 w-[58%] h-[58%] z-30 select-none"
        }>
          <img 
            src={hatDef.imageUrl} 
            alt={activeHat} 
            className="w-full h-full object-contain" 
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* 4. LAYER FOUR: INDEPENDENT HAND PROP TOOLS (LIKE RAKES, BASKETS, SHEARS, ETC.) */}
      {activeProp && (
        <div className="absolute bottom-[2%] right-[2%] w-[45%] h-[45%] z-30 select-none filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
          {propDef?.imageUrl ? (
            <img 
              src={propDef.imageUrl} 
              alt={activeProp} 
              className="w-full h-full object-contain transition-all duration-300 transform"
              referrerPolicy="no-referrer"
            />
          ) : (
            <PixelProp id={activeProp} className="w-full h-full" />
          )}
        </div>
      )}

    </div>
  );
};
