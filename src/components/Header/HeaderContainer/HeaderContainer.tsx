import React, { useState } from 'react';
import Header from '../Header';

const HeaderContainer: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return <Header anchorEl={anchorEl} handleClick={handleClick} handleClose={handleClose}/>
};

export default HeaderContainer;