<Grid
  container
  spacing={2}
>
  <Grid
    item
    xs={12}
    sm={6}
  >
    <Typography
      variant="subtitle1"
      color={'#660066'}
      sx={{
        marginTop: { xs: '2rem', sm: '1.5rem' },
        marginBottom: { xs: '1rem', sm: '1rem' },
      }}
    >
      Billing Address
    </Typography>
    <TextField
      variant="filled"
      required
      fullWidth
      name="billingStreet"
      label="Billing Street"
      id="billingStreet"
      sx={mediaStyleInput}
      size="small"
      /* value={data.billingStreet}
                  onChange={(e) => setData({ ...data, billingStreet: e.target.value })} */
    />
    <TextField
      variant="filled"
      required
      fullWidth
      name="billingCity"
      label="Billing City"
      id="billingCity"
      sx={mediaStyleInput}
      size="small"
      /* value={data.billingCity}
                  onChange={(e) => setData({ ...data, billingCity: e.target.value })} */
    />
    <TextField
      variant="filled"
      required
      fullWidth
      name="billingPostalCode"
      label="Billing Postal Code"
      id="billingPostalCode"
      sx={mediaStyleInput}
      size="small"
      /* value={data.billingPostalCode}
                  onChange={(e) => setData({ ...data, billingPostalCode: e.target.value })} */
    />
    <TextField
      variant="filled"
      required
      fullWidth
      name="billingCountry"
      label="Billing Country"
      id="billingCountry"
      sx={mediaStyleInput}
      size="small"
      /* value={data.billingCountry}
                  onChange={(e) => setData({ ...data, billingCountry: e.target.value })} */
    />
    <FormControlLabel
      control={
        <Checkbox
          value="useBillingAsShipping"
          color="primary"
          name="useBillingAsShipping"
        />
      }
      label="Use by default"
    />
  </Grid>
  <Grid
    item
    xs={12}
    sm={6}
  >
    <Typography
      variant="subtitle1"
      color={'#660066'}
      sx={{
        marginTop: { xs: '1rem', sm: '1.5rem' },
        marginBottom: { xs: '1rem', sm: '1rem' },
      }}
    >
      Shipping Address
    </Typography>

    <TextField
      variant="filled"
      required
      fullWidth
      name="shippingStreet"
      label="Shipping Street"
      id="shippingStreet"
      sx={mediaStyleInput}
      size="small"
      /* value={data.shippingStreet}
                  onChange={(e) => setData({ ...data, shippingStreet: e.target.value })} */
    />
    <TextField
      variant="filled"
      required
      fullWidth
      name="shippingCity"
      label="Shipping City"
      id="shippingCity"
      sx={mediaStyleInput}
      size="small"
      /* value={data.shippingCity}
                  onChange={(e) => setData({ ...data, shippingCity: e.target.value })} */
    />
    <TextField
      variant="filled"
      required
      fullWidth
      name="shippingPostalCode"
      label="Shipping Postal Code"
      id="shippingPostalCode"
      sx={mediaStyleInput}
      size="small"
      /* value={data.shippingPostalCode}
                  onChange={(e) => setData({ ...data, shippingPostalCode: e.target.value })} */
    />
    <TextField
      variant="filled"
      required
      fullWidth
      name="shippingCountry"
      label="Shipping Country"
      id="shippingCountry"
      sx={mediaStyleInput}
      size="small"
      /* value={data.shippingCountry}
                  onChange={(e) => setData({ ...data, shippingCountry: e.target.value })} */
    />
    <FormControlLabel
      control={
        <Checkbox
          value="useShippingAsBilling"
          color="primary"
          name="useShippingAsBilling"
        />
      }
      label="Use by default"
    />
  </Grid>
</Grid>;
