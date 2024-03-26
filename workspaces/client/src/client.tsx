import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { ClientApp } from '@wsh-2024/app/src/index';

const main = async () => {
  ReactDOM.hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
      <BrowserRouter>
        <ClientApp />
      </BrowserRouter>
    </SWRConfig>,
  );
};

main().catch(console.error);
