import { Song, songs } from './songs';

export interface Playlist {
  id: string;
  title: string;
  titleHindi?: string;
  subtitle: string;
  artwork: string;
  songIds: string[]; // references to song IDs
  songCount: number;
  duration: string;
  category: string;
}

export const playlists: Playlist[] = [
  {
    id: 'morning-bhakti',
    title: 'Morning Bhakti',
    titleHindi: 'प्रातः भक्ति',
    subtitle: 'Awaken your spirit with peaceful morning chants and divine blessings',
    artwork: '/images/playlist-morning.jpg',
    songIds: [
      'gayatri-mantra',
      'vakratunda-mahakaya',
      'achyutam-keshavam',
      'om-jai-jagdish-hare',
      'raghupati-raghav-raja-ram',
      'saraswati-vandana',
      'hanuman-chalisa',
      'shri-ram-jai-ram',
    ],
    songCount: 8,
    duration: '55 min',
    category: 'Morning',
  },
  {
    id: 'morning-aarti',
    title: 'Morning Aarti',
    titleHindi: 'प्रातः आरती',
    subtitle: 'Sacred aartis for morning pooja and invocation of cosmic deities',
    artwork: '/images/ganesh.jpg',
    songIds: [
      'ganesh-aarti',
      'om-jai-jagdish-hare',
      'aarti-kunj-bihari-ki',
      'lakshmi-aarti',
    ],
    songCount: 4,
    duration: '35 min',
    category: 'Aarti',
  },
  {
    id: 'evening-sandhya',
    title: 'Evening Sandhya',
    titleHindi: 'संध्या वंदन',
    subtitle: 'Peaceful twilight melodies and soulful hymns for evening meditation',
    artwork: '/images/shiva.jpg',
    songIds: [
      'raghupati-raghav-raja-ram',
      'hey-ram-hey-ram',
      'shiv-shankar-ko-jisne-puja',
      'krishna-dhun',
      'jai-shri-ram-dhun',
      'shri-krishna-govind',
    ],
    songCount: 6,
    duration: '48 min',
    category: 'Evening',
  },
  {
    id: 'peaceful-mantras',
    title: 'Peaceful Mantras',
    titleHindi: 'शांति मंत्र',
    subtitle: 'Deep meditative chants and sacred vibrations for inner stillness',
    artwork: '/images/shiva.jpg',
    songIds: [
      'om-namah-shivaya',
      'gayatri-mantra',
      'mahamrityunjaya-mantra',
      'saraswati-vandana',
      'vakratunda-mahakaya',
    ],
    songCount: 5,
    duration: '60 min',
    category: 'Mantra',
  },
  {
    id: 'krishna-prem',
    title: 'Krishna Prem',
    titleHindi: 'कृष्ण प्रेम',
    subtitle: 'Immerse in the eternal love and sweet divine nectar of Shri Krishna',
    artwork: '/images/krishna.jpg',
    songIds: [
      'achyutam-keshavam',
      'aarti-kunj-bihari-ki',
      'radhe-radhe',
      'krishna-dhun',
      'shri-krishna-govind',
      'radhe-govinda',
    ],
    songCount: 6,
    duration: '50 min',
    category: 'Devotion',
  },
  {
    id: 'shiv-bhakti',
    title: 'Shiv Bhakti',
    titleHindi: 'शिव भक्ति',
    subtitle: 'Powerful hymns, stotrams, and mantras honoring Lord Mahadev',
    artwork: '/images/shiva.jpg',
    songIds: [
      'shiv-tandav-stotram',
      'om-namah-shivaya',
      'shiv-shankar-ko-jisne-puja',
      'mahamrityunjaya-mantra',
    ],
    songCount: 4,
    duration: '45 min',
    category: 'Devotion',
  },
  {
    id: 'ram-naam',
    title: 'Ram Naam',
    titleHindi: 'राम नाम',
    subtitle: 'Elevate your soul with the auspicious and sacred name of Lord Rama',
    artwork: '/images/ram.jpg',
    songIds: [
      'shri-ram-jai-ram',
      'raghupati-raghav-raja-ram',
      'hey-ram-hey-ram',
      'jai-shri-ram-dhun',
    ],
    songCount: 4,
    duration: '42 min',
    category: 'Devotion',
  },
  {
    id: 'hanuman-bhakti',
    title: 'Hanuman Bhakti',
    titleHindi: 'हनुमान भक्ति',
    subtitle: 'Invoke courage, devotion, and supreme protection with Bajrangbali hymns',
    artwork: '/images/hanuman.jpg',
    songIds: [
      'hanuman-chalisa',
      'jai-hanuman-gyan-gun-sagar',
      'sankat-mochan-hanuman-ashtak',
    ],
    songCount: 3,
    duration: '55 min',
    category: 'Devotion',
  },
];

export const getPlaylistById = (id: string): Playlist | undefined => {
  return playlists.find((playlist) => playlist.id === id);
};

export const getSongsForPlaylist = (playlistId: string): Song[] => {
  const playlist = getPlaylistById(playlistId);
  if (!playlist) return [];
  return playlist.songIds
    .map((songId) => songs.find((song) => song.id === songId))
    .filter((song): song is Song => song !== undefined);
};

export const getFeaturedPlaylists = (limit: number = 6): Playlist[] => {
  return playlists.slice(0, limit);
};
