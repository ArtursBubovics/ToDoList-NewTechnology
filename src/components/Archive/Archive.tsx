import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setArchiveValue } from '../../ReduxToolkit/Reducers/headerMenu-reducer';
import { IHeaderMenuState } from '../../Models/Interfaces/IHeaderMenuState';
import CloseIcon from '@mui/icons-material/Close';
import { IconsButtons } from '../../common/Buttons/IconsButtons/IconsButtons';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { RegularButtons } from '../../common/Buttons/RegularButtons/RegularButtons';
import { ArchiveBlock } from './ArchiveBlock/ArchiveBlock';
//import { useIsOverflow } from './ArchivesSroll/ArchivesSroll';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function TemporaryDrawer() {

    const dispatch = useDispatch();

    const toggleDrawer = (value: boolean) => {
        dispatch(setArchiveValue(value));
    };





    // const boxRef = React.useRef<HTMLDivElement>(null);
    // const [isOverflow, setIsOverflow] = React.useState<boolean | undefined>(undefined);

    // const { current } = boxRef;

    // console.log(boxRef);
    // console.log('boxRef.current ' + boxRef.current);

    // React.useLayoutEffect(() => {
    //     if (current) {
    //         console.log('test 2');
    //         const hasOverflow = current.scrollHeight > current.clientHeight;
    //         setIsOverflow(hasOverflow);
    //     }
    // }, [current]);

    // console.log('test 3 ' + isOverflow);

    // console.log('--------------------------');




    interface RootState {
        headerMenu: IHeaderMenuState;
    }

    const isOpen = useSelector((state: RootState) => state.headerMenu.isArchiveOpen);


    const DrawerList = (
        <Box sx={{ width: 320, height: '100%', padding: '12px 17px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'auto' }} role="presentation">
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box onClick={() => toggleDrawer(false)}>
                        <IconsButtons Icon={CloseIcon} />
                    </Box>
                </Box>
                <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: '30px', lineHeight: '0.7', paddingBottom: '24px' }}>
                    Archive
                </Typography>

                <Divider sx={{ marginBottom: '20px' }} />
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Search sx={{
                            border: '1px solid #D4D4D4',
                            margin: '0', '@media (min-width: 600px)': {
                                margin: '0'
                            }, '@media (min-width: 900px)': {
                                width: '29vh'
                            }
                        }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Box>
                    <Box sx={{ padding: '18px 15px' }}>
                        {
                            // ref={boxRef}
                        }

                        <Box sx={{ height: '73vh', overflow: 'auto' }} >

                            <ArchiveBlock text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.'} />


                            <ArchiveBlock text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.'} />

                            <ArchiveBlock text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.'} />

                            <ArchiveBlock text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam provident rerum quaerat animi ducimus reprehenderit magnam. Id, quibusdam vel.'} />


                        </Box>
                    </Box>
                </Box>

            </Box>
            <Box>
                <Divider sx={{ marginBottom: '8px' }} />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <RegularButtons sx={{ color: '#9A9A9A', padding: '6px 8px' }}>
                        <Typography sx={{ textTransform: 'none' }}>
                            Delete all
                        </Typography>
                    </RegularButtons>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ position: 'absolute', zIndex: 1, top: 0, right: 0, left: 0 }}>
            <Drawer sx={{ '& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop': { cursor: 'pointer' } }} anchor="left" open={isOpen} onClose={() => toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Box>
    );
}