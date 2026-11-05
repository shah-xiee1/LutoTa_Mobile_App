export const INGREDIENT_CATEGORIES = [
  {
    id: 'canned_processed',
    title: 'Canned & Processed',
    icon: '🥫',
  },
  {
    id: 'staples_noodles',
    title: 'Staples & Noodles',
    icon: '🍚',
  },
  {
    id: 'produce_fresh',
    title: 'Gulayan & Fresh',
    icon: '🥬',
  },
  {
    id: 'condiments_seasonings',
    title: 'Pampalasa & Sauces',
    icon: '🧂',
  },
];

export const ALL_INGREDIENTS = [
  // Canned & Processed
  { id: 'sardines', name: 'Canned Sardines (155g)', category: 'canned_processed', estPrice: 24, emoji: '🐟' },
  { id: 'canned_tuna', name: 'Canned Tuna (flakes/chunks)', category: 'canned_processed', estPrice: 38, emoji: '🐟' },
  { id: 'corned_beef', name: 'Corned Beef (can/pouch)', category: 'canned_processed', estPrice: 42, emoji: '🥩' },
  { id: 'meat_loaf', name: 'Luncheon Meat / Meat Loaf', category: 'canned_processed', estPrice: 35, emoji: '🥓' },
  { id: 'pork_beans', name: 'Pork & Beans (can)', category: 'canned_processed', estPrice: 30, emoji: '🫘' },
  { id: 'hotdog', name: 'Hotdog (1-2 pcs)', category: 'canned_processed', estPrice: 20, emoji: '🌭' },

  // Staples & Noodles
  { id: 'egg', name: 'Egg (Itlog)', category: 'staples_noodles', estPrice: 9, emoji: '🥚' },
  { id: 'rice', name: 'Cooked / Leftover Rice (Bahaw)', category: 'staples_noodles', estPrice: 10, emoji: '🍚' },
  { id: 'pancit_canton', name: 'Instant Pancit Canton pack', category: 'staples_noodles', estPrice: 16, emoji: '🍜' },
  { id: 'instant_noodles', name: 'Instant Mami / Cup Noodles', category: 'staples_noodles', estPrice: 15, emoji: '🍜' },
  { id: 'miswa', name: 'Miswa Noodles (small pack)', category: 'staples_noodles', estPrice: 10, emoji: '🍝' },
  { id: 'odong', name: 'Odong Noodles (pack)', category: 'staples_noodles', estPrice: 10, emoji: '🥢' },
  { id: 'macaroni', name: 'Elbow Macaroni (100g)', category: 'staples_noodles', estPrice: 18, emoji: '🍲' },
  { id: 'tokwa', name: 'Tokwa / Firm Tofu (1 block)', category: 'staples_noodles', estPrice: 15, emoji: '🧊' },
  { id: 'monggo', name: 'Monggo Beans / Munggo (100g)', category: 'staples_noodles', estPrice: 15, emoji: '🌱' },

  // Produce & Fresh
  { id: 'garlic', name: 'Garlic (Bawang, 3 cloves)', category: 'produce_fresh', estPrice: 5, emoji: '🧄' },
  { id: 'onion', name: 'Onion (Sibuyas, 1 pc)', category: 'produce_fresh', estPrice: 8, emoji: '🧅' },
  { id: 'tomato', name: 'Tomato (Kamatis, 1-2 pcs)', category: 'produce_fresh', estPrice: 10, emoji: '🍅' },
  { id: 'eggplant', name: 'Eggplant (Talong, 1 pc)', category: 'produce_fresh', estPrice: 12, emoji: '🍆' },
  { id: 'kangkong', name: 'Kangkong (1 bundle/tali)', category: 'produce_fresh', estPrice: 15, emoji: '🥬' },
  { id: 'pechay', name: 'Pechay (1 bundle/tali)', category: 'produce_fresh', estPrice: 15, emoji: '🥬' },
  { id: 'sayote', name: 'Sayote (1 pc)', category: 'produce_fresh', estPrice: 15, emoji: '🍐' },
  { id: 'repolyo', name: 'Cabbage (Repolyo, 1/4 head)', category: 'produce_fresh', estPrice: 18, emoji: '🥗' },
  { id: 'sitaw', name: 'Sitaw / String Beans (tali)', category: 'produce_fresh', estPrice: 15, emoji: '🫛' },
  { id: 'potato', name: 'Potato (Patatas, 1 pc)', category: 'produce_fresh', estPrice: 12, emoji: '🥔' },
  { id: 'ginger', name: 'Ginger (Luya, thumb size)', category: 'produce_fresh', estPrice: 5, emoji: '🫚' },
  { id: 'calamansi', name: 'Calamansi (3-4 pcs)', category: 'produce_fresh', estPrice: 5, emoji: '🍋' },

  // Condiments & Seasonings
  { id: 'soy_sauce', name: 'Soy Sauce (Toyo)', category: 'condiments_seasonings', estPrice: 5, emoji: '🍶' },
  { id: 'vinegar', name: 'Vinegar (Suka)', category: 'condiments_seasonings', estPrice: 5, emoji: '🍶' },
  { id: 'fish_sauce', name: 'Fish Sauce (Patis)', category: 'condiments_seasonings', estPrice: 5, emoji: '🐟' },
  { id: 'cooking_oil', name: 'Cooking Oil (Mantikilya/Mantika)', category: 'condiments_seasonings', estPrice: 7, emoji: '🫗' },
  { id: 'seasoning_powder', name: 'Magic Sarap / Bouillon Cube', category: 'condiments_seasonings', estPrice: 5, emoji: '✨' },
  { id: 'tomato_sauce', name: 'Tomato Sauce (small pouch 115g)', category: 'condiments_seasonings', estPrice: 18, emoji: '🥫' },
  { id: 'evap_milk', name: 'Evaporated Milk (small can/box)', category: 'condiments_seasonings', estPrice: 18, emoji: '🥛' },
];
