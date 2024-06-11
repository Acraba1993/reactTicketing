// src/interfaces/Tickets.ts
export interface Ticket {
  ticketID: string;
  row: string;
  seat: string;
  price: number;
  section?: string; // Si `section` no es obligatorio, puedes hacerlo opcional
  state: 'available' | 'sold'; // Ajusta según tus posibles estados de boleto
}
