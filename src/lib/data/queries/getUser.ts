import { gql } from "graphql-request";

export const GET_USER = gql`
query GetUser{
	getUser {
	  email
	  last_name
	  first_name
	  phone_number
	  id
	}
}
`;
