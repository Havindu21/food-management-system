import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    Grid2,
    IconButton,
    InputAdornment,
    Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData, setUserType } from "../reducers/userSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import Logo from "../assets/logo-remove-bg.png";
import CustomTextField from "../Components/GreenTextField";
import { loginUser } from "../Services/auth";
import { showLoadingAnimation, hideLoadingAnimation } from "../app/loadingAnimationController";
import { showAlertMessage } from "../app/alertMessageController";

const Login = ({ key }) => {
    const dateNow = key;
    const loginTimestamp = new Date().getTime();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = async (data) => {
        try {
            showLoadingAnimation({ message: "Logging in..." });
            const response = await loginUser(data);

            if (response) {
                dispatch(setUserData(response)); // adjust based on your response structure
                hideLoadingAnimation();
                showAlertMessage({ message: "Login successful!", type: "success" });
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            } else {
                hideLoadingAnimation();
                showAlertMessage({ message: "Invalid login credentials", type: "error" });
                console.error("Invalid login response:", response);
            }
        } catch (error) {
            hideLoadingAnimation();
            showAlertMessage({ 
                message: error.response?.data?.message || "Login failed. Please check your credentials.", 
                type: "error" 
            });
            console.error("Login failed:", error?.message || error);
        }
    };

    // Login logic here
    // if (data.email === "rec") {
    // dispatch(setUserData({ email: data.email, password: data.password }));
    // dispatch(setUserType("recipient"));
    // navigate("/home");
    // } else if (data.email === "admin") {
    //     dispatch(setUserData({ email: data.email, password: data.password }));
    //     dispatch(setUserType("admin"));
    //     navigate("/profile/recipient-approvals");
    // } else if (data.email === "don") {
    //     dispatch(setUserData({ email: data.email, password: data.password }));
    //     dispatch(setUserType("donor"));
    //     navigate("/home");
    // }
    // };


    return (
        <Box sx={{ mb: { xs: 5, md: 0 } }}>
            <form onSubmit={handleSubmit(handleLogin)}>
                <Grid2 container spacing={2}>
                    <Grid2
                        item
                        size={{ xs: 12 }}
                        textAlign={"center"}
                        sx={{
                            mt: {
                                xs: 2,
                                md: 3,
                                lg: 0,
                            },
                        }}
                    >
                        <Typography sx={{
                            fontSize: { xs: 26, sm: 32, md: 38, lg: 45 },
                        }}>WELCOME BACK TO</Typography>
                        <Box display={"flex"} justifyContent={"center"}>
                            <Box
                                component="img"
                                alt="Image"
                                src={Logo}
                                sx={{
                                    maxWidth: {
                                        xs: 145,
                                        sm: 165,
                                        md: 185,
                                        lg: 200,
                                    },
                                }}
                            />
                        </Box>
                    </Grid2>
                    <Grid2
                        item
                        size={{ xs: 12 }}
                        sx={{
                            mt: { xs: 0, lg: 2 },
                        }}
                    >
                        <Typography variant="h6">Email</Typography>
                        <CustomTextField
                            fullWidth
                            error={!!errors.email}
                            {...register("email", { required: "Email is required." })}
                        />
                        <Typography minHeight={21} color="red">
                            {errors.email?.message}
                        </Typography>
                    </Grid2>
                    <Grid2
                        item
                        size={{ xs: 12 }}
                        sx={{
                            mt: { xs: -2, md: 0 },
                        }}
                    >
                        <Typography variant="h6">Password</Typography>
                        <CustomTextField
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            error={!!errors.password}
                            {...register("password", { required: "Password is required." })}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            sx={{
                                                mr: 1,
                                            }}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Typography minHeight={21} color="red">
                            {errors.password?.message}
                        </Typography>
                    </Grid2>
                    <Grid2
                        item
                        size={{ xs: 12 }}
                        display="flex"
                        justifyContent="center"
                        sx={{
                            mt: { xs: 0, md: 2 },
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                width: 228, height: 50,
                                bgcolor: '#059669',
                            }}
                        >
                            <Typography fontSize={20} fontWeight={700}>
                                Log In
                            </Typography>
                        </Button>
                    </Grid2>
                    <Grid2
                        item
                        size={12}
                        sx={{
                            mt: { xs: 0, md: 2 },
                        }}
                        display="flex"
                        justifyContent="center"
                    >
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: { xs: 12, sm: 14 },
                                color: "#808080",
                            }}
                        >
                            Don't have an account?
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: { xs: 12, sm: 14 },
                                color: "#059669",
                                display: "inline",
                                ml: 1,
                            }}
                        >
                            <Link
                                style={{ textDecoration: "none", color: "inherit" }}
                                to="/join-us"
                            >
                                Sign Up
                            </Link>
                        </Typography>
                    </Grid2>
                </Grid2>
            </form>
        </Box>
    );
};

export default Login;
