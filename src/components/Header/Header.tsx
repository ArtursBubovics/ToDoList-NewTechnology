import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import ArchiveIcon from '@mui/icons-material/Archive';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Button, FormControlLabel, IconButton, Menu, MenuItem } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import HeaderIcons from './HeaderIcons/HeaderIcons';
import DayNightSwith from '../../common/DayNightSwith';
import HeaderContentProps from '../../Models/Interfaces/IHeaderContentProps';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setArchiveValue, setNotficationOpenValue } from '../../ReduxToolkit/Reducers/headerMenu-reducer';
import { useLocation } from 'react-router-dom';
import DonationButton from './DonationButton/DonationButton';
import IProfileDataState from '../../Models/Interfaces/IProfileDataState';
import { ValidateProfileData } from '../../common/Validation/validationProfile';
import { useAlert } from '../../common/Alerts/AlertContext';
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import Cookies from 'universal-cookie';

enum TokenType {
    ACCESS = 'ACCESS',
    REFRESH = 'REFRESH'
}

const PASSWORD_VALIDATION = gql`
    query PasswordValidation($UserID: Int!, $currentPassword: String!) {
        passwordValidation(UserID: $UserID, currentPassword: $currentPassword)
    }
`;

const VERIFY_TOKEN = gql`
  query VerifyToken($token: String!, $type: TokenType!) {
    verifyToken(token: $token, type: $type) {
      valid
      message
      user {
        UserID
      }
    }
  }
`;

const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo($UserID: Int!, $name: String!, $gmail: String!, $password: String!) {
    updateUserInfo(UserID: $UserID, name: $name, gmail: $gmail, password: $password) {
      success
      message
    }
  }
`;

interface RootState {
    profile: IProfileDataState;
}


const Header: React.FC<HeaderContentProps> = ({ anchorEl, handleClick, handleClose }) => {
    
    let approvedPassword;
    const invisible = false;

    const dispatch = useDispatch();
    const location = useLocation();
    const { setAlert } = useAlert();

    const [passwordValidation] = useLazyQuery(PASSWORD_VALIDATION);
    const [verifyToken] = useLazyQuery(VERIFY_TOKEN);

    const [updateUserInfo] = useMutation(UPDATE_USER_INFO);

    const userProfileName = useSelector((state: RootState) => state.profile.name);
    const userProfileGmail = useSelector((state: RootState) => state.profile.gmail);
    const userProfileNewPassword = useSelector((state: RootState) => state.profile.newPassword);
    const userProfileCurrentPassword = useSelector((state: RootState) => state.profile.currentPassword);


    const isUrlProfile = location.pathname === "/Profile" ? true : false;



    const toggleArchiveDrawer = (value: boolean) => {
        dispatch(setArchiveValue(value));
    };


    const toggleNotficationDrawer = (value: boolean) => {
        dispatch(setNotficationOpenValue(value));
    };


    const handleSaveChanges = async () => {
        const cookies = new Cookies();
        const accessToken = cookies.get('accessToken');


        const { data: verifyTokenData, error: verifyTokenError } = await verifyToken({ variables: { token: accessToken, type: TokenType.ACCESS } })

        if (verifyTokenError) {
            setAlert(`Token verification failed: ${verifyTokenError.message}`, 'error');
            return;
        }

        if (!verifyTokenData || !verifyTokenData.verifyToken || !verifyTokenData.verifyToken.user) {
            setAlert('Token verification data is missing or incorrect.', 'error');
            return;
        }

        console.log('Token verified:', verifyTokenData);


        const result = await ValidateProfileData({ name: userProfileName, gmail: userProfileGmail, currentPassword: userProfileCurrentPassword, newPassword: userProfileNewPassword })

        if (!result.valid) {
            setAlert(`Validation errors: ${result.errors}`, 'error');
        }
        else {
            console.log('all is ok')

            const { data: passwordValidationData, loading: passwordValidationLoading, error: passwordValidationError } = await passwordValidation({ variables: { UserID: verifyTokenData.verifyToken.user.UserID, currentPassword: userProfileCurrentPassword } });

            if (passwordValidationLoading) {
                setAlert('Validating password...', 'info');
            }

            if (passwordValidationError) {
                setAlert(`Validation errors: ${passwordValidationError.message}`, 'error');
            }

            console.log(passwordValidationData)

            if (passwordValidationData && passwordValidationData.passwordValidation) {
                !userProfileNewPassword ? approvedPassword = userProfileCurrentPassword : approvedPassword = userProfileNewPassword
                
                const { data: updateUserInfoData } = await updateUserInfo({ variables: { UserID: verifyTokenData.verifyToken.user.UserID, name: userProfileName, gmail: userProfileGmail, password: approvedPassword } })

                console.log('updateUserInfoData is:')
                console.log(updateUserInfoData)

                if (updateUserInfoData.updateUserInfo.success) {
                    setAlert(updateUserInfoData.updateUserInfo.message, 'success');
                } else {
                    console.log('updateUserInfoData error: ' + updateUserInfoData.updateUserInfo.message)

                    setAlert(`Update user info errors: ${updateUserInfoData.updateUserInfo.message}`, 'error');

                }
            }

            if (!passwordValidationData.passwordValidation) {
                setAlert(`Validation errors: Incorret current password!`, 'error');
            }
        }
    };

    const handleResetChanges = () => {
        window.location.reload();
    };

    return (
        <Box>
            <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', borderBottom: '2px solid #EEEEEE' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {isUrlProfile ? <Box sx={{ display: 'flex', gap: '10px' }}>
                        <DonationButton />
                        <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: '5px' }}>
                            <Button sx={{
                                display: 'flex', alignItems: 'center', color: '#B5B5B5', textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationColor: '#D8D8D8', backgroundColor: 'transparent',
                                '&:hover': {
                                    color: '#A0A0A0 ',
                                    backgroundColor: 'transparent'
                                }
                            }} onClick={handleSaveChanges}>
                                Save changes
                            </Button>
                            <Button sx={{
                                display: 'flex', alignItems: 'center', color: '#B5B5B5', textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationColor: '#D8D8D8', backgroundColor: 'transparent',
                                '&:hover': {
                                    color: '#A0A0A0  ',
                                    backgroundColor: 'transparent'
                                }
                            }} onClick={handleResetChanges}>
                                Reset changes
                            </Button>
                        </Box>
                    </Box> : <Box sx={{ display: 'flex', gap: '10px' }}>
                        <DonationButton />
                    </Box>}

                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '5px' }}>
                            <Box onClick={() => toggleArchiveDrawer(true)}>
                                <HeaderIcons title="Archive" dotDisposition={{ top: "3px", right: "-2px" }} Icon={ArchiveIcon} invisible={true}></HeaderIcons>
                            </Box>
                            <Box onClick={() => toggleNotficationDrawer(true)}>
                                <HeaderIcons title="Notifications" dotDisposition={{ top: "3px", right: "5px" }} Icon={NotificationsIcon} invisible={invisible}></HeaderIcons>
                            </Box>
                        </Box>
                        <Tooltip title="Quick settings" placement="bottom" arrow>
                            <IconButton sx={{ marginTop: '1px', cursor: 'pointer' }} onClick={handleClick} aria-controls="simple-menu"
                                aria-haspopup="true" >
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <FormControlLabel
                                    control={<DayNightSwith sx={{ m: 1 }} defaultChecked />}
                                    label="MUI switch"
                                />
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>)
}

export default Header