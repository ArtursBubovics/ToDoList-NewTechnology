import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box"
import { useState } from 'react';
import FieldsIcons from './FieldsIcons/FieldsIcons';

const TodoField = () => {

    const [isHoverField, updateHoverField] = useState(false)

    const changeHoverField = () => {
        updateHoverField(!isHoverField)
    }

    return (
        <Box sx={{ paddingBottom: '20px', '&:last-child': { paddingBottom: '0' } }} onMouseEnter={changeHoverField} onMouseLeave={changeHoverField}>
            <Box sx={{ width: '100%', minHeight: '50px', display: 'flex', padding: '7px 20px 5px 2%', border: '2px solid #D8D8D8', borderRadius: '30px' }}>
                <Box sx={{ width: '3%', display: 'flex', alignItems: 'center', borderRight: '2px solid #C3C3C3', paddingRight: '1.5%' }}>
                    <Checkbox sx={{ width: '16px', height: '16px' }} />
                </Box>
                <Box sx={{ width: '92%', padding: '0% 2%' }}>
                    <input type='text' style={{ width: '100%', height: '100%', border: 'none', outline: 'none', fontSize: '20px', backgroundColor: '#FFFFFF', paddingTop: '2.2px', textOverflow: 'ellipsis' }}></input>
                </Box>
                {isHoverField && (
                    <Box sx={{ width: '5%', display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center', minwidth: '0' }}>

                        <FieldsIcons title="Increase field" imgPath="assets/images/loupeIcon.png"></FieldsIcons>

                        <FieldsIcons title="Add in archive" imgPath="assets/images/deleteIcon.png"></FieldsIcons>

                    </Box>
                )}
            </Box>
        </Box >
    )

}

export default TodoField