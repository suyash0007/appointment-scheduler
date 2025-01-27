"use client"

import { CalendarIcon, Settings, ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"

interface HeaderProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
  onShowAll: () => void
  toggleSidebar: () => void
  isSidebarOpen: boolean
}

export function Header({ selectedDate, onDateChange, onShowAll, toggleSidebar, isSidebarOpen }: HeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 bg-[#151515]">
      <div className="flex h-20 items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-semibold rounded-full",
                  !selectedDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "EEE dd, MMMM") : <span>Pick a date</span>}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    onDateChange(date)
                    setOpen(false)
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center space-x-2">
          <Button className="rounded-full font-semibold" variant="outline" onClick={onShowAll}>
            All Appointments <ChevronDown className="ml-2 h-5 w-5" />
          </Button>
          <Button className="rounded-full" variant="outline" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

