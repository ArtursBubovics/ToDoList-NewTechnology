import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import { ApolloProvider } from '@apollo/client';
// import client from '../server/apolloClient/client';


import { Provider } from 'react-redux';
import store from './ReduxToolkit/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <ApolloProvider client={client}> */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </ApolloProvider> */}
  </React.StrictMode>
);
