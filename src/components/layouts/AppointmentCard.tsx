"use client";

import { Appointment } from "../../types/appointment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AppointmentCardProps {
  appointment: Appointment;
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const startTime = new Date(appointment.startTime);

  const statusStyles = {
    completed: "bg-emerald-50 border-emerald-200",
    booked: "bg-blue-50 border-blue-200",
    cancelled: "bg-red-50 border-red-200",
  };

  const statusBadgeStyles = {
    completed: "bg-emerald-500",
    booked: "bg-blue-500",
    cancelled: "bg-red-500",
  };

  return (
    <Card
      className={cn(
        "p-3 border transition-all w-[280px] rounded-xl h-[100px]",
        statusStyles[appointment.status]
      )}
    >
      <div className="flex items-start space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={appointment.clientAvatar}
            alt={appointment.clientName}
          />
          <AvatarFallback>{appointment.clientName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-0.5">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">{appointment.clientName}</h4>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-white text-xs",
                statusBadgeStyles[appointment.status]
              )}
            >
              {appointment.status.charAt(0).toUpperCase() +
                appointment.status.slice(1)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            @{appointment.clientUsername}
          </p>
          <p className="text-xs font-medium">{appointment.title}</p>
          <div className="text-xs text-muted-foreground">
            {format(startTime, "h:mm a")}
          </div>
        </div>
      </div>
    </Card>
  );
}
