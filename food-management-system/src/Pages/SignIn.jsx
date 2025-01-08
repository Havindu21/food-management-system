import React from 'react';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();
    return (
        <div>
            sign in
            <Button
                onClick={() => navigate("/sign-up")}
            >
                sign up
            </Button>
        </div>
    );
};

export default SignIn;