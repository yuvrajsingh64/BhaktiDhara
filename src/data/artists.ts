export interface Artist {
  id: string;
  name: string;
  nameHindi?: string;
  image: string;
  songCount: number;
  bio: string;
  speciality: string;
}

export const artists: Artist[] = [
  {
    id: 'anuradha-paudwal',
    name: 'Anuradha Paudwal',
    nameHindi: 'अनुराधा पौडवाल',
    image: '/images/krishna.jpg',
    songCount: 156,
    bio: 'Legendary devotional singer known for her divine voice and timeless spiritual recordings across India.',
    speciality: 'Bhajans & Aartis',
  },
  {
    id: 'hariharan',
    name: 'Hariharan',
    nameHindi: 'हरिहरण',
    image: '/images/krishna.jpg',
    songCount: 89,
    bio: 'Ghazal maestro and versatile devotional singer whose soulful voice brings peace to millions.',
    speciality: 'Ghazals & Bhajans',
  },
  {
    id: 'jagjit-singh',
    name: 'Jagjit Singh',
    nameHindi: 'जगजीत सिंह',
    image: '/images/krishna.jpg',
    songCount: 120,
    bio: 'The Ghazal King whose devotional renditions touch the soul with profound stillness and serenity.',
    speciality: 'Ghazals & Bhajans',
  },
  {
    id: 'anup-jalota',
    name: 'Anup Jalota',
    nameHindi: 'अनूप जलोटा',
    image: '/images/krishna.jpg',
    songCount: 200,
    bio: 'The Bhajan Samrat, king of devotional music, renowned globally for classic Hindu devotional hymns.',
    speciality: 'Bhajans',
  },
  {
    id: 'shankar-mahadevan',
    name: 'Shankar Mahadevan',
    nameHindi: 'शंकर महादेवन',
    image: '/images/krishna.jpg',
    songCount: 75,
    bio: 'Versatile vocalist bringing unmatched vocal energy, classical mastery, and power to devotional music.',
    speciality: 'Stotrams & Mantras',
  },
  {
    id: 'sachet-tandon',
    name: 'Sachet Tandon',
    nameHindi: 'सचेत टंडन',
    image: '/images/krishna.jpg',
    songCount: 45,
    bio: 'Modern devotional voice connecting the new generation with timeless spiritual heritage and energy.',
    speciality: 'Modern Bhajans',
  },
];

export const getArtistById = (id: string): Artist | undefined => {
  return artists.find((artist) => artist.id === id);
};

export const getFeaturedArtists = (): Artist[] => {
  return artists.slice(0, 4);
};
