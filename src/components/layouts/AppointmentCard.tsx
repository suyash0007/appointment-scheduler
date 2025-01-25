"use client";

import { Appointment } from "../../types/appointment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface AppointmentCardProps {
  appointment: Appointment;
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const startTime = new Date(appointment.startTime);

  const statusStyles = {
    completed: "bg-white border-[#11995B]",
    booked: "bg-white border-[#6486FF]",
    cancelled: "bg-white border-[#FE6464]",
  };

  const statusBadgeStyles = {
    completed: "bg-[#11995B]",
    booked: "bg-[#6486FF]",
    cancelled: "bg-[#FE6464]",
  };

  return (
    <Card
      className={cn(
        "p-2 border-2 transition-all w-[240px] rounded-xl h-[144px]",
        statusStyles[appointment.status]
      )}
    >

      <div className="flex flex-col gap-3 relative">
        <div
          className={cn(
            "px-2 py-0.5 rounded-full text-white text-xs absolute right-0 top-0",
            statusBadgeStyles[appointment.status]
          )}
        >
          {appointment.status.charAt(0).toUpperCase() +
            appointment.status.slice(1)}
        </div>
        <div className="flex items-center gap-x-2">
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage
              src={appointment.clientAvatar}
              alt={appointment.clientName}
            />
            <AvatarFallback>{appointment.clientName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-sm text-black">{appointment.clientName}</h4>
            <p className="text-xs text-[#A3A3A3]">
              @{appointment.clientUsername}
            </p>

          </div>
          
        </div>
        <p className="text-md font-bold text-black">{appointment.title}</p>
        
        <div className="text-xs text-[#A3A3A3] flex items-center gap-2 font-bold">
        <Calendar className="h-4 w-4"/>{format(startTime, "dd MMMM - h:mm a")}
          </div>


      </div>


    </Card>
  );
}
