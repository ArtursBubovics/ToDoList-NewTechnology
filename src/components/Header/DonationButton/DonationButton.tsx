import { Box, Button, Typography } from "@mui/material"

const DonationButton = () => {
    return <Button sx={{
        display: 'flex', gap: '10px', alignItems: 'center', padding: '6px 12px 6px', color: '#A9A9A9', backgroundColor: '#FAFAFA', borderRadius: '7px', border: '1px solid #EBEBEB', textTransform: 'none', '&:hover': {
            backgroundColor: '#F5F5F5'
        }
    }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="assets/images/donate_icon.png" alt="" />
        </Box>
        <Typography sx={{ fontSize: '17px', fontWeight: 400, color: '#A9A9A9', paddingTop: '2px' }} >
            Support our project with a coin
        </Typography>
    </Button>
}

export default DonationButton;