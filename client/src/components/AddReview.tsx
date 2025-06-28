"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import RestaurantFinder from "@/api/RestaurantFinder";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "react-router";
import { useContext } from "react";
import { RestaurantsContext } from "@/context/RestaurantsContext";

const RateSelect = ({ field }) => {
    return (
        <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Rate" />
            </SelectTrigger>
            <SelectContent>
                {new Array(5)
                    .fill(0)
                    .map((_, i) => i + 1)
                    .map((value) => (
                        <SelectItem key={value} value={value.toString()}>
                            {value}
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    );
};

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Please enter at least 2 character.",
    }),
    rating: z.string().refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
        message: "Please select a rating.",
    }),
    review: z.string().min(2, {
        message: "Please enter at least 2 character.",
    }),
});

export default function AddReview({ reviews, setReviews }) {
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);
    const { id } = useParams();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            rating: "",
            review: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { name, rating, review } = values;
        try {
            const res = await RestaurantFinder.post(`/${id}/addReview`, {
                name,
                rating,
                review,
            });
            console.log(" onSubmit ~ res:", res);
            form.reset();
            setReviews([...reviews, res.data.data]);
            const updatedRestaurant = {
                ...selectedRestaurant,
                average_rating: Number(res.data.data.average_rating),
            };
            console.log(" onSubmit ~ updatedRestaurant:", updatedRestaurant);
            setSelectedRestaurant(updatedRestaurant);
        } catch (error) {
            console.log(" onSubmit ~ error:", error);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full mx-auto gap-4 flex flex-col"
            >
                <div className="w-full flex flex-row gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Please enter your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Rate</FormLabel>
                                <FormControl>
                                    <RateSelect field={field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="review"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Review</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="Please enter your review" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormItem className="flex-1">
                    <Button type="submit">Add</Button>
                </FormItem>
            </form>
        </Form>
    );
}
