import { Box, Grid2 } from "@mui/material"
import Carousel from "react-material-ui-carousel"
import { Outlet } from "react-router-dom"
import LoginImage3 from "../assets/JoinUs/img5.png";


const LoginLayout = () => {
    const images = [LoginImage3];

    return (
        <Box
            sx={{
                width: "100%",
                height:{xs: '40vh',sm:'60vh',md:"100vh"},
                pt: {xs:5,md:0},
                pb: {xs:3,md:0},
            }}
        >
            <Grid2 container >
                {/* Left Section: Carousel */}
                <Grid2 item size={{ xs: 12, md: 6 }}>
                    {images.length > 0 ? (
                        <Carousel
                            animation="slide"
                            duration={750}
                            interval={3000}
                            indicators={false}
                            navButtonsAlwaysInvisible={true}
                        >
                            {images.map((src, index) => (
                                <Box
                                    key={index}
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    height={{xs: '',md:"100vh"}}
                                    sx={{
                                        transform: {xs:'unset',lg:"scale(1.5)"},
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: "relative",
                                            width: { xs: 250, sm: 350, md: 400 },
                                            height: { xs: 250, sm: 350, md: 400 },
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gridTemplateRows: "1fr 1fr",
                                            gap: "10px",
                                            backgroundColor: "transparent",
                                        }}
                                    >
                                        {/* 4 squares */}
                                        <Box
                                            sx={{
                                                backgroundColor: "#A5D6A7",
                                                borderRadius: "20px",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                backgroundColor: "#A5D6A7",
                                                borderRadius: "50px",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                backgroundColor: "#A5D6A7",
                                                borderRadius: "10px",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                backgroundColor: "#A5D6A7",
                                                borderRadius: "30px",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />

                                        {/* Image on top */}
                                        <Box
                                            component="img"
                                            alt={`Image ${index + 1}`}
                                            src={src}
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: "90%",
                                                height: "100%",
                                                objectFit: "contain",
                                                borderRadius: "10px",
                                                zIndex: 1,
                                            }}
                                        />
                                    </Box>
                                </Box>
                            ))}
                        </Carousel>
                    ) : (
                        <div>Loading...</div>
                    )}
                </Grid2>
                <Grid2 item size={{ xs: 12, md: 6 }} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    px: {xs:2,sm:8,md:6,lg:17,},
                }} >
                    <Outlet />
                </Grid2>
            </Grid2>
        </Box>
    )
}

export default LoginLayout