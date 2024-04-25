import React from 'react';

import Box from '@mui/material/Box';

import { useSelector } from 'react-redux';
import { IMenuState } from '../../Models/IMenuState';
import HeaderContainer from '../../components/Header/HeaderContainer/HeaderContainer';
import MainMenu from '../../components/MainMenu/MainMenu';

interface PageBlockProps {
    PageBlock: React.FC;
}

const MenuHeaderPageBlock: React.FC<PageBlockProps> = ({ PageBlock }) => {

    interface RootState {
        menu: IMenuState;
    }

    const isOpen = useSelector((state: RootState) => state.menu.isOpen);

    return (
        <Box sx={{ height: '100vh', display: 'flex' }}>
            <Box sx={{ flex: isOpen ? '1.5' : '0.5', borderRight: '2px solid #EBEBEB', padding: '18px 8px 18px 8px' }}>
                <MainMenu />
            </Box>
            <Box style={{ flex: isOpen ? '10.5' : '11.5' }}>
                <HeaderContainer />
                <PageBlock />
            </Box>
        </Box>
    )
}

export default MenuHeaderPageBlock