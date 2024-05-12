import { Box, Drawer, Typography, Divider } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { setNotficationOpenValue } from '../../ReduxToolkit/Reducers/headerMenu-reducer';
import { IHeaderMenuState } from "../../Models/Interfaces/IHeaderMenuState";

import { IconsButtons } from "../../common/Buttons/IconsButtons/IconsButtons";
import CloseIcon from '@mui/icons-material/Close';
import { NotificationFieldsBlock } from "./NotificationFieldsBlock/NotificationFieldsBlock";

interface NotificationProps {
    isNew: boolean;
    data: string;
    title: string;
    text: string;
}



export default function Notification() {

    const props: NotificationProps = {
        isNew: true,
        data: '12.05.2024',
        title: `Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit. 
        SuspendisseLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.`
      };

    const dispatch = useDispatch();

    const toggleDrawer = (value: boolean) => {
        dispatch(setNotficationOpenValue(value))
    }

    interface RootState {
        headerMenu: IHeaderMenuState;
    }

    const isOpen = useSelector((state: RootState) => state.headerMenu.isNotificationOpen);
    console.log(isOpen);

    const DrawerNotificationList = (

        <Box sx={{ width: '100%', height: 550 }}>
            <Box sx={{ width: '100%', height: 490, overflow: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '1% 1% 0 0' }}>
                    <IconsButtons Icon={CloseIcon} />
                </Box>
                <Box sx={{ padding: '0 45px 50px' }}>
                    <Box>
                        <Typography sx={{ fontSize: '30px', padding: '0px 0px 6px 25px' }}>Notifications</Typography>
                        <Divider />
                    </Box>

                    <Box sx={{ padding: '20px 5px' }}>
                        <NotificationFieldsBlock props={props} />
                        <NotificationFieldsBlock props={props}/>
                    </Box>
                </Box>

            </Box>
        </Box>
    )

    return (
        <Box sx={{ position: 'absolute', zIndex: 1, top: 0, right: 0, left: 0 }}>
            <Drawer sx={{ '& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop': { cursor: 'pointer' } }} anchor="top" open={isOpen} onClose={() => toggleDrawer(false)}>
                {DrawerNotificationList}
            </Drawer>
        </Box>
    )
}