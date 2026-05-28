export interface CustomFriend {
  id: string;
  username: string;
  avatarUrl: string;
  status: 'online' | 'offline' | 'pending';
  bio: string;
}

export const BASE_FRIENDS: CustomFriend[] = [
  {
    id: 'f1',
    username: 'MR MARK',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL9uitRrW7wpUmlD-_fh7Ox9htxM_M6ABIzoZiJfy9rL9pNVvYHXZa38PVOYA8SLAdETx4JqnVq0HTDIF8xDeyrhFYQyi4zUEK9jwHwLZ26BKFzrQ8ZBcd9y73DqF83_ciKKDWv_uA7Lv-lmhyFyksurlaUzLlyjABaakVEO3gv2-74iNG5QzVq89KuMCkAnax9-yn5j6jZ1XLHILZpva8q6tOG8WmQqxI2fXWSoIlCaeaYsrrXg44NtaS_DRzyVwnmjkdEVKIhlE',
    status: 'pending',
    bio: '👨‍🌾 Hardworking supervisor from North Ward. Loves corn-butter and task logs!'
  },
  {
    id: 'f2',
    username: 'Sam_EEE',
    avatarUrl: 'https://lh3.googleusercontent.com/aida/ADBb0ujdQP6MAgmjK8hgH6aSOHT4BZIHX4Iij_p-Pzo2ikDy83vgWB7kbxRNAanC6B80uFfePmufqpKRfaPtLDUoMYMY4wm-crQU2c2T-4SZutluigzQ1k0alXn7hH3krPSNJIuQTbJ3zZXOs8CjhsI-RQh31YZ3yiB968QmftZ6D41h_jwFDgcq586EnkBA55I6Iza3tItq_RGve1En5_5WuLKtygooJn27WUa28jOelC3ykXkctgXr4NiCZQ',
    status: 'online',
    bio: '🐝 Buzz buzz! Sam here. Loving sunflowers, high streaks, and natural honey harvests.'
  },
  {
    id: 'f3',
    username: 'NICOLINE123',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL9uitRrW7wpUmlD-_fh7Ox9htxM_M6ABIzoZiJfy9rL9pNVvYHXZa38PVOYA8SLAdETx4JqnVq0HTDIF8xDeyrhFYQyi4zUEK9jwHwLZ26BKFzrQ8ZBcd9y73DqF83_ciKKDWv_uA7Lv-lmhyFyksurlaUzLlyjABaakVEO3gv2-74iNG5QzVq89KuMCkAnax9-yn5j6jZ1XLHILZpva8q6tOG8WmQqxI2fXWSoIlCaeaYsrrXg44NtaS_DRzyVwnmjkdEVKIhlE',
    status: 'offline',
    bio: '🌸 Valley florist. Passionate about green rose shoots, keeping hydrated, and early morning routines.'
  }
];

let parsedFriends: CustomFriend[] = [...BASE_FRIENDS];

if (typeof document !== 'undefined') {
  try {
    const container = document.getElementById('html-friends-data');
    if (container) {
      const items = container.querySelectorAll('.friend-item');
      if (items.length > 0) {
        const newList: CustomFriend[] = [];
        items.forEach(el => {
          const item = el as HTMLElement;
          const id = item.getAttribute('data-id') || '';
          const username = item.getAttribute('data-username') || '';
          const avatarUrl = item.getAttribute('data-avatar-url') || '';
          const status = (item.getAttribute('data-status') || 'offline') as 'online' | 'offline' | 'pending';
          const bio = item.getAttribute('data-bio') || '';
          
          if (id && username) {
            newList.push({
              id,
              username,
              avatarUrl,
              status,
              bio
            });
          }
        });
        if (newList.length > 0) {
          parsedFriends = newList;
        }
      }
    }
  } catch (err) {
    console.error('Error parsing friends data from HTML:', err);
  }
}

export const FRIENDS_DATABASE = parsedFriends;
