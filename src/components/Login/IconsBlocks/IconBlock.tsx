import Box from "@mui/material/Box"

interface ImageProps {
    imgPath: string;
  }

export const IconBlock: React.FC<ImageProps> = ({imgPath}) => {
    return (
        <Box sx={{ height: '100%', objectFit: 'cover', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <img src={imgPath} alt="" />
        </Box>
    )
}