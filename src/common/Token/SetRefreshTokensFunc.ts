import Cookies from 'universal-cookie';


interface SetTokensParams {
    accessToken: string;
    refreshToken: string;
}


export const SetRefreshTokensFunc = async (params: SetTokensParams) => {

    const cookies = new Cookies();

    try {
        // Извлечение новых токенов из ответа
        const { accessToken, refreshToken } = params;

        // Установка новых токенов (например, в куки или localStorage)
        cookies.set('accessToken', accessToken, { path: '/', maxAge: 3600 });
        localStorage.setItem('refreshToken', refreshToken);

        return { success: true, message: 'Tokens refreshed successfully!' };
    } catch (error) {
        console.error('Error setting refresh tokens:', error);
        // Возвращаем ошибку при возникновении исключения
        return { success: false, message: 'Error setting refresh tokens!' };
    }
}