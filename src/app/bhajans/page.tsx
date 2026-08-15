import SectionHeader from '@/components/SectionHeader';
import SongCard from '@/components/SongCard';
import Footer from '@/components/Footer';
import { songs } from '@/data/songs';

export default function BhajansPage() {
  const bhajans = songs.filter(s => s.category === 'bhajan');

  return (
    <>
      <div className="pt-24 pb-12 px-6 bg-gradient-to-b from-charcoal-dark via-saffron-900/20 to-charcoal-dark">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-cream">Bhajans</h1>
          <p className="font-noto-devanagari text-xl text-saffron-500 mt-4">भजन</p>
          <p className="text-cream/70 mt-4 max-w-2xl mx-auto">Immerse yourself in soulful melodies dedicated to the divine. Experience peace and devotion with our curated collection of bhajans.</p>
        </div>
      </div>
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <SectionHeader title="All Bhajans" />
        <div className="mt-8 space-y-2">
          {bhajans.map((song, i) => (
            <SongCard key={song.id} song={song} index={i} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
