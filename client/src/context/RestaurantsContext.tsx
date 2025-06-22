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
    selectedRestaurant: Restaurant | null;
    setSelectedRestaurant: React.Dispatch<React.SetStateAction<Restaurant | null>>;
}

export const RestaurantsContext = createContext<RestaurantsContextInterface>(
    {} as RestaurantsContextInterface
);

export const RestaurantsContextProvider = (props) => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

    const addRestaurant = (restaurant: Restaurant) => setRestaurants([...restaurants, restaurant]);
    return (
        <RestaurantsContext
            value={{
                restaurants,
                setRestaurants,
                addRestaurant,
                selectedRestaurant,
                setSelectedRestaurant,
            }}
        >
            {props.children}
        </RestaurantsContext>
    );
};
