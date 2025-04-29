import React, { forwardRef } from "react";
import { TextField, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";

const GreenTextField = styled(TextField)(({ theme, error }) => ({
  "& .MuiInputBase-root": {
    // color: "#EEEEEE", // Text color
    backgroundColor: "#C8E6C9", // Background color
    padding: 0, // Padding
    borderRadius: 6, // Border radius
    border: `2px solid ${error ? 'red' : "#C8E6C9"}`, // Border style
    outline: "none", // No outline
  },
  "& .MuiInputBase-root:hover": {
    backgroundColor: "#C8E6C9", // Lighter background color on hover
  },
  "& .MuiInputBase-root.Mui-error": {
    borderColor: 'red', // Border color on error
  },
  "& fieldset": { border: "none" },
  "& .MuiInputBase-input": {
    fontSize: {
      xs: 12,
      md: 16,
    },
  },
}));

const CustomTextField = forwardRef((props, ref) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const size = isMobile ? "small" : "medium";

  return (
    <GreenTextField
      {...props}
      size={props?.size ? props.size : size}
      ref={ref}
    />
  );
});

export default CustomTextField;
