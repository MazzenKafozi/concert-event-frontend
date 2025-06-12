
import { useState, useEffect } from "react";
import { fetchEvents } from "../services/eventService";
import Layout from "../components/Layout";
import { Event } from "../types/event";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    artist: "",
    city: "",
    date: "",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const data = await fetchEvents();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setIsLoading(false);
    }
  };

useEffect(() => {
  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const data = await fetchEvents();
      console.log("Data loaded in Events.tsx:", data); // ✅ add this
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  loadEvents();
}, []);


useEffect(() => {
  const filtered = events.filter((event) => {
    const matchArtist = filters.artist
      ? event.artistName?.toLowerCase().includes(filters.artist.toLowerCase())
      : true;

    const matchCity = filters.city
      ? event.venueCity?.toLowerCase().includes(filters.city.toLowerCase())
      : true;

    const matchDate = filters.date
      ? new Date(event.date).toISOString().split("T")[0] === filters.date
      : true;

    const matchSearch = searchQuery
      ? event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.artistName?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchArtist && matchCity && matchDate && matchSearch;
  });

  setFilteredEvents(filtered);
}, [filters, searchQuery, events]);




  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilters({
      artist: "",
      city: "",
      date: "",
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 text-white">Upcoming Events</h1>
          <p className="text-gray-300 text-lg">
            Find and book tickets for your favorite artists
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-venue-900/50 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
            <div className="w-full">
              <Input
                type="text"
                placeholder="Search events, artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#1E1E1E] border-venue-700 text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="artist" className="block text-sm text-gray-400 mb-1">
                Filter by Artist
              </label>
              <Input
                id="artist"
                name="artist"
                placeholder="Artist name"
                value={filters.artist}
                onChange={handleFilterChange}
                className="bg-[#1E1E1E] border-venue-700 text-white"
              />
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm text-gray-400 mb-1">
                Filter by City
              </label>
              <Input
                id="city"
                name="city"
                placeholder="City name"
                value={filters.city}
                onChange={handleFilterChange}
                className="bg-[#1E1E1E] border-venue-700 text-white"
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm text-gray-400 mb-1">
                Filter by Date
              </label>
              <Input
                id="date"
                name="date"
                type="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="bg-[#1E1E1E] border-venue-700 text-white"
              />
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button
              onClick={resetFilters}
              variant="outline"
              className="border-venue-500 text-venue-200 hover:bg-venue-500/20"
            >
              Reset Filters
            </Button>
            
            <div className="flex space-x-2">
              <Button
                onClick={() => setViewMode("grid")}
                variant={viewMode === "grid" ? "default" : "outline"}
                className={viewMode === "grid" 
                  ? "bg-venue-500 hover:bg-venue-700 text-white" 
                  : "border-venue-500 text-venue-200 hover:bg-venue-500/20"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid-2x2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 12h18"/><path d="M12 3v18"/></svg>
              </Button>
              <Button
                onClick={() => setViewMode("list")}
                variant={viewMode === "list" ? "default" : "outline"}
                className={viewMode === "list" 
                  ? "bg-venue-500 hover:bg-venue-700 text-white" 
                  : "border-venue-500 text-venue-200 hover:bg-venue-500/20"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Events Grid/List */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-pulse text-venue-200 text-lg">Loading events...</div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-venue-900/30 rounded-lg p-8 text-center">
            <p className="text-gray-300 text-lg">No events found matching your search criteria.</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden bg-venue-900/40 border-venue-900/60 hover:border-venue-500 transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
<img
  src={event.imageUrl || "/placeholder.svg"}
  alt={event.title}
  onError={(e) => {
    (e.target as HTMLImageElement).src = "/placeholder.svg";
  }}
  className="w-full h-56 object-cover"
/>

                  <div className="absolute top-0 left-0 bg-venue-500 text-white px-3 py-1 m-2 rounded-md">
                    {formatDate(event.date)}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="text-lg font-semibold text-white mb-1">{event.title}</div>
                  <div className="text-venue-200 mb-2">
<div className="text-venue-200 mb-2">Genre: {event.genre}</div>

</div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="text-gray-300 text-sm">
<p>{`${event.venueCity} • ${event.time}`}</p>

</div>

                    <Link to={`/booking?eventId=${event.id}`}>
                      <Button className="bg-venue-500 hover:bg-venue-700 text-white">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div key={event.id} className="flex flex-col md:flex-row bg-venue-900/40 border border-venue-900/60 hover:border-venue-500 transition-all duration-300 rounded-lg overflow-hidden">
                <div className="md:w-1/4 h-48 md:h-auto">
<img
  src={event.imageUrl || "/placeholder.svg"}
  alt={event.title}
  onError={(e) => {
    (e.target as HTMLImageElement).src = "/placeholder.svg";
  }}
  className="w-full h-56 object-cover"
/>

                </div>
                <div className="p-6 md:w-3/4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
<h3 className="text-xl font-semibold text-white mb-1">
  {event.artistName}
</h3>

<p className="text-gray-400 text-sm mb-1">{event.title}</p>


                      </div>
                      <div className="bg-venue-500 text-white px-3 py-1 rounded-md text-sm">
                        {formatDate(event.date)}
                      </div>
                    </div>
                    {event.description && (
                      <p className="text-gray-300 my-3 line-clamp-2">{event.description}</p>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-gray-300">
                     
<p>{`${event.venueCity} • ${event.time}`}</p>

                    </div>
                    <Link to={`/booking?eventId=${event.id}`}>
                      <Button className="bg-venue-500 hover:bg-venue-700 text-white">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Events;
