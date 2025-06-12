import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import FeaturedArtists from "../components/FeaturedArtists";
import { Button } from "@/components/ui/button";
import { Event } from "../types/event";
import { fetchEvents } from "../services/eventService";

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadFeaturedEvents = async () => {
      try {
        const data = await fetchEvents();
        setFeaturedEvents(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to load featured events:", error);
      }
    };
    loadFeaturedEvents();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-venue-900/50 to-black/80"></div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Book Your Next <span className="text-venue-200">Live Experience</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 opacity-90">
              Discover the most electrifying concerts and secure your spot to see your favorite artists live on stage.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/events">
                <Button className="bg-venue-500 hover:bg-venue-700 text-white px-8 py-6 rounded-md text-lg shadow-lg shadow-venue-500/25 transition-all duration-300 hover:shadow-venue-500/50">
                  Browse Events
                </Button>
              </Link>
              <Link to="/venues">
                <Button
                  variant="outline"
                  className="border-venue-200 text-venue-200 hover:bg-venue-200/20 px-8 py-6 rounded-md text-lg"
                >
                  Explore Venues
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <FeaturedArtists />
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-venue-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Don't miss out on the opportunity to see your favorite artists live in concert.
          </p>
          <Link to="/booking">
            <Button className="bg-venue-500 hover:bg-venue-700 text-white px-8 py-6 rounded-md text-lg shadow-lg shadow-venue-500/25 transition-all duration-300 hover:shadow-venue-500/50">
              Book Your Tickets Now
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
