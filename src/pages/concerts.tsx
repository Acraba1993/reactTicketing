import React from 'react';
import ConcertList from '../components/Concerts/ConcertList';

const Concerts: React.FC = () => {
  return (
    <div>
      <h1>Available Concerts</h1>
      <ConcertList />
    </div>
  );
};

export default Concerts;
