import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ApolloProvider } from '@apollo/client';
import createClient from './server/apolloClient/client';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';


import { Provider } from 'react-redux';
import store from './ReduxToolkit/store';

const ApolloClientProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const navigate = useNavigate();
  const client = createClient(navigate);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ApolloClientProvider>
          <App />
        </ApolloClientProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
