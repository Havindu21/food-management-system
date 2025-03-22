import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { globalMt, globalPx } from '../../Theme/Theme';
import { red } from '@mui/material/colors';
import project1 from '../../assets/Home/project1.jpg';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Projects = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        rtl: true,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    const projectData = [
        { title: "Shrimp and Chorizo Paella", date: "September 14, 2016" },
        { title: "Vegetarian Delight", date: "October 20, 2017" },
        { title: "Spicy Mexican Tacos", date: "March 5, 2019" },
        { title: "Classic Italian Pasta", date: "June 10, 2021" },
    ];

    return (
        <Box sx={{
            ...globalPx,
            ...globalMt,
            mb: 5,
        }}>
            <Typography sx={{
                textAlign: { xs: 'left', sm: 'center' },
                fontSize: { xs: 20, sm: 20, md: 26 },
                fontWeight: 600,
                mb: 2,
            }}>
                Projects
            </Typography>
            <Slider {...settings}>
                {projectData.map((project, index) => (
                    <Box key={index} sx={{ px: 1 }}>
                        <Card sx={{ maxWidth: 345, m: 2 }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: '#059669' }} aria-label="recipe">
                                        {project.title.charAt(0)}
                                    </Avatar>
                                }
                                title={project.title}
                                subheader={project.date}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={project1}
                                alt={project.title}
                            />
                            <CardContent>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    This impressive dish is perfect for any occasion and a fun meal to cook together.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}

export default Projects;
