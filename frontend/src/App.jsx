import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;