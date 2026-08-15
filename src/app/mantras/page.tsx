import SectionHeader from '@/components/SectionHeader';
import SongCard from '@/components/SongCard';
import Footer from '@/components/Footer';
import { songs } from '@/data/songs';

export default function MantrasPage() {
  const mantras = songs.filter(s => s.category === 'mantra');

  return (
    <>
      <div className="pt-24 pb-12 px-6 bg-gradient-to-b from-charcoal-dark via-indigo-900/20 to-charcoal-dark">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-cream">Mantras</h1>
          <p className="font-noto-devanagari text-xl text-saffron-500 mt-4">मंत्र</p>
          <p className="text-cream/70 mt-4 max-w-2xl mx-auto">Chant the sacred verses and elevate your consciousness. Find tranquility in the rhythmic repetition of divine mantras.</p>
        </div>
      </div>
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <SectionHeader title="All Mantras" />
        <div className="mt-8 space-y-2">
          {mantras.map((song, i) => (
            <SongCard key={song.id} song={song} index={i} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
