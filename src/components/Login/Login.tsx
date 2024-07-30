import { Box } from "@mui/material"
import { ParticleComponent } from "./Particles/particle"
import { AuthFormBlock } from "./AuthFormBlock/AuthFormBlock"
import { AuthType } from "../../Models/Enums/AuthEnum"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from 'universal-cookie';
import { RefreshTokens } from "../../server/Routes/refreshRoute";
import { verifyToken } from "../../common/Token/Token";

export const Login = () => {
    
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
    const REFRESH_TOKEN_SECRET = process.env.REACT_APP_REFRESH_TOKEN_SECRET
    
    const location = useLocation();
    const navigate = useNavigate();
    
    const authType = location.pathname === "/SignUp" ? AuthType.SignUp : AuthType.Login;
    
    useEffect(() => {
        const cookies = new Cookies();

        const checkTokens = async () => {
            if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
                console.log('Token secrets are not defined');
                return;
            }

            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = cookies.get('refreshToken');

            if (accessToken && refreshToken) { //перекидывает на главную страницу (todolist а не login) уже человека который вошел в свой акк
                const accessTokenValid = verifyToken(accessToken, ACCESS_TOKEN_SECRET);

                if (accessTokenValid) {
                    const refreshTokenValid = verifyToken(refreshToken, REFRESH_TOKEN_SECRET);

                    if (refreshTokenValid) {
                        navigate('/todolist');
                        return;
                    } else { //если не активен refresh / обновить его и перекинуть пользователья на todolist
                        try{
                            await RefreshTokens(refreshToken);
                            navigate('/todolist');
                        }catch{
                            console.error('Error with token update');
                        }
                            
                    }

                } else { // access уже не активен то нужно проверить refresh / обновить аксес и рефреш / потом перекиныть на todolist
                    try{
                        await RefreshTokens(refreshToken);
                        navigate('/todolist');
                    }catch{
                        console.error('Error with token update');
                    }
                }
            }
        }
        checkTokens();
    }, [ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, navigate]);

    return (
        <Box>
            <Box sx={{ height: '100vh', display: 'flex' }}>
                <Box sx={{ width: '60%', height: '99%' }}>
                    <ParticleComponent />
                </Box>
                <Box sx={{ width: '40%', backgroundColor: '#D9D9D9', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '150px' }}>
                    <Box sx={{ width: '70%', height: authType === AuthType.SignUp ? '55%' : '48%', backgroundColor: '#FFFFFF', borderRadius: '32px' }}>
                        <AuthFormBlock authType={authType} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}