import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useQuery } from '@apollo/client';
import { GET_EVENTS_TICKETS_BY_ID_USER } from '../graphql/querys';
import { Ticket } from '../interfaces/Tickets';
import { homeStyles } from '../assets/styles/homeStyle'; // Importamos los estilos

const Home = () => {
  const { user } = useContext(AuthContext);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([]);

  const { loading, error, data } = useQuery(GET_EVENTS_TICKETS_BY_ID_USER, {
    variables: { userId: user ? user.id : '' },
    skip: !user,
  });

  if (!user) {return <p>No estás autenticado!!</p>;}

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEventId(event.target.value);
    setSelectedTickets([]);
  };

  const handleTicketClick = (ticket: Ticket) => {
    if (ticket.state !== 'sold') {
      setSelectedTickets((prevTickets) =>
        prevTickets.includes(ticket)
          ? prevTickets.filter((t) => t !== ticket)
          : [...prevTickets, ticket]
      );
    }
  };

  const selectedEvent = data.userEvents.find((event: any) => event.id === selectedEventId);

  // Calcular el total de los boletos seleccionados
  const totalPrice = selectedTickets.reduce((total, ticket) => total + ticket.price, 0);

  return (
    <div style={homeStyles.container}>
      <select onChange={handleEventChange} style={homeStyles.selector}>
        <option value="">Selecciona un evento</option>
        {data.userEvents.map((event: any) => (
          <option key={event.id} value={event.id}>
            {event.name}
          </option>
        ))}
      </select>
      <div style={homeStyles.mainContent}>
        <div style={homeStyles.mapContainer}>
          {selectedEvent ? (
            <div>
              <h3>{selectedEvent.name}</h3>
              <p>
                <strong>Fecha:</strong> {selectedEvent.date}
              </p>
              <p>
                <strong>Descripción:</strong> {selectedEvent.description}
              </p>
              <p>
                <strong>Hora:</strong> {selectedEvent.hour}
              </p>
              <p>
                <strong>Ubicación:</strong> {selectedEvent.location}
              </p>
              <h3>Mapa de Asientos</h3>
              <div style={homeStyles.seatMap}>
                {selectedEvent.tickets.map((ticket: Ticket, index: number) => (
                  <div
                    key={index}
                    onClick={() => handleTicketClick(ticket)}
                    style={{
                      ...homeStyles.ticketItem,
                      backgroundColor: ticket.state === 'sold' ? '#ccc' : '#fff',
                      cursor: ticket.state === 'sold' ? 'not-allowed' : 'pointer',
                      border: selectedTickets.includes(ticket) ? '2px solid green' : '1px solid #ddd',
                    }}
                  >
                    <p>
                      <strong>Sección:</strong> {ticket.section}
                    </p>
                    <p>
                      <strong>Fila:</strong> {ticket.row}
                    </p>
                    <p>
                      <strong>Asiento:</strong> {ticket.seat}
                    </p>
                    <p>
                      <strong>Precio:</strong> {ticket.price}
                    </p>
                    <p>
                      <strong>Estado:</strong> {ticket.state}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>Por favor selecciona un evento para ver los tickets disponibles.</p>
          )}
        </div>
        <div style={homeStyles.selectedTicketsContainer}>
          <h3>Boletos Seleccionados</h3>
          <ul>
            {selectedTickets.map((ticket, index) => (
              <li key={index} style={homeStyles.selectedTicketItem}>
                <p>
                  <strong>Sección:</strong> {ticket.section}
                </p>
                <p>
                  <strong>Fila:</strong> {ticket.row}
                </p>
                <p>
                  <strong>Asiento:</strong> {ticket.seat}
                </p>
                <p>
                  <strong>Precio:</strong> {ticket.price}
                </p>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice}</h3>
        </div>
      </div>
    </div>
  );
};
export default Home;
