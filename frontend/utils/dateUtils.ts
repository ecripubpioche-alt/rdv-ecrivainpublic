export const getAvailableSlots = (date: Date): string[] => {
  const day = date.getDay(); // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  
  // Mardi (Tuesday): 14h - 17h
  if (day === 2) {
    return ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
  }
  
  // Mercredi & Jeudi (Wednesday & Thursday): 9h - 12h
  if (day === 3 || day === 4) {
    return ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
  }
  
  return [];
};

export const getNextAvailableDays = (count: number = 14): Date[] => {
  const days: Date[] = [];
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Start looking from tomorrow to avoid same-day late bookings for simplicity
  currentDate.setDate(currentDate.getDate() + 1);

  while (days.length < count) {
    const dayOfWeek = currentDate.getDay();
    // 2 = Tue, 3 = Wed, 4 = Thu
    if (dayOfWeek === 2 || dayOfWeek === 3 || dayOfWeek === 4) {
      days.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return days;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

export const formatShortDate = (date: Date): { dayName: string, dayNumber: string, month: string } => {
  const formatter = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: '2-digit', month: 'short' });
  const parts = formatter.formatToParts(date);
  
  let dayName = '';
  let dayNumber = '';
  let month = '';

  parts.forEach(part => {
    if (part.type === 'weekday') dayName = part.value;
    if (part.type === 'day') dayNumber = part.value;
    if (part.type === 'month') month = part.value;
  });

  return { 
    dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1), 
    dayNumber, 
    month: month.charAt(0).toUpperCase() + month.slice(1) 
  };
};
