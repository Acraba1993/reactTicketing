import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENTS_TICKETS_BY_ID_USER } from '../graphql/querys';
import { Ticket } from '../interfaces/Tickets';
import { homeStyles } from '../assets/styles/homeStyle'; // Importamos los estilos
import { CREATE_SALE } from '../graphql/mutations';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([]);

  const { loading, error, data } = useQuery(GET_EVENTS_TICKETS_BY_ID_USER, {
    variables: { userId: user ? user.id : '' },
    skip: !user,
  });

  const [createSale, { loading: saleLoading, error: saleError }] = useMutation(CREATE_SALE);

  if (!user) {
    return <p>No estás autenticado!!</p>;
  }

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEventId(event.target.value);
    setSelectedTickets([]);
  };

  const handleTicketClick = (ticket: Ticket) => {
    if (!ticket.ticketID) {
      console.error("Ticket without an id:", ticket);
      return;
    }
    if (ticket.state !== 'sold') {
      setSelectedTickets((prevTickets) =>
        prevTickets.some((t) => t.ticketID === ticket.ticketID)
          ? prevTickets.filter((t) => t.ticketID !== ticket.ticketID)
          : [...prevTickets, ticket]
      );
    }
  };

  const handleSale = async () => {
    if (selectedTickets.length === 0) {
      alert("No hay boletos seleccionados");
      return;
    }

    const ticketIds = selectedTickets.map(ticket => ticket.ticketID).filter(id => id);

    // Comprobación de ids válidos
    if (ticketIds.length !== selectedTickets.length) {
      console.error("Error: algunos boletos no tienen un ID válido.");
      alert("Error al procesar los boletos seleccionados. Por favor, intenta nuevamente.");
      return;
    }
    const createSaleInput = {
      createSaleInput: {
        userId: user.id,
        ticketIds,
        saleDate: new Date().toISOString(),
        total: totalPrice,
      },
    };

    console.log("Datos de la venta:", createSaleInput);

    try {
      const { data } = await createSale({
        variables: createSaleInput,
      });
      alert(`Venta realizada con éxito! ID de la venta: ${data.createSale.saleID}`);
      setSelectedTickets([]);
    } catch (error) {
      console.error("Error al realizar la venta:", error);
      alert("Error al realizar la venta");
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
                      <strong>Fila:</strong> {ticket.row}
                    </p>
                    <p>
                      <strong>Asiento:</strong> {ticket.seat}
                    </p>
                    <p>
                      <strong>Precio:</strong> {ticket.price}
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
          <button onClick={handleSale} disabled={saleLoading} style={homeStyles.saleButton}>
            {saleLoading ? 'Procesando...' : 'Realizar Venta'}
          </button>
          {saleError && <p>Error al realizar la venta: {saleError.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;