import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdatePage";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

function App() {
    return (
        <div className="p-10">
            <RestaurantsContextProvider>
                <Router>
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
                        <Route path="/restaurant/:id/update" element={<UpdatePage />} />
                    </Routes>
                </Router>
            </RestaurantsContextProvider>
        </div>
    );
}

export default App;
