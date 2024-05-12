import { Accordion, AccordionSummary, Typography, Box, Divider, AccordionDetails } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";

interface MyComponentProps {
    isNew: boolean;
    title: string;
    text: string;
}

export const NotificationField: React.FC<MyComponentProps> = ({ isNew, title, text }) => {

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls='panel1-content' id='panel1-header' expandIcon={<ExpandMoreIcon />} sx={{ '& .css-eqpfi5-MuiAccordionSummary-content': { justifyContent: 'space-between', gap: '10px' }, '& .css-eqpfi5-MuiAccordionSummary-content.Mui-expanded': { margin: '12px 0' } }}>
                <Typography sx={{ fontSize: '18px', paddingRight: '10px' }}>{title}</Typography>
                {isNew &&
                    <Box sx={{ display: 'flex', paddingRight: '10px', alignItems: 'center' }}>
                        <Divider orientation="vertical"></Divider>
                        <Typography sx={{ fontSize: '18px', padding: '0px 10px', color: 'green' }}>New</Typography>
                        <Divider orientation="vertical"></Divider>
                    </Box>
                }
            </AccordionSummary>
            <Divider sx={{ margin: '0 5px' }} />
            <AccordionDetails sx={{ padding: '18px 16px' }}>
                <Typography>
                    {text}
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}