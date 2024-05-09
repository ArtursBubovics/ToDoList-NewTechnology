import { Box,Paper,Typography } from "@mui/material"
import { RegularButtons } from "../../../common/Buttons/RegularButtons/RegularButtons"

export const ArchiveBlock = ({ text }: { text: string }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <Paper sx={{ width: '95%', height: '90%', marginBottom: '15px', marginTop: '5px', padding: '18px 18px 10px', fontSize: '18px' }} elevation={2}>
            <Typography sx={{ fontSize: '18px', paddingBottom: '5px' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.
                {text}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '90%' }}>
                <RegularButtons sx={{ padding: '3px', fontSize: '13px' }}>
                    Вернуть
                </RegularButtons>
                <RegularButtons sx={{ padding: '3px', fontSize: '13px' }}>
                    Удалить
                </RegularButtons>
            </Box>
        </Paper>
    </Box>
    )
}