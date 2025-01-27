import { useState } from "react";
import { AppointmentCard } from "./AppointmentCard";
import { generateTimeSlots } from "../../lib/appointment";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Circle } from "lucide-react";
import { Appointment } from "../../types/appointment";

interface CalendarGridProps {
  appointments: Appointment[];
  showAll: boolean; // New prop to toggle all appointments
  onResetShowAll: () => void;
}

export function CalendarGrid({ appointments, showAll, onResetShowAll }: CalendarGridProps) {
  const timeSlots = generateTimeSlots();
  const [showCompleted, setShowCompleted] = useState(true);
  const [showBooked, setShowBooked] = useState(true);
  const [showCancelled, setShowCancelled] = useState(true);

  const toggleCardStatus = (status: string) => {
    onResetShowAll(); 
    if (status === "Completed") {
      setShowCompleted(true);
      setShowBooked(false);
      setShowCancelled(false);
    } else if (status === "Booked") {
      setShowCompleted(false);
      setShowBooked(true);
      setShowCancelled(false);
    } else if (status === "Cancelled") {
      setShowCompleted(false);
      setShowBooked(false);
      setShowCancelled(true);
    }
  };

  const filteredAppointments = showAll
    ? appointments // Show all appointments when `showAll` is true
    : appointments.filter((appointment) => {
        if (showCompleted && appointment.status === "completed") return true;
        if (showBooked && appointment.status === "booked") return true;
        if (showCancelled && appointment.status === "cancelled") return true;
        return false;
      });

  const getAppointmentsForTimeSlot = (timeSlot: string) => {
    const [time, period] = timeSlot.split(" ");
    return filteredAppointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.startTime);
      const appointmentHour = format(appointmentDate, "h");
      const appointmentPeriod = format(appointmentDate, "aa");
      return (
        appointmentHour === time.split(":")[0] &&
        appointmentPeriod.toLowerCase() === period.toLowerCase()
      );
    });
  };

  const statusButtons = [
    {
      id: "1",
      status: "Completed",
      styles:
        "border-2 border-[#11995B] bg-inherit text-white rounded-full ml-6 py-2 hover:bg-transparent hover:text-inherit",
      circle: "fill-[#11995B] border-none text-[#11995B] mr-2",
    },
    {
      id: "2",
      status: "Booked",
      styles:
        "border-2 border-[#6486FF] bg-inherit text-white rounded-full ml-6 py-2 hover:bg-transparent hover:text-inherit",
      circle: "fill-[#6486FF] border-none text-[#6486FF] mr-2",
    },
    {
      id: "3",
      status: "Cancelled",
      styles:
        "border-2 border-[#FE6464] bg-inherit text-white rounded-full ml-6 py-2 hover:bg-transparent hover:text-inherit",
      circle: "fill-[#FE6464] border-none text-[#FE6464] mr-2",
    },
  ];


  return (
    <div className="flex-1 overflow-y-auto bg-[#1D1D1D]">
      <div className="my-5">
        {statusButtons.map((button) => (
          <Button
            className={button.styles}
            key={button.id}
            onClick={() => toggleCardStatus(button.status)}
          >
            <Circle className={button.circle} />
            {button.status}
          </Button>
        ))}
      </div>
      <div className="relative p-2 sm:p-4 ml-10 sm:ml-0">
        {timeSlots.map((timeSlot) => (
          <div key={timeSlot} className="relative">
            <div className="absolute left-0 top-0 -translate-y-1/2 text-xs sm:text-sm text-muted-foreground w-14 sm:w-24">
              {timeSlot}
            </div>
            <div className="ml-14 sm:ml-24 border-t-2 border-dashed border-[#6B6B6B] min-h-[150px] relative">
              <div className="relative z-10 flex flex-col sm:flex-row gap-2 sm:gap-4 py-3 overflow-x-auto">
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
