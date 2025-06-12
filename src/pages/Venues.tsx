
import { useState, useEffect } from "react";
import { fetchVenues } from "../services/venueService";
import Layout from "../components/Layout";
import { Venue } from "../types/venue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Venues = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"name" | "location" | "capacity">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const loadVenues = async () => {
    setIsLoading(true);
    try {
      const data = await fetchVenues();
      setVenues(data);
      setFilteredVenues(data);
    } catch (error) {
      console.error("Failed to fetch venues:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVenues();
  }, []);

  useEffect(() => {
    // Filter venues based on search query
    const filtered = venues.filter(
      (venue) =>
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Sort venues
    const sorted = [...filtered].sort((a, b) => {
      if (sortField === "capacity") {
        return sortDirection === "asc"
          ? a.capacity - b.capacity
          : b.capacity - a.capacity;
      } else {
        const fieldA = a[sortField].toLowerCase();
        const fieldB = b[sortField].toLowerCase();
        return sortDirection === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
    });
    
    setFilteredVenues(sorted);
  }, [searchQuery, venues, sortField, sortDirection]);

  const handleSort = (field: "name" | "location" | "capacity") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 text-white">Our Venues</h1>
          <p className="text-gray-300 text-lg">
            Discover amazing concert venues across the country
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-venue-900/50 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Search venues by name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#1E1E1E] border-venue-700 text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleSort("name")}
                variant="outline"
                className="border-venue-500 text-venue-200 hover:bg-venue-500/20"
              >
                Sort by Name {getSortIcon("name")}
              </Button>
              <Button
                onClick={() => handleSort("location")}
                variant="outline"
                className="border-venue-500 text-venue-200 hover:bg-venue-500/20"
              >
                Sort by City {getSortIcon("location")}
              </Button>
              <Button
                onClick={() => handleSort("capacity")}
                variant="outline"
                className="border-venue-500 text-venue-200 hover:bg-venue-500/20"
              >
                Sort by Capacity {getSortIcon("capacity")}
              </Button>
            </div>
          </div>
        </div>

        {/* Venues Table */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-pulse text-venue-200 text-lg">Loading venues...</div>
          </div>
        ) : filteredVenues.length === 0 ? (
          <div className="bg-venue-900/30 rounded-lg p-8 text-center">
            <p className="text-gray-300 text-lg">No venues found matching your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-venue-900/50">
            <Table>
              <TableHeader className="bg-venue-900">
                <TableRow>
                  <TableHead className="text-venue-200">Venue Name</TableHead>
                  <TableHead className="text-venue-200">City</TableHead>
                  <TableHead className="text-venue-200">Capacity</TableHead>
                  <TableHead className="text-venue-200">Type</TableHead>
                  <TableHead className="text-venue-200">Contact</TableHead>
                  <TableHead className="text-venue-200">Parking</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVenues.map((venue) => (
                  <TableRow key={venue.id} className="bg-[#1E1E1E] border-t border-venue-900/30 hover:bg-venue-900/20">
                    <TableCell className="font-medium text-white">{venue.name}</TableCell>
                    <TableCell className="text-gray-300">{venue.city}</TableCell>
                    <TableCell className="text-gray-300">{venue.capacity.toLocaleString()}</TableCell>
                    <TableCell className="text-gray-300">
                      {venue.isIndoor ? (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          Indoor
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Outdoor
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {venue.contactEmail || venue.contactPhone || "-"}
                    </TableCell>
                    <TableCell>
                      {venue.hasParking ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                          Not Available
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Venues;
