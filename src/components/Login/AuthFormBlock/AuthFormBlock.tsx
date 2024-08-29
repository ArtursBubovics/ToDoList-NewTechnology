import Box from "@mui/material/Box"
import IconBlock from "../IconsBlocks/IconBlock"
import { Typography, Button } from "@mui/material"
import LoginBlock from "../LoginBlock/LoginBlock";
import SignUpBlock from "../SignUpBlock/SignUpBlock";
import AuthType from "../../../Models/Enums/AuthEnum";
import { Link, useNavigate } from "react-router-dom"
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useState } from "react";
import { validateSignUpData, validateLoginData } from "../../../common/Validation/validation";
import { useAlert } from '../../../common/Alerts/AlertContext';
import Cookies from 'universal-cookie';
import SetRefreshTokensFunc from "../../../common/Token/SetRefreshTokensFunc";

const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $gmail: String!, $password: String!) {
    registerUser(name: $name, gmail: $gmail, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

const LOGIN_USER = gql`
  query LoginUser($name: String!, $password: String!) {
    loginUser(name: $name, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

const REFRESH_TOKENS = gql`
  query RefreshTokens($refreshToken: String!) {
    refreshTokens(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

const VERIFY_TOKEN = gql`
  query VerifyToken($token: String!, $type: TokenType!) {
    verifyToken(token: $token, type: $type) {
      valid
      message
      data
    }
  }
`;

const CHECK_USER_EXISTENCE = gql`
  query CheckUserExistence($name: String!, $password: String!) {
    checkUserExistence(name: $name, password: $password)
  }
`;

enum TokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH'
}

interface AuthFormBlockProps {
  authType: AuthType,
}

const AuthFormBlock: React.FC<AuthFormBlockProps> = ({ authType }) => {

  const cookies = new Cookies();
  const navigate = useNavigate();

  const { setAlert } = useAlert();
  const [registerUser, { loading: registerUserLoading }] = useMutation(REGISTER_USER);
  const [refreshTokens] = useLazyQuery(REFRESH_TOKENS);
  const [verifyToken] = useLazyQuery(VERIFY_TOKEN);
  const [loginUser, { loading: loginUserLoading }] = useLazyQuery(LOGIN_USER);
  const [checkUserExistence] = useLazyQuery(CHECK_USER_EXISTENCE);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [gmail, setGmail] = useState('');



  const handleSignUp = async () => {
    if (registerUserLoading) return;

    try {
      const validationData = { name, password, gmail };
      const result = await validateSignUpData(validationData);
      console.log('validation: ')
      console.log(result)

      if (!result.valid) {
        setAlert(`Validation errors: ${result.errors}`, 'error');
      }

      const { data, errors } = await registerUser({ variables: { name, password, gmail } });

      if (errors) {
        console.error('Error fetching user:', errors);
        setAlert('Failed to sign up!', 'error');
        return;
      }

      console.log('data: ');
      console.log(data);

      if (data.registerUser) {
        console.log('Registration successful:', data);

        //console.log('accessToken:', data.registerUser.accessToken);
        //console.log('refreshToken:', data.registerUser.refreshToken);

        cookies.set('accessToken', data.registerUser.accessToken, { path: '/', maxAge: 3600 });
        localStorage.setItem('refreshToken', data.registerUser.refreshToken);
        setAlert('User created successfully!', 'success');
        setName('');
        setPassword('');
        setGmail('');
        navigate('/ToDoLists')
      } else {
        setAlert('Failed to create user1!', 'error');
      }
    } catch (err) {
      console.error('Error creating user:', err);
      setAlert('Failed to create user2!', 'error');
    }
  };



  const handleLogin = async () => {
    if (loginUserLoading) return;

    try {
      const validationData = { name, password, gmail };
      const result = await validateLoginData(validationData);

      const accessToken = cookies.get('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!result.valid) {
        setAlert(`Validation errors: ${result.errors}`, 'error');
        return;
      }

      //console.log('accessToken login part: ' + accessToken)
      //console.log('refreshToken login part: ' + refreshToken)


      if (accessToken) {
        const { data } = await verifyToken({ variables: { token: accessToken, type: TokenType.ACCESS } })
        //console.log('153 line verifyToken accessToken  authFotmBlock data: ')
        //console.log(data)
        if (data && data.verifyToken && data.verifyToken.valid) {
          // Вход в аккаунт
          setAlert('Login successful!', 'success');

          setName('');
          setPassword('');
          setGmail('');

          navigate('/ToDoLists');
          return;
        } else {
          // Если `accessToken` недействителен, но есть `refreshToken`
          const { data } = await verifyToken({ variables: { token: refreshToken, type: TokenType.REFRESH } })
          //console.log('202 line verifyToken refreshToken  authFotmBlock data: ')
          //console.log(data)
          if (refreshToken && data && data.verifyToken && data.verifyToken.valid) {
            // Обновление access и refresh токенов
            try {
              const { data } = await refreshTokens({ variables: { refreshToken } });

              if (data && data.refreshTokens) {
                const result = await SetRefreshTokensFunc({
                  accessToken: data.refreshTokens.accessToken,
                  refreshToken: data.refreshTokens.refreshToken
                });

                if (result.success) {
                  setAlert(result.message, 'success');
                  navigate('/ToDoLists');
                } else {
                  setAlert(result.message, 'error');
                }
              } else {
                setAlert('Error fetching new tokens!', 'error');
              }

            } catch (error) {
              console.error('Error refreshing tokens:', error);
              setAlert('Error refreshing tokens!', 'error');
            }
          } else {
            // Если `refreshToken` тоже недействителен или отсутствует
            // Заново вход в аккаунт
            setAlert('To continue using your account, you need to log in again!1', 'info');
          }
        }
      } else if (refreshToken) {
        // Если отсутствует `accessToken`, но есть `refreshToken`
        const { data } = await verifyToken({ variables: { token: refreshToken, type: TokenType.REFRESH } })
        //console.log('202 line verifyToken refreshToken  authFotmBlock data: ')
        //console.log(data)
        if (data && data.verifyToken && data.verifyToken.valid) {
          // Обновление access и refresh токенов
          try {
            const { data } = await refreshTokens({ variables: { refreshToken } });
            if (data && data.refreshTokens) {
              const result = await SetRefreshTokensFunc({
                accessToken: data.refreshTokens.accessToken,
                refreshToken: data.refreshTokens.refreshToken
              });

              if (result.success) {
                setAlert(result.message, 'success');
                navigate('/ToDoLists');
              } else {
                setAlert(result.message, 'error');
              }
            } else {
              setAlert('Error fetching new tokens!', 'error');
            }

          } catch (error) {
            console.error('Error refreshing tokens:', error);
            setAlert('Error refreshing tokens!', 'error');
          }
        } else {
          // Если `refreshToken` недействителен
          // Заново вход в аккаунт
          setAlert('To continue using your account, you need to log in again!2', 'info');
        }
      } else {
        // Если отсутствуют оба токена
        // Заново вход в аккаунт
        //SELECT.....

        //console.log('checkUserExistence go1');
        //console.log('checkUserExistence name: ' + name);
        //console.log('checkUserExistence password: ' + password);
        const { data } = await checkUserExistence({ variables: { name, password } });
        //console.log(data);
        if (data) {
          //console.log('checkUserExistence go2');
          if (data.checkUserExistence) {  // Используем само значение, так как оно уже является булевым
            //console.log('checkUserExistence go3');
            const { data } = await loginUser({ variables: { name, password } });
            //console.log('data loginUser go4:');
            //console.log(data);
            if (data && data.loginUser) {
              const result = await SetRefreshTokensFunc({
                accessToken: data.loginUser.accessToken,
                refreshToken: data.loginUser.refreshToken
              });

              //console.log('result go5 result: ');
              //console.log(result);

              //console.log('result go6 accessToken: ');
              //console.log(cookies.get('accessToken'));

              //console.log('result go7 refreshToken: ');
              //console.log(localStorage.getItem('refreshToken'));

              //console.log('result  data.loginUser.accessToken: ');
              //console.log( data.loginUser.accessToken);
              //const { data: TEST1verifyToken } = await verifyToken({ variables: { token: data.loginUser.accessToken, type: TokenType.ACCESS } })
              //console.log('268 line verifyToken accessToken  authFotmBlock data: ')
              //console.log(TEST1verifyToken)
              //if (TEST1verifyToken && TEST1verifyToken.verifyToken && TEST1verifyToken.verifyToken.valid) {
              //  console.log('result TEST1verifyToken valid!!!!!: ');
              //}

              //const { data: TEST2verifyToken } = await verifyToken({ variables: { token: data.loginUser.refreshToken, type: TokenType.REFRESH } })
              //console.log('275 line verifyToken refreshToken  authFotmBlock data: ')
              //console.log(TEST2verifyToken)
              //if (TEST2verifyToken && TEST2verifyToken.verifyToken && TEST2verifyToken.verifyToken.valid) {
               // console.log('result TEST2verifyToken valid!!!!!: ');
              //}

              if (result.success) {

                setAlert(result.message, 'success');
                navigate('/ToDoLists');
              } else {
                setAlert(result.message, 'error');
              }
            } else {
              setAlert('Invalid credentials!', 'error');
            }
          } else {
            setAlert('User not found. Please sign up.', 'info');
            navigate('/SignUp');
          }
        } else {
          // Обработка случая, когда запрос не вернул данных или произошла ошибка
          setAlert('Error checking user existence!', 'error');
        }
      }



      // if (accessToken && await verifyToken({ variables: { token: accessToken, type: TokenType.ACCESS } })) {
      //   setAlert('Login successful!', 'success');

      // } else {

      //   if (refreshToken && await verifyToken({ variables: { token: refreshToken, type: TokenType.REFRESH } })) {
      //     setAlert('Login successful!', 'success');

      //   }

      //   const { data, errors } = await loginUser({ variables: { name, password } });

      //   if (errors) {
      //     console.error('Error fetching user:', errors);
      //     setAlert('Failed to log in!', 'error');
      //     return;
      //   }

      //   if (!data || !data.checkUser) {
      //     setAlert('User not found!', 'info');
      //     return;
      //   }

      //   if (data) {

      //     if (!refreshToken) {
      //       setAlert('No refresh token found!', 'error');
      //       return;
      //     }

      //     const newAccessToken = await refreshTokens({ variables: { refreshToken } });
      //     if (newAccessToken) {
      //       cookies.set('accessToken', newAccessToken, { path: '/', maxAge: 3600 });
      //       setAlert('Login successful!', 'success');

      //       setName('');
      //       setPassword('');
      //       setGmail('');

      //     } else {
      //       setAlert('Failed to refresh access token!', 'error');
      //     }

      //   } else {
      //     setAlert('Invalid credentials!', 'error');
      //   }
      // }


    } catch (err) {
      console.error('Error logging in:', err);
      setAlert('Failed to log in!', 'error');
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100%', padding: '5px 7% 15px' }}>
      <Box sx={{ width: '100%', height: '12%', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{
          width: '70%', height: '100%', display: 'flex', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', backgroundColor: '#E6E6E6', padding: '0px 10px',
          justifyContent: 'center', alignItems: 'center', gap: '25px'
        }}>
          <IconBlock imgPath={"/assets/images/google_icon.png"} />
          <IconBlock imgPath={"/assets/images/facebook_icon.png"} />
          <IconBlock imgPath={"/assets/images/twitter_icon.png"} />
          <IconBlock imgPath={"/assets/images/telegram_icon.png"} />
          <IconBlock imgPath={"/assets/images/instagram_icon.png"} />
        </Box>
      </Box>
      <Box sx={{ paddingTop: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src="/assets/images/Logo.png" alt="" />
            </Box>
            <Typography sx={{ fontWeight: '500', fontSize: '35px' }}>
              YoloDo
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', paddingTop: '3px' }}>
            <Typography sx={{ color: '#CCCCCC' }}>
              {authType === AuthType.Login ? "Don't have an account yet?" : "Already created an account?"}
            </Typography>
            <Typography sx={{ cursor: 'pointer', textDecoration: 'underline', color: '#454545' }}>
              <Link to={authType === AuthType.Login ? "/SignUp" : "/"}>
                {authType === AuthType.Login ? "Sign up" : "Login"}
              </Link>
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box sx={{ padding: '3% 7%' }}>

            {authType === AuthType.Login ?
              <LoginBlock
                name={name}
                setName={setName}
                password={password}
                setPassword={setPassword}

              /> : <SignUpBlock
                name={name}
                setName={setName}
                password={password}
                setPassword={setPassword}
                gmail={gmail}
                setGmail={setGmail} />}

            <Box sx={{ padding: authType === AuthType.SignUp ? '5% 10%' : '3% 10%' }}>
              <Button variant="contained" disableElevation sx={{
                width: '80%', height: '28px', borderRadius: '30px', color: '#B1B1B1', backgroundColor: '#F9F9F9', textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#FBFBFB'
                }
              }}
                onClick={authType === AuthType.Login ? handleLogin : handleSignUp}
              >
                {authType === AuthType.Login ? "Login" : "Sign up"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AuthFormBlock;