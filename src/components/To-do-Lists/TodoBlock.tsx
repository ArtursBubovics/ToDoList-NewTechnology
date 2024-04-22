import React from 'react';

import Box from '@mui/material/Box';
import MainMenu from '../MainMenu/MainMenu';

import { useSelector } from 'react-redux';
import { IMenuState } from '../../Models/IMenuState';
import TodoLists from './TodoLists/TodoLists';
import HeaderContainer from '../Header/HeaderContainer/HeaderContainer';

const TodoBlock = () => {

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
                <Box>
                    <HeaderContainer />
                    <TodoLists />
                </Box>
            </Box>
        </Box>
    )
}

export default TodoBlock