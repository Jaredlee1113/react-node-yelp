import Header from "@/components/Header";
import AddRestaurant from "@/components/AddRestaurant";
import { RestaurantList } from "@/components/restaurant-list/RestaurantList";

const Home = () => {
    return (
        <div>
            <Header />
            <AddRestaurant />
            <RestaurantList />
        </div>
    );
};

export default Home;
