
import { Movie, Seat } from './types';

export const MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Mission: Impossible – Dead Reckoning',
    description: 'Ethan Hunt and his IMF team must track down a dangerous new weapon that threatens all of humanity before it falls into the wrong hands.',
    genre: ['Action', 'Adventure'],
    duration: 163,
    rating: 8.5,
    poster: 'https://picsum.photos/seed/mi7/400/600',
    backdrop: 'https://picsum.photos/seed/mi7b/1200/600',
    releaseDate: '2023-07-12',
    showtimes: ['12:30 PM', '03:45 PM', '07:00 PM', '10:15 PM']
  },
  {
    id: '2',
    title: 'Oppenheimer',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    genre: ['Biography', 'Drama', 'History'],
    duration: 180,
    rating: 8.9,
    poster: 'https://picsum.photos/seed/opp/400/600',
    backdrop: 'https://picsum.photos/seed/oppb/1200/600',
    releaseDate: '2023-07-21',
    showtimes: ['01:00 PM', '05:00 PM', '09:00 PM']
  },
  {
    id: '3',
    title: 'Barbie',
    description: 'Barbie suffers a crisis that leads her to question her world and her existence.',
    genre: ['Comedy', 'Adventure', 'Fantasy'],
    duration: 114,
    rating: 7.2,
    poster: 'https://picsum.photos/seed/barb/400/600',
    backdrop: 'https://picsum.photos/seed/barbb/1200/600',
    releaseDate: '2023-07-21',
    showtimes: ['11:00 AM', '02:00 PM', '04:30 PM', '07:30 PM']
  },
  {
    id: '4',
    title: 'Spider-Man: Across the Spider-Verse',
    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    genre: ['Animation', 'Action', 'Adventure'],
    duration: 140,
    rating: 9.0,
    poster: 'https://picsum.photos/seed/spidey/400/600',
    backdrop: 'https://picsum.photos/seed/spideyb/1200/600',
    releaseDate: '2023-06-02',
    showtimes: ['10:00 AM', '01:30 PM', '05:00 PM', '08:30 PM']
  }
];

export const generateSeats = (): Seat[] => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seats: Seat[] = [];
  rows.forEach((row, rowIndex) => {
    for (let i = 1; i <= 10; i++) {
      const isVIP = rowIndex >= 6;
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        isOccupied: Math.random() < 0.2,
        type: isVIP ? 'VIP' : 'Standard',
        price: isVIP ? 150 : 100
      });
    }
  });
  return seats;
};
