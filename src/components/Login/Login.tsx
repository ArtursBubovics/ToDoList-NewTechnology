import { Box } from "@mui/material"
import { ParticleComponent } from "./Particles/particle"
import { AuthFormBlock } from "./AuthFormBlock/AuthFormBlock"
import { AuthType } from "../../Models/Enums/AuthEnum"
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { SetRefreshTokensFunc } from "../../common/Token/SetRefreshTokensFunc";

const REFRESH_TOKENS = gql`
  mutation RefreshTokens($refreshToken: String!) {
    refreshTokens(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

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


const useAuth = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false); // Добавляем состояние для отслеживания проверки

  const [refreshTokens] = useMutation(REFRESH_TOKENS);
  const [verifyToken] = useLazyQuery(VERIFY_TOKEN);



  const handleTokenRefresh = useCallback(async (refreshToken: string) => {
    try {
      const { data } = await refreshTokens({ variables: { refreshToken } });

      if (data && data.refreshTokens) {
        const result = await SetRefreshTokensFunc({
          accessToken: data.refreshTokens.accessToken,
          refreshToken: data.refreshTokens.refreshToken
        });

        if (result.success) {
          navigate('/ToDoLists');
        } else {
          console.log(result.message);
        }
      } else {
        console.error('Error fetching new tokens!');
      }

    } catch (error) {
      console.error('Error refreshing tokens:', error); // при входе в акк на todolist и пользователь пытается перейти на login/signup то срабатывает это
      cookies.remove('accessToken', { path: '/' });
      localStorage.removeItem('refreshToken');
      navigate('/');
    } finally {
      setChecked(true);
    }
  }, [cookies, navigate, refreshTokens]);



  const checkTokens = useCallback(async () => {
    const accessToken = cookies.get('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      try {
        const { data } = await verifyToken({ variables: { token: accessToken, type: TokenType.ACCESS } });
        if (data?.verifyToken) {
          navigate('/ToDoLists');
        } else if (refreshToken) {
          await handleTokenRefresh(refreshToken);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error verifying access token:', error);
        if (refreshToken) {
          await handleTokenRefresh(refreshToken);
        } else {
          navigate('/');
        }
      } finally {
        setChecked(true); // Проверка завершена
      }
    } else if (refreshToken) {
      await handleTokenRefresh(refreshToken);
    } else {
      navigate('/');
      setChecked(true);
    }
  }, [cookies, handleTokenRefresh, navigate, verifyToken]);

  return { checkTokens, checked };
};

export const Login = () => {
  const { checkTokens, checked } = useAuth();
  const location = useLocation();
  const authType = location.pathname === "/SignUp" ? AuthType.SignUp : AuthType.Login;

  useEffect(() => {
    if (!checked) {
      checkTokens();
    }
  }, [checkTokens, checked]);

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