import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetailPage.css";

function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct]   = useState(null);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`http://localhost:8080/api/products/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch product");
                }
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error(err);
                setError("Oops, could not load product.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="page">
                <p>Loading product...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="page">
                <p className="error">{error || "Product not found."}</p>
                <Link to="/" className="btn-secondary">
                    ← Back to search
                </Link>
            </div>
        );
    }

    return (
        <div className="page detail-page">
            <header className="page-header">
                <h1>{product.productName}</h1>
                <p>{product.manufacturer}</p>
            </header>

            <div className="detail-layout">
                <div className="detail-image-wrapper">
                    <img
                        src={`/images/${product.featureImage}`}
                        alt={product.productName}
                        onError={(e) => {
                            e.target.src = "/images/no-image.png";
                        }}
                    />
                </div>

                <div className="detail-info">
                    <p className="price">
                        Price: €{product.price?.toFixed ? product.price.toFixed(2) : product.price}
                    </p>
                    {product.discountedPrice && (
                        <p className="discounted-price">
                            Discounted: €
                            {product.discountedPrice?.toFixed
                                ? product.discountedPrice.toFixed(2)
                                : product.discountedPrice}
                        </p>
                    )}

                    <p>
                        <strong>Size:</strong> {product.size}
                    </p>
                    <p>
                        <strong>Colour:</strong> {product.colour}
                    </p>
                    <p>
                        <strong>Material:</strong> {product.material}
                    </p>
                    <p>
                        <strong>Sustainability Rating:</strong> {product.sustainabilityRating}/5
                    </p>
                    <p>
                        <strong>Release Date:</strong>{" "}
                        {product.releaseDate
                            ? new Date(product.releaseDate).toLocaleDateString()
                            : "N/A"}
                    </p>

                    <p className="description">{product.description}</p>

                    <Link to="/" className="btn-secondary back-link">
                        ← Back to search
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;