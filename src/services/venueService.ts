
import { Venue } from "../types/venue";

// Example venues
const mockVenues: Venue[] = [
  {
    id: "1",
    name: "Madison Square Garden",
    location: "New York",
    capacity: 20789,
    contactEmail: "info@msg.com",
    contactPhone: "(212) 465-6741",
    hasParking: true,
    isIndoor: true,
    city: "New York"
  },
  {
    id: "2",
    name: "The Forum",
    location: "Los Angeles",
    capacity: 17500,
    contactEmail: "contact@forum.com",
    contactPhone: "(310) 330-7300",
    hasParking: true,
    isIndoor: true,
    city: "Los Angeles"
  },
  {
    id: "3",
    name: "Red Rocks Amphitheatre",
    location: "Morrison",
    capacity: 9525,
    contactEmail: "info@redrocksonline.com",
    contactPhone: "(720) 865-2494",
    hasParking: true,
    isIndoor: false,
    city: "Morrison"
  },
  {
    id: "4",
    name: "Barclays Center",
    location: "Brooklyn",
    capacity: 19000,
    contactEmail: "info@barclayscenter.com",
    contactPhone: "(917) 618-6100",
    hasParking: false,
    isIndoor: true,
    city: "Brooklyn"
  },
  {
    id: "5",
    name: "Hollywood Bowl",
    location: "Los Angeles",
    capacity: 17500,
    contactEmail: "info@hollywoodbowl.com",
    contactPhone: "(323) 850-2000",
    hasParking: true,
    isIndoor: false,
    city: "Los Angeles"
  }
];

export const fetchVenues = async (): Promise<Venue[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockVenues);
    }, 500);
  });
};

export const fetchVenueById = async (id: string): Promise<Venue | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const venue = mockVenues.find(v => v.id === id);
      resolve(venue);
    }, 300);
  });
};

export const addVenue = async (venue: Venue): Promise<Venue> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newVenue = {
        ...venue,
        id: `venue-${Date.now()}`
      };
      mockVenues.push(newVenue);
      resolve(newVenue);
    }, 500);
  });
};
