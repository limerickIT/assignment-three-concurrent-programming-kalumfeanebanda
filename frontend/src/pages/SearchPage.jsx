import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import "./SearchPage.css";

function SearchPage() {
    const [name, setName] = useState("");
    const [keyword, setKeyword] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minRating, setMinRating] = useState("");
    const [recent, setRecent] = useState(false);

    const [categories, setCategories] = useState([]);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        fetch("http://localhost:8080/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error("Error loading categories", err));
    }, []);


    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");


        try {
            const params = new URLSearchParams();

            if (name.trim() !== "") params.append("name", name.trim());
            if (keyword.trim() !== "") params.append("keyword", keyword.trim());
            if (categoryId.trim() !== "") params.append("categoryId", categoryId.trim());
            if (minPrice.trim() !== "") params.append("minPrice", minPrice.trim());
            if (maxPrice.trim() !== "") params.append("maxPrice", maxPrice.trim());
            if (minRating.trim() !== "") params.append("minRating", minRating.trim());
            if (recent) params.append("recent", "true");

            const url =
                "http://localhost:8080/api/products/search" +
                (params.toString() ? `?${params.toString()}` : "");

            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Search request failed");
            }

            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error(err);
            setError("Something went wrong while searching.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "1.5rem", fontFamily: "sans-serif" }}>
            <h1>Zelora – Product Search</h1>

            {/* ---- SEARCH FORM ---- */}
            <form
                onSubmit={handleSearch}
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "0.75rem",
                    marginBottom: "1.5rem",
                    alignItems: "end",
                }}
            >
                <div>
                    <label>Product Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. T-Shirt"
                        style={{ width: "100%" }}
                    />
                </div>

                <div>
                    <label>Keyword</label>
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="description / material / brand"
                        style={{ width: "100%" }}
                    />
                </div>

                <div>
                    <label>Category</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="">All categories</option>
                        {categories.map((c) => (
                            <option key={c.categoryId} value={c.categoryId}>
                                {c.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Min Price</label>
                    <input
                        type="number"
                        step="0.01"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        style={{ width: "100%" }}
                    />
                </div>

                <div>
                    <label>Max Price</label>
                    <input
                        type="number"
                        step="0.01"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        style={{ width: "100%" }}
                    />
                </div>

                <div>
                    <label>Min Rating</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={minRating}
                        onChange={(e) => setMinRating(e.target.value)}
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <input
                        id="recent"
                        type="checkbox"
                        checked={recent}
                        onChange={(e) => setRecent(e.target.checked)}
                    />
                    <label htmlFor="recent">Recently Added (last 30 days)</label>
                </div>

                <button
                    type="submit"
                    style={{
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    Search
                </button>
            </form>

            {/* ---- STATUS ---- */}
            {loading && <p>Searching...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* ---- RESULTS TABLE ---- */}
            <h2>Results</h2>
            {products.length === 0 && !loading && <p>No products found yet.</p>}

            {products.length > 0 && (
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "0.5rem",
                    }}
                >
                    <thead>
                    <tr>
                        <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>
                            ID
                        </th>
                        <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>
                            Name
                        </th>
                        <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>
                            Category
                        </th>
                        <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>
                            Price
                        </th>
                        <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>
                            Discounted
                        </th>
                        <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>
                            Rating
                        </th>
                        <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>
                            Details
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((p) => (
                        <tr key={p.productId}>
                            <td style={{ borderBottom: "1px solid #eee" }}>{p.productId}</td>
                            <td style={{ borderBottom: "1px solid #eee" }}>{p.productName}</td>
                            <td style={{ borderBottom: "1px solid #eee" }}>
                                {p.categoryName || "-"}
                            </td>
                            <td style={{ borderBottom: "1px solid #eee" }}>
                                ${p.price?.toFixed ? p.price.toFixed(2) : p.price}
                            </td>
                            <td style={{ borderBottom: "1px solid #eee" }}>
                                {p.discountedPrice != null
                                    ? `$${p.discountedPrice?.toFixed
                                        ? p.discountedPrice.toFixed(2)
                                        : p.discountedPrice
                                    }`
                                    : "-"}
                            </td>
                            <td style={{ borderBottom: "1px solid #eee" }}>
                                {p.sustainabilityRating ?? "-"}
                            </td>
                            <td style={{ borderBottom: "1px solid #eee" }}>
                                <Link to={`/products/${p.productId}`}>View</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SearchPage;