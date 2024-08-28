import { Button } from "@mui/material";

interface IconsButtonsProps {
    Icon: React.ComponentType<any>;
}


 const IconsButtons: React.FC<IconsButtonsProps> = ({ Icon }) => {
    return (
        <Button sx={{
            padding: '0',
            minWidth: '0',
            color: '#C3C3C3',
            '&:hover': {
                backgroundColor: '#F5F5F5'
            }
        }}>
            <Icon />
        </Button>
    )
}

export default IconsButtons;