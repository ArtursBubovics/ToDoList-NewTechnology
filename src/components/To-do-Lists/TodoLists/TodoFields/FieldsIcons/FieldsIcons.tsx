import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Box from "@mui/material/Box"

interface FieldsIconsProps {
    title: string;
    imgPath: string;
  }

const FieldsIcons: React.FC<FieldsIconsProps> = ({title, imgPath}) => {
    return (

        <Tooltip title={title} placement="bottom" arrow slotProps={{
            popper: {
                sx: {
                    [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                    {
                        marginTop: '0px',
                    },
                    [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                    {
                        marginBottom: '0px',
                    },
                    [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                    {
                        marginLeft: '0px',
                    },
                    [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                    {
                        marginRight: '0px',
                    },
                },
            },
        }}
        >
            <Box sx={{
                width: '30px', minWidth: '0', height: '100%', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}>
                <img style={{ width: '20px', height: '20px' }} src={imgPath} alt="" />
            </Box>
        </Tooltip>
    )
}

export default FieldsIcons;