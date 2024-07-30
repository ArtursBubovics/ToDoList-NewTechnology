import { ApolloClient, InMemoryCache, HttpLink, Observable  } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { from, ApolloLink, FetchResult } from '@apollo/client/link/core';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const httpLink = new HttpLink({
  uri: 'http://localhost:3005/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const accessToken = cookies.get('accessToken');
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    }
  };
});

const errorLink: ApolloLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        return new Observable<FetchResult>(observer => {
          fetch('http://localhost:3005/api/refresh-token', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: localStorage.getItem('refreshToken'),
            }),
          })
            .then(response => response.json())
            .then(({ accessToken }) => {
              cookies.set('accessToken', accessToken, { path: '/', maxAge: 3600 });

              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${accessToken}`,
                },
              });

              // После успешного обновления токена передаем выполнение дальше
              observer.next({ data: {} }); // Передаем пустой объект, можно также передать любые данные, если необходимо
              observer.complete();
            })
            .catch(error => {
              observer.error(error);
            });
        });
      }
    }
  }

  // Если нет ошибок или не было найдено ошибок с кодом UNAUTHENTICATED, просто передаем выполнение дальше
  return forward(operation);
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;