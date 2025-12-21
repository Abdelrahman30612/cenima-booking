
import React, { useState, useEffect } from 'react';
import { Movie, Seat, AppState, Booking } from './types';
import { MOVIES, generateSeats } from './constants';
import SeatMap from './components/SeatMap';
import Assistant from './components/Assistant';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>(AppState.BROWSE);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string>('');
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);

  useEffect(() => {
    setSeats(generateSeats());
  }, []);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setView(AppState.DETAILS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingStart = (showtime: string) => {
    setSelectedShowtime(showtime);
    setView(AppState.SEATING);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSeat = (seatId: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(id => id !== seatId) : [...prev, seatId]
    );
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seatId) => {
      const seat = seats.find(s => s.id === seatId);
      return total + (seat?.price || 0);
    }, 0);
  };

  const confirmBooking = () => {
    if (selectedSeats.length === 0) return;
    
    const booking: Booking = {
      movieId: selectedMovie!.id,
      showtime: selectedShowtime,
      selectedSeats: selectedSeats,
      totalPrice: calculateTotal(),
      timestamp: Date.now()
    };
    
    setLastBooking(booking);
    setView(AppState.TICKET);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reset = () => {
    setView(AppState.BROWSE);
    setSelectedMovie(null);
    setSelectedShowtime('');
    setSelectedSeats([]);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-black/60 border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
        <div 
          className="text-2xl font-black text-rose-600 tracking-tighter cursor-pointer flex items-center gap-2"
          onClick={reset}
        >
          <div className="w-8 h-8 bg-rose-600 rounded flex items-center justify-center text-white text-lg">V</div>
          VISION CINEMA
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-zinc-400">
          <a href="#" onClick={(e) => {e.preventDefault(); reset();}} className="hover:text-rose-500">Home</a>
          <a href="#" className="hover:text-rose-500">Movies</a>
          <a href="#" className="hover:text-rose-500">Offers</a>
          <a href="#" className="hover:text-rose-500">About</a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* BROWSE VIEW */}
        {view === AppState.BROWSE && (
          <div className="space-y-12">
            <header className="relative h-[60vh] rounded-3xl overflow-hidden group">
              <img 
                src={MOVIES[0].backdrop} 
                className="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-1000" 
                alt="Banner" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 max-w-2xl text-left">
                <span className="bg-rose-600 px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">TRENDING NOW</span>
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">{MOVIES[0].title}</h1>
                <p className="text-zinc-300 text-lg mb-8 line-clamp-2">{MOVIES[0].description}</p>
                <button 
                  onClick={() => handleMovieSelect(MOVIES[0])}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
                >
                  Book Now
                </button>
              </div>
            </header>

            <section>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-rose-600 rounded-full" />
                Now Playing
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {MOVIES.map(movie => (
                  <div 
                    key={movie.id} 
                    onClick={() => handleMovieSelect(movie)}
                    className="group cursor-pointer space-y-4"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-zinc-800">
                      <img 
                        src={movie.poster} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        alt={movie.title} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <span className="bg-rose-600 text-white w-full py-3 text-center rounded-xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">Details</span>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-bold">{movie.rating}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-rose-500 transition-colors">{movie.title}</h3>
                      <p className="text-zinc-500 text-sm">{movie.genre.join(' • ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* DETAILS VIEW */}
        {view === AppState.DETAILS && selectedMovie && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <button onClick={() => setView(AppState.BROWSE)} className="text-zinc-400 hover:text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Browse
            </button>

            <div className="grid md:grid-cols-[400px_1fr] gap-12">
              <div className="relative group">
                <img src={selectedMovie.poster} className="w-full rounded-3xl shadow-2xl border border-zinc-800" alt={selectedMovie.title} />
                <div className="absolute -bottom-6 -right-6 bg-rose-600 p-6 rounded-2xl shadow-xl">
                  <div className="text-4xl font-black">{selectedMovie.rating}</div>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-80 text-center">RATING</div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedMovie.genre.map(g => (
                      <span key={g} className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-xs border border-zinc-700">{g}</span>
                    ))}
                  </div>
                  <h1 className="text-5xl font-black mb-4">{selectedMovie.title}</h1>
                  <div className="flex items-center gap-4 text-zinc-400 text-sm">
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {Math.floor(selectedMovie.duration / 60)}h {selectedMovie.duration % 60}m
                    </span>
                    <span>•</span>
                    <span>Release: {selectedMovie.releaseDate}</span>
                  </div>
                </div>

                <p className="text-zinc-300 text-xl leading-relaxed">{selectedMovie.description}</p>

                <div className="pt-8 border-t border-zinc-800">
                  <h3 className="text-xl font-bold mb-6">Select Showtime:</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {selectedMovie.showtimes.map(time => (
                      <button 
                        key={time}
                        onClick={() => handleBookingStart(time)}
                        className="bg-zinc-900 hover:bg-rose-600 border border-zinc-800 hover:border-rose-500 p-4 rounded-xl text-center font-bold transition-all transform hover:-translate-y-1"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEATING VIEW */}
        {view === AppState.SEATING && selectedMovie && (
          <div className="space-y-12 animate-in slide-in-from-right duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="text-3xl font-black">{selectedMovie.title}</h2>
                <p className="text-zinc-500">{selectedShowtime} | Premium Hall 4</p>
              </div>
              <button onClick={() => setView(AppState.DETAILS)} className="text-zinc-400 hover:text-white flex items-center gap-2">
                Change Showtime
              </button>
            </div>

            <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start">
              <SeatMap 
                seats={seats} 
                selectedSeats={selectedSeats} 
                onToggleSeat={toggleSeat} 
              />

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8 sticky top-32">
                <h3 className="text-xl font-bold border-b border-zinc-800 pb-4">Booking Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-zinc-400">
                    <span>Selected Seats ({selectedSeats.length})</span>
                    <span className="text-white font-bold">{selectedSeats.join(', ') || '---'}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Ticket Price (Avg)</span>
                    <span className="text-white">100 EGP</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex justify-between items-end">
                  <div>
                    <span className="text-zinc-500 text-sm block">Total Price</span>
                    <span className="text-3xl font-black text-rose-500">{calculateTotal()} EGP</span>
                  </div>
                </div>

                <button 
                  disabled={selectedSeats.length === 0}
                  onClick={confirmBooking}
                  className={`
                    w-full py-4 rounded-xl font-bold text-lg transition-all
                    ${selectedSeats.length > 0 
                      ? 'bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-600/20' 
                      : 'bg-zinc-800 cursor-not-allowed text-zinc-500'
                    }
                  `}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TICKET / SUCCESS VIEW */}
        {view === AppState.TICKET && lastBooking && selectedMovie && (
          <div className="max-w-md mx-auto py-12 animate-in zoom-in duration-500">
            <div className="bg-white text-zinc-900 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(225,29,72,0.3)]">
              <div className="bg-rose-600 p-8 text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black">Booking Confirmed!</h2>
                <p className="opacity-80">Enjoy your movie experience</p>
              </div>

              <div className="p-8 space-y-6 relative">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">MOVIE</span>
                  <p className="text-xl font-bold">{selectedMovie.title}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">TIME</span>
                    <p className="font-bold">{lastBooking.showtime}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">DATE</span>
                    <p className="font-bold">{new Date().toLocaleDateString('en-US')}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">SEATS</span>
                  <p className="font-bold text-lg">{lastBooking.selectedSeats.join(', ')}</p>
                </div>

                {/* Dashed line */}
                <div className="border-t-2 border-dashed border-zinc-200 my-8 relative">
                   <div className="absolute -left-12 -top-4 w-8 h-8 bg-[#0a0a0a] rounded-full" />
                   <div className="absolute -right-12 -top-4 w-8 h-8 bg-[#0a0a0a] rounded-full" />
                </div>

                <div className="flex justify-center flex-col items-center gap-4">
                  <div className="bg-zinc-100 p-4 rounded-2xl w-full aspect-square flex items-center justify-center">
                    {/* Fake QR Code */}
                    <div className="grid grid-cols-5 gap-1 w-full h-full opacity-20">
                      {Array.from({length: 25}).map((_, i) => (
                        <div key={i} className={`bg-zinc-900 ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">ORDER_ID: VISION-{Math.floor(Math.random() * 999999)}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={reset}
              className="w-full mt-8 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl font-bold hover:bg-zinc-800 transition-colors"
            >
              Return to Home
            </button>
          </div>
        )}

      </main>

      {/* Floating AI Assistant */}
      <Assistant />

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-6 mt-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <h2 className="text-2xl font-black text-rose-600 mb-4">VISION CINEMA</h2>
            <p className="text-zinc-500 max-w-sm">We provide an unforgettable cinematic experience with the latest projection technology and the best comfort. Immerse yourself in the world of cinema with us.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-zinc-500">
              <li><a href="#" className="hover:text-rose-500">About Us</a></li>
              <li><a href="#" className="hover:text-rose-500">Careers</a></li>
              <li><a href="#" className="hover:text-rose-500">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Contact Us</h4>
            <p className="text-zinc-500 mb-4">Cairo, Maadi, Victory Square</p>
            <div className="flex gap-4">
               <div className="w-8 h-8 bg-zinc-800 rounded-lg" />
               <div className="w-8 h-8 bg-zinc-800 rounded-lg" />
               <div className="w-8 h-8 bg-zinc-800 rounded-lg" />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-900 text-center text-zinc-600 text-sm">
          © {new Date().getFullYear()} Vision Cinema. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
