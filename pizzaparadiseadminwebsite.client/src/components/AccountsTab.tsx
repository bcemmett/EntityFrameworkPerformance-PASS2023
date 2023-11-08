import { useState } from 'react';
import AccountDetails from './AccountDetails';
import { Account } from '../models/Account';
import { Button, Grid, TextField } from '@mui/material';

export default function AccountsTab() {
    const [account, setAccount] = useState<Account>();
    const [email, setEmail] = useState<string>('');

    async function getAccountByEmail() {
        const queryParams = new URLSearchParams({
            email: email,
        });
        const response = await fetch('api/account/get-by-email?' + queryParams);
        if(response.status === 200){
            const data = await response.json();
            setAccount(data);
        } else {
            setAccount(undefined);
        }
    }

    function syncModelToForm (e : React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    return (
        <>
            <Grid container>
                <Grid item xs={4}>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Email'
                        name='Email'
                        variant='standard'
                        value={email}
                        onChange={syncModelToForm}
                    />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={2}>
                    <Button onClick={getAccountByEmail} variant='contained' disabled={!email || email == ''}>Load account</Button>
                </Grid>
            </Grid>
            {account && <AccountDetails account={account}/>}
        </>
    );
}