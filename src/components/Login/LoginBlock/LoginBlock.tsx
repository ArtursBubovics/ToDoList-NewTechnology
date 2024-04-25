import Box from "@mui/material/Box"
import { IconBlock } from "../IconsBlocks/IconBlock"
import { FormControl, Typography, InputLabel, OutlinedInput, InputAdornment, IconButton, Checkbox, Button } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { CustomTextField } from "../../../common/InputFields/CustomTextField";

export const LoginBlock = () => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        <Box sx={{ width: '100%', height: '100%', padding: '5px 7% 15px' }}>
            <Box sx={{ width: '100%', height: '12%', display: 'flex', justifyContent: 'center' }}>
                <Box sx={{
                    width: '70%', height: '100%', display: 'flex', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', backgroundColor: '#E6E6E6', padding: '0px 10px',
                    justifyContent: 'center', alignItems: 'center', gap: '25px'
                }}>
                    <IconBlock imgPath={"/assets/images/google_icon.png"} />
                    <IconBlock imgPath={"/assets/images/facebook_icon.png"} />
                    <IconBlock imgPath={"/assets/images/twitter_icon.png"} />
                    <IconBlock imgPath={"/assets/images/telegram_icon.png"} />
                    <IconBlock imgPath={"/assets/images/instagram_icon.png"} />
                </Box>
            </Box>
            <Box sx={{ paddingTop: '20px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/assets/images/Logo.png" alt="" />
                        </Box>
                        <Typography sx={{ fontWeight: '500', fontSize: '35px' }}>
                            YoloDo
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', paddingTop: '3px' }}>
                        <Typography sx={{ color: '#CCCCCC' }}>
                            Don't have an account yet?
                        </Typography>
                        <Typography sx={{ cursor: 'pointer', textDecoration: 'underline', color: '#454545' }}>
                            Sign up
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ padding: '3% 7%' }}>
                        <Box>
                            <CustomTextField
                                backgroundColor='#F9F9F9'
                                noBorder={true}
                                value=''
                                label='Name'
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
                        <Box sx={{ padding: '3% 10%' }}>
                            <Button variant="contained" disableElevation sx={{
                                width: '80%', height: '28px', borderRadius: '30px', color: '#B1B1B1', backgroundColor: '#F9F9F9', textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#FBFBFB'
                                }
                            }}>
                                Login
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}