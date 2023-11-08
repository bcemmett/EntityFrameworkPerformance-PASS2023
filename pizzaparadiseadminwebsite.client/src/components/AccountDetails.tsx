import { Account } from '../models/Account';
import { Box, Grid } from '@mui/material';

interface AccountDetailsProps{
    account: Account;
}

export default function AccountDetails({account}: AccountDetailsProps) {
  return (
    <Box sx={{width:'100%'}}>
      <Grid container>
              <Grid item xs={9}>
                Hu
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={2}>
                Wa
              </Grid>
            </Grid>
    </Box>
  );
}