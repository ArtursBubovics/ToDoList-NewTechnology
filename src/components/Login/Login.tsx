import { Box } from "@mui/material"
import { ParticleComponent } from "./Particles/particle"
import { AuthFormBlock } from "./AuthFormBlock/AuthFormBlock"
import { AuthType } from "../../Models/Enums/AuthEnum"
import { useLocation } from "react-router-dom";



export const Login = () => {

    const location = useLocation();

    const authType = location.pathname === "/SignUp" ? AuthType.SignUp : AuthType.Login;

    return (
        <Box>
            <Box sx={{ height: '100vh', display: 'flex' }}>
                <Box sx={{ width: '60%', height: '99%' }}>
                    <ParticleComponent />
                </Box>
                <Box sx={{ width: '40%', backgroundColor: '#D9D9D9', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '150px' }}>
                    <Box sx={{ width: '70%', height: authType === AuthType.SignUp ? '55%' : '48%', backgroundColor: '#FFFFFF', borderRadius: '32px' }}>
                        <AuthFormBlock authType={authType}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}