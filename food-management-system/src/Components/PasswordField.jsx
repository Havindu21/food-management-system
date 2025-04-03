import React, { useState, forwardRef } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField = forwardRef((props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            {...props}
            inputRef={ref} // Use inputRef for MUI TextField
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
                "& .MuiInput-underline:before": { opacity: 0.8 },
                "& .MuiInput-underline:after": { borderBottom: "2px solid #059669" },
                "& .MuiInput-underline:hover:before": { borderBottom: "2px solid #059669" },
                ...props.sx
            }}
        />
    );
});

PasswordField.displayName = "PasswordField"; // ✅ Fix for ESLint warning

export default PasswordField;
