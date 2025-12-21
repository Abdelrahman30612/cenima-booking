
import React from 'react';
import { Seat } from '../types';

interface SeatMapProps {
  seats: Seat[];
  selectedSeats: string[];
  onToggleSeat: (seatId: string) => void;
}

const SeatMap: React.FC<SeatMapProps> = ({ seats, selectedSeats, onToggleSeat }) => {
  const rows = Array.from(new Set(seats.map(s => s.row)));

  return (
    <div className="flex flex-col items-center gap-6 p-4 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl overflow-x-auto">
      {/* Screen */}
      <div className="w-full max-w-2xl mb-12 relative">
        <div className="h-2 bg-rose-600 rounded-full shadow-[0_0_20px_rgba(225,29,72,0.8)] opacity-50" />
        <div className="mt-2 text-center text-xs text-zinc-500 uppercase tracking-widest">SCREEN</div>
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-rose-600/10 to-transparent pointer-events-none" />
      </div>

      {/* Seats Grid */}
      <div className="grid gap-3">
        {rows.map(row => (
          <div key={row} className="flex items-center gap-3">
            <span className="w-6 text-zinc-500 font-bold text-center">{row}</span>
            <div className="flex gap-2">
              {seats.filter(s => s.row === row).map(seat => {
                const isSelected = selectedSeats.includes(seat.id);
                return (
                  <button
                    key={seat.id}
                    disabled={seat.isOccupied}
                    onClick={() => onToggleSeat(seat.id)}
                    className={`
                      w-8 h-8 md:w-10 md:h-10 rounded-t-lg transition-all duration-300 relative
                      ${seat.isOccupied 
                        ? 'bg-zinc-800 cursor-not-allowed opacity-50' 
                        : isSelected 
                          ? 'bg-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.6)] scale-110' 
                          : seat.type === 'VIP' 
                            ? 'bg-amber-500/20 border-2 border-amber-500/50 hover:bg-amber-500/40' 
                            : 'bg-zinc-700 hover:bg-rose-500/50 border border-zinc-600'
                      }
                    `}
                    title={`${seat.id} - ${seat.type} (${seat.price} EGP)`}
                  >
                    <span className="text-[10px] absolute bottom-1 left-1/2 -translate-x-1/2 text-white/40">
                      {seat.number}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-zinc-700 rounded" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-500/40 border border-amber-500/50 rounded" />
          <span>VIP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-rose-600 rounded shadow-[0_0_5px_rgba(225,29,72,0.8)]" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-zinc-800 rounded opacity-50" />
          <span>Reserved</span>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
