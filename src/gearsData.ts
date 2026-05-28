export interface GearItem {
  id: 'wateringCan' | 'mutationCrates' | 'cooldownTickets' | 'focusTimer' | 'shovel';
  name: string;
  cost: number;
  icon: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  badge?: string;
  badgeClass?: string;
  description: string;
  imageUrl?: string;
}

export const BASE_GEARS: GearItem[] = [
  {
    id: 'wateringCan',
    name: 'Watering Can',
    cost: 100,
    icon: 'sprinkler',
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-800',
    borderClass: 'border-blue-200',
    badge: '',
    badgeClass: '',
    description: 'Necessary to nurture seeds. (Common: 5, Rare: 10, Legendary: 20 waterings required).'
  },
  {
    id: 'mutationCrates',
    name: 'Mutation Crate',
    cost: 2500,
    icon: 'mystery_quest',
    bgClass: 'bg-purple-100',
    textClass: 'text-purple-800',
    borderClass: 'border-purple-200',
    badge: 'RARE CRT',
    badgeClass: 'bg-red-100 text-red-800 border-red-200',
    description: 'Unbox powerful sprays: Golden (x2), Silver (x3), Diamond (x4), Frozen (x5), or Rainbow (x6) coins!'
  },
  {
    id: 'cooldownTickets',
    name: 'Cooldown Ticket',
    cost: 1000,
    icon: 'confirmation_number',
    bgClass: 'bg-yellow-100',
    textClass: 'text-yellow-800',
    borderClass: 'border-yellow-250',
    badge: 'POPULAR',
    badgeClass: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    description: '1-Hour reduction ticket. Accelerates Seed Emporium timer, Gear restock, or completed task cooldowns!'
  },
  {
    id: 'focusTimer',
    name: 'Focus Timer',
    cost: 8200,
    icon: 'timer',
    bgClass: 'bg-red-105',
    textClass: 'text-[#C0392B]',
    borderClass: 'border-red-200',
    badge: 'PERMANENT',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Double coins permanently (2x modifier value multiplier) for completing deep work habit tasks.'
  },
  {
    id: 'shovel',
    name: 'Gardening Shovel',
    cost: 500,
    icon: 'hardware',
    bgClass: 'bg-green-105',
    textClass: 'text-[#1E8449]',
    borderClass: 'border-green-200',
    badge: 'PERMANENT',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Remove growing crops from your tiles without destroying them. Safely recovers and returns the seeds back into your inventory.'
  }
];

let parsedGears: GearItem[] = [...BASE_GEARS];

if (typeof document !== 'undefined') {
  try {
    const container = document.getElementById('html-gears-data');
    if (container) {
      const items = container.querySelectorAll('.gear-item');
      if (items.length > 0) {
        const newList: GearItem[] = [];
        items.forEach(el => {
          const item = el as HTMLElement;
          const id = (item.getAttribute('data-id') || '') as GearItem['id'];
          const name = item.getAttribute('data-name') || '';
          const cost = parseInt(item.getAttribute('data-cost') || '0', 10);
          const icon = item.getAttribute('data-icon') || 'hardware';
          const imageUrl = item.getAttribute('data-image-url') || '';
          const bgClass = item.getAttribute('data-bg-class') || '';
          const textClass = item.getAttribute('data-text-class') || '';
          const borderClass = item.getAttribute('data-border-class') || '';
          const badge = item.getAttribute('data-badge') || undefined;
          const badgeClass = item.getAttribute('data-badge-class') || undefined;
          const description = item.textContent?.trim() || '';
          
          if (id) {
            newList.push({
              id,
              name,
              cost,
              icon,
              imageUrl,
              bgClass,
              textClass,
              borderClass,
              badge,
              badgeClass,
              description
            });
          }
        });
        if (newList.length > 0) {
          parsedGears = newList;
        }
      }
    }
  } catch (err) {
    console.error('Error parsing gears from HTML:', err);
  }
}

export const GEARS = parsedGears;
