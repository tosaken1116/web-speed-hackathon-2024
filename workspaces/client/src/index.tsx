import './side-effects';

import $ from 'jquery';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { AdminApp } from '@wsh-2024/admin/src/index';
import { ClientApp } from '@wsh-2024/app/src/index';

import { registerServiceWorker } from './utils/registerServiceWorker';

const main = async () => {
  // await registerServiceWorker();

  $(document).ready(() => {
    if (window.location.pathname.startsWith('/admin')) {
      ReactDOM.createRoot($('#root').get(0)!).render(<AdminApp />);
    } else {
      ReactDOM.hydrateRoot(
        $('#root').get(0)!,
        <BrowserRouter>
          <ClientApp />
        </BrowserRouter>,
      );
    }
  });
};

main().catch(console.error);
