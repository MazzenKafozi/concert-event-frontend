
import { useState } from "react";
import { Venue } from "../types/venue";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { addVenue } from "../services/venueService";

interface VenueFormProps {
  onVenueAdded: () => void;
}

const VenueForm = ({ onVenueAdded }: VenueFormProps) => {
  const [formData, setFormData] = useState<Venue>({
    name: "",
    location: "",
    city: "", // Added missing city field
    capacity: 0,
    contactEmail: "",
    contactPhone: "",
    hasParking: false,
    isIndoor: true, // Added missing isIndoor field
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "" ? 0 : parseInt(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.location || !formData.city || formData.capacity <= 0) {
      toast.error("Please fill all required fields (name, location, city, capacity)");
      return;
    }

    try {
      setLoading(true);
      await addVenue(formData);
      
      // Reset form
      setFormData({
        name: "",
        location: "",
        city: "",
        capacity: 0,
        contactEmail: "",
        contactPhone: "",
        hasParking: false,
        isIndoor: true,
      });
      
      // Notify parent component to refresh the venue list
      onVenueAdded();
    } catch (error) {
      toast.error("Failed to add venue. Please try again.");
      console.error("Error adding venue:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-venue-900">Add New Venue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="form-label">
              Venue Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter venue name"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="form-label">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              id="location"
              name="location"
              type="text"
              className="form-control"
              value={formData.location}
              onChange={handleChange}
              placeholder="Address"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="city" className="form-label">
              City <span className="text-red-500">*</span>
            </label>
            <input
              id="city"
              name="city"
              type="text"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="capacity" className="form-label">
              Capacity <span className="text-red-500">*</span>
            </label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              className="form-control"
              value={formData.capacity === 0 ? "" : formData.capacity}
              onChange={handleNumberChange}
              placeholder="Enter capacity"
              required
              min="1"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contactEmail" className="form-label">
              Contact Email
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              className="form-control"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="email@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contactPhone" className="form-label">
              Contact Phone
            </label>
            <input
              id="contactPhone"
              name="contactPhone"
              type="tel"
              className="form-control"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
            />
          </div>

          <div className="flex items-center space-x-2 pt-6">
            <input
              id="hasParking"
              name="hasParking"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-venue-500 focus:ring-venue-500"
              checked={formData.hasParking}
              onChange={handleChange}
            />
            <label htmlFor="hasParking" className="form-label">
              Parking Available
            </label>
          </div>
          
          <div className="flex items-center space-x-2 pt-6">
            <input
              id="isIndoor"
              name="isIndoor"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-venue-500 focus:ring-venue-500"
              checked={formData.isIndoor}
              onChange={handleChange}
            />
            <label htmlFor="isIndoor" className="form-label">
              Indoor Venue
            </label>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            className="bg-venue-500 hover:bg-venue-700 text-white py-2 px-4 rounded-md w-full"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Venue"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VenueForm;
