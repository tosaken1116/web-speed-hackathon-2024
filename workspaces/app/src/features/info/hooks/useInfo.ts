import useSWR from 'swr';
import { infoApiClient } from '../apiClient/infoApiClient';

export function useInfo(...[options]: Parameters<typeof infoApiClient.fetch>) {
  return useSWR(infoApiClient.fetch$$key(options), infoApiClient.fetch, {
    suspense: true,
    fallbackData: {
      text: '',
    },
  });
}
