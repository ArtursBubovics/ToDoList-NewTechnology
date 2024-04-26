import Box from "@mui/material/Box"
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { CustomTextField } from "../../../common/InputFields/CustomTextField";

export const SignUpBlock = () => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        <Box>
            <CustomTextField
                backgroundColor='#F9F9F9'
                noBorder={true}
                value=''
                label='Name'
                variant='outlined'
                size='medium'
            />

            <CustomTextField
                backgroundColor='#F9F9F9'
                noBorder={true}
                value=''
                label='Gmail'
                variant='outlined'
                size='medium'
            />

            <FormControl sx={{
                m: 1, width: '100%', margin: '0px',
                backgroundColor: '#F9F9F9',
                '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
                    padding: '10.5px 16px'
                },
                "& fieldset": { border: 'none' }
            }} variant="outlined" size="medium">
                <InputLabel htmlFor="outlined-adornment-password" sx={{
                    marginTop: '-5px',
                }}>Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
        </Box>
    )
}