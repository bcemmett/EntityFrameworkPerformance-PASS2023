import { useState } from 'react';
import { Account } from '../models/Account';
import { Button, Grid, TextField, Typography } from '@mui/material';
import AccountList from './AccountList';
import { AccountSearchModel } from '../models/AccountSearchModel';
import { GridPaginationModel } from '@mui/x-data-grid';
import AccountSummary from './AccountSummary';

export default function AccountsTab() {
    const [account, setAccount] = useState<Account>();
    const [accounts, setAccounts] = useState<Account[]>();
    const [totalRowCount, setTotalRowCount] = useState<number>(81);
    const [email, setEmail] = useState<string>('');
    const [searchModel, setSearchModel] = useState<AccountSearchModel>({Name: '', City: ''});

    async function changePage(pageModel: GridPaginationModel){
        searchAccounts(pageModel);
    }

    async function getAccountByEmail() {
        setAccounts(undefined);
        setAccount(undefined);
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

    function loadAccountSearch(){
        setAccounts([]);
        setAccount(undefined);
    }

    async function searchAccounts(pageModel: GridPaginationModel ) {
        const queryParams = new URLSearchParams({
            page: pageModel?.page.toString(),
            pageSize: pageModel?.pageSize.toString(),
        });
        const settings = {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(searchModel),
        }
        const response = await fetch('api/account/search?' + queryParams, settings);
        if(response.status === 200){
            const data = await response.json();
            setAccounts(data);
        } else {
            setAccounts(undefined);
        }
    }

    function syncEmailLookupModelToForm (e : React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function syncSearchModelToForm (e : React.ChangeEvent<HTMLInputElement>) {
        setSearchModel({ ...searchModel, [e.target.name]: e.target.value});
    }

    return (
        <>
            <Typography variant="h4" color="inherit" component="div">
                Customer account management
            </Typography>
            <Grid container>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        autoFocus
                        margin='dense'
                        label='Email'
                        name='Email'
                        variant='standard'
                        value={email}
                        onChange={syncEmailLookupModelToForm}
                    />
                </Grid>
                <Grid item xs={2} sx={{paddingTop: 2, paddingLeft: 5}}>
                    <Button onClick={getAccountByEmail} variant='contained' disabled={!email || email == ''}>Load account</Button>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={2}>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Name'
                        name='Name'
                        variant='standard'
                        value={searchModel?.Name}
                        onChange={syncSearchModelToForm}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        fullWidth
                        margin='dense'
                        label='City'
                        name='City'
                        variant='standard'
                        value={searchModel?.City}
                        onChange={syncSearchModelToForm}
                    />
                </Grid>
                <Grid item xs={2} sx={{paddingTop: 2, paddingLeft: 5}}>
                    <Button onClick={loadAccountSearch} variant='contained' disabled={searchModel?.Name == '' && searchModel?.City == ''}>Search accounts</Button>
                </Grid>
            </Grid>
            {account && <AccountSummary account={account}/>}
            {accounts && <AccountList accounts={accounts} totalRowCount={totalRowCount} onChangePage={changePage} />}
        </>
    );
}