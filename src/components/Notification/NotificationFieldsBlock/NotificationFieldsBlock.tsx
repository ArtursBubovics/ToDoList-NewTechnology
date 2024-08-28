import { Box, Typography, Divider } from "@mui/material"
import NotificationField from "./NotificationFields/NotificationField"

interface NotificationProps {
    props: {
        isNew: boolean;
        data: string;
        title: string;
        text: string;
    }
}

const NotificationFieldsBlock: React.FC<NotificationProps> = ({props}) => {
    return (
        <Box sx={{ '&:not(:last-child)': { paddingBottom: '20px' } }}>
            <Box sx={{ padding: '0px 0px 10px 25px' }}>
                <Typography sx={{ fontSize: '20px', paddingLeft: '16px' }}>{props.data}</Typography>
                <Divider />
            </Box>
            <Box sx={{ padding: '0px 35px' }}>
                <NotificationField isNew={props.isNew} title={props.title} text={props.text}/>
            </Box>
        </Box>
    )
}

export default NotificationFieldsBlock;