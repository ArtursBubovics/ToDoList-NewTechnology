import { Box } from "@mui/material"
import { ParticleComponent } from "./test/particle"

export const Login = () => {
    return (
        <Box sx={{ height: '100vh', display: 'flex' }}>
            <Box sx={{ width: '65%', height: '100%' }}>
                <ParticleComponent />
            </Box>
            <Box sx={{ width: '35%', backgroundColor: '#D9D9D9' }}>
                
            </Box>
        </Box>


    )
}