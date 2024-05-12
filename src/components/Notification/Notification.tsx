import { Box, Drawer, Accordion, AccordionSummary, AccordionDetails, Typography, Divider } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { setNotficationOpenValue } from '../../ReduxToolkit/Reducers/headerMenu-reducer';
import { IHeaderMenuState } from "../../Models/Interfaces/IHeaderMenuState";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { IconsButtons } from "../../common/Buttons/IconsButtons/IconsButtons";
import CloseIcon from '@mui/icons-material/Close';

export default function Notification() {

    const dispatch = useDispatch();

    const toggleDrawer = (value: boolean) => {
        dispatch(setNotficationOpenValue(value))
    }

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    interface RootState {
        headerMenu: IHeaderMenuState;
    }

    const isOpen = useSelector((state: RootState) => state.headerMenu.isNotificationOpen);
    console.log(isOpen);

    const DrawerNotificationList = (

        <Box sx={{ width: '100%', height: 550 }}>
            <Box sx={{ width: '100%', height: 490, overflow: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end',padding: '1% 1% 0 0' }}>
                    <IconsButtons Icon={CloseIcon} />
                </Box>
                <Box sx={{padding: '0 45px 50px'}}>
                    <Box>
                        <Typography sx={{ fontSize: '30px', padding: '0px 0px 6px 25px' }}>Notifications</Typography>
                        <Divider />
                    </Box>

                    <Box sx={{ padding: '20px 5px' }}>
                        <Box sx={{ paddingBottom: '20px' }}>
                            <Box sx={{ padding: '0px 0px 10px 25px' }}>
                                <Typography sx={{ fontSize: '20px', paddingLeft: '16px' }}>12.05.2024</Typography>
                                <Divider />
                            </Box>
                            <Box sx={{ padding: '0px 35px' }}>
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                    <AccordionSummary aria-controls='panel1-content' id='panel1-header' expandIcon={<ExpandMoreIcon />} sx={{ '& .css-eqpfi5-MuiAccordionSummary-content': { justifyContent: 'space-between', gap: '10px' }, '& .css-eqpfi5-MuiAccordionSummary-content.Mui-expanded': { margin: '12px 0' } }}>
                                        <Typography sx={{ fontSize: '18px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit. SuspendisseLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit. SuspendisseLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit. SuspendisseLorem ipsum dolor sit amet, consectetur adipiscing elit</Typography>
                                        <Box sx={{ display: 'flex', paddingRight: '10px', alignItems: 'center' }}>
                                            <Divider orientation="vertical"></Divider>
                                            <Typography sx={{ fontSize: '18px', padding: '0px 10px', color: 'green' }}>New</Typography>
                                            <Divider orientation="vertical"></Divider>
                                        </Box>
                                    </AccordionSummary>
                                    <Divider sx={{ margin: '0 5px' }} />
                                    <AccordionDetails sx={{ padding: '18px 16px' }}>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                    <AccordionSummary aria-controls='panel2-content' id='panel2-header' expandIcon={<ExpandMoreIcon />} sx={{ '& .css-eqpfi5-MuiAccordionSummary-content': { justifyContent: 'space-between', gap: '10px' }, '& .css-eqpfi5-MuiAccordionSummary-content.Mui-expanded': { margin: '12px 0' } }}>
                                        <Typography sx={{ fontSize: '18px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit. SuspendisseLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit. SuspendisseLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit. SuspendisseLorem ipsum dolor sit amet, consectetur adipiscing elit</Typography>
                                        <Box sx={{ display: 'flex', paddingRight: '10px', alignItems: 'center' }}>
                                            <Divider orientation="vertical"></Divider>
                                            <Typography sx={{ fontSize: '18px', padding: '0px 10px', color: 'green' }}>New</Typography>
                                            <Divider orientation="vertical"></Divider>
                                        </Box>
                                    </AccordionSummary>
                                    <Divider sx={{ margin: '0 5px' }} />
                                    <AccordionDetails sx={{ padding: '18px 16px' }}>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{ padding: '0px 0px 10px 25px' }}>
                                <Typography sx={{ fontSize: '20px', paddingLeft: '16px' }}>12.05.2024</Typography>
                                <Divider />
                            </Box>
                            <Box sx={{ padding: '0px 35px' }}>
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                    <AccordionSummary aria-controls='panel1-content' id='panel1-header' expandIcon={<ExpandMoreIcon />} sx={{ '& .css-eqpfi5-MuiAccordionSummary-content': { justifyContent: 'space-between', gap: '10px' }, '& .css-eqpfi5-MuiAccordionSummary-content.Mui-expanded': { margin: '12px 0' } }}>
                                        <Typography sx={{ fontSize: '18px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit. SuspendisseLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit. SuspendisseLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit. SuspendisseLorem ipsum dolor sit amet, consectetur adipiscing elit</Typography>
                                        <Box sx={{ display: 'flex', paddingRight: '10px', alignItems: 'center' }}>
                                            <Divider orientation="vertical"></Divider>
                                            <Typography sx={{ fontSize: '18px', padding: '0px 10px', color: 'green' }}>New</Typography>
                                            <Divider orientation="vertical"></Divider>
                                        </Box>
                                    </AccordionSummary>
                                    <Divider sx={{ margin: '0 5px' }} />
                                    <AccordionDetails sx={{ padding: '18px 16px' }}>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                    <AccordionSummary aria-controls='panel2-content' id='panel2-header' expandIcon={<ExpandMoreIcon />} sx={{ '& .css-eqpfi5-MuiAccordionSummary-content': { justifyContent: 'space-between', gap: '10px' }, '& .css-eqpfi5-MuiAccordionSummary-content.Mui-expanded': { margin: '12px 0' } }}>
                                        <Typography sx={{ fontSize: '18px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit. SuspendisseLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit. SuspendisseLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit. SuspendisseLorem ipsum dolor sit amet, consectetur adipiscing elit</Typography>
                                        <Box sx={{ display: 'flex', paddingRight: '10px', alignItems: 'center' }}>
                                            <Divider orientation="vertical"></Divider>
                                            <Typography sx={{ fontSize: '18px', padding: '0px 10px', color: 'green' }}>New</Typography>
                                            <Divider orientation="vertical"></Divider>
                                        </Box>
                                    </AccordionSummary>
                                    <Divider sx={{ margin: '0 5px' }} />
                                    <AccordionDetails sx={{ padding: '18px 16px' }}>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </Box>
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