import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import IHeaderIconsProps from '../../../Models/Interfaces/IHeaderIconsProps';

const HeaderIcons: React.FC<IHeaderIconsProps> = ({title, dotDisposition, Icon, invisible}) => {
    return (
        <Tooltip title={title} placement="bottom" arrow>
            <Badge sx={{
                '& .MuiBadge-dot': {
                    top: dotDisposition.top,
                    right: dotDisposition.right
                },
                cursor: 'pointer'
            }} color="secondary" variant="dot" invisible={invisible}>
                <Icon style={{ fontSize: '30px' }} color="action" />
            </Badge>
        </Tooltip>
    )
}

export default HeaderIcons