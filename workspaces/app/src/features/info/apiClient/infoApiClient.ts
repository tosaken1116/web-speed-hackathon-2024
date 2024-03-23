import type { GetInfoResponse } from '@wsh-2024/schema/src/api/info/GetInfoResponse';

import type { DomainSpecificApiClientInterface } from '../../../lib/api/DomainSpecificApiClientInterface';
import { apiClient } from '../../../lib/api/apiClient';
import { GetInfoRequestParams } from '@wsh-2024/schema/src/api/info/GetInfoRequest';

type InfoApiClient = DomainSpecificApiClientInterface<{
  fetch: [{ params: GetInfoRequestParams }, GetInfoResponse];
}>;

export const infoApiClient: InfoApiClient = {
  fetch: async ({ params }) => {
    const response = await apiClient.get<GetInfoResponse>(`/api/v1/info/${params.type}`);
    return response.data;
  },
  fetch$$key: (options) => ({
    requestUrl: '/api/v1/info/:type',
    ...options,
  }),
};
