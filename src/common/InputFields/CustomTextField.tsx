import { TextField, TextFieldProps } from "@mui/material";

interface CustomTextFieldProps extends Omit<TextFieldProps, 'value'> {
    backgroundColor?: string;
    noBorder?: boolean;
    value?: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ backgroundColor, noBorder, value, ...props }) => {
    return (
        <TextField
            InputLabelProps={{
                sx: {
                    marginTop: '-5px',
                },
            }}
            sx={{
                width: '100%',
                paddingBottom: '15px',
                '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                    padding: '10.5px 16px',
                    backgroundColor: backgroundColor ? backgroundColor : 'transparent',
                },
                ...(noBorder && { "& fieldset": { border: 'none' } })
            }}
            value={value}
            {...props}
        />
    )
}

export default CustomTextField;