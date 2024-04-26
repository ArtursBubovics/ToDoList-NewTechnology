import Box from "@mui/material/Box"
import { IconBlock } from "../IconsBlocks/IconBlock"
import { Typography, Button } from "@mui/material"
import { LoginBlock } from "../LoginBlock/LoginBlock";
import { SignUpBlock } from "../SignUpBlock/SignUpBlock";
import { AuthType } from "../../../Models/Enums/AuthEnum";

interface AuthFormBlockProps {
    authType: AuthType;
}

export const AuthFormBlock: React.FC<AuthFormBlockProps> = ({ authType }) => {
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
                            {authType === AuthType.Login ? "Don't have an account yet?" : "Already created an account?"}
                        </Typography>
                        <Typography sx={{ cursor: 'pointer', textDecoration: 'underline', color: '#454545' }}>
                            {authType === AuthType.Login ? "Sign up" : "Login"}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ padding: '3% 7%' }}>

                        {authType === AuthType.Login ? <LoginBlock /> : <SignUpBlock />}

                        <Box sx={{ padding: authType === AuthType.SignUp ? '5% 10%'  : '3% 10%' }}>
                            <Button variant="contained" disableElevation sx={{
                                width: '80%', height: '28px', borderRadius: '30px', color: '#B1B1B1', backgroundColor: '#F9F9F9', textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#FBFBFB'
                                }
                            }}>
                                {authType === AuthType.Login ? "Login" : "Sign up"}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}