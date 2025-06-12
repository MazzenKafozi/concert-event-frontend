
import React from "react";
import { Venue } from "../types/venue";

interface VenueTableProps {
  venues: Venue[];
  isLoading: boolean;
}

const VenueTable: React.FC<VenueTableProps> = ({ venues, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full p-12 flex justify-center">
        <div className="animate-pulse text-lg text-venue-500">Loading venues...</div>
      </div>
    );
  }

  if (venues.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8 text-gray-500">
          No venues found. Add your first venue using the form above.
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white">
        <thead className="bg-venue-900 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Venue Name</th>
            <th className="py-3 px-4 text-left">Location</th>
            <th className="py-3 px-4 text-left">Capacity</th>
            <th className="py-3 px-4 text-left hidden md:table-cell">Contact Email</th>
            <th className="py-3 px-4 text-left hidden md:table-cell">Contact Phone</th>
            <th className="py-3 px-4 text-center">Parking</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {venues.map((venue) => (
            <tr key={venue.id} className="hover:bg-gray-50">
              <td className="py-3 px-4">{venue.name}</td>
              <td className="py-3 px-4">{venue.location}</td>
              <td className="py-3 px-4">{venue.capacity.toLocaleString()}</td>
              <td className="py-3 px-4 hidden md:table-cell">{venue.contactEmail || "-"}</td>
              <td className="py-3 px-4 hidden md:table-cell">{venue.contactPhone || "-"}</td>
              <td className="py-3 px-4 text-center">
                {venue.hasParking ? (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Available
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    Not Available
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VenueTable;
