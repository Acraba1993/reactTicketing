import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useMutation } from '@apollo/client';
import { CREATE_SALE } from '../graphql/mutations';
import { homeStyles } from '../assets/styles/homeStyle';

const ConfirmSale = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTickets, totalPrice } = location.state || {};

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [createSale, { loading: saleLoading, error: saleError }] = useMutation(CREATE_SALE);

  if (!selectedTickets || !totalPrice) {
    navigate('/home');
    return null;
  }

  const handleConfirmSale = async () => {
    if (!email || !name || !phone) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const ticketIds = selectedTickets.map(ticket => ticket.ticketID);

    const createSaleInput = {
      createSaleInput: {
        userId: user.id,
        ticketIds,
        saleDate: new Date().toISOString(),
        total: totalPrice,
        email,
        name,
        phone,
      },
    };

    try {
      const { data } = await createSale({
        variables: createSaleInput,
      });
      alert(`Venta realizada con éxito! ID de la venta: ${data.createSale.saleID}`);
      // Clear localStorage after successful sale
      localStorage.removeItem('selectedEventId');
      localStorage.removeItem('selectedTickets');
      navigate('/home');
    } catch (error) {
      console.error("Error al realizar la venta:", error);
      alert("Error al realizar la venta");
    }
  };

  return (
    <div style={homeStyles.container}>
      <h3>Confirmar Venta</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleConfirmSale(); }}>
        <label>
          Correo Electrónico:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={homeStyles.input}
          />
        </label>
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={homeStyles.input}
          />
        </label>
        <label>
          Teléfono:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={homeStyles.input}
          />
        </label>
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
        <button type="submit" disabled={saleLoading} style={homeStyles.saleButton}>
          {saleLoading ? 'Procesando...' : 'Confirmar Venta'}
        </button>
        {saleError && <p>Error al realizar la venta: {saleError.message}</p>}
      </form>
    </div>
  );
};

export default ConfirmSale;
