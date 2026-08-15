import Image from 'next/image';
import { notFound } from 'next/navigation';
import SectionHeader from '@/components/SectionHeader';
import SongCard from '@/components/SongCard';
import Footer from '@/components/Footer';
import { artists } from '@/data/artists';
import { songs } from '@/data/songs';

export default async function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const artist = artists.find(a => a.id === resolvedParams.id);
  
  if (!artist) {
    notFound();
  }

  const artistSongs = songs.filter(s => 
    s.artistId === artist.id || 
    (typeof s.artist === 'string' && s.artist.toLowerCase().includes(artist.name.toLowerCase()))
  );

  return (
    <>
      <div className="pt-32 pb-20 px-6 bg-gradient-to-b from-maroon-900/30 via-charcoal-dark/50 to-charcoal-dark">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-saffron-500/20 shadow-2xl">
            <Image 
              src={artist.image || '/images/krishna.jpg'} 
              alt={artist.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl md:text-5xl font-heading text-cream">{artist.name}</h1>
            <p className="text-saffron-500 font-semibold mt-2">{artist.speciality}</p>
            <p className="text-cream/70 mt-4 max-w-2xl text-lg leading-relaxed">{artist.bio}</p>
            <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cream/80 text-sm">
                {artistSongs.length} Tracks
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <SectionHeader title={`Songs by ${artist.name}`} />
        <div className="mt-8 space-y-2">
          {artistSongs.length > 0 ? (
            artistSongs.map((song, i) => (
              <SongCard key={song.id} song={song} index={i} />
            ))
          ) : (
            <p className="text-cream/50 text-center py-12">No songs available for this artist yet.</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
