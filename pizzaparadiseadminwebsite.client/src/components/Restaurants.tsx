import { Restaurant } from '../models/Restaurant';
import RestaurantList from './RestaurantList';

export default function Restaurants() {
    var restaurants : Restaurant[] = [
        { id: 1, name: 'Restaurant 1', phone: '0123456789' },
        { id: 2, name: 'Restaurant 2', phone: '3456789012' },
        { id: 3, name: 'Restaurant 3', phone: '6789012345' },
    ];
    return (
        <RestaurantList restaurants={restaurants}/>
    );
}