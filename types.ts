
export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string[];
  duration: number; // in minutes
  rating: number;
  poster: string;
  backdrop: string;
  releaseDate: string;
  showtimes: string[];
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  isOccupied: boolean;
  type: 'Standard' | 'VIP';
  price: number;
}

export interface Booking {
  movieId: string;
  showtime: string;
  selectedSeats: string[];
  totalPrice: number;
  timestamp: number;
}

export enum AppState {
  BROWSE = 'BROWSE',
  DETAILS = 'DETAILS',
  SEATING = 'SEATING',
  TICKET = 'TICKET'
}
