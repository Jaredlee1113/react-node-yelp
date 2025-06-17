import type { Restaurant } from "./columns";
import { columns } from "./columns";
import { DataTable } from "./datatable";

export function RestaurantList({ data }: { data: Restaurant[] }) {
    return <DataTable columns={columns} data={data} />;
}
