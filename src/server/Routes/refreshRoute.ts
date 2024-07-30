import Cookies from 'universal-cookie';

interface RefreshTokensParams {
    refreshToken: string;
}

export const RefreshTokens = async ({ refreshToken }: RefreshTokensParams) => {
    const cookies = new Cookies();

    try {
        const response = await fetch('http://localhost:4000/api/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }), // Передача refreshToken
        });

        if (!response.ok) {
            throw new Error('Failed to refresh tokens');
        }

        const { accessToken, refreshToken: newRefreshToken } = await response.json();
        localStorage.setItem('accessToken', accessToken);
        cookies.set('refreshToken', newRefreshToken, { path: '/' });

    } catch (error) {
        console.error('Error refreshing tokens:', error);
    }
};