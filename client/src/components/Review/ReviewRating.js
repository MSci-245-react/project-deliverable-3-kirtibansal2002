import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import {FormControl, FormLabel, FormControlLabel, RadioGroup, Radio} from '@mui/material';

const ReviewRating = (props) => {

  return (
    <>
      <FormControl style={{width: '100%'}}>
        <RadioGroup
          row
          labelPlacement="bottom"
          value={props.selectedRating}
          onChange={props.onChangeSelectedRating}
        >
          <FormControlLabel 
              value="1" 
              control={<Radio />} 
              label="1"/>
          <FormControlLabel 
              value="2" 
              control={<Radio />} 
              label="2"/>
          <FormControlLabel 
              value="3" 
              control={<Radio />} 
              label="3"/>
          <FormControlLabel 
              value="4" 
              control={<Radio />} 
              label="4"/>
          <FormControlLabel 
              value="5" 
              control={<Radio />} 
              label="5"/>
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default ReviewRating;