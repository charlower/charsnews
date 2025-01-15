import { fetcher } from './fetcher';
const KEY = 'd79188f1b69d4611af7442753d3941d3';

export const searchNews = async (query: string) => {
  const endpoint = `/everything?q=${encodeURIComponent(
    query
  )}&from=2025-01-14&sortBy=popularity&apiKey=${KEY}`;

  console.log('search');

  const options = {
    method: 'GET',
  };

  return fetcher(endpoint, options);
};
