import { useState } from 'react';
import AccountDetails from './AccountDetails';
import { Account } from '../models/Account';
import { Button, Grid, TextField } from '@mui/material';
import AccountList from './AccountList';
import { AccountSearchModel } from '../models/AccountSearchModel';
import { GridPaginationModel } from '@mui/x-data-grid';

export default function AccountsTab() {
    const [account, setAccount] = useState<Account>();
    const [accounts, setAccounts] = useState<Account[]>();
    const [totalRowCount, setTotalRowCount] = useState<number>(1000);
    const [email, setEmail] = useState<string>('');
    const [searchModel, setSearchModel] = useState<AccountSearchModel>({Name: '', Email: ''});

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
            <Grid container>
                <Grid item xs={4}>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Email'
                        name='Email'
                        variant='standard'
                        value={email}
                        onChange={syncEmailLookupModelToForm}
                    />
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={2}>
                    <Button onClick={getAccountByEmail} variant='contained' disabled={!email || email == ''}>Load account</Button>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={3}>
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
                <Grid item xs={3}>
                    <TextField
                        margin='dense'
                        label='Email'
                        name='Email'
                        variant='standard'
                        value={searchModel?.Email}
                        onChange={syncSearchModelToForm}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={loadAccountSearch} variant='contained' disabled={searchModel?.Name == '' && searchModel?.Email == ''}>Search accounts</Button>
                </Grid>
            </Grid>
            {account && <AccountDetails account={account}/>}
            {accounts && <AccountList accounts={accounts} totalRowCount={totalRowCount} onChangePage={changePage} />}
        </>
    );
}