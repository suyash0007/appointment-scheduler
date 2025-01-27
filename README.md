# Appointment Scheduling System

A modern, responsive appointment scheduling system built with Next.js and Tailwind CSS for salon management.

![Royal Salons Screenshot](https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=1200&h=600&fit=crop&q=80)

## Features

- 📅 Interactive calendar interface
- 🕒 Time-slot based scheduling
- 📊 Status tracking (booked, completed, cancelled)
- 🎨 Beautiful, responsive design

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [date-fns](https://date-fns.org/) - Date manipulation
- [Lucide React](https://lucide.dev/) - Icons
- TypeScript for type safety

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later

## Getting Started

1. Clone the repository:
   ```bash
   git clone [appointment-scheduler](https://github.com/suyash0007/appointment-scheduler)
   cd appointment-scheduler
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Components

- `SidebarLayout.tsx` - Responsive collapsible sidebar
- `CalendarGrid.tsx` - Time slot grid display
- `AppointmentCard.tsx` - Individual appointment display
- `appointments.ts` - Appointment data management

## Building for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```
