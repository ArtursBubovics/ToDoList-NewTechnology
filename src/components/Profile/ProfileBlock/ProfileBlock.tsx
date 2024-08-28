import { Box, Button } from "@mui/material"
import CustomTextField from "../../../common/InputFields/CustomTextField"

const Profile = () => {
    return (
        <Box sx={{ width: '100%', height: '90vh', padding: '3% 5%' }}>
            <Box sx={{ width: '100%', height: '35%', display: 'flex', gap: '3%' }}>
                <Button sx={{
                    minWidth: '300px', height: '100%', padding: '2%', border: '1px solid #D6D6D6', borderRadius: '25px', justifyContent: 'flex-end',
                    alignItems: 'flex-start'
                }}>
                    <Box sx={{ height: '13%', display: 'flex', justifyContent: 'flex-end' }}>
                        <img src="/assets/images/addImage_Icon.png" alt="" />
                    </Box>
                </Button>
                <Box sx={{ width: '100%', height: '65%' }}>
                    <Box sx={{ width: '100%', height: '100%', border: '1px solid #D6D6D6', borderRadius: '25px', padding: '5%', display: 'flex', gap: '3%' }}>

                        <CustomTextField
                            noBorder={false}
                            value=''
                            label='Name'
                            variant='outlined'
                            size='medium'
                        />

                        <CustomTextField
                            noBorder={false}
                            value=''
                            label='Gmail'
                            variant='outlined'
                            size='medium'
                        />

                        <CustomTextField
                            noBorder={false}
                            value=''
                            label='Password'
                            variant='outlined'
                            size='medium'
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Profile;