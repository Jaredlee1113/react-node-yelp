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
    SelectLabel,
    SelectGroup,
} from "@/components/ui/select";
import RestaurantFinder from "@/api/RestaurantFinder";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const RangeSelect = ({ field }) => {
    const rangeLength = new Array(5).fill(0).map((_, i) => i + 1);
    return (
        <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Price Range" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Price Range</SelectLabel>
                    {rangeLength.map((value) => (
                        <SelectItem key={value} value={value.toString()}>
                            {`$`.repeat(value)}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const formSchema = z.object({
    name: z.string().min(2, {
        message: "At least 2 characters.",
    }),
    location: z.string().min(2, {
        message: "At least 2 characters.",
    }),
    price_range: z.string().refine(
        (val) => {
            const num = Number(val);
            return !isNaN(num) && num > 0;
        },
        {
            message: "Please select a price range greater than 0.",
        }
    ),
});

export default function UpdatePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            location: "",
            price_range: "0",
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await RestaurantFinder.get(`/${id}`);
                const { name, location, price_range } = res.data.data;
                form.setValue("name", name);
                form.setValue("location", location);
                form.setValue("price_range", price_range);
            } catch (error) {
                console.log(" fetchData ~ error:", error);
            }
        };
        fetchData();
    }, []);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { name, location, price_range } = values;
        try {
            await RestaurantFinder.put(`/${id}`, {
                name,
                location,
                price_range,
            });
            navigate("/");
        } catch (error) {
            console.log(" onSubmit ~ error:", error);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full mx-auto flex flex-col justify-around items-start space-y-8"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-full pr-2">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input className="w-full" placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem className="w-full pr-2">
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input className="w-full" placeholder="Location" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price_range"
                    render={({ field }) => (
                        <FormItem className="w-full pr-2">
                            <FormLabel>Price Range</FormLabel>
                            <FormControl>
                                <RangeSelect field={field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormItem className="m-auto">
                    <Button type="submit">Update</Button>
                </FormItem>
            </form>
        </Form>
    );
}
