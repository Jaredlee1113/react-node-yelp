import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";

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
            console.log(" restaurant:", restaurant);
            return (
                <div>
                    <Button className="mr-2">Edit</Button>
                    <Button>Delete</Button>
                </div>
            );
        },
    },
];
