import { useEffect, useContext } from "react";

import { columns } from "./columns";
import { DataTable } from "./datatable";
import { RestaurantsContext } from "@/context/RestaurantsContext";
import RestaurantFinder from "@/api/RestaurantFinder";

export function RestaurantList() {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    useEffect(() => {
        const fetchData = async () => {
            const res = await RestaurantFinder.get("/");
            setRestaurants(res.data.data);
        };
        fetchData();
    }, []);

    return <DataTable columns={columns} data={restaurants} />;
}
