import SectionHeader from '@/components/SectionHeader';
import DeityCard from '@/components/DeityCard';
import Footer from '@/components/Footer';
import { deities } from '@/data/deities';

export default function DeitiesPage() {
  return (
    <>
      <div className="pt-24 pb-12 px-6 bg-gradient-to-b from-charcoal-dark via-gold/10 to-charcoal-dark">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-cream">Divine Deities</h1>
          <p className="font-noto-devanagari text-xl text-saffron-500 mt-4">देवी-देवता</p>
          <p className="text-cream/70 mt-4 max-w-2xl mx-auto">Explore devotion dedicated to various manifestations of the divine.</p>
        </div>
      </div>
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
          {deities.map((deity, i) => (
            <DeityCard key={deity.id} deity={deity} index={i} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
