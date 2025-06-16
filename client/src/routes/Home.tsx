import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import AddRestaurant from "@/components/AddRestaurant";
const Home = () => {
    return (
        <div>
            <Header />
            <AddRestaurant />
            <Button>Get Started</Button>
        </div>
    );
};

export default Home;
