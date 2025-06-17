import Header from "@/components/Header";
import AddRestaurant from "@/components/AddRestaurant";
import { RestaurantList } from "@/components/restaurant-list/RestaurantList";

import { useState, useEffect } from "react";
import type { Restaurant } from "@/components/restaurant-list/columns";

const Home = () => {
    const [restaurants, setResaurants] = useState<Restaurant[]>([]);

    const getRestaurant = () => {
        let mockData: Restaurant[];
        setTimeout(() => {
            mockData = [
                {
                    id: 1,
                    name: "Macdonald",
                    location: "New York",
                    price_range: "3",
                },
                {
                    id: 2,
                    name: "Pizza Hut",
                    location: "Washington",
                    price_range: "2",
                },
                {
                    id: 3,
                    name: "Kind Hanburger",
                    location: "Danver",
                    price_range: "1",
                },
            ];
            setResaurants(mockData);
        }, 500);
    };

    useEffect(() => {
        getRestaurant();
    }, []);

    return (
        <div>
            <Header />
            <AddRestaurant />
            <RestaurantList data={restaurants} />
        </div>
    );
};

export default Home;
