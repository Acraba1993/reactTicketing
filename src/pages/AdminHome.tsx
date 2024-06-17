import React from 'react';

const AdminHome = () => {
  return (
    <div>
      <h1>Admin Home</h1>
      <p>Welcome, Admin! Here are your tools:</p>
      <ul>
        <li><a href="/reports">Reports</a></li>
        <li><a href="/tickets">All Tickets</a></li>
        <li><a href="/create-user">Create New User</a></li>
        <li><a href="/sell-ticket">Sell Ticket</a></li>
      </ul>
    </div>
  );
};

export default AdminHome;
