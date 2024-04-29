import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import ArchiveIcon from '@mui/icons-material/Archive';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Button, FormControlLabel, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import HeaderIcons from './HeaderIcons/HeaderIcons';
import DayNightSwith from '../../common/DayNightSwith';
import { HeaderContentProps } from '../../Models/Interfaces/IHeaderContentProps';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setArchiveValue } from '../../ReduxToolkit/Reducers/archive-reducer';

const Header: React.FC<HeaderContentProps> = ({ anchorEl, handleClick, handleClose }) => {
    const invisible = false;

    const dispatch = useDispatch();

    const toggleDrawer = () => {
        dispatch(setArchiveValue());
    };

    return (
        <Box>
            <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', borderBottom: '2px solid #EEEEEE' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button sx={{
                        display: 'flex', gap: '10px', alignItems: 'center', padding: '6px 12px 6px', color: '#A9A9A9', backgroundColor: '#FAFAFA', borderRadius: '7px', border: '1px solid #EBEBEB', textTransform: 'none', '&:hover': {
                            backgroundColor: '#F5F5F5'
                        }
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src="assets/images/donate_icon.png" alt="" />
                        </Box>
                        <Typography sx={{ fontSize: '17px', fontWeight: 400, color: '#A9A9A9', paddingTop: '2px' }} >
                            Support our project with a coin
                        </Typography>
                    </Button>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '5px' }}>

                            <Box onClick={toggleDrawer}>
                                <HeaderIcons title="Archive" dotDisposition={{ top: "3px", right: "-2px" }} Icon={ArchiveIcon} invisible={true}></HeaderIcons>
                            </Box>

                            <HeaderIcons title="Alerts" dotDisposition={{ top: "3px", right: "5px" }} Icon={NotificationsIcon} invisible={invisible}></HeaderIcons>

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