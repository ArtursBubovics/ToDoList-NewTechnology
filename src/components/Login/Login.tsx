import { Box } from "@mui/material"
import { ParticleComponent } from "./Particles/particle"
import { LoginBlock } from "./LoginBlock/LoginBlock"

export const Login = () => {
    return (
        <Box sx={{ height: '100vh', display: 'flex' }}>
            <Box sx={{ width: '60%', height: '99%' }}>
                <ParticleComponent />
            </Box>
            <Box sx={{ width: '40%', backgroundColor: '#D9D9D9', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '150px' }}>
                <Box sx={{ width: '70%', height: '45%', backgroundColor: '#FFFFFF', borderRadius: '32px' }}>
                    <LoginBlock />
                </Box>
            </Box>
        </Box>


    )
}