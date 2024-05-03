import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setArchiveValue } from '../../ReduxToolkit/Reducers/archive-reducer';
import { IArchiveState } from '../../Models/Interfaces/IArchiveState';
import CloseIcon from '@mui/icons-material/Close';
import { IconsButtons } from '../../common/Buttons/IconsButtons/IconsButtons';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function TemporaryDrawer() {

    const dispatch = useDispatch();

    const toggleDrawer = (value: boolean) => {
        dispatch(setArchiveValue(value));
    };

    interface RootState {
        archive: IArchiveState;
    }


    const isOpen = useSelector((state: RootState) => state.archive.isOpen);

    const DrawerList = (
        <Box sx={{ width: 320, height: '100%', padding: '12px 17px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'auto'}} role="presentation">
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconsButtons Icon={CloseIcon} />
                </Box>
                <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: '30px', lineHeight: '0.7', paddingBottom: '24px' }}>
                    Archive
                </Typography>

                <Divider sx={{ marginBottom: '20px' }} />
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Search sx={{
                            border: '1px solid #F4F4F4',
                            margin: '0', '@media (min-width: 600px)': {
                                margin: '0'
                            }
                        }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Box>
                    <Box sx={{height: '78vh', overflow: 'auto'}}>
                        
                        <Box>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.</Box>
                        <Box>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.</Box>
                        <Box>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.</Box>
                        <Box>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.</Box>
                        <Box>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.</Box>
                        <Box>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.</Box>
                        <Box>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.</Box>
                        <Box>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.</Box>
                        <Box>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.</Box>
                        <Box>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.</Box>

                        <Box>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.</Box>

                        <Box>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.</Box>

                        <Box>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.</Box>

                    </Box>
                </Box>

            </Box>
            <Box>
                <Divider sx={{ marginBottom: '8px' }} />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button sx={{ color: '#9A9A9A' }}>
                        <Typography sx={{ textTransform: 'none' }}>
                            Delete all
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ position: 'absolute', zIndex: 1, top: 0, right: 0, left: 0 }}>
            <Drawer sx={{ '& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop': { cursor: 'pointer' } }} anchor="left" open={isOpen} onClose={() => toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Box>
    );
}