import { useState, createContext } from "react";

export const RestaurantsContext = createContext({});

export const RestaurantsContextProvider = (props) => {
    const [restaurants, setRestaurants] = useState([]);

    const addRestaurant = (restaurant) => setRestaurants([...restaurants, restaurant]);
    return (
        <RestaurantsContext value={{ restaurants, setRestaurants, addRestaurant }}>
            {props.children}
        </RestaurantsContext>
    );
};
