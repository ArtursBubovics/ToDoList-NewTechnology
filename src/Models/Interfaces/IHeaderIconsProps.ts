import { SvgIconProps } from '@mui/material/SvgIcon';

interface IHeaderIconsProps {
    title: string,
    dotDisposition: {
        top: string,
        right: string
    },
    Icon: React.ElementType<SvgIconProps>,
    invisible: boolean;
}

export default IHeaderIconsProps;