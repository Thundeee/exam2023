import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const GuestField = ({ props, guests, setGuests }) => {
  const maxGuests = props;

  const handleIncrease = () => {
    if (guests >= maxGuests) return;
    setGuests(guests + 1);
  };

  const handleDecrease = () => {
    if (guests <= 1) return;
    setGuests(guests - 1);
  };

  return (
    <TextField
      label="Number of Guests"
      type="number"
      value={guests}
      InputProps={{
        inputProps: {
          min: 1,
          max: maxGuests,
        },
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="Decrease Guests" onClick={handleDecrease}>
              <RemoveIcon />
            </IconButton>
            <IconButton aria-label="Increase Guests" onClick={handleIncrease}>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default GuestField;
