import { GraphQLClient } from 'graphql-request';
import { apiEndpoint } from '..';

export const graphql = new GraphQLClient(apiEndpoint + '/graphql', { headers: {
	// 'Authorization': `Bearer ${Cookies.get('token')}`
}});