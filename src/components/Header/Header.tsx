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
import { useDispatch } from 'react-redux';
import { setArchiveValue, setNotficationOpenValue } from '../../ReduxToolkit/Reducers/headerMenu-reducer';
import { useLocation } from 'react-router-dom';
import DonationButton from './DonationButton/DonationButton';

const Header: React.FC<HeaderContentProps> = ({ anchorEl, handleClick, handleClose }) => {
    const invisible = false;

    const dispatch = useDispatch();

    const toggleArchiveDrawer = (value: boolean) => {
        dispatch(setArchiveValue(value));
    };

    const toggleNotficationDrawer = (value: boolean) => {
        dispatch(setNotficationOpenValue(value));
    };

    const location = useLocation();
    const isUrlProfile = location.pathname ==="/Profile" ? true : false;

    return (
        <Box>
            <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', borderBottom: '2px solid #EEEEEE' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {isUrlProfile ? <Box sx={{ display: 'flex', gap: '10px' }}>
                        <DonationButton/>
                        <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: '5px' }}>
                            <Button sx={{
                                display: 'flex', alignItems: 'center', color: '#B5B5B5', textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationColor: '#D8D8D8', backgroundColor: 'transparent',
                                '&:hover': {
                                    color: '#A0A0A0 ',
                                    backgroundColor: 'transparent'
                                }
                            }}>
                                Save changes
                            </Button>
                            <Button sx={{
                                display: 'flex', alignItems: 'center', color: '#B5B5B5', textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationColor: '#D8D8D8', backgroundColor: 'transparent',
                                '&:hover': {
                                    color: '#A0A0A0  ',
                                    backgroundColor: 'transparent'
                                }
                            }}>
                                Reset changes
                            </Button>
                        </Box>
                    </Box> : <Box sx={{ display: 'flex', gap: '10px' }}>
                        <DonationButton/>
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