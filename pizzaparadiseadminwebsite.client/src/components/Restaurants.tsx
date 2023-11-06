import { useState, useEffect } from 'react';
import { Restaurant } from '../models/Restaurant';
import RestaurantList from './RestaurantList';
import { GridPaginationModel } from '@mui/x-data-grid';

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>();
    const [totalRowCount, setTotalRowCount] = useState<number>(62);
    const [pageModel, setPageModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });

    useEffect(() => {
        getRestaurants();
    }, [pageModel]);

    async function changePage(pageModel: GridPaginationModel){
        setPageModel(pageModel);
    }

    async function getRestaurants() {
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
          {!restaurants && <div>Loading...</div>}
          {restaurants && <RestaurantList restaurants={restaurants} pageModel={pageModel} totalRowCount={totalRowCount} onChangePage={changePage} />}
        </>
    );
}