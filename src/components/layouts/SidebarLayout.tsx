"use client";

import { useState } from 'react';
import { Calendar, Clock, Users, Bell, Menu, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { staffData } from '@/store/staffData';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navItems = [
    { icon: Calendar, label: 'Scheduler' },
    { icon: Clock, label: 'Previous Bookings' },
    { icon: Users, label: 'Clients' },
    { icon: Bell, label: 'Notifications' },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Overlay for mobile only */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative inset-y-0 left-0 z-50 bg-card shadow-lg transition-all duration-300 ease-in-out",
          isSidebarOpen ? "w-64" : "w-40", "border-r border-border", "p-4"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center space-x-2 transition-all duration-300 ease-in-out">
              {staffData.slice(0, 1).map((member, i) => {
                return (
                  <div className="flex items-center space-x-3" key={i}>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>

                    <div
                      className={cn(
                        "flex flex-col transition-all duration-300",
                        isSidebarOpen ? "items-start space-y-0" : "items-center space-y-1"
                      )}
                    >
                      <p
                        className={cn(
                          "font-medium leading-none transition-all duration-300",
                          isSidebarOpen ? "text-sm" : "text-xs text-center"
                        )}
                      >
                        {member.name}
                      </p>
                      <p
                        className={cn(
                          "text-muted-foreground transition-all duration-300",
                          isSidebarOpen ? "text-xs" : "text-[10px] text-center"
                        )}
                      >
                        {member.role}
                      </p>
                    </div>

                  </div>
                )

              })}


            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-2 overflow-hidden">
            {/* Main Section */}
            <div className="space-y-1 py-2">
              <h2 className={cn(
                "mb-2 px-2 text-xs font-semibold text-muted-foreground whitespace-nowrap transition-all duration-300",
                !isSidebarOpen && "text-center px-0"
              )}>
                MAIN
              </h2>
              <div className="space-y-1">
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
                    <span className={cn(
                      "ml-2 transition-all duration-300 origin-left whitespace-nowrap",
                      !isSidebarOpen && "hidden"
                    )}>
                      {item.label}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Staff Section */}
            <div className="py-2">
              <h2 className={cn(
                "mb-2 px-2 text-xs font-semibold text-muted-foreground whitespace-nowrap transition-all duration-300",
                !isSidebarOpen && "text-center px-0"
              )}>
                TEAM MEMBERS
              </h2>
              <div className={cn(
                "transition-all duration-300 ease-in-out space-y-3",
                !isSidebarOpen && "px-2"
              )}>
                {staffData.slice(1,4).map((member) => (
                  <div
                    key={member.id}
                    className={cn(
                      "flex items-center space-x-4 rounded-lg p-2 hover:bg-accent transition-all duration-300 ease-in-out",
                      !isSidebarOpen && "justify-center p-1"
                    )}
                  >
                    <div className="relative group">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      
                    </div>
                    <div className={cn(
                      "transition-all duration-300",
                      !isSidebarOpen && "hidden"
                    )}>
                      <p className="text-sm font-medium leading-none">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
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
            <ChevronLeft className={cn(
              "h-4 w-4 transition-transform duration-300",
              !isSidebarOpen && "rotate-180"
            )} />
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col transition-all duration-300 ease-in-out">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-3 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-background p-4">
          {children}
        </main>
      </div>
    </div>
  );
}