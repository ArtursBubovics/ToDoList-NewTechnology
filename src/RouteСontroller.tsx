import { gql, useLazyQuery } from '@apollo/client';
import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

interface RouteProps {
    children: ReactNode;
}

const VERIFY_TOKEN = gql`
  query VerifyToken($token: String!, $type: TokenType!) {
    verifyToken(token: $token, type: $type) {
      valid
      message
    }
  }
`;

enum TokenType {
    ACCESS = 'ACCESS',
    REFRESH = 'REFRESH'
}

const cookies = new Cookies();
export function PrivateRoute({ children }: RouteProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [verifyToken] = useLazyQuery(VERIFY_TOKEN);

    const accessToken = cookies.get('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    useEffect(() => {
        const checkAuth = async () => {
            if (!refreshToken) {
                // Если нет refreshToken, пользователь не аутентифицирован
                setIsChecking(false);
                return;
            }

            if (accessToken) {
                try {
                    console.log('43 line verifyToken accessToken: ' + accessToken)
                    const { data } = await verifyToken({ variables: { token: accessToken, type: TokenType.ACCESS } });
                    console.log('43 line verifyToken accessToken data: ')
                    console.log(data)

                    if (data && data.verifyToken && data.verifyToken.valid) {
                        setIsAuthenticated(true);
                        setIsChecking(false);
                        return;
                    } // добавить обновление аксес и рефреш токенов
                } catch (error) {
                    console.error('Error verifying access token:', error);
                }
            }

            // Если accessToken не действителен или истек, попытка обновить токены
            if (refreshToken) {
                try {
                    console.log('56 line verifyToken refreshToken: ' + refreshToken)
                    const { data } = await verifyToken({ variables: { token: refreshToken, type: TokenType.REFRESH } });
                    console.log('56 line verifyToken refreshToken data: ')
                    console.log(data)
                    if (data && data.verifyToken && data.verifyToken.valid) {
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    console.error('Error verifying refresh token:', error);

                }
            }

            setIsChecking(false);
        };

        checkAuth();
    }, [verifyToken, accessToken , refreshToken]);

    if (isChecking) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

export function PublicRoute({ children }: RouteProps) {
    const [verifyToken] = useLazyQuery(VERIFY_TOKEN);
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    console.log('92 line verifyToken refreshToken: ' + refreshToken)
                    const { data } = await verifyToken({ variables: { token: refreshToken, type: TokenType.REFRESH } });
                    console.log('92 line verifyToken refreshToken data: ')
                    console.log(data)
                    if (data && data.verifyToken && data.verifyToken.valid) {
                        setIsAuthenticated(true);
                    } else {
                        console.error('Verification failed');
                    }
                } catch (error) {
                    console.error('Error verifying refresh token:', error);
                }
            }
            setIsChecking(false);
        };

        checkAuth();
    }, [verifyToken]);

    if (isChecking) {
        return <div>Loading...</div>; // Можно показать индикатор загрузки
    }

    return isAuthenticated ? <Navigate to="/ToDoLists" /> : <>{children}</>;
}
