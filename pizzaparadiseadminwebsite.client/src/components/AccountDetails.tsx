import { Account } from '../models/Account';
import { Box, Button, Grid, Typography } from '@mui/material';

interface AccountDetailsProps{
    account: Account;
}

export default function AccountDetails({account}: AccountDetailsProps) {
  return (
    <>
      <Box sx={{width:'100%', paddingTop:3}}>
        <Typography variant="h6" color="inherit" component="div">
          Details
        </Typography>
        <Typography variant="caption" color="inherit" component="div">
          Found 1 account.
        </Typography>
        <Grid container>
          <Grid item xs={1}>
            <Typography fontWeight={'bold'}>Name:</Typography>
          </Grid>
          <Grid item xs={2}>
            {account.Name}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={1}>
            <Typography fontWeight={'bold'}>Address:</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{whiteSpace: 'pre-line'}}>
              {account.Address1}{'\n'}
              {account.Address2}{'\n'}
              {account.City}{'\n'}
              {account.PostalCode}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={1}>
            <Typography fontWeight={'bold'}>Phone:</Typography>
          </Grid>
          <Grid item xs={2}>
            {account.Phone}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={1}>
            <Typography fontWeight={'bold'}>Email:</Typography>
          </Grid>
          <Grid item xs={2}>
            {account.Email}
          </Grid>
        </Grid>
        <Grid container>
          <Grid sx={{paddingTop:3}} item xs={2}>
            <Button variant='contained'>Open in account management view</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}