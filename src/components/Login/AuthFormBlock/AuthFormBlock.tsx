import Box from "@mui/material/Box"
import { IconBlock } from "../IconsBlocks/IconBlock"
import { Typography, Button } from "@mui/material"
import { LoginBlock } from "../LoginBlock/LoginBlock";
import { SignUpBlock } from "../SignUpBlock/SignUpBlock";
import { AuthType } from "../../../Models/Enums/AuthEnum";
import { Link } from "react-router-dom"
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useState } from "react";
import { validateSignUpData, validateLoginData } from "../../../common/Validation/validation";
import bcrypt from 'bcryptjs';
import { useAlert } from '../../../common/Alerts/AlertContext';
import { secretKey } from '../../../settingsTS';
import CryptoJS from 'crypto-js';

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $password: String!, $gmail: String!) {
    createUser(name: $name, password: $password, gmail: $gmail) {
      id
      name
      password
      gmail
    }
  }
`;

const CHECK_USER = gql`
  query CheckUser($name: String!, $gmail: String, $password: String) {
    checkUser(name: $name, gmail: $gmail, password: $password)
  }
`;

interface AuthFormBlockProps {
  authType: AuthType,
}

export const AuthFormBlock: React.FC<AuthFormBlockProps> = ({ authType }) => {
  const { setAlert } = useAlert();

  const [createUser, { data: createUserMutationData, loading: createUserLoading, error: createUserError }] = useMutation(CREATE_USER);
  const [checkUser, { data: checkUserData, loading: checkUserLoading, error: checkUserError }] = useLazyQuery(CHECK_USER);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [gmail, setGmail] = useState('');






  const handleSignUp = async () => {

    try {
      const validationData = { name, password, gmail };
      const result = await validateSignUpData(validationData);

      if (!result.valid) {
        setAlert(`Validation errors: ${result.errors}`, 'error');
      }


      const { data } = await checkUser({ variables: { name, gmail } });
      
      console.log('data: ' + data);
      console.log(data);
      
      if (data.checkUser) {
        setAlert('User already exists!', 'error');
        return;
      }
      console.log('go1');
      const hashedPassword = await bcrypt.hash(password, 10);
      const encryptedGmail = CryptoJS.AES.encrypt(gmail, secretKey).toString();
      console.log('go2');
      const createUserResult = await createUser({ variables: { name, password: hashedPassword, gmail: encryptedGmail } });
      console.log('go3');
      if (createUserResult.data.createUser) {
        console.log('go4');
        setAlert('User created successfully!', 'success');
        setName('');
        setPassword('');
        setGmail('');
      } else {
        setAlert('Failed to create user1!', 'error');
      }
    } catch (err) {
      console.error('Error creating user:', err);
      setAlert('Failed to create user2!', 'error');
    }
  };



  const handleLogin = async () => {

    try {
      const validationData = { name, password, gmail };

      const result = await validateLoginData(validationData);

      if (!result.valid) {
        setAlert(`Validation errors: ${result.errors}`, 'error');
        return;
      }

      const { data, error } = await checkUser({ variables: { name, password } });
      console.log('data: ' + data);
      console.log(data);
      console.log('error: ' + error);

      if (error) {
        console.error('Error fetching user:', error);
        setAlert('Failed to log in!', 'error');
        return;
      }

      if (!data || !data.checkUser) {
        setAlert('User not found!', 'info');
        return;
      }

      if (data) {
        setAlert('Login successful!', 'success');

        setName('');
        setPassword('');
        setGmail('');

      } else {
        setAlert('Invalid credentials!', 'error');
      }

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