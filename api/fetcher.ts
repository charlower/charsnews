const BASE_URL = 'https://newsapi.org/v2/';

export const fetcher = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error(error?.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};
