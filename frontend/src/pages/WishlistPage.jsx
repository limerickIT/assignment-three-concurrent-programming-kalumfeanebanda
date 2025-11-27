import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./WishlistPage.css";


const API_BASE = "http://localhost:8080/api";

function WishlistPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = () => {
        setLoading(true);
        setError(null);

        fetch(`${API_BASE}/wishlist`)
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }

                // If server sends 204 No Content, treat as empty list
                if (res.status === 204) {
                    return [];
                }

                const text = await res.text();

                if (!text) {
                    return [];
                }

                try {
                    const data = JSON.parse(text);
                    console.log("Parsed wishlist data:", data);
                    return Array.isArray(data) ? data : [];
                } catch (e) {
                    console.error("Failed to parse wishlist JSON:", e, text);
                    throw new Error("Invalid JSON from server");
                }
            })
            .then((data) => {
                setItems(data);
            })
            .catch((err) => {
                console.error("Failed to load wishlist", err);
                setError("Failed to load wishlist");
            })
            .finally(() => setLoading(false));
    };

    const handleRemove = (productId) => {
        fetch(`${API_BASE}/wishlist/${productId}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok && res.status !== 204) {
                    throw new Error(`HTTP ${res.status}`);
                }
                // Remove locally
                setItems((prev) => prev.filter((item) => item.productId !== productId));
            })
            .catch((err) => {
                console.error("Failed to remove from wishlist", err);
                alert("Failed to remove from wishlist");
            });
    };

    const handleToggleNotify = (productId, field) => {
        const item = items.find((i) => i.productId === productId);
        if (!item) return;

        const updated = {
            priceDrop:
                field === "priceDrop" ? !item.notifyPriceDrop : item.notifyPriceDrop,
            backInStock:
                field === "backInStock"
                    ? !item.notifyBackInStock
                    : item.notifyBackInStock,
        };

        fetch(
            `${API_BASE}/wishlist/${productId}/notifications?priceDrop=${updated.priceDrop}&backInStock=${updated.backInStock}`,
            {
                method: "PATCH",
            }
        )
            .then((res) => {
                if (!res.ok && res.status !== 204) {
                    throw new Error(`HTTP ${res.status}`);
                }

                setItems((prev) =>
                    prev.map((i) =>
                        i.productId === productId
                            ? {
                                ...i,
                                notifyPriceDrop: updated.priceDrop,
                                notifyBackInStock: updated.backInStock,
                            }
                            : i
                    )
                );
            })
            .catch((err) => {
                console.error("Failed to update notifications", err);
                alert("Failed to update notification settings");
            });
    };

    if (loading) return <p>Loading wishlist…</p>;
    if (error) return <p>{error}</p>;

    if (!items.length) {
        return (
            <div className="wishlist-page">
                <h1>My Wishlist</h1>
                <p>Your wishlist is empty.</p>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <Link to="/" className="wishlist-back-link">
                ← Back to Search
            </Link>
            <h1>My Wishlist</h1>
            <p>Items in wishlist: {items.length}</p>

            <table className="wishlist-table">
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Effective Price</th>
                    <th>Back in Stock Alert</th>
                    <th>Price Drop Alert</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => {
                    const effectivePrice = item.effectivePrice;

                    return (
                        <tr key={item.wishlistId}>
                            <td>
                                <Link to={`/products/${item.productId}`}>
                                    {item.productName}
                                </Link>
                            </td>
                            <td>
                                €
                                {effectivePrice != null
                                    ? Number(effectivePrice).toFixed(2)
                                    : "-"}
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={item.notifyBackInStock}
                                    onChange={() =>
                                        handleToggleNotify(item.productId, "backInStock")
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={item.notifyPriceDrop}
                                    onChange={() =>
                                        handleToggleNotify(item.productId, "priceDrop")
                                    }
                                />
                            </td>
                            <td>
                                <button onClick={() => handleRemove(item.productId)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default WishlistPage;