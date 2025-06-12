
import { useState, useEffect } from "react";
import { fetchVenues } from "../services/venueService";
import VenueTable from "../components/VenueTable";
import VenueForm from "../components/VenueForm";
import Header from "../components/Header";
import { Venue } from "../types/venue";
import './index.css';


const Index = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadVenues = async () => {
    setIsLoading(true);
    try {
      const data = await fetchVenues();
      setVenues(data);
    } catch (error) {
      console.error("Failed to fetch venues:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVenues();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2 text-venue-900">Manage Venues</h2>
          <p className="text-gray-600 mb-6">
            Add and manage concert venues for your events. Fill out the form below to add a new venue.
          </p>
          
          <div className="mb-10">
            <VenueForm onVenueAdded={loadVenues} />
          </div>
          
          <h3 className="text-2xl font-semibold mb-4 text-venue-900">Venue List</h3>
          <VenueTable venues={venues} isLoading={isLoading} />
        </div>
      </main>
      
      <footer className="bg-venue-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Concert Venue Manager. All rights reserved.</p>
          <div className="mt-2 text-venue-200 text-sm">
            A professional event management solution
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
