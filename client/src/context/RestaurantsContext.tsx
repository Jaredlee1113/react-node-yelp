import { useState, createContext } from "react";

export declare type Restaurant = {
    id: string;
    name: string;
    location: string;
    price_range: string;
};

interface RestaurantsContextInterface {
    restaurants: Restaurant[];
    setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
    addRestaurant: (restaurant: Restaurant) => void;
}

export const RestaurantsContext = createContext<RestaurantsContextInterface>(
    {} as RestaurantsContextInterface
);

export const RestaurantsContextProvider = (props) => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    const addRestaurant = (restaurant: Restaurant) => setRestaurants([...restaurants, restaurant]);
    return (
        <RestaurantsContext value={{ restaurants, setRestaurants, addRestaurant }}>
            {props.children}
        </RestaurantsContext>
    );
};
