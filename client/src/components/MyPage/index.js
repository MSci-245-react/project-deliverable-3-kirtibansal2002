import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Grid} from '@mui/material';
import {TextField} from '@mui/material';
import Button from '@mui/material/Button';

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
    const [watchlistMovie, setWatchListMovie] = useState('');
    const [watchedMovie, setWatchedMovie] = useState('');
    const [showWatchlist, setShowWatchlist] = useState(false);
    const [watchlist, setWatchList] = useState([]);

    const onChangeGenre = (event) => {
        setGenre(event.target.value);
    }

    const onChangeActor = (event) => {
        setActor(event.target.value);
    }

    const onChangeWatchlistMovie = (event) => {
        setWatchListMovie(event.target.value);
    }

    const onChangeWatchedMovie = (event) => {
        setWatchedMovie(event.target.value);
    }

    const handleSubmit = () => {
        callApiMyPage()
            .then(res => {
            console.log("callApiMyPage returned: ", res);
            setResults(res);
            setShowTable(true);
        })
    }

    const handleWatchLaterButton = () => {
        console.log('watchlistMovie: ', watchlistMovie); 
        const watchLaterMovieId = findMovieId(watchlistMovie);
        console.log(watchLaterMovieId);
        console.log("movie Id");
        if (watchLaterMovieId) {
            handleWatchLater(watchLaterMovieId)
                .then (() => {
                    callWatchLaterList()
                        .then(res => {
                            console.log("callApiWatchLaterList returned: ", res);
                            setWatchList(res);
                            setShowWatchlist(true);
                        });
                    });
        } else {
            console.log("movie not found");
        }
    }

    const handleWatchedMovieButton = () => {
        const watchedMovieId = findMovieId(watchedMovie);
        if (watchedMovieId) {
            handleWatched(watchedMovieId)
                .then(() => {
                     callWatchLaterList()
                        .then(res => {
                            console.log("callApiMyPage returned: ", res);
                            setWatchList(res);
                            setShowWatchlist(true);
                        });
                });
        } else {
            console.log("watched movie not found");
        }

        console.log(watchlist);
        
    }

    const findMovieId = (movieNames) => {
        console.log(results);
        console.log(movieNames);
        const moviesID = results.find(result => result.name === movieNames);
        return moviesID ? moviesID.id: null;
    }
    
    const handleWatchLater = async (movieID) => {
        const response = await fetch(serverURL + '/api/watchLater', {
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
          return body.json();
    }

    const handleWatched = async (movieID) => {
        const response = await fetch(serverURL + '/api/watchedMovie', {
            method: 'DELETE',
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

    const callWatchLaterList = async () => {
        const response = await fetch(serverURL + `/api/watchList`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
        });
    
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
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

      const convertToEmbedURL = (url) => {
        if (!url) {
          return 'https://www.youtube.com/embed/default';
        }
    
        const videoId = new URLSearchParams(new URL(url).search).get('v');
        return `https://www.youtube.com/embed/${videoId}`;
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

            <Box ml={45}>
                <Typography variant="body2" color="text.secondary">
                    Please only search up "Horror" in the Genre textfield to view working embedded movie trailer links 
                </Typography>
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
                                                <TableCell>
                                                    {result.directors}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">Actors</TableCell>
                                                <TableCell>
                                                    {result.actors.replace(/,/g, ', ')}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">Overall Rating</TableCell>
                                                <TableCell>{result.score}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">Trailer</TableCell>
                                                <TableCell>
                                                    <iframe
                                                        width="560"
                                                        height="315"
                                                        src={convertToEmbedURL(result.youtube_url)}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                </TableCell>
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
                                value={watchlistMovie}
                                onChange={onChangeWatchlistMovie}
                                style={{ marginBottom: '1rem' }}
                            />
                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#0A346B', marginBottom: '1rem' }}
                                onClick={() => handleWatchLaterButton()}
                            >
                                Add to Watchlist
                            </Button>
                            <TextField
                                id="outlined-basic-watched"
                                label="Watched Movie"
                                variant="outlined"
                                value={watchedMovie}
                                onChange={onChangeWatchedMovie}
                                style={{ marginBottom: '1rem' }}
                            />
                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#0A346B' }}
                                onClick={() => handleWatchedMovieButton()}
                            >
                                Mark as Watched
                            </Button>

                            {showWatchlist && (
                            <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
                                <Typography variant="h6" component="div" align="center" sx={{ marginBottom: '1rem' }}>
                                Your Watch List
                                </Typography>
                                <TableContainer component={Paper} sx={{ boxShadow: '0 0 5px gray', overflowX: 'hidden', padding: '1rem' }}>
                                {Array.isArray(watchlist) && watchlist.length > 0 ? (
                                    watchlist.map((movie, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderBottom: '1px solid gray',
                                        padding: '1rem',
                                        }}
                                    >
                                        {movie.name}
                                    </Box>
                                    ))
                                ) : (
                                    <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderBottom: '1px solid gray',
                                        padding: '1rem',
                                    }}
                                    >
                                    No movies in watchlist
                                    </Box>
                                )}
                                </TableContainer>
                            </Box>
                            )}

                        </Box>
                    </Grid>
                </Grid>

            )}
           </div>
        </div>
    )
}
export default MyPage;


