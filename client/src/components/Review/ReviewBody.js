import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import {TextField} from '@mui/material';

const ReviewBody = (props) => {


  return (
    <>
    
    <TextField
          label="Add Your Review"
          multiline
          rows={4}
          inputProps={{ maxLength: 200}}
          defaultValue=""
          sx = {{width: '100%'}}
          value = {props.enteredReview}
          onChange = {props.onChangeEnteredReview}
    />

    </>
  );
}

export default ReviewBody;