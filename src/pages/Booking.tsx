import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import { fetchEvents, fetchEventById, bookTickets } from "../services/eventService";
import { Event } from "../types/event";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [formData, setFormData] = useState({
    customerName: user.fullName || "",
    customerEmail: user.email || "",
  });

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      try {
        const data = await fetchEvents();
        setEvents(data);

        if (eventId) {
          const event = await fetchEventById(eventId);
          if (event) {
            setSelectedEvent(event);
            setTotalPrice(300); // default price
          }
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
        toast.error("Error loading events");
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, [eventId]);

  useEffect(() => {
    if (selectedEvent) {
      setTotalPrice(300 * quantity); // temporary static price
    }
  }, [selectedEvent, quantity]);

  const handleEventChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const eventId = e.target.value;
    if (!eventId) {
      setSelectedEvent(null);
      return;
    }

    try {
      const event = await fetchEventById(eventId);
      if (event) {
        setSelectedEvent(event);
        setTotalPrice(300); // update for selected event
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const handleQuantityChange = (value: number[]) => {
    setQuantity(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEvent) {
      toast.error("Please select an event");
      return;
    }

    if (!formData.customerName || !formData.customerEmail) {
      toast.error("Please enter your name and email");
      return;
    }

    setIsBooking(true);

    try {
const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
          method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
          ticketId: selectedEvent.id,
          bookingStatus: "Confirmed",
          paymentStatus: "Paid",
          bookingDate: new Date().toISOString().slice(0, 10),
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
        }),
      });

      if (!response.ok) throw new Error("Failed to create booking");

      toast.success("Booking successful!");
      setFormData({ customerName: "", customerEmail: "" });
      setQuantity(1);
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Booking failed. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 text-white">Book Your Tickets</h1>
          <p className="text-gray-300 text-lg">Secure your spot at the hottest concerts</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-pulse text-venue-200 text-lg">Loading booking form...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-venue-900/50 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6 text-white">Booking Details</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="eventSelect" className="block text-gray-300">Select Event *</label>
                  <select
                    id="eventSelect"
                    value={selectedEvent?.id || ""}
                    onChange={handleEventChange}
                    className="w-full bg-[#1E1E1E] text-white border border-venue-700 rounded-md p-2"
                    required
                  >
                    <option value="">-- Select an Event --</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.title} ({new Date(event.date).toLocaleDateString()})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedEvent && (
                  <>
                    <div className="space-y-2">
                      <label className="block text-gray-300">Quantity: {quantity}</label>
                      <Slider
                        defaultValue={[1]}
                        max={10}
                        min={1}
                        step={1}
                        value={[quantity]}
                        onValueChange={handleQuantityChange}
                        className="py-4"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="customerName" className="block text-gray-300">Your Name *</label>
                      <Input
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        readOnly
                        className="bg-[#1E1E1E] border-venue-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="customerEmail" className="block text-gray-300">Your Email *</label>
                      <Input
                        id="customerEmail"
                        name="customerEmail"
                        type="email"
                        value={formData.customerEmail}
                        readOnly
                        className="bg-[#1E1E1E] border-venue-700 text-white"
                      />
                    </div>

                    <div className="pt-4 border-t border-venue-700">
                      <div className="flex justify-between text-lg font-semibold mb-4">
                        <span className="text-gray-300">Total Price:</span>
                        <span className="text-venue-200">${totalPrice.toFixed(2)}</span>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-venue-500 hover:bg-venue-700 text-white py-3 text-lg"
                        disabled={isBooking}
                      >
                        {isBooking ? "Processing..." : "Complete Booking"}
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </div>

            <div className={`${selectedEvent ? "block" : "hidden lg:flex lg:items-center lg:justify-center"}`}>
              {selectedEvent ? (
                <div className="bg-venue-900/30 p-6 rounded-lg">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={selectedEvent.imageUrl || "/placeholder.svg"}
                      alt={selectedEvent.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-2xl font-bold text-white">{selectedEvent.title}</h3>
                      <p className="text-venue-200">Genre: {selectedEvent.genre}</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-gray-300">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Date</p>
                        <p>{new Date(selectedEvent.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Time</p>
                        <p>{selectedEvent.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Venue ID</p>
                        <p>{selectedEvent.venueId}</p>
                      </div>
                    </div>

                    {selectedEvent.description && (
                      <div className="pt-4 border-t border-venue-700/50">
                        <p className="text-sm text-gray-400">About this Event</p>
                        <p className="text-gray-300">{selectedEvent.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 rounded-lg bg-venue-900/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto mb-4 text-venue-200/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-white mb-2">No Event Selected</h3>
                  <p className="text-gray-400">
                    Please select an event from the dropdown to view details and book tickets.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Booking;