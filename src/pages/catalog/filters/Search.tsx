import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { resetFilter, setSearch, getProductsWithFilter } from '@/store/slices/productSlice';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    void dispatch(getProductsWithFilter());
    void dispatch(resetFilter());
  };

  useEffect(() => {
    dispatch(setSearch(searchText));
  }, [searchText]);

  return (
    <Stack
      direction="row"
      sx={{ mt: 0.8, ml: 2 }}
    >
      <TextField
        value={searchText}
        sx={{ width: 500, height: 50 }}
        label="Search input"
        variant="standard"
        InputProps={{
          type: 'search',
        }}
        onChange={(event) => setSearchText(event.target.value as string)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') handleSearch();
        }}
      />
      <IconButton
        aria-label="search"
        color="primary"
        sx={{ '&:focus': { outline: 'none' }, width: 60 }}
        onClick={handleSearch}
      >
        <SearchIcon sx={{ '&:focus': { outline: 'none' } }} />
      </IconButton>
    </Stack>
  );
};
