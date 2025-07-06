import { useEffect, useContext } from "react";
import StarRate from "./StarRating";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import RestaurantFinder from "@/api/RestaurantFinder";
import { RestaurantsContext } from "@/context/RestaurantsContext";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export type Review = {
    id: string;
    name: string;
    rating: number;
    review: string;
};

const Review = ({ reviewData }: { reviewData: Review }) => {
    const { name, rating, review, id } = reviewData;
    const { selectedRestaurant } = useContext(RestaurantsContext);
    const deleteReview = async (id: string) => {
        try {
            await RestaurantFinder.delete(`/reviews/${id}`, {
                data: { restaurant_id: selectedRestaurant?.id },
            });
            window.location.reload();
        } catch (error) {
            console.log(" deleteReview ~ error:", error);
        }
    };

    return (
        <div className="min-w-md rounded-xl border-2 border-black h-36 flex flex-col">
            <div className="flex items-center justify-between p-2">
                <span>{name}</span>
                <StarRate rating={rating} />
            </div>
            <Separator />
            <div className="flex items-start justify-center flex-col flex-1 p-2">
                <span className="leading-7">{review}</span>
            </div>
            <div className="w-full flex justify-end gap-1 p-2">
                <Button variant="outline">Update</Button>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the
                                review.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteReview(id)}>
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default Review;
