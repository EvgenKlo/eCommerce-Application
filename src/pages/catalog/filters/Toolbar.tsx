import { Box } from '@mui/material';
import { SortBar } from './Sort';
import { Search } from './Search';

export const Toolbar: React.FC = () => {
  return (
    <Box sx={{ maxWidth: '500px', display: 'flex' }}>
      <SortBar />
      <Search />
    </Box>
  );
};
