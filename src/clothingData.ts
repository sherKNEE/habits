export interface ClothingItem {
  id: string; // matches unlocked name, e.g., 'Beekeeper Suit'
  category: 'outfits' | 'props' | 'backgrounds';
  name: string;
  cost: number;
  rarity: 'Common' | 'Rare' | 'Legendary';
  imageUrl: string; // custom upload URL or fallback
  description: string;
}

export const BASE_CLOTHING: ClothingItem[] = [
  {
    id: 'Standard Overalls',
    category: 'outfits',
    name: 'Standard Overalls',
    cost: 0,
    rarity: 'Common',
    imageUrl: '',
    description: 'The basic denim work apparel of every novice gardener. comfortable and simple.'
  },
  {
    id: 'Beekeeper Suit',
    category: 'outfits',
    name: 'Beekeeper Smock',
    cost: 1500,
    rarity: 'Rare',
    imageUrl: '',
    description: 'Sealed thick golden-white fabric. Essential for handling aggressive hive swarms.'
  },
  {
    id: 'Master Farmer Overalls',
    category: 'outfits',
    name: 'Master Farmer Apron',
    cost: 3200,
    rarity: 'Legendary',
    imageUrl: '',
    description: 'Premium embroidered emerald apron given to esteemed veterans.'
  },
  {
    id: 'Celestial Hood',
    category: 'outfits',
    name: 'Celestial Cloak',
    cost: 5000,
    rarity: 'Legendary',
    imageUrl: '',
    description: 'A shimmering astronomical stars-etched ceremonial evening cloth.'
  },
  {
    id: 'Cowboy Gear',
    category: 'outfits',
    name: 'Cowboy Outfit',
    cost: 1800,
    rarity: 'Rare',
    imageUrl: '',
    description: 'Traditional work denim overalls paired with a cozy crimson bandana neck wrap.'
  },
  {
    id: 'Garden Apron',
    category: 'outfits',
    name: 'Garden Apron',
    cost: 600,
    rarity: 'Common',
    imageUrl: '',
    description: 'A soft utility garden apron over a sage-green shirt with double front tool slot pockets.'
  },
  {
    id: 'Autumn Stripe Knit',
    category: 'outfits',
    name: 'Autumn Stripe Knit',
    cost: 850,
    rarity: 'Common',
    imageUrl: '',
    description: 'A cozy heavy knit wool sweater in horizontal stripes of orange, yellow, and forest green.'
  },
  {
    id: 'Peasant Blouse',
    category: 'outfits',
    name: 'Peasant Blouse',
    cost: 1150,
    rarity: 'Rare',
    imageUrl: '',
    description: 'A romantic light cream peasant cotton blouse with loose, flowing sleeves and denim jeans.'
  },
  {
    id: 'Explorer Gear',
    category: 'outfits',
    name: 'Explorer Gear',
    cost: 1600,
    rarity: 'Rare',
    imageUrl: '',
    description: 'A comfortable canvas safari utility vest with front clip compartments and leather mud-gloves.'
  },
  {
    id: 'Tweed Blazer',
    category: 'outfits',
    name: 'Formal Tweed',
    cost: 3500,
    rarity: 'Legendary',
    imageUrl: '',
    description: 'A sophisticated, checked wool blazer in rich academia charcoal, complete with tie and lapels.'
  },
  {
    id: 'Space-Farm Jumpsuit',
    category: 'outfits',
    name: 'Space-Farm Jumpsuit',
    cost: 4500,
    rarity: 'Legendary',
    imageUrl: '',
    description: 'A high-tech pressurized white space suit with control valves and a gold wheat badge on the chest.'
  },
  {
    id: 'Mustard Hoodie',
    category: 'outfits',
    name: 'Mustard Hoodie',
    cost: 500,
    rarity: 'Common',
    imageUrl: '',
    description: 'A relaxed bright yellow fleece hoodie with adjustable drawstring hood and hand-warmer pockets.'
  },
  {
    id: 'Crimson Pullover',
    category: 'outfits',
    name: 'Crimson Pullover',
    cost: 550,
    rarity: 'Common',
    imageUrl: '',
    description: 'A cozy crimson red thermal sweater with subtle retro-striped details.'
  },
  {
    id: 'Floral Overalls',
    category: 'outfits',
    name: 'Floral Overalls',
    cost: 1400,
    rarity: 'Rare',
    imageUrl: '',
    description: 'Sweet denim overalls custom-embroidered with tiny happy sunflower blossoms.'
  },
  {
    id: 'Winter Overalls',
    category: 'outfits',
    name: 'Winter Overalls',
    cost: 1350,
    rarity: 'Rare',
    imageUrl: '',
    description: 'Thick scarlet red velvet dungarees lined with fluffy hand-stitched white holiday wool trim.'
  },
  {
    id: 'Wool Cable-Knit',
    category: 'outfits',
    name: 'Wool Cable-Knit',
    cost: 700,
    rarity: 'Common',
    imageUrl: '',
    description: 'An elegant heavyweight braided cream wool sweater designed for breezy autumn mornings.'
  },
  {
    id: 'Vintage Rake',
    category: 'props',
    name: 'Vintage Rake',
    cost: 0,
    rarity: 'Common',
    imageUrl: '',
    description: 'Traditional wooden-toothed rake.'
  },
  {
    id: 'Golden Shovel',
    category: 'props',
    name: 'Golden Work Shovel',
    cost: 1205,
    rarity: 'Rare',
    imageUrl: '',
    description: 'Gilded hand spadeware reflecting premium sunrise light.'
  },
  {
    id: 'Cozy Mug',
    category: 'props',
    name: 'Cozy Mug',
    cost: 800,
    rarity: 'Common',
    imageUrl: '',
    description: 'A warm mug of organic green lavender tea. Rich inside steam.'
  },
  {
    id: 'Bucket Hat',
    category: 'props',
    name: 'Bucket Hat',
    cost: 400,
    rarity: 'Common',
    imageUrl: '',
    description: 'A cool blue canvas fishing hat with micro stitches and hanging ties.'
  },
  {
    id: 'Classic Cap',
    category: 'props',
    name: 'Classic Cap',
    cost: 500,
    rarity: 'Common',
    imageUrl: '',
    description: 'A sports-fitting clean white baseball cap featuring a leaf logo on front.'
  },
  {
    id: 'Pirate Hat',
    category: 'props',
    name: 'Pirate Hat',
    cost: 2500,
    rarity: 'Legendary',
    imageUrl: '',
    description: 'A grand captain brimmed hat wrapped by a detailed crimson ribbon sash.'
  },
  {
    id: 'Bowler Hat',
    category: 'props',
    name: 'Bowler Hat',
    cost: 1100,
    rarity: 'Rare',
    imageUrl: '',
    description: 'Classy deep circular black felt headwear highlighted by a sleek green band.'
  },
  {
    id: 'Santa Hat',
    category: 'props',
    name: 'Santa Hat',
    cost: 1200,
    rarity: 'Rare',
    imageUrl: '',
    description: 'Cosy red felt winter cone adorned with fluffy trim and a brass bell accessory.'
  },
  {
    id: 'Flower Wreath',
    category: 'props',
    name: 'Flower Wreath',
    cost: 1400,
    rarity: 'Rare',
    imageUrl: '',
    description: 'A beautiful circle crown hand-braided with colorful valley blossom buds.'
  },
  {
    id: 'Witch Hat',
    category: 'props',
    name: 'Witch Hat',
    cost: 3050,
    rarity: 'Legendary',
    imageUrl: '',
    description: 'Tilted tall purple conical fabric with an ancient buckled leather girdle ribbon.'
  },
  {
    id: 'Party Hat',
    category: 'props',
    name: 'Party Hat',
    cost: 600,
    rarity: 'Common',
    imageUrl: '',
    description: 'Polka spiral celebration cone of fun stripes topped by a fuzzy purple pom.'
  },
  {
    id: 'Leprechaun Hat',
    category: 'props',
    name: 'Leprechaun Hat',
    cost: 1600,
    rarity: 'Rare',
    imageUrl: '',
    description: 'A tall emerald green stovepipe top hat finished with gold square buckle clasp.'
  },
  {
    id: 'Construction Hardhat',
    category: 'props',
    name: 'Construction Hardhat',
    cost: 750,
    rarity: 'Common',
    imageUrl: '',
    description: 'Strong safety orange helmet stamped with miniature crossed tools insignia.'
  },
  {
    id: 'Royal Crown',
    category: 'props',
    name: 'Royal Crown',
    cost: 5000,
    rarity: 'Legendary',
    imageUrl: '',
    description: 'Eminent gold battlement crown layered with a red cushion and embedded gems.'
  },
  {
    id: 'Sprout Clip',
    category: 'props',
    name: 'Sprout Clip',
    cost: 300,
    rarity: 'Common',
    imageUrl: '',
    description: 'A miniature leaf stem pin clip that springs beautifully into your locks.'
  },
  {
    id: 'Bear Ears Headband',
    category: 'props',
    name: 'Bear Ears Headband',
    cost: 950,
    rarity: 'Rare',
    imageUrl: '',
    description: 'Plush velvet hoop featuring two fluffy circular bear ears and pretty red ribbons.'
  },
  {
    id: 'Chef Hat',
    category: 'props',
    name: 'Chef Hat',
    cost: 800,
    rarity: 'Common',
    imageUrl: '',
    description: 'Excellent vertical white pleated gourmet wrap hosting a gold wheat sticker.'
  },
  {
    id: 'Knitted Beanie',
    category: 'props',
    name: 'Knitted Beanie',
    cost: 450,
    rarity: 'Common',
    imageUrl: '',
    description: 'Sky-blue winter knitted ribbed skull cap with a dynamic crown pom-pom.'
  },
  {
    id: 'Chic Glasses',
    category: 'props',
    name: 'Chic Glasses',
    cost: 550,
    rarity: 'Common',
    imageUrl: '',
    description: 'Sweet tortoiseshell glass frames that boost your aesthetic garden presence.'
  },
  {
    id: 'Elegant Headband',
    category: 'props',
    name: 'Elegant Headband',
    cost: 350,
    rarity: 'Common',
    imageUrl: '',
    description: 'A clean black ribbon wrap to hold back hair locks during deep gardening works.'
  },
  {
    id: 'Conical Straw Hat',
    category: 'props',
    name: 'Conical Straw Hat',
    cost: 1350,
    rarity: 'Rare',
    imageUrl: '',
    description: 'A traditional sloping conical straw-weave shield which blocks bright midday sun rays.'
  },
  {
    id: 'Classic Sun Hat',
    category: 'props',
    name: 'Classic Sun Hat',
    cost: 700,
    rarity: 'Common',
    imageUrl: '',
    description: 'Flat top woven sun-shading helmet complete with a thick brown leather strap.'
  },
  {
    id: 'Floppy Straw Hat',
    category: 'props',
    name: 'Floppy Straw Hat',
    cost: 650,
    rarity: 'Common',
    imageUrl: '',
    description: 'Curly woven broad-brimmed floppy straw hat giving cute rustic farmer charm.'
  },
  {
    id: 'Watering Can',
    category: 'props',
    name: 'Watering Can',
    cost: 450,
    rarity: 'Common',
    imageUrl: '',
    description: 'A classic copper watering can with a dynamic rain sprinkle rose nozzle.'
  },
  {
    id: 'Gardening Trowel',
    category: 'props',
    name: 'Gardening Trowel',
    cost: 500,
    rarity: 'Common',
    imageUrl: '',
    description: 'A sturdy chrome-alloy hand spade with a beautiful wooden grip.'
  },
  {
    id: 'Hand Rake',
    category: 'props',
    name: 'Hand Rake',
    cost: 550,
    rarity: 'Common',
    imageUrl: '',
    description: 'A miniature strong steel cultivation claw claw for cleaning soil beds.'
  },
  {
    id: 'Empty Basket',
    category: 'props',
    name: 'Empty Basket',
    cost: 600,
    rarity: 'Common',
    imageUrl: '',
    description: 'A hand-woven wicker deep shoulder basket for transporting gathered fresh crops.'
  },
  {
    id: 'Herbology Book',
    category: 'props',
    name: 'Herbology Book',
    cost: 1550,
    rarity: 'Rare',
    imageUrl: '',
    description: 'An ancient leather-bound leaf-wrapped guidebook about magical crop species.'
  },
  {
    id: 'Gardening Shears',
    category: 'props',
    name: 'Gardening Shears',
    cost: 1300,
    rarity: 'Rare',
    imageUrl: '',
    description: 'Sharp bypass pruning shears perfect for neat canopy sculpting.'
  },
  {
    id: 'Spells Pouch',
    category: 'props',
    name: 'Spells Pouch',
    cost: 1800,
    rarity: 'Rare',
    imageUrl: '',
    description: 'A magical suede satchel stuffed with fertilizer reagents, seed samples and glowing potions.'
  },
  {
    id: 'Magnifying Glass',
    category: 'props',
    name: 'Magnifying Glass',
    cost: 600,
    rarity: 'Common',
    imageUrl: '',
    description: 'High-magnification lens for examining tiny golden bugs and soil quality.'
  },
  {
    id: 'Adventure Compass',
    category: 'props',
    name: 'Adventure Compass',
    cost: 1750,
    rarity: 'Rare',
    imageUrl: '',
    description: 'A heavy brass mechanical compass tracking exact solar paths.'
  },
  {
    id: 'Spirit Level',
    category: 'props',
    name: 'Spirit Level',
    cost: 700,
    rarity: 'Common',
    imageUrl: '',
    description: 'A classic green bubble vial level tool to align planting borders nicely.'
  },
  {
    id: 'Pocket Watch',
    category: 'props',
    name: 'Pocket Watch',
    cost: 4200,
    rarity: 'Legendary',
    imageUrl: '',
    description: 'An ornate gold mechanical timepiece showing precise astronomical crop cycles.'
  },
  {
    id: 'Sapling Pot',
    category: 'props',
    name: 'Sapling Pot',
    cost: 1200,
    rarity: 'Rare',
    imageUrl: '',
    description: 'A small terracotta pot cultivating a cute glowing green baby sprout.'
  },
  {
    id: 'Teddy Bear',
    category: 'props',
    name: 'Teddy Bear',
    cost: 1500,
    rarity: 'Rare',
    imageUrl: '',
    description: 'A plush soft vintage brown bear companion for warmth in the greenhouse.'
  },
  {
    id: 'Whisk',
    category: 'props',
    name: 'Whisk',
    cost: 500,
    rarity: 'Common',
    imageUrl: '',
    description: 'A wire balloon kitchen whip for blending delicious harvest honey desserts.'
  },
  {
    id: 'Thermometer',
    category: 'props',
    name: 'Thermometer',
    cost: 650,
    rarity: 'Common',
    imageUrl: '',
    description: 'A glass mercury thermal tube tracking optimal warmth inside the greenhouse.'
  },
  {
    id: 'Notebook & Pencil',
    category: 'props',
    name: 'Notebook & Pencil',
    cost: 1100,
    rarity: 'Rare',
    imageUrl: '',
    description: 'A leather-bound field logbook with a pencil to register daily habit achievements.'
  },
  {
    id: 'Grim Book',
    category: 'props',
    name: 'Grim Book',
    cost: 3800,
    rarity: 'Legendary',
    imageUrl: '',
    description: 'An ancient obsidian-black grimoire bound with a glowing mystic silver facial crest.'
  },
  {
    id: 'Scythe',
    category: 'props',
    name: 'Scythe',
    cost: 4000,
    rarity: 'Legendary',
    imageUrl: '',
    description: 'A long-staffed curved farm reaper blade designed for extensive wild weed pruning.'
  },
  {
    id: 'Wide Trowel',
    category: 'props',
    name: 'Wide Trowel',
    cost: 800,
    rarity: 'Common',
    imageUrl: '',
    description: 'A broad high-volume metal hand scoop ideal for transferring thick dark fertilizer mud.'
  },
  {
    id: 'Leather Satchel',
    category: 'props',
    name: 'Leather Satchel',
    cost: 1650,
    rarity: 'Rare',
    imageUrl: '',
    description: 'A durable hand-stitched tan messenger bag with beautiful embroidered oak leaf details.'
  },
  {
    id: 'Default Greenhouse',
    category: 'backgrounds',
    name: 'Default Greenhouse',
    cost: 0,
    rarity: 'Common',
    imageUrl: '',
    description: 'A cozy, sun-drenched sanctuary with soft hanging root creepers.'
  },
  {
    id: 'Autumn Row',
    category: 'backgrounds',
    name: 'Autumn Harvest Field',
    cost: 2800,
    rarity: 'Rare',
    imageUrl: '',
    description: 'A beautiful setting featuring amber leaves, pumpkins, and a soft breeze.'
  },
  {
    id: 'Celestial Canopy',
    category: 'backgrounds',
    name: 'Astral Canopy Room',
    cost: 6000,
    rarity: 'Legendary',
    imageUrl: '',
    description: 'A stunning violet-glowing sky dome revealing planets and shooting meteoroids.'
  },
  {
    id: 'Vintage Foliage Wallpaper',
    category: 'backgrounds',
    name: 'Vintage Foliage Wallpaper',
    cost: 950,
    rarity: 'Common',
    imageUrl: '',
    description: 'Repeating emerald leaf vine wallpaper with beautiful, tiny golden buttercups.'
  },
  {
    id: 'Sunny Garden Beds',
    category: 'backgrounds',
    name: 'Sunny Garden Beds',
    cost: 1600,
    rarity: 'Rare',
    imageUrl: '',
    description: 'A bright, sunshine-filled yard featuring tilled soil garden boxes blooming with crops.'
  },
  {
    id: 'Busy Bee Sanctuary',
    category: 'backgrounds',
    name: 'Busy Bee Sanctuary',
    cost: 1850,
    rarity: 'Rare',
    imageUrl: '',
    description: 'A friendly hive yard with wooden beehives, honey jars, and honeybees buzzing around.'
  },
  {
    id: 'Apple Orchard Walk',
    category: 'backgrounds',
    name: 'Apple Orchard Walk',
    cost: 2200,
    rarity: 'Rare',
    imageUrl: '',
    description: 'Lush apple trees on the grass with sweet red apples dangling and scattered on the floor.'
  },
  {
    id: 'Plentiful Vineyard Rows',
    category: 'backgrounds',
    name: 'Plentiful Vineyard Rows',
    cost: 2400,
    rarity: 'Rare',
    imageUrl: '',
    description: 'Rows of wooden grape trellises laden with rich purple harvest-ready vineyard grapes.'
  },
  {
    id: 'Blooming Florist\'s Corner',
    category: 'backgrounds',
    name: 'Blooming Florist\'s Corner',
    cost: 3200,
    rarity: 'Legendary',
    imageUrl: '',
    description: 'A colorful floristry field packed with rows of red tulips, yellow daisies, and fresh bouquets.'
  },
  {
    id: 'Strawberry Fenced Garden',
    category: 'backgrounds',
    name: 'Strawberry Fenced Garden',
    cost: 2100,
    rarity: 'Rare',
    imageUrl: '',
    description: 'A cozy garden with a cedar fence, fresh strawberry bushes, and a cute ladybug sign.'
  },
  {
    id: 'Cozy Supply Workshop',
    category: 'backgrounds',
    name: 'Cozy Supply Workshop',
    cost: 3500,
    rarity: 'Legendary',
    imageUrl: '',
    description: 'A warm brick potting shed with wooden supply chests, climbing ivy, and seed shelves.'
  }
];

let parsedClothing: ClothingItem[] = [...BASE_CLOTHING];

if (typeof document !== 'undefined') {
  try {
    const container = document.getElementById('html-clothing-data');
    if (container) {
      const items = container.querySelectorAll('.clothing-item');
      if (items.length > 0) {
        const newList: ClothingItem[] = [];
        items.forEach(el => {
          const item = el as HTMLElement;
          const id = item.getAttribute('data-id') || '';
          const category = (item.getAttribute('data-category') || 'outfits') as 'outfits' | 'props' | 'backgrounds';
          const name = item.getAttribute('data-name') || '';
          const cost = parseInt(item.getAttribute('data-cost') || '0', 10);
          const rarity = (item.getAttribute('data-rarity') || 'Common') as 'Common' | 'Rare' | 'Legendary';
          const imageUrl = item.getAttribute('data-image-url') || '';
          const description = item.textContent?.trim() || '';
          
          if (id) {
            newList.push({
              id,
              category,
              name,
              cost,
              rarity,
              imageUrl,
              description
            });
          }
        });
        if (newList.length > 0) {
          parsedClothing = newList;
        }
      }
    }
  } catch (err) {
    console.error('Error parsing clothing from HTML:', err);
  }
}

export const CLOTHING_DATABASE = parsedClothing;
