import React from "react";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Grid, Item, Button} from '@mui/material';
import {Card, CardMedia} from '@mui/material';


const Landing = () => {
    const navigate = useNavigate();
    
    const movieImages = [
        'https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_FMjpg_UX1000_.jpg',
        'https://m.media-amazon.com/images/M/MV5BNjQzNDI2NTU1Ml5BMl5BanBnXkFtZTgwNTAyMDQ5NjE@._V1_.jpg',
        'https://m.media-amazon.com/images/M/MV5BMTYxMzYwODE4OV5BMl5BanBnXkFtZTgwNDE5MzE2MDE@._V1_.jpg',
        'https://m.media-amazon.com/images/M/MV5BMTYyNzk3MDc2NF5BMl5BanBnXkFtZTgwMDk3OTM1NDM@._V1_FMjpg_UX1000_.jpg',
        'https://m.media-amazon.com/images/M/MV5BZGQ1NjQyNDMtNzFlZS00ZGIzLTliMWUtNGJkMGMzNTBjNDg0XkEyXkFqcGdeQXVyMTE1NDI5MDQx._V1_.jpg'
    ];


    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "#F2F2F2"}}>
                    <Toolbar>

                            <Link
                                color="#0651AC"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate('/')}
                            >

                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, mr: 2 }}>
                                        Landing
                                    </Typography>
                            </Link>

                            <Link
                                color="#0651AC"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate('/MyPage')}
                            >

                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, mr: 2 }}>
                                        My Page
                                    </Typography>
                            </Link>

                            <Link
                                color="#0651AC"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate('/Review')}
                            >

                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, mr: 2 }}>
                                        Review
                                    </Typography>
                            </Link>

                            <Link
                                color="#0651AC"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate('/Search')}
                            >

                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                        Search
                                    </Typography>
                            </Link>

                    </Toolbar> 
                </AppBar>
            </Box>

            <Box>
                <Grid container 
                    alignItems="center"
                    justifyContent="center" 
                    style={{fontSize: 60, color: '#FFFFFF'}}
                    bgcolor="#0A346B">

                    <Grid item>    
                    <h3>Welcome to Movie Reviews</h3>
                    </Grid>
                        
                </Grid>
           </Box>

           <Box sx={{ padding: 3 }}>
                <Grid container justifyContent="center" spacing={3}>
                    {movieImages.map((url, index) => (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                            <img src={url} alt="Movie cover" style={{width: '100%', height: '300px', objectFit: 'cover'}}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </div>
    )
}


export default Landing;


