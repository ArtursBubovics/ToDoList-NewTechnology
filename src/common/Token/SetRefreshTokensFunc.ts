import Cookies from 'universal-cookie';

const SetRefreshTokensFunc = async (tokens: { accessToken: string, refreshToken: string }) => {
    const cookies = new Cookies();
    try {
        // Установка новых токенов (например, в куки или localStorage)
        cookies.set('accessToken', tokens.accessToken, { path: '/', maxAge: 3600 });
        localStorage.setItem('refreshToken', tokens.refreshToken);

        return { success: true, message: 'Tokens set successfully!' };
    } catch (error) {
        console.error('Error setting refresh tokens:', error);
        // Возвращаем ошибку при возникновении исключения
        return { success: false, message: 'Error setting tokens!' };
    }
}

export default SetRefreshTokensFunc;