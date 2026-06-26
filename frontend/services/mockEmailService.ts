import { Appointment } from '../types';

export const sendConfirmationEmails = async (appointment: Appointment): Promise<boolean> => {
  // Simulate network request and email processing
  return new Promise((resolve) => {
    console.log("--- SIMULATING EMAIL SENDING ---");
    console.log(`To User: ${appointment.user.email}`);
    console.log(`To Writer: ecri.pub.pioche@gmail.com`);
    console.log(`Subject: Confirmation de rendez-vous - Écrivain Public`);
    console.log(`Body: Rendez-vous confirmé pour ${appointment.user.lastName} le ${appointment.date.toLocaleDateString('fr-FR')} à ${appointment.time}.`);
    console.log("--------------------------------");
    
    setTimeout(() => {
      resolve(true);
    }, 2000); // 2 second delay to show loading state
  });
};
