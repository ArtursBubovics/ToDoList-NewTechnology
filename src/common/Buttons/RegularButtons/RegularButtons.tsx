import { Button, ButtonProps } from "@mui/material";
import { SxProps } from "@mui/system";

interface RegularButtonsProps extends ButtonProps {
    children: React.ReactNode;
    sx?: SxProps;
}

export const RegularButtons: React.FC<RegularButtonsProps> = ({ children, sx }) => {

    return (
        <Button sx={{
            padding: '0',
            minWidth: '0',
            color: '#C3C3C3',
            textTransform: 'none',
            '&:hover': {
                backgroundColor: '#F5F5F5'
            },
            ...sx
        }}>
            {children}
        </Button>
    )
}