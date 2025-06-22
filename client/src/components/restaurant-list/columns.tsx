import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import RestaurantFinder from "@/api/RestaurantFinder";
import { RestaurantsContext } from "@/context/RestaurantsContext";
import { useContext } from "react";
import { useNavigate } from "react-router";

const OperationColumn = ({ restaurant }) => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDelete = async (e: any, id: string) => {
        e.stopPropagation();
        try {
            const res = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter((item) => item.id !== id));
            console.log(" handleDelete ~ res:", res);
        } catch (error) {
            console.log(" handleDelete ~ error:", error);
        }
    };

    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEdit = (e: any, id: string) => {
        e.stopPropagation();
        navigate(`/restaurant/${id}/update`);
    };

    return (
        <div>
            <Button className="mr-2" onClick={(e) => handleEdit(e, restaurant.id)}>
                Edit
            </Button>
            <Button onClick={(e) => handleDelete(e, restaurant.id)}>Delete</Button>
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
        cell: ({ row }) => {
            const { price_range } = row.original;
            return <div>{"$".repeat(Number(price_range))}</div>;
        },
    },
    {
        accessorKey: "rating",
        header: "Ratings",
        cell: ({ row }) => {
            const { price_range } = row.original;
            return (
                <Rating defaultValue={Number(price_range)}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <RatingButton key={index} className="text-amber-400" />
                    ))}
                </Rating>
            );
        },
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
