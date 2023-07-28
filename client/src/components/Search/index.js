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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Search = () => {
    const serverURL = "";

    const navigate = useNavigate();

    const [movieTitle, setMovieTitle] = useState('');
    const [actorName, setActorName] = useState('');
    const [directorName, setDirectorName] = useState('');
    const [results , setResults] = useState([]);
    const [showTable, setShowTable] = useState(false);

    const onChangeMovieTitle = (event) => {
        setMovieTitle(event.target.value);
    }

    const onChangeActorName = (event) => {
        setActorName(event.target.value);
    }

    const onChangeDirectorName = (event) => {
        setDirectorName(event.target.value);
    }

    const handleSubmitButton = () => {
        callApiSearch()
            .then(res => {
            console.log("callApisearch returned: ", res);
            setResults(res);
            setShowTable(true);
        })
    }

    const callApiSearch = async () => {
        const url = serverURL + "/api/search";
        console.log(url);
      
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieTitle: movieTitle,
            actorName: actorName,
            directorName: directorName
          }),
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log(body)
        return body;
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
                m: '2rem',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center'
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
                m: '2rem',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center'
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
                m: '2rem',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center'
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

            <Box sx={{ m: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" style={{ backgroundColor: '#0A346B'}}
                        onClick={() => {
                            handleSubmitButton();
                        }}>
                    Submit   
                </Button>
            </Box>

            {showTable && (
                <Box sx={{m: '2rem', display: 'flex', justifyContent: 'center' }}>
                <TableContainer component={Paper} style={{ margin: '50px' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{border: '2px solid grey', fontWeight: 'bold', backgroundColor: 'darkgrey', color: 'white'}}>Category</TableCell>
                                <TableCell sx={{border: '2px solid grey', fontWeight: 'bold', backgroundColor: 'darkgrey', color: 'white'}} align="right">Information</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.map((result, index) => {
                                const reviews = (result.reviews || '').split(',');
                                return (
                                    <React.Fragment key={index}>
                                        <TableRow sx={{border: '2px solid black' }}>
                                            <TableCell component="th" scope="row">Movie Name</TableCell>
                                            <TableCell align="right">{result.name}</TableCell>
                                        </TableRow>
                                        <TableRow sx={{border: '2px solid black' }}>
                                            <TableCell component="th" scope="row">Director Name</TableCell>
                                            <TableCell align="right">{result.first_name + ' ' + result.last_name}</TableCell>
                                        </TableRow>
                                        <TableRow sx={{border: '2px solid black' }}>
                                            <TableCell component="th" scope="row">Average Review Score</TableCell>
                                            <TableCell align="right">{result.score}</TableCell>
                                        </TableRow>
                                        {reviews[0] !== '' && reviews.map((review, reviewIndex) => (
                                            <TableRow key={reviewIndex} sx={{border: '2px solid black' }}>
                                                <TableCell component="th" scope="row">Review {reviewIndex + 1}</TableCell>
                                                <TableCell align="right">{review}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell style={{ padding: '30px' }} colSpan={2} />
                                        </TableRow>
                                    </React.Fragment>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Box>
        )}
        </div>
    )
}
export default Search;