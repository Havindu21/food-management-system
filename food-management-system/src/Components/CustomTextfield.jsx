import { TextField } from '@mui/material';
import React, { forwardRef } from 'react';

const CustomTextfield = forwardRef((props, ref) => {
    return (
        <TextField
            {...props} // Forward all received props
            inputRef={ref} // Use inputRef for MUI TextField
            variant="standard"
            sx={{
                "& .MuiInput-underline:before": { opacity: 0.8 },
                "& .MuiInput-underline:after": { borderBottom: "2px solid #059669" },
                "& .MuiInput-underline:hover:before": { borderBottom: "2px solid #059669" },
                ...props.sx
            }}
        />
    );
});

CustomTextfield.displayName = "CustomTextfield"; // ✅ Fix for ESLint warning

export default CustomTextfield;
