import { useAppSelector } from '@/hooks/reduxHooks';
import { Box, Chip, Stack, Tooltip, Typography } from '@mui/material';

const boxStyles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'justify',
  '@media (max-width: 600px)': { flexDirection: 'column' },
};

export const DiscountCodes: React.FC = () => {
  const discounts = useAppSelector((state) => state.carts.discounts);

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          mb: '25px',
          fontSize: '27px',
          '@media (max-width: 900px)': { marginBottom: '10px', fontSize: '25px' },
          '@media (max-width: 600px)': { marginBottom: '5px', fontSize: '20px' },
        }}
      >
        Our offers and discounts:
      </Typography>
      <Box
        sx={boxStyles}
        mb={2}
      >
        <Typography
          sx={{
            fontSize: '18px',
            textAlign: 'left',
            '@media (max-width: 900px)': { fontSize: '18px' },
            '@media (max-width: 600px)': { fontSize: '14px' },
          }}
          mr={2}
        >
          Сopy the code for your cart:
        </Typography>
        <Box>
          <Stack
            direction="row"
            spacing={1}
          >
            {discounts.map((discount) => {
              return (
                <Tooltip
                  title={discount.description!.en}
                  key={discount.id}
                  sx={{ '&:hover': { cursor: 'cursor' } }}
                >
                  <Chip
                    sx={{
                      '@media (max-width: 900px)': { size: 'small' },
                      '@media (max-width: 600px)': { size: '15px' },
                    }}
                    label={discount.code}
                    color="primary"
                  />
                </Tooltip>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </>
  );
};
