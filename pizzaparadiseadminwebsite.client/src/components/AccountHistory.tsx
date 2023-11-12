import { Box, Grid } from '@mui/material';
import { PaymentCard } from '../models/PaymentCard';
import { Address } from '../models/Address';
import PaymentCardList from './PaymentCardList';
import AddressList from './AddressList';

interface AccountHistoryProps{
    addresses: Address[];
    paymentCards: PaymentCard[];
}

export default function AccountHistory({addresses, paymentCards}: AccountHistoryProps) {
  return (
    <>
        <Box sx={{width:'100%', paddingTop:3}}>
          <Grid container>
            <Grid item xs={5}>
              <AddressList addresses={addresses} />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={6}>
              <PaymentCardList paymentCards={paymentCards} />
            </Grid>
          </Grid>
        </Box>
    </>
  );
}