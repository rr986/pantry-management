import { TextField } from '@mui/material';

export default function SearchBar({ value, onChange }) {
  return (
    <TextField
      label="Search"
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
    />
  );
}
