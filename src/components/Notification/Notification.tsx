import { Box, Drawer, List, ListItem } from "@mui/material"

export const Notification = () => {
    return (
        <Box sx={{ position: 'absolute', zIndex: 1, top: 0, right: 0, left: 0 }}>
            <Drawer sx={{ '& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop': { cursor: 'pointer' } }} anchor="top" >
                <List sx={{width: '100%', height: 120}}>
                    <ListItem></ListItem>
                </List>
            </Drawer>
        </Box>
    )
}