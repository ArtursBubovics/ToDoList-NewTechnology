import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import {Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setArchiveValue } from '../../ReduxToolkit/Reducers/archive-reducer';
import { IArchiveState } from '../../Models/Interfaces/IArchiveState';

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
        <Box sx={{ width: 320, padding: '5px 17px' }} role="presentation">
            <Box sx={{ display: 'flex'}}>
                <Typography sx={{ padding: '10px 0px 5px 15px', fontSize: '30px' }}>
                    Archive
                </Typography>
            </Box>
            <Divider />

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