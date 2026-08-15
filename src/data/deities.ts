export interface Deity {
  id: string;
  name: string;
  nameHindi: string;
  image: string;
  songCount: number;
  description: string;
  color: string; // gradient accent color for the deity
}

export const deities: Deity[] = [
  {
    id: 'krishna',
    name: 'Krishna',
    nameHindi: 'श्री कृष्ण',
    image: '/images/krishna.jpg',
    songCount: 45,
    description: 'The eighth avatar of Vishnu, embodiment of divine love, joyous play (Leela), supreme wisdom, and compassion.',
    color: '#1a3a5c',
  },
  {
    id: 'shiva',
    name: 'Shiva',
    nameHindi: 'भगवान शिव',
    image: '/images/shiva.jpg',
    songCount: 38,
    description: 'Mahadev, the supreme cosmic consciousness, the auspicious transformer, lord of meditation and the cosmic dance.',
    color: '#2d3a4a',
  },
  {
    id: 'ram',
    name: 'Ram',
    nameHindi: 'श्री राम',
    image: '/images/ram.jpg',
    songCount: 35,
    description: 'Maryada Purushottam, the embodiment of dharma, truth, righteous living, courage, and unconditional compassion.',
    color: '#c47000',
  },
  {
    id: 'hanuman',
    name: 'Hanuman',
    nameHindi: 'श्री हनुमान',
    image: '/images/hanuman.jpg',
    songCount: 28,
    description: 'The supreme devotee of Shri Ram, symbol of immense strength, selfless devotion, valor, humility, and protection.',
    color: '#b84000',
  },
  {
    id: 'ganesh',
    name: 'Ganesh',
    nameHindi: 'श्री गणेश',
    image: '/images/ganesh.jpg',
    songCount: 22,
    description: 'Vighnaharta, the remover of all obstacles, master of intellect, wisdom, and the deity of auspicious new beginnings.',
    color: '#8b1a1a',
  },
  {
    id: 'durga',
    name: 'Durga',
    nameHindi: 'माँ दुर्गा',
    image: '/images/devi.jpg',
    songCount: 20,
    description: 'The supreme Mother Goddess and embodiment of Shakti, fiercely protecting the universe and conquering negativity.',
    color: '#8b0000',
  },
  {
    id: 'lakshmi',
    name: 'Lakshmi',
    nameHindi: 'माँ लक्ष्मी',
    image: '/images/devi.jpg',
    songCount: 18,
    description: 'The goddess of prosperity, auspiciousness, spiritual wealth, abundance, light, and grace.',
    color: '#8b6914',
  },
  {
    id: 'saraswati',
    name: 'Saraswati',
    nameHindi: 'माँ सरस्वती',
    image: '/images/devi.jpg',
    songCount: 15,
    description: 'The goddess of knowledge, arts, music, wisdom, higher learning, and pure spiritual eloquence.',
    color: '#4a4a6a',
  },
  {
    id: 'vishnu',
    name: 'Vishnu',
    nameHindi: 'भगवान विष्णु',
    image: '/images/krishna.jpg',
    songCount: 25,
    description: 'The supreme preserver of cosmic balance and universal dharma, supporting the world through eternal light.',
    color: '#1a2a5c',
  },
  {
    id: 'radha',
    name: 'Radha',
    nameHindi: 'श्री राधा रानी',
    image: '/images/krishna.jpg',
    songCount: 12,
    description: 'Radharani, the eternal supreme lover of Lord Krishna, representing the highest pinnacle of pure devotional surrender.',
    color: '#8b3a5c',
  },
];

export const getDeityById = (id: string): Deity | undefined => {
  return deities.find((deity) => deity.id === id);
};

export const getFeaturedDeities = (): Deity[] => {
  return deities.slice(0, 6);
};
