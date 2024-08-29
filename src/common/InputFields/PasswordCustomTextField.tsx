import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";



interface PasswordCustomTextFieldProps {
    value: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    autoComplete: string;
}

const PasswordCustomTextField: React.FC<PasswordCustomTextFieldProps> = ({ value, setPassword, autoComplete }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }


    return <FormControl sx={{
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
            defaultValue={value}
            onChange={(e) => setPassword(e.target.value)}
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
            name="password"
            autoComplete={autoComplete}
        />
    </FormControl>
}

export default PasswordCustomTextField;