import { useState, useEffect } from 'react';
import { Restaurant } from '../models/Restaurant';
import RestaurantList from './RestaurantList';

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>();

    useEffect(() => {
        getRestaurants();
    }, []);

    async function getRestaurants() {
        const response = await fetch('api/restaurant/list-restaurants');
        const data = await response.json();
        setRestaurants(data);
    }

    return (
        <>
          {!restaurants && <div>Loading...</div>}
          {restaurants && <RestaurantList restaurants={restaurants}/>}
        </>
    );
}