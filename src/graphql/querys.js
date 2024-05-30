import { useQuery, gql } from '@apollo/client';

export const GET_TICKETS = gql`
query ExampleQuery {
  tickets {
    section
    row
    seat
    price
    state
    ticketID
  }
}
`;

export const GET_EVENTS_TICKETS_BY_ID_USER = gql
`query UserEvents($userId: String!) {
  userEvents(userId: $userId) {
    id
    name
    date
    description
    hour
    location
    tickets {
      price
      row
      seat
      state
      section
    }
  }
}`