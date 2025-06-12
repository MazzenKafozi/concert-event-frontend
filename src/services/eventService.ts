import { Artist, Event, Ticket } from "../types/event";

const API_BASE = import.meta.env.VITE_API_URL;

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/concerts`);
  if (!response.ok) {
    throw new Error("Failed to fetch concerts");
  }
  const data = await response.json();
  console.log("Fetched Events:", data); // ✅ Debug log
  return data;
};


// ✅ Fetch single event by ID
export const fetchEventById = async (id: string): Promise<Event | undefined> => {
  const response = await fetch(`${API_BASE}/concerts/${id}`);
  if (!response.ok) {
    return undefined;
  }
  return await response.json();
};

// 🟡 Placeholder – Update when artist endpoint is ready
export const fetchFeaturedArtists = async (): Promise<Artist[]> => {
  return []; // Replace with actual API call when available
};

// 🟡 Temporary mock – Replace with real API when booking is implemented
export const bookTickets = async (tickets: Ticket): Promise<{ success: boolean; ticketId?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        ticketId: `TKT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      });
    }, 800);
  });
};
