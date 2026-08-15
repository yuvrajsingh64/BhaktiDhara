import SectionHeader from '@/components/SectionHeader';
import ArtistCard from '@/components/ArtistCard';
import Footer from '@/components/Footer';
import { artists } from '@/data/artists';

export default function ArtistsPage() {
  return (
    <>
      <div className="pt-24 pb-12 px-6 bg-gradient-to-b from-charcoal-dark via-saffron-900/10 to-charcoal-dark">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-cream">Voices of Devotion</h1>
          <p className="font-noto-devanagari text-xl text-saffron-500 mt-4">भक्ति के स्वर</p>
          <p className="text-cream/70 mt-4 max-w-2xl mx-auto">Discover the legendary artists who bring devotion to life through their divine voices.</p>
        </div>
      </div>
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mt-8">
          {artists.map((artist, i) => (
            <ArtistCard key={artist.id} artist={artist} index={i} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
