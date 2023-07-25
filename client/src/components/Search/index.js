import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Grid, Item} from '@mui/material';
import {TextField} from '@mui/material';

const Search = () => {
    const navigate = useNavigate();

    const [movieTitle, setMovieTitle] = useState('');
    const [actorName, setActorName] = useState('');
    const [directorName, setDirectorName] = useState('');

    const onChangeMovieTitle = (event) => {
        setMovieTitle(event.target.value);
    }

    const onChangeActorName = (event) => {
        setActorName(event.target.value);
    }

    const onChangeDirectorName = (event) => {
        setDirectorName(event.target.value);
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "#F2F2F2"}} >
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

            <Box sx={{mb: 2}}>
                <Grid container 
                    justifyContent="center" 
                    style={{fontSize: 40, color: '#FFFFFF'}}
                    bgcolor="#0A346B">

                    <Grid item>    
                    <h3>Search Movie</h3>
                    </Grid>
                        
                </Grid>
            </Box>

            <Box
                component="form"
                sx={{
                '& > :not(style)': {width: '60%'},
                m: '2rem'
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" 
                        label="Movie Title" 
                        variant="outlined"
                        value = {movieTitle}
                        onChange = {onChangeMovieTitle}
                />
            </Box>

            <Box
                component="form"
                sx={{
                '& > :not(style)': {width: '60%'},
                m: '2rem'
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" 
                        label="Actor's First and Last Name" 
                        variant="outlined"
                        value = {actorName}
                        onChange={onChangeActorName}
                />
            </Box>

            <Box
                component="form"
                sx={{
                '& > :not(style)': {width: '60%'},
                m: '2rem'
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" 
                        label="Director's First and Last Name" 
                        variant="outlined"
                        value = {directorName}
                        onChange={onChangeDirectorName}
                />
            </Box>

            <Box sx={{ m: '2rem'}}>
                <Button variant="contained" style={{ backgroundColor: '#0A346B'}}
                        onClick={() => {
                        }}>
                    Submit   
                </Button>
            </Box>

        </div>
    )
}
export default Search;