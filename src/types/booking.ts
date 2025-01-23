export interface Booking {
    id: number;  
    clientName: string;  
    clientUsername: string;  
    service: string;  
    date: string;  
    time: string;  
    status: 'Completed' | 'Booked' | 'Cancelled';  
    profilePicture: string;  
  }