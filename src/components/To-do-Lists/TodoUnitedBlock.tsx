import React from 'react';

import Box from '@mui/material/Box';

import MenuHeaderPageBlock from '../../common/MenuHeaderPageBlock/MenuHeaderPageBlock';
import TodoLists from './TodoListsBlock/TodoListsBlock';

const TodoBlock = () => {

    return (
        <Box>
            <MenuHeaderPageBlock PageBlock={TodoLists}/>
        </Box>
    )
}

export default TodoBlock