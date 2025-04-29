import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Card,
  CardMedia, 
  CardContent, 
  Chip,
  Container,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import project1 from '../../assets/Home/project1.jpg';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Projects = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isVisible, setIsVisible] = useState(false);
    
    // Custom intersection observer to trigger animations
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        const section = document.getElementById('projects-section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);
    
    // Custom arrows for the slider
    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <Box
                onClick={onClick}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: { xs: '5px', md: '-30px' },
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    width: { xs: 30, md: 40 },
                    height: { xs: 30, md: 40 },
                    borderRadius: '50%',
                    bgcolor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        bgcolor: '#f0fdf4',
                        boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
                    }
                }}
            >
                <ArrowForwardIcon sx={{ color: '#059669', fontSize: { xs: 18, md: 24 } }} />
            </Box>
        );
    };

    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <Box
                onClick={onClick}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: { xs: '5px', md: '-30px' },
                    transform: 'translateY(-50%) rotate(180deg)',
                    zIndex: 2,
                    width: { xs: 30, md: 40 },
                    height: { xs: 30, md: 40 },
                    borderRadius: '50%',
                    bgcolor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        bgcolor: '#f0fdf4',
                        boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
                    }
                }}
            >
                <ArrowForwardIcon sx={{ color: '#059669', fontSize: { xs: 18, md: 24 } }} />
            </Box>
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        rtl: false,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                }
            }
        ],
        appendDots: dots => (
            <Box
                sx={{
                    position: 'relative',
                    bottom: '-10px',
                    padding: '10px',
                    '& .slick-dots li button:before': {
                        color: 'white',
                        opacity: 0.5,
                    },
                    '& .slick-dots li.slick-active button:before': {
                        color: 'white',
                        opacity: 1,
                    },
                }}
            >
                <ul style={{ margin: '0' }}> {dots} </ul>
            </Box>
        ),
    };

    const projectData = [
        { 
            title: "Food Bank Distribution", 
            date: "April 15, 2024",
            location: "Colombo",
            category: "Distribution",
            description: "Distributed over 500kg of fresh produce to local food banks, helping to feed over 200 families in need."
        },
        { 
            title: "Restaurant Partnership", 
            date: "March 23, 2024",
            location: "Kandy",
            category: "Partnership",
            description: "Partnered with 12 local restaurants to collect surplus food and deliver it to homeless shelters in the area."
        },
        { 
            title: "Reducing Food Waste", 
            date: "February 10, 2024",
            location: "Galle",
            category: "Education",
            description: "Conducted workshops for local businesses on reducing food waste and improving sustainability practices."
        },
        { 
            title: "School Meal Program", 
            date: "January 5, 2024",
            location: "Jaffna",
            category: "Education",
            description: "Launched a nutritious meal program for underprivileged schools, serving over 1,000 students daily."
        },
    ];

    // Animation styles for the fade-in effect with staggered timing
    const getAnimationStyles = (index) => {
        const baseDelay = 0.3; // Base delay in seconds
        const staggeredDelay = baseDelay + (index * 0.15); // Each card has an additional 0.15s delay
        
        return {
            opacity: 0,
            transform: 'translateY(20px)',
            animation: isVisible ? `fadeIn 0.6s ease-out forwards ${staggeredDelay}s` : 'none',
        };
    };

    return (
        <Box 
            id="projects-section"
            sx={{
                py: 6,
                background: 'linear-gradient(135deg, #057857 0%, #059669 100%)',
                position: 'relative',
                overflow: 'hidden',
                // Define keyframes for fade-in animation
                '@keyframes fadeIn': {
                    from: { 
                        opacity: 0,
                        transform: 'translateY(20px)'
                    },
                    to: { 
                        opacity: 1,
                        transform: 'translateY(0)'
                    }
                },
            }}
        >
            {/* Background decorative elements */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 300,
                    height: 300,
                    borderRadius: '60%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    top: -100,
                    left: -100,
                    zIndex: 0,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    width: 200,
                    height: 200,
                    borderRadius: '60%',
                    background: 'rgba(255, 255, 255, 0.07)',
                    top: -80,
                    left: -80,
                    zIndex: 0,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    width: 100,
                    height: 100,
                    borderRadius: '60%',
                    background: 'rgba(255, 255, 255, 0.07)',
                    top: -60,
                    left: -60,
                    zIndex: 0,
                }}
            />
            
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', md: 'center' },
                        mb: 5,
                        opacity: 0,
                        transform: 'translateY(20px)',
                        animation: isVisible ? 'fadeIn 0.6s ease-out forwards' : 'none',
                    }}
                >
                    <Box>
                        <Typography 
                            variant="h2"
                            sx={{
                                fontSize: { xs: 24, sm: 28, md: 32 },
                                fontWeight: 700,
                                color: 'white',
                                position: 'relative',
                                display: 'inline-block',
                                mb: 2,
                                '&:after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: -8,
                                    left: 0,
                                    width: 60,
                                    height: 3,
                                    backgroundColor: 'white',
                                    borderRadius: 1,
                                }
                            }}
                        >
                            Our Impact Projects
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: { xs: 16, md: 18 },
                                color: 'rgba(255, 255, 255, 0.9)',
                                maxWidth: 600,
                            }}
                        >
                            Explore how we're making a difference in communities across Sri Lanka
                        </Typography>
                    </Box>
                    
                    {!isMobile && (
                        <Button
                            variant="outlined"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                borderColor: 'white',
                                color: 'white',
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                }
                            }}
                        >
                            View All Projects
                        </Button>
                    )}
                </Box>

                <Box 
                    sx={{ 
                        px: { xs: 0, md: 2 }
                    }}
                >
                    <Slider {...settings}>
                        {projectData.map((project, index) => (
                            <Box 
                                key={index} 
                                sx={{ 
                                    px: 2, 
                                    pb: 4,
                                    ...getAnimationStyles(index)
                                }}
                            >
                                <Card 
                                    sx={{ 
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                                        transition: 'all 0.3s ease',
                                        height: '100%',
                                        '&:hover': {
                                            transform: 'translateY(-6px)',
                                            boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                                        }
                                    }}
                                >
                                    <Box sx={{ position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            height="220"
                                            image={project1}
                                            alt={project.title}
                                        />
                                        <Chip 
                                            label={project.category}
                                            sx={{
                                                position: 'absolute',
                                                top: 16,
                                                right: 16,
                                                bgcolor: '#059669',
                                                color: 'white',
                                                fontWeight: 600,
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                            }}
                                        />
                                    </Box>
                                    
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <CalendarTodayIcon sx={{ fontSize: 16, color: '#059669', mr: 1 }} />
                                            <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500 }}>
                                                {project.date} • {project.location}
                                            </Typography>
                                        </Box>
                                        
                                        <Typography
                                            variant="h5"
                                            sx={{ 
                                                fontWeight: 700,
                                                fontSize: 20,
                                                mb: 2,
                                                color: '#111827',
                                            }}
                                        >
                                            {project.title}
                                        </Typography>
                                        
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: '#4B5563', 
                                                mb: 2,
                                                minHeight: 80,
                                            }}
                                        >
                                            {project.description}
                                        </Typography>
                                        
                                        <Button
                                            endIcon={<ArrowForwardIcon />}
                                            sx={{
                                                color: '#059669',
                                                fontWeight: 600,
                                                p: 0,
                                                textTransform: 'none',
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                    textDecoration: 'underline',
                                                }
                                            }}
                                        >
                                            Read More
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Slider>
                </Box>
                
                {isMobile && (
                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <Button
                            variant="outlined"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                borderColor: 'white',
                                color: 'white',
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                }
                            }}
                        >
                            View All Projects
                        </Button>
                    </Box>
                )}
            </Container>
        </Box>
    );
}

export default Projects;