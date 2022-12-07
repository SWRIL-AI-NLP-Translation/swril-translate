import { graphql } from '$lib/data/graphql';
import { GET_USER } from '$lib/data/queries/getUser';
import type { UserType } from '$lib/types/user';
import { error } from '@sveltejs/kit';
// import { graphql } from '$lib/data/graphql';
import type { LayoutServerLoadReturn } from '../+layout.server';


export interface HomeData {	
	user?: UserType,
}

export const defaultHomeData: HomeData = {};


interface ServerLoadParams {
	parent: () => Promise<LayoutServerLoadReturn>
}

export const load = async ({ parent }: ServerLoadParams): Promise<HomeData> =>  {
	try {
		const { token } = await parent();
		if (token) {
			try {
				graphql.setHeader('Authorization', `Bearer ${token}`)
				const res = await graphql.request(GET_USER, {})
				const data = res.getUser
				if (!data) {
					console.error(res.errors)
				} else {
					return {
						user: {
							...data,
						}
					}
				}
			} catch (e) {
				console.error(e)
			}
		}
		return defaultHomeData;
	} catch (e) {
		console.log(e);
		throw error(400, 'Request failed');
	}
}
