import Box from "@mui/material/Box"
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import CustomTextField from "../../../common/InputFields/CustomTextField";

interface SignUpBlockProps {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    gmail: string;
    setGmail: React.Dispatch<React.SetStateAction<string>>;
}

const SignUpBlock: React.FC<SignUpBlockProps> = ({ name, setName, password, setPassword, gmail, setGmail }) => {

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
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                label='Name'
                variant='outlined'
                size='medium'
                name="username"
                autoComplete="new-username"
            />

            <CustomTextField
                backgroundColor='#F9F9F9'
                noBorder={true}
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
                label='Gmail'
                variant='outlined'
                size='medium'
                name="email"
                autoComplete="email"
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
                    name="password"
                    autoComplete="new-password"
                />
            </FormControl>
        </Box>
    )
}

export default SignUpBlock;