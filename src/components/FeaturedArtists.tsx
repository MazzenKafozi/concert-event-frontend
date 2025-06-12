import { useEffect, useState } from "react";
import { fetchEvents } from "../services/eventService";
import { Event } from "../types/event";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturedArtists = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 3;

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching featured events", err);
      }
    };
    loadEvents();
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - itemsToShow));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(events.length - itemsToShow, prev + itemsToShow)
    );
  };

  const visibleEvents = events.slice(startIndex, startIndex + itemsToShow);
const getArtistImage = (name?: string) => {
  switch (name?.toLowerCase()) {
    case "the weeknd":
      return "https://i0.wp.com/www.rumorcontrol.us/wp-content/uploads/2023/02/the-weekend.jpeg?resize=370%2C247&ssl=1";
    case "taylor swift":
      return "https://images-cdn.ubuy.co.in/658dd81791fac154d808e0db-ts-swiftie-gifts-taylor-swift-poster.jpg";
    case "drake":
      return "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9";
    default:
      return "/placeholder.svg"; // fallback
  }
};


  return (
    <section className="py-16 bg-[#0f0f0f]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">Featured Events</h2>

        <div className="flex items-center space-x-6">
          <Button
            onClick={handlePrev}
            className="rounded-full px-4 py-2 bg-venue-800 hover:bg-venue-700 text-white"
            disabled={startIndex === 0}
          >
            ←
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {visibleEvents.map((event) => (
              <div
                key={event.id}
                className="bg-venue-900/40 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
<img
  src={event.imageUrl || "/placeholder.svg"}
  alt={event.title}
  onError={(e) => {
    (e.target as HTMLImageElement).src = "/placeholder.svg";
  }}
  className="w-full h-56 object-cover"
/>


                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {event.title}
                  </h3>
                  <p className="text-venue-200 text-sm mb-1">
                    {event.venueCity || "TBA"} •{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-400 text-sm">{event.genre}</p>
                  <Link to={`/booking?eventId=${event.id}`}>
                    <Button className="mt-4 bg-venue-500 hover:bg-venue-700 text-white w-full">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleNext}
            className="rounded-full px-4 py-2 bg-venue-800 hover:bg-venue-700 text-white"
            disabled={startIndex + itemsToShow >= events.length}
          >
            →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
