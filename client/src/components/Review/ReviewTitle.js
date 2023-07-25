import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import {Box, TextField} from '@mui/material';

const ReviewTitle = (props) => {

  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': {width: '75%'}
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" 
                   label="Add a Review Title" 
                   variant="outlined"
                   value={props.enteredTitle}
                   onChange={props.onChangeEnteredTitle}
        />
      </Box>
    </>
  );
}

export default ReviewTitle;
