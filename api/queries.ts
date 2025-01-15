import { fetcher } from './fetcher';
const KEY = '183daca270264bad86fc5b72972fb82a';

export const searchNews = async (query: string) => {
  const endpoint = `/everything?q=${encodeURIComponent(query)}&apiKey=${KEY}`;

  const options = {
    method: 'GET',
  };

  return fetcher(endpoint, options);
};
