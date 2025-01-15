import { useQuery } from '@tanstack/react-query';
import { searchNews } from '@/api/queries';

export function useSearchNews(query: string) {
  const {
    data: news,
    isFetching: isFetchingNews,
    error: errorNews,
    refetch: refetchNews,
  } = useQuery<any>({
    queryKey: ['news'],
    queryFn: () => searchNews(query),
    enabled: false,
  });

  return { news, errorNews, isFetchingNews, refetchNews };
}
