export interface Appointment {
  id: string;
  title: string;
  clientName: string;
  clientUsername: string;
  clientAvatar?: string;
  startTime: string; // ISO string
  endTime: string;
  status: "completed" | "booked" | "cancelled";
}
