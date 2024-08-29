import Box from "@mui/material/Box"
import { Typography, Checkbox } from "@mui/material"
import CustomTextField from "../../../common/InputFields/CustomTextField";
import PasswordCustomTextField from "../../../common/InputFields/PasswordCustomTextField";

interface LoginBlockProps {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const LoginBlock: React.FC<LoginBlockProps> = ({ name, setName, password, setPassword }) => {

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

                <PasswordCustomTextField
                    value={password}
                    setPassword={setPassword}
                    autoComplete="current-password"
                />
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