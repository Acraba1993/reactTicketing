import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONCERTS } from '../../graphql/queries';
import { useCart } from '../../contexts/CartContext';

const ConcertList = () => {
  const { loading, error, data } = useQuery(GET_CONCERTS);
  const { addToCart } = useCart();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.concerts.map((concert) => (
        <div key={concert.id}>
          <h3>{concert.name}</h3>
          <p>{concert.date}</p>
          <button onClick={() => addToCart(concert)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ConcertList;
