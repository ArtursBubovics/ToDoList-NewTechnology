import { gql, useLazyQuery, useMutation } from '@apollo/client';
import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface RouteProps {
    children: ReactNode;
}

const VERIFY_TOKEN = gql`
  query VerifyToken($token: String!, $type: TokenType!) {
    verifyToken(token: $token, type: $type) {
      accessToken
      refreshToken
    }
  }
`;

enum TokenType {
    ACCESS = 'ACCESS',
    REFRESH = 'REFRESH'
}



export function PrivateRoute({ children }: RouteProps) {
    const refreshToken = localStorage.getItem('refreshToken')
    const isAuthenticated = Boolean(refreshToken);

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
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
                    if (await verifyToken({ variables: { token: refreshToken, type: TokenType.REFRESH }})) {
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
