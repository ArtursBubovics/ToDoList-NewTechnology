import React from 'react';

import Box from '@mui/material/Box';
import MenuHeaderPageBlock from '../../common/MenuHeaderPageBlock/MenuHeaderPageBlock';
import Profile from './ProfileBlock/ProfileBlock';

const ProfileBlock = () => {

    return (
        <Box>
            <MenuHeaderPageBlock PageBlock={Profile}/>
        </Box>
    )
}

export default ProfileBlock