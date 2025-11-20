import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import "./SearchPage.css";

function SearchPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);

    // simple search fields (just name + recent for now)
    const [name, setName]         = useState("");
    const [recent, setRecent]     = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();

            if (name.trim() !== "") {
                params.append("name", name.trim());
            }
            if (recent) {
                params.append("recent", "true");
            }

            const url =
                params.toString().length > 0
                    ? `http://localhost:8080/api/products/search?${params.toString()}`
                    : "http://localhost:8080/api/products/search";

            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error(err);
            setError("Oops, could not load products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchProducts();
    };

    return (
        <div className="page">
            <header className="page-header">
                <h1>Zelora Product Search</h1>
                <p>Browse sustainable fashion products from the Zelora catalog.</p>
            </header>

            <section className="filters">
                <form onSubmit={handleSubmit} className="filters-form">
                    <div className="field">
                        <label htmlFor="name">Name contains</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. t-shirt, jacket, jeans..."
                        />
                    </div>

                    <div className="field checkbox-field">
                        <label>
                            <input
                                type="checkbox"
                                checked={recent}
                                onChange={(e) => setRecent(e.target.checked)}
                            />
                            Only show recent (last 30 days)
                        </label>
                    </div>

                    <button type="submit" className="btn-primary">
                        Search
                    </button>
                </form>
            </section>

            <section className="results">
                {loading && <p>Loading products...</p>}
                {error && <p className="error">{error}</p>}

                {!loading && !error && products.length === 0 && (
                    <p>No products found. Try adjusting your filters.</p>
                )}

                <div className="grid">
                    {products.map((p) => (
                        <Link
                            key={p.productId}
                            to={`/products/${p.productId}`}
                            className="product-link"
                        >
                            <ProductCard product={p} />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default SearchPage;