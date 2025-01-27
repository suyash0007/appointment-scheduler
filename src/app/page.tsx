"use client"

import { useState, useEffect } from "react"
import { Header } from "../components/layouts/Header"
import { CalendarGrid } from "../components/layouts/CalendarGrid"
import { getAppointments, filterAppointmentsByDate } from "../lib/appointment"
import type { Appointment } from "../types/appointment"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [showAllAppointments, setShowAllAppointments] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const resetShowAllAppointments = () => {
    setShowAllAppointments(false)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768) // 768px is the 'md' breakpoint in Tailwind
    }

    // Set initial state
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const allAppointments = getAppointments()
    const filteredAppointments = filterAppointmentsByDate(allAppointments, selectedDate)
    setAppointments(filteredAppointments)
  }, [selectedDate])

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex flex-col h-screen">
      <SidebarLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <Header
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onShowAll={() => setShowAllAppointments(true)}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="flex-1 overflow-hidden">
          <div className="h-full">
            <div className="h-[calc(100vh-100px)] overflow-y-auto">
              <CalendarGrid
                appointments={appointments}
                showAll={showAllAppointments}
                onResetShowAll={resetShowAllAppointments}
              />
            </div>
          </div>
        </main>
      </SidebarLayout>
    </div>
  )
}

