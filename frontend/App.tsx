import React, { useState, useCallback } from 'react';
import { CalendarPlus, UserCircle, ShieldCheck } from 'lucide-react';
import InfoSidebar from './components/InfoSidebar';
import DateSelection from './components/DateSelection';
import TimeSelection from './components/TimeSelection';
import UserDetailsForm from './components/UserDetailsForm';
import ConfirmationScreen from './components/ConfirmationScreen';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import { BookingStep, Appointment, UserDetails, AppView } from './types';
import { sendConfirmationEmails, isEmailConfigured } from './services/emailService';
import { saveAppointment } from './services/storageService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('booking');
  
  // Booking State
  const [step, setStep] = useState<BookingStep>('select-date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  }, []);

  const handleTimeSelect = useCallback((time: string) => {
    setSelectedTime(time);
  }, []);

  const handleUserDetailsSubmit = useCallback(async (userDetails: UserDetails) => {
    if (!selectedDate || !selectedTime) return;

    // Save to local storage database
    const savedAppointment = saveAppointment({
      date: selectedDate,
      time: selectedTime,
      user: userDetails,
    });

    try {
      await sendConfirmationEmails(savedAppointment);
    } catch (error) {
      console.error("L'envoi de l'email a échoué, mais le rendez-vous est enregistré localement.");
    }
    
    setAppointment(savedAppointment);
    setStep('confirmation');
  }, [selectedDate, selectedTime]);

  const resetBooking = useCallback(() => {
    setStep('select-date');
    setSelectedDate(null);
    setSelectedTime(null);
    setAppointment(null);
  }, []);

  const getProgress = () => {
    switch (step) {
      case 'select-date': return 25;
      case 'select-time': return 50;
      case 'user-details': return 75;
      case 'confirmation': return 100;
      default: return 0;
    }
  };

  // Render the booking flow layout
  const renderBookingFlow = () => (
    <div className="max-w-6xl mx-auto w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      <div className="w-full md:w-1/3 lg:w-2/5 p-2 md:p-4">
        <InfoSidebar />
      </div>

      <div className="w-full md:w-2/3 lg:w-3/5 p-6 md:p-10 flex flex-col">
        {step !== 'confirmation' && (
          <div className="mb-8">
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-500 transition-all duration-500 ease-out"
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium px-1">
              <span className={step === 'select-date' ? 'text-brand-600' : ''}>Date</span>
              <span className={step === 'select-time' ? 'text-brand-600' : ''}>Heure</span>
              <span className={step === 'user-details' ? 'text-brand-600' : ''}>Coordonnées</span>
            </div>
          </div>
        )}

        <div className="flex-grow flex flex-col justify-center">
          {step === 'select-date' && (
            <DateSelection 
              selectedDate={selectedDate} 
              onSelectDate={handleDateSelect}
              onNext={() => setStep('select-time')}
            />
          )}

          {step === 'select-time' && selectedDate && (
            <TimeSelection 
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectTime={handleTimeSelect}
              onBack={() => setStep('select-date')}
              onNext={() => setStep('user-details')}
            />
          )}

          {step === 'user-details' && selectedDate && selectedTime && (
            <UserDetailsForm 
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSubmit={handleUserDetailsSubmit}
              onBack={() => setStep('select-time')}
            />
          )}

          {step === 'confirmation' && appointment && (
            <ConfirmationScreen 
              appointment={appointment}
              onReset={resetBooking}
              isEmailReal={isEmailConfigured()}
            />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-brand-700">Centre Pioche</span>
            </div>
            <nav className="flex space-x-1 sm:space-x-4 items-center">
              <button
                onClick={() => setCurrentView('booking')}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                  currentView === 'booking' ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <CalendarPlus className="w-4 h-4 mr-1.5 hidden sm:block" />
                Prendre RDV
              </button>
              <button
                onClick={() => setCurrentView('user-dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                  currentView === 'user-dashboard' ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <UserCircle className="w-4 h-4 mr-1.5 hidden sm:block" />
                Mes RDV
              </button>
              <button
                onClick={() => setCurrentView('admin-dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                  currentView === 'admin-dashboard' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4 mr-1.5 hidden sm:block" />
                Espace Pro
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-8 flex items-center justify-center">
        {currentView === 'booking' && renderBookingFlow()}
        {currentView === 'user-dashboard' && <UserDashboard />}
        {currentView === 'admin-dashboard' && <AdminDashboard />}
      </main>
    </div>
  );
};

export default App;
