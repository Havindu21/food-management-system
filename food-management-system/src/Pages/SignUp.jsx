import React from 'react';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    return (
        <div>
            sign up
            <Button
            variant='contained'
                onClick={() => navigate("/sign-in")}
            >
                sign in
            </Button>
        </div>
    );
};

export default SignUp;