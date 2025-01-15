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
  });

  return { news, errorNews, isFetchingNews, refetchNews };
}
