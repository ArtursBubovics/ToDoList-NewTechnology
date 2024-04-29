import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setArchiveValue } from '../../ReduxToolkit/Reducers/archive-reducer';
import { IArchiveState } from '../../Models/Interfaces/IArchiveState';

export default function TemporaryDrawer() {

    const dispatch = useDispatch();

    const toggleDrawer = () => () => {
        dispatch(setArchiveValue());
    };

    interface RootState {
        archive: IArchiveState;
    }


    const isOpen = useSelector((state: RootState) => state.archive.isOpen);

    const DrawerList = (
        <Box sx={{ width: 240, padding: '5px 8px' }} role="presentation" onClick={toggleDrawer}>
            <Typography variant='h5'>
                Archive
            </Typography>
            <Divider />

        </Box>
    );

    return (
        <Box sx={{ position: 'absolute', zIndex: 1, top: 0, right: 0, left: 0 }}>
            <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
                {DrawerList}
            </Drawer>
        </Box>
    );
}