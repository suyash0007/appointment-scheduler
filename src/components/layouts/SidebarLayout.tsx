"use client"

import { Calendar, Clock, Users, Bell, ChevronLeft, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { staffData } from "@/store/staffData"

interface SidebarLayoutProps {
  children: React.ReactNode
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export function SidebarLayout({ children, isSidebarOpen, toggleSidebar }: SidebarLayoutProps) {
  const navItems = [
    { icon: Calendar, label: "Scheduler" },
    { icon: Clock, label: "Previous Bookings" },
    { icon: Users, label: "Clients" },
    { icon: Bell, label: "Notifications" },
  ]

  return (
    <div className="flex h-screen">
      {/* Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleSidebar} />}
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative inset-y-0 left-0 z-50 bg-card shadow-lg transition-all duration-300 ease-in-out",
          "border-r border-border sm:p-4 p-2",
          isSidebarOpen ? "translate-x-0 w-52 sm:w-64" : "-translate-x-full md:translate-x-0 sm:w-36"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Close button for mobile */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-background text-foreground md:hidden"
            onClick={toggleSidebar}
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className={cn(
              "flex items-center justify-between border-b border-border p-4 sm:mt-0 mt-8",
              !isSidebarOpen && "justify-center p-1"
            )}
          >
            <div className="flex items-center space-x-2 transition-all duration-300 ease-in-out">
            <div className="flex items-center space-x-2 transition-all duration-300 ease-in-out">
              <div className="flex items-center space-x-3">
                <Avatar className={"h-12 w-12 rounded-lg"}>
                  <AvatarImage
                    src={staffData[0].avatar}
                    alt={staffData[0].name}
                  />
                  <AvatarFallback className="h-8 w-8 rounded-lg">
                    {staffData[0].name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                </div>
                <div
                  className={cn(
                    "flex flex-col origin-left transition-all duration-300",
                    !isSidebarOpen && "scale-0 w-0"
                  )}
                >
                  <p className="text-sm font-medium mb-2">
                    {staffData[0].name}
                  </p>
                  <p className="text-xs text-gray-500">{staffData[0].role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav
            className={cn(
              "flex-1 space-y-1 sm:px-4 px-2 overflow-hidden mt-7",
              !isSidebarOpen && "px-2"
            )}
          >
            {/* Main Section */}
            <div className="space-y-2 py-2 mb-10">
              <h2
                className={cn(
                  "mb-2 px-2 text-xs font-semibold text-muted-foreground whitespace-nowrap transition-all duration-300",
                  !isSidebarOpen && "text-center px-0"
                )}
              >
                MAIN
              </h2>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start px-2 transition-all duration-300 ease-in-out group",
                      !isSidebarOpen && "justify-center"
                    )}
                    size="lg"
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span
                      className={cn(
                        "ml-2 transition-all duration-300 origin-left whitespace-nowrap",
                        !isSidebarOpen && "hidden"
                      )}
                    >
                      {item.label}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

             {/* Staff Section */}
             <div className="py-2">
              <h2
                className={cn(
                  "mb-2 px-2 text-xs font-semibold text-muted-foreground whitespace-nowrap transition-all duration-300",
                  !isSidebarOpen && "px-0"
                )}
              >
                TEAM MEMBERS
              </h2>
              <div
                className={cn(
                  "transition-all duration-300 ease-in-out space-y-2",
                  !isSidebarOpen && "px-0"
                )}
              >
                {staffData.slice(1, 4).map((member) => (
                  <div
                    key={member.id}
                    className={cn(
                      "flex items-center space-x-4 rounded-lg p-2 hover:bg-accent transition-all duration-300 ease-in-out",
                      !isSidebarOpen && "justify-center p-1"
                    )}
                  >
                    <div className="relative group">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="h-8 w-8 rounded-lg">
                          {member.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div
                      className={cn(
                        "transition-all duration-300",
                        !isSidebarOpen && "hidden"
                      )}
                    >
                      <p className="text-sm font-medium leading-none">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </nav>


          {/* Toggle Button */}
          <Button
            variant="default"
            size="icon"
            className="absolute -right-3 top-8 hidden md:flex h-6 w-6 bg-white text shadow-md rounded-full"
            onClick={toggleSidebar}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform duration-300", !isSidebarOpen && "rotate-180")} />
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col transition-all duration-300 ease-in-out">
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-background">{children}</main>
      </div>
    </div>
  )
}

