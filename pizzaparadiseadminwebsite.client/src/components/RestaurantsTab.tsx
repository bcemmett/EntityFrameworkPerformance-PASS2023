import { useState } from 'react';
import { Restaurant } from '../models/Restaurant';
import RestaurantList from './RestaurantList';
import { GridPaginationModel } from '@mui/x-data-grid';
import { Account } from '../models/Account';
import AccountList from './AccountList';

export default function RestaurantsTab() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [totalRowCount, setTotalRowCount] = useState<number>(62);
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>();
    const [accounts, setAccounts] = useState<Account[]>();
    const [showRestaurants, setShowRestaurants] = useState<boolean>(true);

    async function changePage(pageModel: GridPaginationModel){
        getRestaurants(pageModel);
    }

    async function getRestaurants(pageModel: GridPaginationModel) {
        const queryParams = new URLSearchParams({
            page: pageModel?.page.toString(),
            pageSize: pageModel?.pageSize.toString(),
        });
        const response = await fetch('api/restaurant/list-restaurants?' + queryParams);
        const data = await response.json();
        setRestaurants(data);
        setShowRestaurants(true);
    }

    async function getAccountsNearRestaurant(restaurant: Restaurant) {
        const queryParams = new URLSearchParams({
            miles: '20',
            zipCode: restaurant.PostalCode,
        });
        console.log(restaurant);
        const response = await fetch('api/account/search-by-location?' + queryParams);
        const data = await response.json();
        setAccounts(data);
    }

    function LoadNearbyAccount(restaurant: Restaurant) {
        getAccountsNearRestaurant(restaurant);
        setShowRestaurants(false);
    }

    function dummyFunction(){
    }

    return (
        <>
          {showRestaurants && <RestaurantList restaurants={restaurants} totalRowCount={totalRowCount} onChangePage={changePage} onLoadNearbyAccounts={LoadNearbyAccount} />}
          {accounts && <AccountList accounts={accounts} onChangePage={dummyFunction} onLoadDetails={dummyFunction} totalRowCount={accounts.length}/>}
        </>
    );
}