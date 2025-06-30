import { useEffect, useContext } from "react";

import { columns } from "./columns";
import { DataTable } from "./datatable";
import { RestaurantsContext } from "@/context/RestaurantsContext";
import RestaurantFinder from "@/api/RestaurantFinder";
import { useNavigate } from "react-router";

export function RestaurantList() {
    const { restaurants, setRestaurants, setSelectedRestaurant } = useContext(RestaurantsContext);
    useEffect(() => {
        const fetchData = async () => {
            const res = await RestaurantFinder.get("/restaurants");
            setRestaurants(res.data.data);
        };
        fetchData();
    }, []);
    const navigate = useNavigate();
    const handleRowClick = (row) => {
        const restaurant = row.original;
        setSelectedRestaurant(restaurant);
        navigate(`/restaurant/${restaurant.id}`);
    };

    return <DataTable columns={columns} data={restaurants} handleRowClick={handleRowClick} />;
}
