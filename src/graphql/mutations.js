import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation Signup($name: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(name: $name, lastName: $lastName, email: $email, password: $password) {
      email
      token
    }
  }
`;


export const LOGIN_MUTATION = gql`
  mutation Mutation($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      user {
        id
        name
        lastName
        email
        roles
        isActive
      }
    }
  }
`;