import { Song } from '@/types';

export interface BhaktiPlaylist {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  songCount: number;
  songs: Song[];
  source: 'youtube-music' | 'spotify';
  sourceUrl: string;
  youtubePlaylistId?: string;
}

const hindiBhaktiSongs: Song[] = [
  { id: 'achyutam-keshavam', title: 'Achyutam Keshavam', titleHindi: 'अच्युतम केशवम', artist: 'Anuradha Paudwal', duration: '6:12', artwork: '/images/krishna.jpg', audioUrl: '#', category: 'bhajan', deity: 'Krishna' },
  { id: 'hanuman-chalisa-hb', title: 'Hanuman Chalisa', titleHindi: 'हनुमान चालीसा', artist: 'Hariharan', duration: '9:31', artwork: '/images/hanuman.jpg', audioUrl: '#', category: 'bhajan', deity: 'Hanuman' },
  { id: 'om-jai-jagdish-hare', title: 'Om Jai Jagdish Hare', titleHindi: 'ॐ जय जगदीश हरे', artist: 'Anuradha Paudwal', duration: '7:45', artwork: '/images/krishna.jpg', audioUrl: '#', category: 'aarti', deity: 'Vishnu' },
  { id: 'aarti-kunj-bihari', title: 'Aarti Kunj Bihari Ki', titleHindi: 'आरती कुंजबिहारी की', artist: 'Anuradha Paudwal', duration: '5:18', artwork: '/images/krishna.jpg', audioUrl: '#', category: 'aarti', deity: 'Krishna' },
  { id: 'gayatri-mantra-hb', title: 'Gayatri Mantra', titleHindi: 'गायत्री मंत्र', artist: 'Suresh Wadkar', duration: '8:02', artwork: '/images/shiva.jpg', audioUrl: '#', category: 'mantra' },
  { id: 'shri-ram-chandra-kripalu', title: 'Shri Ram Chandra Kripalu', titleHindi: 'श्री रामचन्द्र कृपालु', artist: 'Ravindra Jain', duration: '6:55', artwork: '/images/ram.jpg', audioUrl: '#', category: 'bhajan', deity: 'Ram' },
  { id: 'raghupati-raghav', title: 'Raghupati Raghav Raja Ram', titleHindi: 'रघुपति राघव राजा राम', artist: 'Lata Mangeshkar', duration: '4:32', artwork: '/images/ram.jpg', audioUrl: '#', category: 'bhajan', deity: 'Ram' },
  { id: 'he-ram-he-ram', title: 'Hey Ram Hey Ram', titleHindi: 'हे राम हे राम', artist: 'Jagjit Singh', duration: '5:48', artwork: '/images/ram.jpg', audioUrl: '#', category: 'bhajan', deity: 'Ram' },
  { id: 'govind-bolo-hari', title: 'Govind Bolo Hari Gopal Bolo', titleHindi: 'गोविन्द बोलो हरि गोपाल बोलो', artist: 'Anup Jalota', duration: '7:14', artwork: '/images/krishna.jpg', audioUrl: '#', category: 'bhajan', deity: 'Krishna' },
  { id: 'vaishnav-jan-to', title: 'Vaishnav Jan To', titleHindi: 'वैष्णव जन तो', artist: 'Lata Mangeshkar', duration: '5:30', artwork: '/images/krishna.jpg', audioUrl: '#', category: 'bhajan' },
  { id: 'payoji-maine', title: 'Payoji Maine Ram Ratan Dhan Payo', titleHindi: 'पायोजी मैंने राम रतन धन पायो', artist: 'Anup Jalota', duration: '8:45', artwork: '/images/ram.jpg', audioUrl: '#', category: 'bhajan', deity: 'Ram' },
  { id: 'shri-ganeshaya-dheemahi', title: 'Shri Ganeshaya Dheemahi', titleHindi: 'श्री गणेशाय धीमहि', artist: 'Shankar Mahadevan', duration: '5:22', artwork: '/images/ganesh.jpg', audioUrl: '#', category: 'mantra', deity: 'Ganesh' },
  { id: 'man-mera-mandir', title: 'Man Mera Mandir Shiv Meri Puja', titleHindi: 'मन मेरा मंदिर शिव मेरी पूजा', artist: 'Anuradha Paudwal', duration: '6:08', artwork: '/images/shiva.jpg', audioUrl: '#', category: 'bhajan', deity: 'Shiva' },
  { id: 'itni-shakti-hame', title: 'Itni Shakti Hame Dena Data', titleHindi: 'इतनी शक्ति हमें देना दाता', artist: 'Sushma Shreshtha', duration: '4:55', artwork: '/images/krishna.jpg', audioUrl: '#', category: 'bhajan' },
  { id: 'rang-de-basanti', title: 'Rang De Basanti Chola', titleHindi: 'रंग दे बसंती चोला', artist: 'Lata Mangeshkar', duration: '5:15', artwork: '/images/krishna.jpg', audioUrl: '#', category: 'bhajan' },
];

const mahadevSongs: Song[] = [
  { id: 'shiv-tandav-stotram', title: 'Shiv Tandav Stotram', titleHindi: 'शिव तांडव स्तोत्रम', artist: 'Shankar Mahadevan', duration: '8:44', artwork: '/images/shiva.jpg', audioUrl: '#', category: 'mantra', deity: 'Shiva' },
  { id: 'namo-namo-shankara', title: 'Namo Namo Shankara', titleHindi: 'नमो नमो शंकरा', artist: 'Amit Trivedi', duration: '4:36', artwork: '/images/shiva.jpg', audioUrl: '#', category: 'bhajan', deity: 'Shiva' },
  { id: 'bam-bam-bhole', title: 'Bam Bam Bhole', titleHindi: 'बम बम भोले', artist: 'Hansraj Raghuwanshi', duration: '5:12', artwork: '/images/shiva.jpg', audioUrl: '#', category: 'bhajan', deity: 'Shiva' },
  { id: 'mahakal-ke-diwane', title: 'Mahakal Ke Diwane', titleHindi: 'महाकाल के दीवाने', artist: 'Hansraj Raghuwanshi', duration: '6:30', artwork: '/images/shiva.jpg', audioUrl: '#', category: 'bhajan', deity: 'Shiva' },
  { id: 'bholenath-ke-bhakt', title: 'Bholenath Ke Bhakt', titleHindi: 'भोलेनाथ के भक्त', artist: 'Sachet-Parampara', duration: '4:18', artwork: '/images/shiva.jpg', audioUrl: '#', category: 'bhajan', deity: 'Shiva' },
  { id: 'mera-bhola-hai-bhandari', title: 'Mera Bhola Hai Bhandari', titleHindi: 'मेरा भोला है भंडारी', artist: 'Hansraj Raghuwanshi', duration: '7:22', artwork: '/images/shiva.jpg', audioUrl: '#', category: 'bhajan', deity: 'Shiva' },
  { id: 'shiv-shankar-ko-jisne', title: 'Shiv Shankar Ko Jisne Pooja', titleHindi: 'शिव शंकर को जिसने पूजा', artist: 'Anuradha Paudwal', duration: '5:55', artwork: '/images/shiva.jpg', audioUrl: '#', category: 'bhajan', deity: 'Shiva' },
  { id: 'om-namah-shivaya-dhun', title: 'Om Namah Shivaya Dhun', titleHindi: 'ॐ नमः शिवाय धुन', artist: 'Anuradha Paudwal', duration: '11:20', artwork: '/images/shiva.jpg', audioUrl: '#', category: 'mantra', deity: 'Shiva' },
  { id: 'shivratri-special', title: 'Shivratri Special Mashup', titleHindi: 'शिवरात्रि स्पेशल मैशअप', artist: 'Various Artists', duration: '8:45', artwork: '/images/shiva.jpg', audioUrl: '#', category: 'bhajan', deity: 'Shiva' },
  { id: 'kaun-hai-woh', title: 'Kaun Hai Woh', titleHindi: 'कौन है वो', artist: 'Kailash Kher', duration: '5:08', artwork: '/images/shiva.jpg', audioUrl: '#', category: 'bhajan', deity: 'Shiva' },
  { id: 'bam-lehri', title: 'Bam Lehri', titleHindi: 'बम लहरी', artist: 'Kailash Kher', duration: '4:45', artwork: '/images/shiva.jpg', audioUrl: '#', category: 'bhajan', deity: 'Shiva' },
  { id: 'devon-ke-dev-mahadev', title: 'Devon Ke Dev Mahadev', titleHindi: 'देवों के देव महादेव', artist: 'Ravindra Jain', duration: '6:33', artwork: '/images/shiva.jpg', audioUrl: '#', category: 'bhajan', deity: 'Shiva' },
];

const bhojpuriBhaktiSongs: Song[] = [
  { id: 'chhathi-maiya-aaili', title: 'Chhathi Maiya Aaili', titleHindi: 'छठी मइया आईली', artist: 'Pawan Singh', duration: '5:42', artwork: '/images/devi.jpg', audioUrl: '#', category: 'bhajan', deity: 'Chhathi Maiya' },
  { id: 'jai-ho-chhathi-maiya', title: 'Jai Ho Chhathi Maiya', titleHindi: 'जय हो छठी मइया', artist: 'Khesari Lal Yadav', duration: '6:15', artwork: '/images/devi.jpg', audioUrl: '#', category: 'bhajan', deity: 'Chhathi Maiya' },
  { id: 'kaanch-hi-baans-ke', title: 'Kaanch Hi Baans Ke Bahangiya', titleHindi: 'काँच ही बाँस के बहंगिया', artist: 'Sharda Sinha', duration: '7:38', artwork: '/images/devi.jpg', audioUrl: '#', category: 'bhajan', deity: 'Chhathi Maiya' },
  { id: 'ho-deenanath', title: 'Ho Deenanath', titleHindi: 'हो दीनानाथ', artist: 'Sharda Sinha', duration: '8:10', artwork: '/images/devi.jpg', audioUrl: '#', category: 'bhajan', deity: 'Surya' },
  { id: 'uga-ho-suraj-dev', title: 'Uga Ho Suraj Dev', titleHindi: 'उगा हो सूरज देव', artist: 'Anuradha Paudwal', duration: '6:22', artwork: '/images/devi.jpg', audioUrl: '#', category: 'bhajan', deity: 'Surya' },
  { id: 'maiya-mori-nim', title: 'Maiya Mori Mai Nim Ke Patiya', titleHindi: 'मइया मोरी मैं नीम के पतिया', artist: 'Pawan Singh', duration: '5:55', artwork: '/images/devi.jpg', audioUrl: '#', category: 'bhajan', deity: 'Durga' },
  { id: 'kelwa-ke-paat-par', title: 'Kelwa Ke Paat Par', titleHindi: 'केलवा के पात पर', artist: 'Sharda Sinha', duration: '6:48', artwork: '/images/devi.jpg', audioUrl: '#', category: 'bhajan', deity: 'Chhathi Maiya' },
  { id: 'chalat-musafir', title: 'Chalat Musafir Moh Liyo Re', titleHindi: 'चलत मुसाफिर मोह लियो रे', artist: 'Sharda Sinha', duration: '7:15', artwork: '/images/devi.jpg', audioUrl: '#', category: 'bhajan' },
  { id: 'pahile-pahil-chhathi', title: 'Pahile Pahil Chhathi Maiya', titleHindi: 'पहिले पहिल छठी मइया', artist: 'Pawan Singh', duration: '5:30', artwork: '/images/devi.jpg', audioUrl: '#', category: 'bhajan', deity: 'Chhathi Maiya' },
  { id: 'chhath-geet-mashup', title: 'Chhath Geet Mashup', titleHindi: 'छठ गीत मैशअप', artist: 'Various Artists', duration: '9:12', artwork: '/images/devi.jpg', audioUrl: '#', category: 'bhajan', deity: 'Chhathi Maiya' },
];

export const bhaktiPlaylists: BhaktiPlaylist[] = [
  {
    id: 'hindi-bhakti',
    title: 'Hindi Bhakti Songs',
    titleHindi: 'हिंदी भक्ति गीत',
    description: 'Timeless devotional songs in Hindi — the classics that echo through every temple and every heart.',
    songCount: hindiBhaktiSongs.length,
    songs: hindiBhaktiSongs,
    source: 'youtube-music',
    sourceUrl: 'https://music.youtube.com/playlist?list=PL9bw4S5ePsEE0jGfUgUMvzeWAaMPcqHL9',
    youtubePlaylistId: 'PL9bw4S5ePsEE0jGfUgUMvzeWAaMPcqHL9',
  },
  {
    id: 'mahadev',
    title: 'Mahadev Trending Songs 2025',
    titleHindi: 'महादेव ट्रेंडिंग 2025',
    description: 'All the trending Bholenath songs of 2025 — invoke courage, devotion, and supreme protection with Mahadev.',
    songCount: mahadevSongs.length,
    songs: mahadevSongs,
    source: 'spotify',
    sourceUrl: 'https://open.spotify.com/playlist/6NSKbSMT7IREBdzM9YtgqQ',
  },
  {
    id: 'bhojpuri-bhakti',
    title: 'Bhojpuri Bhakti Songs',
    titleHindi: 'भोजपुरी भक्ति गीत',
    description: 'Soulful Bhojpuri devotional songs — Chhath Puja specials, Maiya ke geet, and folk devotion from Bihar & UP.',
    songCount: bhojpuriBhaktiSongs.length,
    songs: bhojpuriBhaktiSongs,
    source: 'youtube-music',
    sourceUrl: 'https://music.youtube.com/playlist?list=PLFb_QU8-9a10b_FjHUDBc64HzBlZjaYCs',
    youtubePlaylistId: 'PLFb_QU8-9a10b_FjHUDBc64HzBlZjaYCs',
  },
];

export const getPlaylist = (id: string): BhaktiPlaylist | undefined => {
  return bhaktiPlaylists.find(p => p.id === id);
};

export const getAllPlaylistSongs = (): Song[] => {
  return bhaktiPlaylists.flatMap(p => p.songs);
};
