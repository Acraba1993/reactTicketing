export const homeStyles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  selector: {
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  mainContent: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  mapContainer: {
    flex: '1',
  },
  seatMap: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '10px',
  },
  ticketItem: {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  selectedTicketsContainer: {
    flex: '1',
    marginLeft: '20px',
  },
  selectedTicketItem: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
};
