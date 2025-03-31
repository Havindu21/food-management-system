import { TextField } from '@mui/material';
import React from 'react';

const CustomTextfield = (props) => {
    return (
        <TextField
            {...props} // Forward all received props
            variant='standard'
            sx={{
                "& .MuiInput-underline:before": {
                    opacity: 0.8,
                },
                "& .MuiInput-underline:after": {
                    borderBottom: "2px solid #059669", // Active color
                },
                "& .MuiInput-underline:hover:before": {
                    borderBottom: "2px solid #059669", // Hover effect
                },
                ...props.sx // Allow custom styles if passed
            }}
        />
    );
};

export default CustomTextfield;
