import { SvgIconProps } from '@mui/material/SvgIcon';

export interface IHeaderIconsProps {
    title: string,
    dotDisposition: {
        top: string,
        right: string
    },
    Icon: React.ElementType<SvgIconProps>,
    invisible: boolean;
}