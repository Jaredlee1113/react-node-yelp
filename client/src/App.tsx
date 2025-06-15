import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdatePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
                <Route path="/restaurant/:id/update" element={<UpdatePage />} />
            </Routes>
        </Router>
    );
}

export default App;
