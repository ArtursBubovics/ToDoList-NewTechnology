import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MainMenuIcon from './MainMenuIcon/MainMenuIcon';
import { IMenuState } from '../../Models/IMenuState';
import { useSelector, useDispatch } from 'react-redux';
import { setMenuSize } from '../../ReduxToolkit/Reducers/menu-reducer';

const MainMenu = () => {

    interface RootState {
        menu: IMenuState;
    }

    const isOpen = useSelector((state: RootState) => state.menu.isOpen);
    const dispatch = useDispatch();

    const [isActiveHoverBtn, setIsActiveHoverBtn] = useState(false);

    const toggleMenu = () => {//MainMenuContainer
        dispatch(setMenuSize());
        setIsActiveHoverBtn(false)
    };

    const hoverMenuBtn = () => { //MainMenuContainer
        setTimeout(() => {
            setIsActiveHoverBtn(!isActiveHoverBtn);
        }, 300);
    };

    return (
        <Box sx={{ height: '100%', display: !isOpen ? 'flex' : 'initial', justifyContent: !isOpen ? 'space-around' : 'initial' }}>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', paddingLeft: isOpen ? '5px' : '', paddingBottom: '8px', borderBottom: '2px solid #EBEBEB' }}>

                    <Box sx={{ display: 'flex' }}>

                        <Box><img src="assets/images/Logo.png" alt="" /></Box>

                        {isOpen && (
                            <Box >
                                <Typography variant="body1" fontWeight="bold">
                                    YoloDo
                                </Typography>
                                <Box>live effectively</Box>
                            </Box>)}

                    </Box>

                    {isOpen && (<Box onClick={toggleMenu} sx={{ cursor: 'pointer' }}><img src="assets/images/close_arrow.png" alt="" /></Box>)}

                </Box>

                <Box sx={{ padding: isOpen ? '11% 12% 0% 17%' : '26% 20% 16% 20%' }}>
                    <MainMenuIcon imgPath="assets/images/ToDoIcon.png" text="To-do lists" isOpen={isOpen} />
                    <MainMenuIcon imgPath="assets/images/ProfileIcon.png" text="Profile" isOpen={isOpen} />
                </Box>
                <Box sx={{ paddingLeft: '20px', paddingRight: '30px' }}>
                    <Box sx={{ borderBottom: '2px solid #EBEBEB', width: '100%' }}></Box>
                    <Box sx={{ marginLeft: '20px', marginTop: '10px', marginRight: '40px', borderBottom: '2px solid #EBEBEB', width: '50%' }}></Box>
                </Box>
                <Box sx={{ padding: isOpen ? '10% 11% 0% 16%' : '29% 16% 0% 19%' }}>
                    <MainMenuIcon imgPath="assets/images/LogOutIcon.png" text="Log out" isOpen={isOpen} />
                </Box>
            </Box>
            <Box>
                {!isOpen && (<Box sx={{ display: 'flex', width: isActiveHoverBtn ? '20px' : '10px', height: '45%', alignItems: 'flex-end' }}>

                    {!isActiveHoverBtn && (<Box sx={{ width: '35%', height: '8%', borderRadius: '4px', backgroundColor: '#D9D9D9' }} onMouseEnter={hoverMenuBtn}></Box>)}

                    {isActiveHoverBtn && (
                        <Box sx={{
                            width: '75%', height: '8%', borderRadius: '4px', backgroundColor: 'white', border: '1px solid #D9D9D9', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', cursor: 'pointer'
                        }} onMouseLeave={hoverMenuBtn} onClick={toggleMenu}>
                            <img style={{ opacity: 0.5 }} src="assets/images/right_arrow.png" alt="" />
                        </Box>)}

                </Box>)}
            </Box>
        </Box>
    )
}

export default MainMenu;