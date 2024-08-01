import { ApolloClient, InMemoryCache, HttpLink, Observable, gql  } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { from, ApolloLink, FetchResult } from '@apollo/client/link/core';
import Cookies from 'universal-cookie';
import { useNavigate, NavigateFunction  } from 'react-router-dom';

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

const REFRESH_TOKENS = gql`
  mutation RefreshTokens($refreshToken: String!) {
    refreshTokens(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

const errorLink = (navigate: NavigateFunction) => onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        return new Observable<FetchResult>(observer => {
          // Получаем refresh токен из localStorage
          const refreshToken = localStorage.getItem('refreshToken');

          if (!refreshToken) {
            cookies.remove('accessToken', { path: '/' });
            localStorage.removeItem('refreshToken');
            navigate('/'); // Используйте navigate для перенаправления
            observer.error(new Error('No refresh token available'));
            return;
          }

          // Выполнение GraphQL мутации для обновления токенов
          const client = new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache(),
          });

          client.mutate({
            mutation: REFRESH_TOKENS,
            variables: { refreshToken },
          })
            .then(({ data }) => {
              if (data?.refreshTokens) {
                const { accessToken, refreshToken: newRefreshToken } = data.refreshTokens;
                cookies.set('accessToken', accessToken, { path: '/', maxAge: 3600 });
                localStorage.setItem('refreshToken', newRefreshToken);

                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${accessToken}`,
                  },
                });

                // Перезапускаем исходный запрос
                forward(operation).subscribe(observer);
              } else {
                cookies.remove('accessToken', { path: '/' });
                localStorage.removeItem('refreshToken');
                navigate('/'); // Используйте navigate для перенаправления
                observer.error(new Error('Failed to refresh tokens'));
              }
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

const client = (navigate: NavigateFunction) => new ApolloClient({
  link: from([errorLink(navigate), authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;