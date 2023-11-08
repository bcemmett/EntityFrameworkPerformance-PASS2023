import { useState } from 'react';
import { Restaurant } from '../models/Restaurant';
import RestaurantList from './RestaurantList';
import { GridPaginationModel } from '@mui/x-data-grid';

export default function RestaurantsTab() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [totalRowCount, setTotalRowCount] = useState<number>(62);

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
    }

    return (
        <>
          <RestaurantList restaurants={restaurants} totalRowCount={totalRowCount} onChangePage={changePage} />
        </>
    );
}