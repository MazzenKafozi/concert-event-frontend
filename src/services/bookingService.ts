// src/services/bookingService.ts

export async function createBooking(bookingData: any) {
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    throw new Error("Booking failed");
  }

  return response.json();
}
