import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import SendIcon from '@mui/icons-material/Send';
import TodoField from "./TodoFields/TodoField";

const TodoLists = () => {

    const [enterValue, setEnterValue] = useState('')

    const handleEnterValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEnterValue(event.target.value)
    }

    const handleEnterValueSubmit = () => {
        console.log(enterValue)
    }

    const handleEnterValueKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log(enterValue)
        }
    };

    return (
        <Box sx={{ height: '90%', margin: '15px 50px', padding: '2% 2%', borderRadius: '15px' }}>
            <Box sx={{ marginBottom: '15px', paddingRight: '20px', maxHeight: '75vh', overflow: 'auto' }}>
                <TodoField />
                <TodoField />
                <TodoField />
                <TodoField />
                <TodoField />
                <TodoField />
                <TodoField />
                <TodoField />
            </Box>
            <Box>
                <Box sx={{ width: '90%', height: '45px', display: 'flex', marginLeft: '3%', padding: '7px 10px 5px 4%', border: '2px solid #D8D8D8', borderRadius: '30px' }}>
                    <Box sx={{ borderRight: '2px solid #C3C3C3' }}></Box>
                    <Box sx={{ width: '95%', padding: '0% 2%' }}>
                        <input type="text" placeholder="ENTER YOUR TASK HERE" value={enterValue} onChange={handleEnterValueChange} onKeyPress={handleEnterValueKeyPress} style={{ width: '100%', height: '100%', border: 'none', outline: 'none', backgroundColor: '#FFFFFF', fontSize: '18px', paddingTop: '2.2px' }} />
                    </Box>
                    <Box sx={{ padding: '2px 2px' }}>
                        <Button variant="outlined" onClick={handleEnterValueSubmit} sx={{
                            width: '80px', height: '25px', borderRadius: '30px', color: '#A9A9A9', border: '1px solid #CBCBCB', '&:hover': {
                                borderColor: '#A0A0A0',
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #A9A9A9'
                            }
                        }} endIcon={<SendIcon sx={{ width: '15px', height: '15px' }} />}><Typography style={{ display: 'flex', width: 'auto', justifyContent: 'center', marginRight: '-5px', fontSize: '13px' }}>SEND</Typography></Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default TodoLists