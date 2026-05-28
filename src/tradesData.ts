export interface CustomTradeOffer {
  id: string;
  user: string;
  avatar: string;
  type: 'offer' | 'request';
  item: string;
}

export const BASE_TRADES: CustomTradeOffer[] = [
  {
    id: 'tr1',
    user: 'SH3RM4Y0',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    type: 'offer',
    item: 'Golden Apple'
  },
  {
    id: 'tr2',
    user: 'SHAYI_Y',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    type: 'request',
    item: 'Straw Hat'
  }
];

let parsedTrades: CustomTradeOffer[] = [...BASE_TRADES];

if (typeof document !== 'undefined') {
  try {
    const container = document.getElementById('html-trades-data');
    if (container) {
      const items = container.querySelectorAll('.trade-item');
      if (items.length > 0) {
        const newList: CustomTradeOffer[] = [];
        items.forEach(el => {
          const item = el as HTMLElement;
          const id = item.getAttribute('data-id') || '';
          const user = item.getAttribute('data-user') || '';
          const avatarUrl = item.getAttribute('data-avatar-url') || '';
          const type = (item.getAttribute('data-type') || 'offer') as 'offer' | 'request';
          const tradeItem = item.getAttribute('data-item') || '';
          
          if (id && user) {
            newList.push({
              id,
              user,
              avatar: avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120',
              type,
              item: tradeItem
            });
          }
        });
        if (newList.length > 0) {
          parsedTrades = newList;
        }
      }
    }
  } catch (err) {
    console.error('Error parsing trades data from HTML:', err);
  }
}

export const TRADES_DATABASE = parsedTrades;
