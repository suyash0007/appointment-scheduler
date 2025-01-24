import { Appointment } from "../types/appointment";

export const saveAppointments = (appointments: Appointment[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }
};

export const getAppointments = (): Appointment[] => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem("appointments");
  if (!stored) {
    // Add sample appointments if none exist
    const sampleAppointments = generateSampleAppointments();
    saveAppointments(sampleAppointments);
    return sampleAppointments;
  }

  return JSON.parse(stored);
};

export const filterAppointmentsByDate = (
  appointments: Appointment[],
  date: Date
): Appointment[] => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.startTime);
    return appointmentDate >= startOfDay && appointmentDate <= endOfDay;
  });
};

export const generateTimeSlots = () => {
  const slots = [];
  // Generate slots from 9 AM to 10 PM
  for (let i = 9; i <= 22; i++) {
    const hour = i % 12 || 12; // Convert 24h to 12h format
    const period = i < 12 ? "AM" : "PM";
    slots.push(`${hour}:00 ${period}`);
  }
  return slots;
};

export const generateSampleAppointments = (): Appointment[] => {
  const today = new Date();
  const baseDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return [
    {
      id: "1",
      title: "Hair curl & color",
      clientName: "Jerry Brown",
      clientUsername: "jerryb",
      clientAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      startTime: new Date(baseDate.getTime()).setHours(9, 30, 0),
      endTime: new Date(baseDate.getTime()).setHours(10, 30, 0),
      status: "completed",
    },
    {
      id: "2",
      title: "Hair styling",
      clientName: "Sarah Wilson",
      clientUsername: "sarahw",
      clientAvatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      startTime: new Date(baseDate.getTime()).setHours(11, 0, 0),
      endTime: new Date(baseDate.getTime()).setHours(12, 0, 0),
      status: "booked",
    },
    {
      id: "3",
      title: "Makeup session",
      clientName: "Emma Davis",
      clientUsername: "emmad",
      clientAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      startTime: new Date(baseDate.getTime()).setHours(14, 0, 0),
      endTime: new Date(baseDate.getTime()).setHours(15, 30, 0),
      status: "cancelled",
    },
    {
      id: "4",
      title: "Hair curl & color",
      clientName: "Jerry Brown",
      clientUsername: "jerryb",
      clientAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      startTime: new Date(baseDate.getTime()).setHours(9, 45, 0),
      endTime: new Date(baseDate.getTime()).setHours(10, 45, 0),
      status: "cancelled",
    },
  ].map((appointment) => ({
    ...appointment,
    startTime: new Date(appointment.startTime).toISOString(),
    endTime: new Date(appointment.endTime).toISOString(),
  }));
};
