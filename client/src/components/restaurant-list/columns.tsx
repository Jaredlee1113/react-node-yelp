import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/StarRating";
import RestaurantFinder from "@/api/RestaurantFinder";
import { RestaurantsContext } from "@/context/RestaurantsContext";
import { useContext } from "react";
import { useNavigate } from "react-router";
import DeleteAlert from "../DeleteAlert";

const OperationColumn = ({ restaurant }) => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDelete = async (id: string) => {
        try {
            await RestaurantFinder.delete(`/restaurants/${id}`);
            setRestaurants(restaurants.filter((item) => item.id !== id));
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
            <DeleteAlert
                description="This action cannot be undone. This will permanently delete the current data and relative reviews."
                clickEvent={() => handleDelete(restaurant.id)}
            >
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    Delete
                </Button>
            </DeleteAlert>
        </div>
    );
};

export type Restaurant = {
    id: string;
    name: string;
    location: string;
    average_rating: number;
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
        accessorKey: "average_rating",
        header: "Ratings",
        cell: ({ row }) => {
            const { average_rating } = row.original;
            return <StarRating rating={average_rating} />;
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
