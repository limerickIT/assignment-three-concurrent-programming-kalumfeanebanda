import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import WishlistPage from "./pages/WishlistPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;