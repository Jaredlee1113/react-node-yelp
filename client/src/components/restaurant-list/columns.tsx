import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import RestaurantFinder from "@/api/RestaurantFinder";
import { RestaurantsContext } from "@/context/RestaurantsContext";
import { useContext } from "react";

const OperationColumn = ({ restaurant }) => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    const handleDelete = async (id: string) => {
        try {
            const res = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter((item) => item.id !== id));
            console.log(" handleDelete ~ res:", res);
        } catch (error) {
            console.log(" handleDelete ~ error:", error);
        }
    };
    return (
        <div>
            <Button className="mr-2">Edit</Button>
            <Button onClick={() => handleDelete(restaurant.id)}>Delete</Button>
        </div>
    );
};

export type Restaurant = {
    id: string;
    name: string;
    location: string;
    price_range: string;
};

export const columns: ColumnDef<Restaurant>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "price_range",
        header: "Price Range",
    },
    {
        accessorKey: "rating",
        header: "Ratings",
        cell: () => (
            <Rating defaultValue={3}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <RatingButton key={index} />
                ))}
            </Rating>
        ),
    },
    {
        accessorKey: "operations",
        header: "Operations",
        cell: ({ row }) => {
            const restaurant = row.original;
            return <OperationColumn restaurant={restaurant} />;
        },
    },
];
