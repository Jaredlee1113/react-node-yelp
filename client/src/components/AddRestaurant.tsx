"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const RangeSelect = ({ field }) => {
    const rangeLength = new Array(5).fill(0).map((_, i) => i + 1);
    return (
        <Select defaultValue={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="0">Select a range</SelectItem>
                {rangeLength.map((value) => (
                    <SelectItem key={value} value={value.toString()}>
                        {`$`.repeat(value)}
                    </SelectItem>
                ))}
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

export default function AddRestaurant() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            location: "",
            price_range: "0",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full mx-auto flex justify-around items-start space-y-8"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-120 pr-2">
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
                        <FormItem className="w-120 pr-2">
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
                        <FormItem className="w-120 pr-2">
                            <FormControl>
                                <RangeSelect field={field} />
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
