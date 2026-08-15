import SectionHeader from '@/components/SectionHeader';
import SongCard from '@/components/SongCard';
import Footer from '@/components/Footer';
import { songs } from '@/data/songs';

export default function AartisPage() {
  const aartis = songs.filter(s => s.category === 'aarti');

  return (
    <>
      <div className="pt-24 pb-12 px-6 bg-gradient-to-b from-charcoal-dark via-maroon-900/30 to-charcoal-dark">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-cream">Aartis</h1>
          <p className="font-noto-devanagari text-xl text-saffron-500 mt-4">आरती</p>
          <p className="text-cream/70 mt-4 max-w-2xl mx-auto">Illuminate your spiritual path with divine aartis. Join in the daily prayers and offerings to the supreme.</p>
        </div>
      </div>
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <SectionHeader title="All Aartis" />
        <div className="mt-8 space-y-2">
          {aartis.map((song, i) => (
            <SongCard key={song.id} song={song} index={i} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
