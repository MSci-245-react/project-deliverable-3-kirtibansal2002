import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Grid, Item} from '@mui/material';
import {TextField} from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const MyPage = () => {
    const navigate = useNavigate();
    const serverURL = "";

    const [genre, setGenre] = useState('');
    const [actor, setActor] = useState('');
    const [results , setResults] = useState([]);
    const [showTable, setShowTable] = useState(false);

    const onChangeGenre = (event) => {
        setGenre(event.target.value);
    }

    const onChangeActor = (event) => {
        setActor(event.target.value);
    }

    const handleSubmit = () => {
        callApiMyPage()
            .then(res => {
            console.log("callApiMyPage returned: ", res);
            setResults(res);
            setShowTable(true);
        })
    }

    const handleWatchLater = async (movieID) => {
        const response = await fetch('your-server-url/api/watchLater', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              movieID: movieID
            }),
          });
          
          const body = await response;
          if (response.status !== 200) throw Error(body.message);
        
          console.log(body);
          return body;
    }

    const callApiMyPage = async () => {
        const url = serverURL + "/api/MyPage";
        console.log(url);
      
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            actor: actor,
            genre: genre
          }),
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        
        console.log(body);
        return body;
      }
 
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

            <Box sx={{mb: 2}}>
                <Grid container 
                    justifyContent="center" 
                    style={{fontSize: 40, color: '#FFFFFF'}}
                    bgcolor="#0A346B">

                    <Grid item>    
                    <h3>Top Rated Movies</h3>
                    </Grid>
                        
                </Grid>
            </Box>

            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    m: '6', 
                }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2} justify="center" alignItems="center">
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="outlined-basic-actors"
                            label="Actors"
                            variant="outlined"
                            value = {actor}
                            onChange = {onChangeActor}
                            fullWidth
                            sx={{ml: '9rem'}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="outlined-basic-genre"
                            label="Genre"
                            variant="outlined"
                            value = {genre}
                            onChange = {onChangeGenre}
                            fullWidth
                            sx={{ml: '9rem'}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" style={{ backgroundColor: '#0A346B'}}
                                    onClick={() => {
                                        handleSubmit();
                                    }}>
                                Submit   
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <div>

            {showTable && (
                <Grid container spacing={3} sx={{ margin: '3rem' }}>
                    <Grid item xs={12} md={6}>
                        {results.map((result, index) => (
                            <Box key={index} sx={{mb: 2}}>
                                <TableContainer component={Paper} sx={{ boxShadow: '0 0 5px gray', marginBottom: '2rem' }}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#0A346B', color: 'white' }}>Category</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#0A346B', color: 'white' }}>Information</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow sx={{backgroundColor: 'rgba(63, 81, 181, 0.1)'}}>
                                                <TableCell component="th" scope="row">Movie Name</TableCell>
                                                <TableCell sx={{fontWeight: 'bold'}}>{result.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">Director Name</TableCell>
                                                <TableCell>{result.first_name + ' ' + result.last_name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">Actors</TableCell>
                                                <TableCell>
                                                    {result.actors.split(',').map((actor, index) => (
                                                        <div key={index}>{actor}</div>
                                                    ))}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">Overall Rating</TableCell>
                                                <TableCell>{result.score}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        ))}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box 
                            component="form"
                            sx={{
                            '& > :not(style)': {width: '60%'},
                            m: '2rem',
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            }}
                            noValidate
                            autoComplete="off"
                        >
                                <TextField
                                id="outlined-basic-watchlist"
                                label="Add Watchlist Movie"
                                variant="outlined"
                                // value={watchlistMovie}
                                // onChange={onChangeWatchlistMovie}
                                style={{ marginBottom: '1rem' }}
                            />
                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#0A346B', marginBottom: '1rem' }}
                                // onClick={() => handleAddToWatchlist()}
                            >
                                Add to Watchlist
                            </Button>
                            <TextField
                                id="outlined-basic-watched"
                                label="Watched Movie"
                                variant="outlined"
                                // value={watchedMovie}
                                // onChange={onChangeWatchedMovie}
                                style={{ marginBottom: '1rem' }}
                            />
                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#0A346B' }}
                                // onClick={() => handleMarkAsWatched()}
                            >
                                Mark as Watched
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            )}
           </div>
        </div>
    )

    //search movies by genre and actors?
    // they can look at the overall review
    // watch the movie trailer 
    // and save the movie as their watch later 
    // if they have watched it then remove it from the list 
}
export default MyPage;


