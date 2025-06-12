
export interface Venue {
  id?: string;
  name: string;
  location: string;
  capacity: number;
  contactEmail?: string;
  contactPhone?: string;
  hasParking: boolean;
  isIndoor: boolean;
  city: string;
}
