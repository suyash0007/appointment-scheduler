"use client";

import { Appointment } from "../../types/appointment";
import { AppointmentCard } from "./AppointmentCard";
import { generateTimeSlots } from "../../lib/appointment";
import { format} from "date-fns";

interface CalendarGridProps {
  appointments: Appointment[];
}

export function CalendarGrid({ appointments }: CalendarGridProps) {
  const timeSlots = generateTimeSlots();

  const getAppointmentsForTimeSlot = (timeSlot: string) => {
    const [time, period] = timeSlot.split(" ");
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.startTime);
      const appointmentHour = format(appointmentDate, "h");
      const appointmentPeriod = format(appointmentDate, "aa");
      return (
        appointmentHour === time.split(":")[0] &&
        appointmentPeriod.toLowerCase() === period.toLowerCase()
      );
    });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#1D1D1D]">
      <div className="relative p-4">
        {timeSlots.map((timeSlot) => (
          <div key={timeSlot} className="relative">
            <div className="absolute left-0 top-0 -translate-y-1/2 text-sm text-muted-foreground">
              {timeSlot}
            </div>
            <div className="ml-24 border-t-2 border-dashed border-[#6B6B6B] h-[170px] relative">
              <div className="relative z-10 flex gap-4 py-3">
                {getAppointmentsForTimeSlot(timeSlot).map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
