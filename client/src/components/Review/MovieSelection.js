import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import {FormControl, InputLabel, MenuItem} from '@mui/material';

const MovieSelection = (props) => {

  const arrayOfMovies = props.movies.map (movie => (
    movie.name
  ));

  return (
    <>
      <FormControl style={{width: '100%'}}>
          <InputLabel>Choose a Movie</InputLabel>
          <Select value={props.selectedMovie} onChange={props.onChangeSelectedMovies}>
            {arrayOfMovies.map((movieName, index) => 
              <MenuItem key={index} value={movieName}>
                {movieName}
              </MenuItem>
            )}
          </Select>
      </FormControl>
    </>
  );
}

export default MovieSelection;