import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'yakankun',
  apiKey: process.env.API_KEY || '',
});