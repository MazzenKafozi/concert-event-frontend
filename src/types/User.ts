export interface User {
  id: number;
  fullName: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
}
