import React from "react";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Grid, Item, Button} from '@mui/material';


const Landing = () => {
    const navigate = useNavigate();
    
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

            <Box>
                <Grid container 
                    alignItems="center"
                    justifyContent="center" 
                    style={{fontSize: 60, color: '#FFFFFF'}}
                    bgcolor='#FFFFFF'>

                    <Grid item> 
                        <h3>Filler</h3>   
                    </Grid>
                        
                </Grid>
           </Box>

           <Box>
                <Grid container 
                    alignItems="center"
                    justifyContent="center" 
                    style={{fontSize: 60, color: '#FFFFFF'}}
                    bgcolor='#FFFFFF'>

                    <Grid item>   
                        <h3>Filler</h3>    
                    </Grid>
                        
                </Grid>
           </Box>

           


        </div>
    )
}


export default Landing;


