import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            {...props}
            type={showPassword ? "text" : "password"}
            variant="standard"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
            sx={{
                "& .MuiInput-underline:before": {
                    opacity: 0.8,
                },
                "& .MuiInput-underline:after": {
                    borderBottom: "2px solid #059669",
                },
                "& .MuiInput-underline:hover:before": {
                    borderBottom: "2px solid #059669",
                },
                ...props.sx
            }}
        />
    );
};

export default PasswordField;
