import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IMainMenuIconProps } from '../../../Models/IMainMenuIconProps';



const MainMenuIcon: React.FC<IMainMenuIconProps> = (props) => {
    return (
        <Box sx={{paddingBottom: props.isOpen ? '12%' : '43%', '&:last-child': { paddingBottom: props.isOpen ? '12%' : '12%' } }}>
            <Box sx={{ display: 'flex', justifyContent: props.isOpen ? 'flex-start' : 'center', cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={props.imgPath} alt="" />
                </Box>
                {
                    props.isOpen && (
                        <Typography sx={{ display: 'flex', alignItems: 'center', padding: '2px 0 0 10px', fontSize: '1.2rem', color: '#9F9F9F' }}>
                            {props.text}
                        </Typography>
                    )
                }
            </Box>
        </Box>

    )
}

export default MainMenuIcon 