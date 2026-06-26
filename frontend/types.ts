export interface UserDetails {
  lastName: string;
  email: string;
  phone: string;
  reason: string;
}

export interface Appointment {
  id: string;
  date: Date;
  time: string;
  user: UserDetails;
  status: 'active' | 'cancelled';
  createdAt: Date;
}

export type BookingStep = 'select-date' | 'select-time' | 'user-details' | 'confirmation';
export type AppView = 'booking' | 'user-dashboard' | 'admin-dashboard';
