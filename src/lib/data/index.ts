import { dev } from '$app/environment';

const forceProduction = false;

export const apiEndpoint = (dev && !forceProduction) ? 'http://localhost:8080' : 'https://api.swril.ca';