// import { CalendarGrid } from "@/components/layouts/CalendarGrid";
// import { SidebarLayout } from "@/components/layouts/SidebarLayout";

// export default function Home() {
//   return (
//     <main>
//       <SidebarLayout>
//         <Header />
//         <CalendarGrid />
//       </SidebarLayout>
//     </main>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { Header } from "../components/layouts/Header";
import { CalendarGrid } from "../components/layouts/CalendarGrid";
import { getAppointments, filterAppointmentsByDate } from "../lib/appointment";
import { Appointment } from "../types/appointment";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const allAppointments = getAppointments();
    const filteredAppointments = filterAppointmentsByDate(
      allAppointments,
      selectedDate
    );
    setAppointments(filteredAppointments);
  }, [selectedDate]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <SidebarLayout>
        <Header selectedDate={selectedDate} onDateChange={handleDateChange} />
        <main className="flex-1 overflow-hidden">
          <div className="h-full py-6">
            <div className="h-[calc(100vh-150px)] overflow-y-auto">
              <CalendarGrid appointments={appointments} />
            </div>
          </div>
        </main>
      </SidebarLayout>
    </div>
  );
}
