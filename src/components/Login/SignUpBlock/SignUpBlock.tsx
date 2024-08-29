import Box from "@mui/material/Box"
import CustomTextField from "../../../common/InputFields/CustomTextField";
import PasswordCustomTextField from "../../../common/InputFields/PasswordCustomTextField";

interface SignUpBlockProps {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    gmail: string;
    setGmail: React.Dispatch<React.SetStateAction<string>>;
}

const SignUpBlock: React.FC<SignUpBlockProps> = ({ name, setName, password, setPassword, gmail, setGmail }) => {

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

            <PasswordCustomTextField
                value={password}
                setPassword={setPassword}
                autoComplete="new-password"
            />

        </Box>
    )
}

export default SignUpBlock;