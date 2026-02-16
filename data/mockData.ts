
import { Product, UnitType } from '../types';
import { PLATING_CHART } from '../constants';

export const CATEGORIES = [
  "Metal Buttons",
  "Rivets & Studs",
  "Fasteners & Hooks",
  "Fancy Snaps",
  "Eyelets & Grommets",
  "Denim Gallery"
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Vintage Embossed Shank Button',
    slug: 'vintage-embossed-shank-button',
    description: '17mm alloy button with intricate floral and geometric engravings as shown in our vintage collection. Rust-proof and heavy-duty.',
    category: 'Metal Buttons',
    basePrice: 480,
    unitType: UnitType.GROSS,
    moq: 10,
    images: [
      'https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1620783770629-1225728a6430?auto=format&fit=crop&q=80&w=800'
    ],
    platingFinishes: PLATING_CHART.slice(0, 8)
  },
  {
    id: '2',
    name: 'Industrial Trouser Hook & Bar',
    slug: 'industrial-hook-bar',
    description: 'Comprehensive set of metal fasteners and hooks for formal trousers and workwear. Available in various finishes from our plating chart.',
    category: 'Fasteners & Hooks',
    basePrice: 320,
    unitType: UnitType.GROSS,
    moq: 25,
    images: [
      'https://images.unsplash.com/photo-1508215885820-4585e56135c8?auto=format&fit=crop&q=80&w=800'
    ],
    platingFinishes: [PLATING_CHART[0], PLATING_CHART[1], PLATING_CHART[14]]
  },
  {
    id: '3',
    name: 'Premium Fancy Snap Collection',
    slug: 'premium-fancy-snaps',
    description: 'Designer snap buttons featuring Union Jack, IV Play, Route 66, and floral motifs. Perfect for branding high-end fashion garments.',
    category: 'Fancy Snaps',
    basePrice: 650,
    unitType: UnitType.GROSS,
    moq: 5,
    images: [
      'https://images.unsplash.com/photo-1590736962236-41398835f6a9?auto=format&fit=crop&q=80&w=800'
    ],
    platingFinishes: PLATING_CHART
  },
  {
    id: '4',
    name: 'Colorful Enamel Eyelets',
    slug: 'colorful-enamel-eyelets',
    description: 'High-quality grommets with vibrant enamel finishes and custom engravings. Includes square and round profiles.',
    category: 'Eyelets & Grommets',
    basePrice: 280,
    unitType: UnitType.GROSS,
    moq: 50,
    images: [
      'https://images.unsplash.com/photo-1614792652433-4f937666249e?auto=format&fit=crop&q=80&w=800'
    ],
    platingFinishes: [PLATING_CHART[0], PLATING_CHART[4], PLATING_CHART[8]]
  },
  {
    id: '5',
    name: 'Denim Finish Sample Pack',
    slug: 'denim-finish-sample',
    description: 'A curated collection of denim washes and styles showing the application of shanks and rivets. Essential for showroom displays.',
    category: 'Denim Gallery',
    basePrice: 950,
    unitType: UnitType.PCS,
    moq: 1,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800'
    ],
    platingFinishes: [],
    isSampleOnly: true
  }
];
