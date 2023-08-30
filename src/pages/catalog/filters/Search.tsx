import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { resetFilter, setSearch, getProductsWithFilter } from '@/store/slices/productSlice';
import { TextField, Stack, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const Search: React.FC = () => {
  const stateSearch = useAppSelector((state) => state.products.search);
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState(stateSearch);

  const handleSearch = () => {
    void dispatch(setSearch(searchText));
    void dispatch(resetFilter());
    void dispatch(getProductsWithFilter());
  };

  useEffect(() => {
    if (!stateSearch) {
      setSearchText('');
      void dispatch(getProductsWithFilter());
    }
  }, [stateSearch, dispatch]);

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
        onChange={(event) => setSearchText(event.target.value)}
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
