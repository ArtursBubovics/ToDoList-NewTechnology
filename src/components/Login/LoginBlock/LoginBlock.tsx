import Box from "@mui/material/Box"
import { FormControl, Typography, InputLabel, OutlinedInput, InputAdornment, IconButton, Checkbox } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import CustomTextField from "../../../common/InputFields/CustomTextField";

interface LoginBlockProps {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const LoginBlock: React.FC<LoginBlockProps> = ({ name, setName, password, setPassword }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        <Box>
            <Box>
                <CustomTextField
                    backgroundColor='#F9F9F9'
                    noBorder={true}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label='Name'
                    variant='outlined'
                    size='medium'
                    name="username"
                    autoComplete="username"
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
                        defaultValue={password}
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
                        name="password"  // Уникальное значение для идентификации
                        autoComplete="current-password"
                    />
                </FormControl>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '1% 3%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Box>
                        <Checkbox size="small" sx={{
                            padding: '0',
                            color: '#B1B1B1'
                        }} />
                    </Box>
                    <Typography sx={{ paddingTop: '3px', fontSize: '13px', color: '#B1B1B1' }}>
                        Remember Me
                    </Typography>
                </Box>
                <Typography sx={{ fontSize: '13px', cursor: 'pointer', color: '#6BA9D6' }}>
                    Forgot Password?
                </Typography>
            </Box>
        </Box>
    )
}

export default LoginBlock;