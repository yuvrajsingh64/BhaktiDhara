export interface Song {
  id: string;
  title: string;
  titleHindi?: string;
  artist: string;
  artistId?: string;
  deity?: string;
  deityId?: string;
  duration: string; // e.g. '5:23'
  durationSeconds?: number;
  artwork: string; // path to image
  audioUrl: string; // placeholder URL
  lyrics?: string;
  lyricsHindi?: string;
  category: 'bhajan' | 'aarti' | 'mantra' | 'kirtan' | 'stotram';
  album?: string;
  isLiked?: boolean;
  plays?: number;
}

export const songs: Song[] = [
  {
    id: 'achyutam-keshavam',
    title: 'Achyutam Keshavam',
    titleHindi: 'अच्युतम केशवम कृष्ण दामोदरम',
    artist: 'Anuradha Paudwal',
    artistId: 'anuradha-paudwal',
    deity: 'Krishna',
    deityId: 'krishna',
    duration: '6:12',
    durationSeconds: 372,
    artwork: '/images/krishna.jpg',
    audioUrl: '#',
    lyrics: `Achyutam Keshavam Rama Narayanam
Krishna Damodaram Vasudevam Harim
Shreedharam Madhavam Gopikavallabham
Janakinayakam Ramachandram Bhaje

Kaun kehte hain Bhagwan aate nahi
Tum Meera ke jaise bulate nahi
Kaun kehte hain Bhagwan khate nahi
Ber Shabri ke jaise khilate nahi

Achyutam Keshavam Rama Narayanam
Krishna Damodaram Vasudevam Harim`,
    lyricsHindi: `अच्युतं केशवं रामनारायणं
कृष्णदामोदरं वासुदेवं हरिम् ।
श्रीधरं माधवं गोपिकावल्लभं
जानकीनायकं रामचंद्रं भजे ॥

कौन कहते हैं भगवान आते नहीं
तुम मीरा के जैसे बुलाते नहीं ।
कौन कहते हैं भगवान खाते नहीं
बेर शबरी के जैसे खिलाते नहीं ॥

अच्युतं केशवं रामनारायणं
कृष्णदामोदरं वासुदेवं हरिम् ॥`,
    category: 'bhajan',
    album: 'Krishna Bhakti Vandana',
    isLiked: true,
    plays: 6890000,
  },
  {
    id: 'shri-ram-jai-ram',
    title: 'Shri Ram Jai Ram',
    titleHindi: 'श्री राम जय राम जय जय राम',
    artist: 'Jagjit Singh',
    artistId: 'jagjit-singh',
    deity: 'Ram',
    deityId: 'ram',
    duration: '5:45',
    durationSeconds: 345,
    artwork: '/images/ram.jpg',
    audioUrl: '#',
    lyrics: `Shri Ram Jai Ram Jai Jai Ram
Shri Ram Jai Ram Jai Jai Ram

Ram Ratan Dhan Paayo Maine
Bhavsagar Se Paar Lagayo
Prem Mudit Man Se Kaho
Ram Ram Shri Ram Jai Ram`,
    lyricsHindi: `श्री राम जय राम जय जय राम
श्री राम जय राम जय जय राम

राम रतन धन पायो मैंने
भवसागर से पार लगायो
प्रेम मुदित मन से कहो
राम राम श्री राम जय राम`,
    category: 'bhajan',
    album: 'Hey Ram Divine Melodies',
    isLiked: false,
    plays: 4320000,
  },
  {
    id: 'hanuman-chalisa',
    title: 'Hanuman Chalisa',
    titleHindi: 'श्री हनुमान चालीसा',
    artist: 'Hariharan',
    artistId: 'hariharan',
    deity: 'Hanuman',
    deityId: 'hanuman',
    duration: '9:30',
    durationSeconds: 570,
    artwork: '/images/hanuman.jpg',
    audioUrl: '#',
    lyrics: `Shri Guru Charan Saroj Raj Nij Manu Mukuru Sudhari
Barnau Raghuvar Bimal Jasu Jo Dayaku Phal Chari

Jai Hanuman Gyan Gun Sagar
Jai Kapis Tihun Lok Ujagar
Ram Doot Atulit Bal Dhama
Anjani Putra Pavan Sut Nama

Mahavir Bikram Bajrangi
Kumati Nivar Sumati Ke Sangi
Kanchan Baran Biraj Subesa
Kanan Kundal Kunchit Kesa`,
    lyricsHindi: `श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि ।
बरनउँ रघुबर बिमल जसु जो दायकु फल चारि ॥

जय हनुमान ज्ञान गुन सागर ।
जय कपीस तिहुँ लोक उजागर ॥
राम दूत अतुलित बल धामा ।
अंजनि पुत्र पवनसुत नामा ॥

महाबीर बिक्रम बजरंगी ।
कुमति निवार सुमति के संगी ॥
कंचन बरन बिराज सुबेसा ।
कानन कुंडल कुंचित केसा ॥`,
    category: 'stotram',
    album: 'Shree Hanuman Amritwani',
    isLiked: true,
    plays: 9850000,
  },
  {
    id: 'shiv-tandav-stotram',
    title: 'Shiv Tandav Stotram',
    titleHindi: 'शिव ताण्डव स्तोत्रम्',
    artist: 'Shankar Mahadevan',
    artistId: 'shankar-mahadevan',
    deity: 'Shiva',
    deityId: 'shiva',
    duration: '8:15',
    durationSeconds: 495,
    artwork: '/images/shiva.jpg',
    audioUrl: '#',
    lyrics: `Jatatavigalajjala Pravahapavitasthale
Galeavalambya Lambitam Bhujangatungamalikam
Damaddamaddamaddaman Ninadavaddamarvayam
Chakara Chandatandavam Tanotu Nah Shivah Shivam

Jatakatahasambhramabhramannilimpanirjhari
Vilolavichivalari Virajamanamurdhani
Dhagaddhagaddhagajjvalal Lalatapavakashikhe
Kishorachandrashekhare Ratih Pratikshanam Mama`,
    lyricsHindi: `जटाटवीगलज्जलप्रवाहपावितस्थले
गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ।
डमड्डमड्डमड्डमन्निनादवड्डमर्वयं
चकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥

जटाकटाहसम्भ्रमभ्रमन्निलिम्पनिर्झरी
विलोलवीचिवल्लरीविराजमानमूर्धनि ।
धगद्धगद्धगज्ज्वलल्ललाटपट्टपावके
किशोरचन्द्रशेखरे रतिः प्रतिक्षणं मम ॥`,
    category: 'stotram',
    album: 'Devon Ke Dev Mahadev',
    isLiked: true,
    plays: 7420000,
  },
  {
    id: 'raghupati-raghav-raja-ram',
    title: 'Raghupati Raghav Raja Ram',
    titleHindi: 'रघुपति राघव राजा राम',
    artist: 'Anup Jalota',
    artistId: 'anup-jalota',
    deity: 'Ram',
    deityId: 'ram',
    duration: '4:30',
    durationSeconds: 270,
    artwork: '/images/ram.jpg',
    audioUrl: '#',
    lyrics: `Raghupati Raghav Raja Ram
Patita Pavana Sita Ram

Sita Ram Sita Ram
Bhaja Pyare Tu Sita Ram
Ishwar Allah Tero Naam
Sabko Sanmati De Bhagwan`,
    lyricsHindi: `रघुपति राघव राजा राम
पतित पावन सीता राम

सीता राम सीता राम
भज प्यारे तू सीता राम
ईश्वर अल्लाह तेरो नाम
सबको सन्मति दे भगवान`,
    category: 'bhajan',
    album: 'Ram Ratan Dhan Payo',
    isLiked: false,
    plays: 5120000,
  },
  {
    id: 'om-jai-jagdish-hare',
    title: 'Om Jai Jagdish Hare',
    titleHindi: 'ॐ जय जगदीश हरे',
    artist: 'Anuradha Paudwal',
    artistId: 'anuradha-paudwal',
    deity: 'Vishnu',
    deityId: 'vishnu',
    duration: '7:20',
    durationSeconds: 440,
    artwork: '/images/krishna.jpg',
    audioUrl: '#',
    lyrics: `Om Jai Jagdish Hare Swami Jai Jagdish Hare
Bhakta Janon Ke Sankat Kshan Mein Door Kare
Om Jai Jagdish Hare

Jo Dhyave Phal Pave Dukh Vinse Man Ka
Swami Dukh Vinse Man Ka
Sukh Sampati Ghar Aave Kasht Mite Tan Ka
Om Jai Jagdish Hare`,
    lyricsHindi: `ॐ जय जगदीश हरे, स्वामी ! जय जगदीश हरे ।
भक्त जनों के संकट, क्षण में दूर करे ॥
ॐ जय जगदीश हरे ॥

जो ध्यावे फल पावे, दुःख बिनसे मन का ।
स्वामी दुःख बिनसे मन का ।
सुख सम्पत्ति घर आवे, कष्ट मिटे तन का ॥
ॐ जय जगदीश हरे ॥`,
    category: 'aarti',
    album: 'Sampoorna Aarti Sangrah',
    isLiked: true,
    plays: 8430000,
  },
  {
    id: 'aarti-kunj-bihari-ki',
    title: 'Aarti Kunj Bihari Ki',
    titleHindi: 'आरती कुंजबिहारी की',
    artist: 'Anuradha Paudwal',
    artistId: 'anuradha-paudwal',
    deity: 'Krishna',
    deityId: 'krishna',
    duration: '5:10',
    durationSeconds: 310,
    artwork: '/images/krishna.jpg',
    audioUrl: '#',
    lyrics: `Aarti Kunj Bihari Ki, Shri Girdhar Krishna Murari Ki
Gale Mein Baijanti Mala, Bajave Murali Madhur Bala
Shravan Mein Kundal Jhalakaala, Nand Ke Anand Nandalala`,
    lyricsHindi: `आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की ॥
गले में बैजंती माला, बजावै मुरली मधुर बाला ।
श्रवण में कुण्डल झलकाला, नन्द के आनन्द नन्दलाला ॥`,
    category: 'aarti',
    album: 'Bhakti Sagar Aarti Sangrah',
    isLiked: false,
    plays: 4670000,
  },
  {
    id: 'ganesh-aarti',
    title: 'Ganesh Aarti',
    titleHindi: 'जय गणेश जय गणेश देवा',
    artist: 'Sachet Tandon',
    artistId: 'sachet-tandon',
    deity: 'Ganesh',
    deityId: 'ganesh',
    duration: '4:45',
    durationSeconds: 285,
    artwork: '/images/ganesh.jpg',
    audioUrl: '#',
    lyrics: `Jai Ganesh Jai Ganesh Jai Ganesh Deva
Mata Jaki Parvati Pita Mahadeva

Ek Dant Daya Vant Char Bhuja Dhari
Mathe Sindoor Sobhe Muse Ki Sawari`,
    lyricsHindi: `जय गणेश, जय गणेश, जय गणेश देवा ।
माता जाकी पार्वती, पिता महादेवा ॥

एक दन्त, दयावन्त, चार भुजाधारी ।
माथे पर तिलक सोहे, मूसे की सवारी ॥`,
    category: 'aarti',
    album: 'Pratham Pujya Ganesha',
    isLiked: true,
    plays: 3290000,
  },
  {
    id: 'om-namah-shivaya',
    title: 'Om Namah Shivaya',
    titleHindi: 'ॐ नमः शिवाय धुन',
    artist: 'Shankar Mahadevan',
    artistId: 'shankar-mahadevan',
    deity: 'Shiva',
    deityId: 'shiva',
    duration: '10:00',
    durationSeconds: 600,
    artwork: '/images/shiva.jpg',
    audioUrl: '#',
    lyrics: `Om Namah Shivaya Om Namah Shivaya
Har Har Bhole Namah Shivaya
Rameshwaraya Shiv Rameshwaraya
Har Har Bhole Namah Shivaya`,
    lyricsHindi: `ॐ नमः शिवाय ॐ नमः शिवाय
हर हर भोले नमः शिवाय ।
रामेश्वराय शिव रामेश्वराय
हर हर भोले नमः शिवाय ॥`,
    category: 'mantra',
    album: 'Shiva Shambhu Mantras',
    isLiked: true,
    plays: 6150000,
  },
  {
    id: 'gayatri-mantra',
    title: 'Gayatri Mantra',
    titleHindi: 'ॐ भूर्भुवः स्वः (गायत्री महामंत्र)',
    artist: 'Anuradha Paudwal',
    artistId: 'anuradha-paudwal',
    deity: 'Vishnu',
    deityId: 'vishnu',
    duration: '11:30',
    durationSeconds: 690,
    artwork: '/images/krishna.jpg',
    audioUrl: '#',
    lyrics: `Om Bhur Bhuva Swaha
Tat Savitur Varenyam
Bhargo Devasya Dheemahi
Dhiyo Yo Nah Prachodayat`,
    lyricsHindi: `ॐ भूर्भुवः स्वः ।
तत्सवितुर्वरेण्यं ।
भर्गो देवस्य धीमहि ।
धियो यो नः प्रचोदयात् ॥`,
    category: 'mantra',
    album: 'Maha Mantra Mala',
    isLiked: true,
    plays: 8940000,
  },
  {
    id: 'radhe-radhe',
    title: 'Radhe Radhe',
    titleHindi: 'राधे राधे जपो चले आएंगे बिहारी',
    artist: 'Sachet Tandon',
    artistId: 'sachet-tandon',
    deity: 'Krishna',
    deityId: 'krishna',
    duration: '5:00',
    durationSeconds: 300,
    artwork: '/images/krishna.jpg',
    audioUrl: '#',
    lyrics: `Radhe Radhe Japo Chale Aayenge Bihari
Aayenge Bihari Chale Aayenge Bihari
Radha Meri Chand Chakori Bihari
Radhe Radhe Japo Chale Aayenge Bihari`,
    lyricsHindi: `राधे राधे जपो चले आएंगे बिहारी
आएंगे बिहारी चले आएंगे बिहारी ।
राधा मेरी चन्द चकोरी बिहारी
राधे राधे जपो चले आएंगे बिहारी ॥`,
    category: 'bhajan',
    album: 'Vrindavan Dham',
    isLiked: false,
    plays: 5820000,
  },
  {
    id: 'jai-hanuman-gyan-gun-sagar',
    title: 'Jai Hanuman Gyan Gun Sagar',
    titleHindi: 'जय हनुमान ज्ञान गुन सागर',
    artist: 'Hariharan',
    artistId: 'hariharan',
    deity: 'Hanuman',
    deityId: 'hanuman',
    duration: '6:30',
    durationSeconds: 390,
    artwork: '/images/hanuman.jpg',
    audioUrl: '#',
    lyrics: `Jai Hanuman Gyan Gun Sagar
Jai Kapis Tihun Lok Ujagar
Ram Doot Atulit Bal Dhama
Anjani Putra Pavan Sut Nama`,
    lyricsHindi: `जय हनुमान ज्ञान गुन सागर ।
जय कपीस तिहुँ लोक उजागर ॥
राम दूत अतुलित बल धामा ।
अंजनि पुत्र पवनसुत नामा ॥`,
    category: 'bhajan',
    album: 'Sankat Mochan Hanuman',
    isLiked: false,
    plays: 3780000,
  },
  {
    id: 'shiv-shankar-ko-jisne-puja',
    title: 'Shiv Shankar Ko Jisne Puja',
    titleHindi: 'शिव शंकर को जिसने पूजा',
    artist: 'Anup Jalota',
    artistId: 'anup-jalota',
    deity: 'Shiva',
    deityId: 'shiva',
    duration: '5:50',
    durationSeconds: 350,
    artwork: '/images/shiva.jpg',
    audioUrl: '#',
    lyrics: `Shiv Shankar Ko Jisne Puja Uska Hi Uddhar Hua
Anth Kaal Bhavsagar Mein Uska Beda Paar Hua
Bhole Shankar Ki Mahima Nirali
Jholi Bhar Dete Hain Jo Bhi Ho Khali`,
    lyricsHindi: `शिव शंकर को जिसने पूजा उसका ही उद्धार हुआ ।
अंत काल भवसागर में उसका बेड़ा पार हुआ ॥
भोले शंकर की महिमा निराली
झोली भर देते हैं जो भी हो खाली ॥`,
    category: 'bhajan',
    album: 'Shiv Vandana',
    isLiked: false,
    plays: 2940000,
  },
  {
    id: 'hey-ram-hey-ram',
    title: 'Hey Ram Hey Ram',
    titleHindi: 'हे राम हे राम जग में सचो तेरो नाम',
    artist: 'Jagjit Singh',
    artistId: 'jagjit-singh',
    deity: 'Ram',
    deityId: 'ram',
    duration: '7:00',
    durationSeconds: 420,
    artwork: '/images/ram.jpg',
    audioUrl: '#',
    lyrics: `Hey Ram Hey Ram Jag Mein Sacho Tero Naam
Tu Hi Mata Tu Hi Pita Hai Tu Hi To Hai Radha Ka Shyam

Antaryami Sabka Swami Sab Par Daya Karne Wala
Deen Dayal Kripal Kripa Nidhi Sabke Sankat Harne Wala`,
    lyricsHindi: `हे राम हे राम, जग में साचो तेरो नाम ॥
तू ही माता तू ही पिता है, तू ही तो है राधा का श्याम ॥

अन्तर्यामी सबका स्वामी, सब पर दया करने वाला ।
दीनदयाल कृपाल कृपानिधि, सबके संकट हरने वाला ॥`,
    category: 'bhajan',
    album: 'Hey Ram',
    isLiked: true,
    plays: 4890000,
  },
  {
    id: 'durga-chalisa',
    title: 'Durga Chalisa',
    titleHindi: 'श्री दुर्गा चालीसा',
    artist: 'Anuradha Paudwal',
    artistId: 'anuradha-paudwal',
    deity: 'Durga',
    deityId: 'durga',
    duration: '8:40',
    durationSeconds: 520,
    artwork: '/images/devi.jpg',
    audioUrl: '#',
    lyrics: `Namo Namo Durge Sukha Karani
Namo Namo Ambe Dukkha Harani
Nirankara Hai Jyoti Tumhari
Tihun Lok Phaili Ujiyari`,
    lyricsHindi: `नमो नमो दुर्गे सुख करनी ।
नमो नमो अम्बे दुःख हरनी ॥
निरंकार है ज्योति तुम्हारी ।
तिहूँ लोक फैली उजियारी ॥`,
    category: 'stotram',
    album: 'Navratri Durga Utsav',
    isLiked: false,
    plays: 4120000,
  },
  {
    id: 'lakshmi-aarti',
    title: 'Lakshmi Aarti',
    titleHindi: 'ॐ जय लक्ष्मी माता आरती',
    artist: 'Sachet Tandon',
    artistId: 'sachet-tandon',
    deity: 'Lakshmi',
    deityId: 'lakshmi',
    duration: '4:20',
    durationSeconds: 260,
    artwork: '/images/devi.jpg',
    audioUrl: '#',
    lyrics: `Om Jai Lakshmi Mata Maiya Jai Lakshmi Mata
Tumko Nishidin Sevat Har Vishnu Vidhata
Om Jai Lakshmi Mata`,
    lyricsHindi: `ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता ।
तुमको निसदिन सेवत, हर विष्णु विधाता ॥
ॐ जय लक्ष्मी माता ॥`,
    category: 'aarti',
    album: 'Diwali Mahalakshmi Puja',
    isLiked: false,
    plays: 2310000,
  },
  {
    id: 'saraswati-vandana',
    title: 'Saraswati Vandana',
    titleHindi: 'या कुन्देन्दुतुषारहारधवला (सरस्वती वंदना)',
    artist: 'Shankar Mahadevan',
    artistId: 'shankar-mahadevan',
    deity: 'Saraswati',
    deityId: 'saraswati',
    duration: '5:15',
    durationSeconds: 315,
    artwork: '/images/devi.jpg',
    audioUrl: '#',
    lyrics: `Ya Kundendu Tushara Hara Dhavala Ya Shubhra Vastravrita
Ya Veena Varadanda Manditakara Ya Shweta Padmasana
Sa Mam Patu Saraswati Bhagavati Nihshesha Jadyapaha`,
    lyricsHindi: `या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता
या वीणावरदण्डमण्डितकरा या श्वेतपद्मासना ।
सा मां पातु सरस्वती भगवती निःशेषजाड्यापहा ॥`,
    category: 'mantra',
    album: 'Vidya Vani',
    isLiked: true,
    plays: 1890000,
  },
  {
    id: 'krishna-dhun',
    title: 'Krishna Dhun',
    titleHindi: 'हरे कृष्ण हरे राम महामंत्र',
    artist: 'Hariharan',
    artistId: 'hariharan',
    deity: 'Krishna',
    deityId: 'krishna',
    duration: '12:00',
    durationSeconds: 720,
    artwork: '/images/krishna.jpg',
    audioUrl: '#',
    lyrics: `Hare Krishna Hare Krishna Krishna Krishna Hare Hare
Hare Rama Hare Rama Rama Rama Hare Hare`,
    lyricsHindi: `हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे ।
हरे राम हरे राम राम राम हरे हरे ॥`,
    category: 'kirtan',
    album: 'Chant The Holy Names',
    isLiked: false,
    plays: 3670000,
  },
  {
    id: 'mahamrityunjaya-mantra',
    title: 'Mahamrityunjaya Mantra',
    titleHindi: 'ॐ त्र्यम्बकं यजामहे (महामृत्युंजय मंत्र)',
    artist: 'Shankar Mahadevan',
    artistId: 'shankar-mahadevan',
    deity: 'Shiva',
    deityId: 'shiva',
    duration: '10:30',
    durationSeconds: 630,
    artwork: '/images/shiva.jpg',
    audioUrl: '#',
    lyrics: `Om Tryambakam Yajamahe Sugandhim Pushtivardhanam
Urvarukamiva Bandhanan Mrityor Mukshiya Maamritat`,
    lyricsHindi: `ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।
उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात् ॥`,
    category: 'mantra',
    album: 'Maha Rudra Chants',
    isLiked: true,
    plays: 6780000,
  },
  {
    id: 'jai-shri-ram-dhun',
    title: 'Jai Shri Ram Dhun',
    titleHindi: 'जय श्री राम नाम संकीर्तन',
    artist: 'Anup Jalota',
    artistId: 'anup-jalota',
    deity: 'Ram',
    deityId: 'ram',
    duration: '8:00',
    durationSeconds: 480,
    artwork: '/images/ram.jpg',
    audioUrl: '#',
    lyrics: `Jai Shri Ram Jai Shri Ram
Jai Jai Ram Sita Ram
Mangala Bhavana Amangala Haari
Dravahu Su Dasharath Ajir Bihari`,
    lyricsHindi: `जय श्री राम जय श्री राम
जय जय राम सीता राम ।
मंगल भवन अमंगल हारी
द्रवहु सुदसरथ अजिर बिहारी ॥`,
    category: 'kirtan',
    album: 'Ayodhya Dham Kirtan',
    isLiked: true,
    plays: 4540000,
  },
  {
    id: 'shri-krishna-govind',
    title: 'Shri Krishna Govind Hare Murari',
    titleHindi: 'श्री कृष्ण गोविंद हरे मुरारी',
    artist: 'Anup Jalota',
    artistId: 'anup-jalota',
    deity: 'Krishna',
    deityId: 'krishna',
    duration: '6:45',
    durationSeconds: 405,
    artwork: '/images/krishna.jpg',
    audioUrl: '#',
    lyrics: `Shri Krishna Govind Hare Murari
Hey Nath Narayan Vasudeva
Gokul Ke Raja Mere Kanhaiya
Bhavsagar Se Par Lagana`,
    lyricsHindi: `श्री कृष्ण गोविंद हरे मुरारी
हे नाथ नारायण वासुदेवा ।
गोकुल के राजा मेरे कन्हैया
भवसागर से पार लगाना ॥`,
    category: 'bhajan',
    album: 'Gokul Dham',
    isLiked: false,
    plays: 5210000,
  },
  {
    id: 'radhe-govinda',
    title: 'Radhe Govinda',
    titleHindi: 'राधे गोविंदा भजमन राधे गोविंदा',
    artist: 'Hariharan',
    artistId: 'hariharan',
    deity: 'Radha',
    deityId: 'radha',
    duration: '7:15',
    durationSeconds: 435,
    artwork: '/images/krishna.jpg',
    audioUrl: '#',
    lyrics: `Bhajaman Radhe Govinda Gopala
Radhe Govinda Radhe Govinda
Radhe Radhe Radhe Radhe Govinda`,
    lyricsHindi: `भजमन राधे गोविंदा गोपाला
राधे गोविंदा राधे गोविंदा
राधे राधे राधे राधे गोविंदा`,
    category: 'kirtan',
    album: 'Barsana Ras',
    isLiked: true,
    plays: 2890000,
  },
  {
    id: 'sankat-mochan-hanuman-ashtak',
    title: 'Sankat Mochan Hanuman Ashtak',
    titleHindi: 'संकट मोचन हनुमान अष्टक',
    artist: 'Hariharan',
    artistId: 'hariharan',
    deity: 'Hanuman',
    deityId: 'hanuman',
    duration: '6:50',
    durationSeconds: 410,
    artwork: '/images/hanuman.jpg',
    audioUrl: '#',
    lyrics: `Baal Samaye Rabi Bhakshi Liyo Tab
Teenahu Lok Bhayo Andhiyaro
Taahi So Tras Bhayo Jag Ko
Yah Sankat Kahu So Jaat Na Taaro`,
    lyricsHindi: `बाल समय रबि भक्षि लियो तब
तीनहुं लोक भयो अंधियारो ।
ताहि सों त्रास भयो जग को
यह संकट काहु सों जात न टारो ॥`,
    category: 'stotram',
    album: 'Sankat Mochan',
    isLiked: false,
    plays: 3450000,
  },
  {
    id: 'vakratunda-mahakaya',
    title: 'Vakratunda Mahakaya',
    titleHindi: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ',
    artist: 'Shankar Mahadevan',
    artistId: 'shankar-mahadevan',
    deity: 'Ganesh',
    deityId: 'ganesh',
    duration: '4:15',
    durationSeconds: 255,
    artwork: '/images/ganesh.jpg',
    audioUrl: '#',
    lyrics: `Vakratunda Mahakaya Suryakoti Samaprabha
Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada`,
    lyricsHindi: `वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।
निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥`,
    category: 'mantra',
    album: 'Siddhi Vinayak Shloka',
    isLiked: false,
    plays: 3950000,
  },
];

export const getSongById = (id: string): Song | undefined => {
  return songs.find((song) => song.id === id);
};

export const getSongsByDeity = (deityId: string): Song[] => {
  return songs.filter((song) => song.deityId?.toLowerCase() === deityId.toLowerCase());
};

export const getSongsByArtist = (artistId: string): Song[] => {
  return songs.filter((song) => song.artistId?.toLowerCase() === artistId.toLowerCase());
};

export const getSongsByCategory = (category: Song['category']): Song[] => {
  return songs.filter((song) => song.category.toLowerCase() === category.toLowerCase());
};

export const getFeaturedSongs = (limit: number = 8): Song[] => {
  return [...songs].sort((a, b) => (b.plays ?? 0) - (a.plays ?? 0)).slice(0, limit);
};

export const getTrendingSongs = (limit: number = 6): Song[] => {
  return songs.filter((s) => s.isLiked).slice(0, limit);
};
