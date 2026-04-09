// Product catalog
const products = [
  // Electronics
  { id: 1, name: 'Wireless Headphones', category: 'electronics', price: 79.99, rating: 4.7, emoji: '🎧', description: 'Premium sound quality with active noise cancellation and 30-hour battery life.' },
  { id: 2, name: 'Smart Watch', category: 'electronics', price: 199.99, rating: 4.5, emoji: '⌚', description: 'Track fitness, receive notifications, and monitor health metrics from your wrist.' },
  { id: 3, name: 'Bluetooth Speaker', category: 'electronics', price: 49.99, rating: 4.4, emoji: '🔊', description: 'Portable 360° sound with 12-hour playback and waterproof design.' },
  { id: 4, name: 'USB-C Laptop Hub', category: 'electronics', price: 39.99, rating: 4.3, emoji: '🖥️', description: '7-in-1 hub with HDMI, USB 3.0, SD card reader, and 100W power delivery.' },
  { id: 5, name: 'Mechanical Keyboard', category: 'electronics', price: 89.99, rating: 4.8, emoji: '⌨️', description: 'Tactile mechanical switches with RGB backlighting and ergonomic design.' },
  { id: 6, name: 'Wireless Mouse', category: 'electronics', price: 34.99, rating: 4.6, emoji: '🖱️', description: 'Precision optical sensor with silent click buttons and 18-month battery.' },

  // Clothing
  { id: 7, name: 'Classic Denim Jacket', category: 'clothing', price: 59.99, rating: 4.5, emoji: '🧥', description: 'Timeless blue denim jacket with a relaxed fit, perfect for all seasons.' },
  { id: 8, name: 'Slim Fit Chinos', category: 'clothing', price: 44.99, rating: 4.4, emoji: '👖', description: 'Versatile cotton-blend chinos available in multiple colors.' },
  { id: 9, name: 'Cozy Knit Sweater', category: 'clothing', price: 52.99, rating: 4.6, emoji: '🧶', description: 'Soft merino wool blend sweater, warm and breathable for cool days.' },
  { id: 10, name: 'Running Sneakers', category: 'clothing', price: 94.99, rating: 4.7, emoji: '👟', description: 'Lightweight and cushioned sneakers built for performance and everyday comfort.' },
  { id: 11, name: 'Summer Dress', category: 'clothing', price: 39.99, rating: 4.5, emoji: '👗', description: 'Flowy floral summer dress with adjustable straps and a comfortable fit.' },
  { id: 12, name: 'Leather Belt', category: 'clothing', price: 24.99, rating: 4.3, emoji: '👔', description: 'Genuine leather belt with brushed steel buckle, available in black and brown.' },

  // Home & Living
  { id: 13, name: 'Ceramic Mug Set', category: 'home', price: 29.99, rating: 4.6, emoji: '☕', description: 'Set of 4 hand-painted ceramic mugs, dishwasher and microwave safe.' },
  { id: 14, name: 'Scented Candle', category: 'home', price: 18.99, rating: 4.7, emoji: '🕯️', description: 'Premium soy wax candle with 50-hour burn time in calming lavender scent.' },
  { id: 15, name: 'Bamboo Desk Organizer', category: 'home', price: 34.99, rating: 4.5, emoji: '🪴', description: 'Eco-friendly bamboo organizer with multiple compartments for your workspace.' },
  { id: 16, name: 'Throw Blanket', category: 'home', price: 42.99, rating: 4.8, emoji: '🛋️', description: 'Super-soft faux sherpa throw blanket, 50"x60", perfect for couch or bed.' },
  { id: 17, name: 'Wall Art Print', category: 'home', price: 22.99, rating: 4.4, emoji: '🖼️', description: 'Modern minimalist wall art print, available in A3 and A2 sizes, unframed.' },
  { id: 18, name: 'Indoor Plant Pot', category: 'home', price: 16.99, rating: 4.5, emoji: '🌿', description: 'Set of 3 minimalist concrete-look planters with drainage holes.' },

  // Sports
  { id: 19, name: 'Yoga Mat', category: 'sports', price: 35.99, rating: 4.7, emoji: '🧘', description: 'Non-slip, eco-friendly TPE yoga mat with alignment lines and carrying strap.' },
  { id: 20, name: 'Dumbbell Set', category: 'sports', price: 69.99, rating: 4.6, emoji: '🏋️', description: 'Adjustable neoprene dumbbell set (5lb, 10lb, 15lb) with storage rack.' },
  { id: 21, name: 'Water Bottle', category: 'sports', price: 22.99, rating: 4.8, emoji: '💧', description: 'Insulated stainless steel bottle, keeps drinks cold 24h, hot 12h.' },
  { id: 22, name: 'Resistance Bands', category: 'sports', price: 19.99, rating: 4.5, emoji: '🏃', description: 'Set of 5 resistance bands with different tension levels for full-body training.' },
  { id: 23, name: 'Sports Backpack', category: 'sports', price: 54.99, rating: 4.6, emoji: '🎒', description: '30L lightweight backpack with wet/dry compartments and laptop sleeve.' },
  { id: 24, name: 'Jump Rope', category: 'sports', price: 12.99, rating: 4.4, emoji: '⚡', description: 'Speed jump rope with ball-bearing handles and adjustable cable length.' },
];
