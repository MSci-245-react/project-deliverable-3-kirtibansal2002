import React from "react";
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Review from "./Review";

const App = () => {
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
            <Review/>
        </div>
    )
}
export default App;


