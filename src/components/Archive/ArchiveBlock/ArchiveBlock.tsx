import { Box,Paper,Typography,Divider } from "@mui/material"
import RegularButtons from "../../../common/Buttons/RegularButtons/RegularButtons"

const ArchiveBlock = ({ text }: { text: string }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <Paper sx={{ width: '95%', height: '90%', marginBottom: '15px', marginTop: '5px', padding: '18px 18px 8px', fontSize: '18px' }} elevation={2}>
            <Typography sx={{ fontSize: '18px', paddingBottom: '10px' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.
                {text}
            </Typography>
            <Divider/>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '90%', paddingTop: '8px' }}>
                <RegularButtons sx={{ padding: '3px', fontSize: '13px' }}>
                    Return
                </RegularButtons>
                <RegularButtons sx={{ padding: '3px', fontSize: '13px' }}>
                    Delete
                </RegularButtons>
            </Box>
        </Paper>
    </Box>
    )
}

export default ArchiveBlock;