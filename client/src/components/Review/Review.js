import * as React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import {Grid, Item, Box, Button} from '@mui/material';
// import { makeStyles } from '@mui/material';
import { borders } from '@mui/system';
import { resetWarningCache } from 'prop-types';


const serverURL = "";

const Review = (props) => {

  const getMovies = () => {
    callApigetMovies()
      .then(res => {
        console.log("callApigetMovies returned: ", res);
        console.log("callApigetMovies parsed: ", res);
        setMovies(res);
      })
  }

  const callApigetMovies = async () => {
    const url = serverURL + "/api/getMovies";
    console.log(url);
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body)
    return body;
  }

  const[idMovie, setidMovie] = React.useState();

  const choseMovieId = () => {
    const chosenMovie = movies.find(movie => movie.name === selectedMovie);
    if (chosenMovie) {
      setidMovie(chosenMovie.id);
      console.log(idMovie);
    }
  }

  const callApiaddReview = async () => {
    const url = serverURL + "/api/addReview";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: idMovie,
        userID: userID,
        reviewTitle: enteredTitle,
        reviewContent: enteredReview,
        reviewScore: selectedRating
      })
    });

    const body = await response;
    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  }

  React.useEffect(() => {
    getMovies();
  }, []);


   //Set the initial five movies to an array of strings 
  const[movies, setMovies] = React.useState([]);

   //Set the states of all child components to empty strings
  const[selectedMovie, setSelectedMovies] = React.useState("");
  const[enteredTitle, setEnteredTitle] = React.useState("");
  const[enteredReview, setEnteredReview] = React.useState("");
  const[selectedRating, setSelectedRating] = React.useState("");
  const[userID, setUserId] = React.useState(1);

  //State variables for error messages and response validation states
  const[error, setError] = React.useState(false);
  const[responses, setResponses] = React.useState(false);
  const[buttonClicked, setButtonClicked] = React.useState(false);
  const [prevResponses, setPrevResponses] = React.useState([]);

  //Callback Handlers 
  const onChangeMovies = (event) => {
    setMovies(event.target.value);
  }
  const onChangeSelectedMovies = (event) => {
    setSelectedMovies(event.target.value);
  }
  const onChangeEnteredTitle = (event) => {
    setEnteredTitle(event.target.value);
  }
  const onChangeEnteredReview = (event) => {
    setEnteredReview(event.target.value);
  }
  const onChangeSelectedRating = (event) => {
    setSelectedRating(event.target.value);
  }

  //Function to check if all fields are filled in 
  const handleSubmit = () => {
    if (enteredTitle.length === 0 || enteredReview.length === 0 || selectedRating === "" || selectedMovie === "") {
      setError(true);
      setResponses(false);
    } else {
      callApiaddReview();
      setResponses(true);
      setError(false);
      setPrevResponses([enteredTitle, enteredReview, selectedMovie, selectedRating]);
    }
  };

  //Function to reset all the states
  const handleClearResponses = () => {
    setEnteredReview('');
    setEnteredTitle('');
    setSelectedMovies('');
    setSelectedRating('');
  }

  //Use the effect hook to reset states after a response is filled out correctly 
  React.useEffect(() => {
    handleClearResponses();
  }, [prevResponses]);

  React.useEffect(() => {
    choseMovieId();
  }, [selectedMovie]);

  return (
    <div>
    
    <Box sx={{ borderBottom: '6px solid #09062A'}}>
      <Grid container 
        justifyContent="center" 
        style={{fontSize: 40, color: '#FFFFFF'}}
        bgcolor="#0A346B">

        <Grid item>    
          <h3>Review a Movie</h3>
        </Grid>
            
      </Grid>
    </Box>

  <Box 
    bgcolor="#F5F5F5">

    <Grid container
      style={{fontSize: 15, color: '#0A346B'}} justifyContent="center">

        <Grid item xs={10} >
            <Box sx={{ m: '2rem'}}>
              <h3>Pick a Movie:</h3>
              <MovieSelection movies={movies} onChangeSelectedMovies={onChangeSelectedMovies} selectedMovie={selectedMovie}/>
              {error && selectedMovie ===""? 
              <label style={{fontSize: 10, color: '#FF0000', marginTop: '-5rem'}} >Select your movie</label>
              : 
              ""}

            </Box>
        </Grid>

        <Grid item xs={8}> 
            <Box sx={{ m: '2rem', marginTop: '-1rem'}}>
              <h3>Enter Your Review Title:</h3>
              <ReviewTitle onChangeEnteredTitle={onChangeEnteredTitle} enteredTitle={enteredTitle}/>
              
              {/* {Conditional Rendering} */}

              {error&&enteredTitle.length==0?
              <label style={{fontSize: 10, color: '#FF0000'}} >Enter your review </label>
              : 
              ""}

            </Box>
        </Grid>

        <Grid item xs={4}> 
            <Box sx={{ m: '2rem', marginTop: '-1rem'}}>
              <h3>Rate From 1-5:</h3>
                <ReviewRating onChangeSelectedRating={onChangeSelectedRating} selectedRating={selectedRating}/> 

                {error && selectedRating===""?
                <label style={{fontSize: 10, color: '#FF0000', labelPlacement: "bottom"}} >Select the rating</label>
                :
                ""}

            </Box>
        </Grid>

        <Grid item xs={8}> 
            <Box sx={{ m: '2rem', marginTop: '-1rem'}}>
              <h3>Enter Your Review:</h3>
              <ReviewBody onChangeEnteredReview={onChangeEnteredReview} enteredReview={enteredReview}/>
              
              {/* {Conditional Rendering} */}
              {error&&enteredReview.length==0?
              <label style={{fontSize: 10, color: '#FF0000', marginRight: '2rem'}} >Enter your review</label>
              :  
              ""}

            </Box>
        </Grid>

        <Grid item xs={4}> 
          <Box sx={{ m: '2rem'}}>
            <Button variant="contained" style={{ backgroundColor: '#0A346B'}}
                    onClick={() => {
                    handleSubmit();
                    setButtonClicked(true);
                    }}>
                Submit   
            </Button>

            {/* When responses are filled correectly and button is clicked, the responses are printed  */}
            {responses&& buttonClicked &&
              <>
                <Typography>
                  <br/>
                  <label style={{color: '#008000'}}>Your review has been received!</label> <br/>
                  Movie: {prevResponses[2]} <br/>
                  Entered Title: {prevResponses[0]} <br/>
                  Entered Review: {prevResponses[1]} <br/>
                  Entered Rating: {prevResponses[3]} <br/>
                </Typography>
              </>
            }
          </Box>
        </Grid>

      </Grid>
    </Box>

    </div>
    
  );
}

export default Review;