export interface GuestInterface {
  id: PropertyKey;
  name: string;
  timestamp: number;
  country: string;
  role: string;
  message: string | null;
}
