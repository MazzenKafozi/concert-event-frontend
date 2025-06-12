
import { Venue } from "./venue";

export interface Artist {
  id?: string;
  name: string;
  image: string;
  genre?: string;
  isFeatured?: boolean;
}

export interface Event {
  id?: number;
  title: string;
  genre: string;
  description: string;
  date: string;
  time: string;
  imageUrl?: string;
  venueId: number;
  createdBy?: number | null;
  status?: string | null;
    venueName?: string;
  venueCity?: string;

  artistName?: string;

}




export interface TicketType {
  id: string;
  name: string;
  price: number;
  available: number;
}

export interface Ticket {
  eventId: string;
  ticketTypeId: string;
  quantity: number;
  customerName: string;
  customerEmail: string;
}
