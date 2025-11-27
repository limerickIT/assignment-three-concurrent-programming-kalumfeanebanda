import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetailPage.css";

const API_BASE = "http://localhost:8080/api";



function ProductDetailPage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`${API_BASE}/products/${id}/detail`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setProduct(data);
                setActiveIndex(0);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading product detail", err);
                setError("Could not load product details.");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="container mt-4">Loading product...</div>;
    }

    if (error) {
        return (
            <div className="container mt-4">
                <p className="text-danger">{error}</p>
                <Link to="/" className="btn btn-link">
                    &larr; Back to search
                </Link>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mt-4">
                <p>Product not found.</p>
                <Link to="/" className="btn btn-link">
                    &larr; Back to search
                </Link>
            </div>
        );
    }


    const images = [];
    const baseFolder = `/images/products/large/${product.productId}`;

    if (product.featureImage) {
        images.push(`${baseFolder}/${product.featureImage}`);
    }

    const match =
        product.featureImage &&
        product.featureImage.match(/^(\d+)_\d+\.(png|jpg|jpeg)$/i);

    if (match) {
        const prefix = match[1];
        const ext = match[2];
        const maxExtra = 6;
        for (let i = 1; i <= maxExtra; i++) {
            const filename = `${prefix}_${i}.${ext}`;
            const url = `${baseFolder}/${filename}`;
            if (!images.includes(url)) {
                images.push(url);
            }
        }
    }

    if (images.length === 0) {
        images.push("/images/products/large/no-image.png");
    }

    const mainImageUrl = images[activeIndex] || images[0];

    return (
        <div className="container mt-4 detail-page">
            <Link to="/" className="btn btn-link back-link">
                &larr; Back to search
            </Link>

            <div className="detail-layout">

                <div>
                    <div className="detail-image-wrapper">
                        <img
                            src={mainImageUrl}
                            alt={product.productName}
                            className="product-detail-main-image"
                            onError={(e) => {
                                e.currentTarget.src = "/images/products/large/no-image.png";
                            }}
                        />
                    </div>

                    {images.length > 1 && (
                        <div className="product-thumb-row">
                            {images.map((url, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className={
                                        "product-thumb-button" +
                                        (idx === activeIndex ? " active" : "")
                                    }
                                    onClick={() => setActiveIndex(idx)}
                                >
                                    <img
                                        src={url}
                                        alt={`${product.productName} ${idx + 1}`}
                                        className="product-thumb-image"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>


                <div className="detail-info">
                    <h2>{product.productName}</h2>

                    {product.averageRating && (
                        <p className="text-muted mb-1">
                            Average rating: <strong>{product.averageRating.toFixed
                            ? product.averageRating.toFixed(1)
                            : product.averageRating}</strong> / 5
                        </p>
                    )}

                    {product.stockStatus && (
                        <p className="stock-status">
                            {product.stockStatus}
                        </p>
                    )}

                    <p className="text-muted mb-1">
                        {product.categoryName && (
                            <>
                                Category: <strong>{product.categoryName}</strong>
                            </>
                        )}
                    </p>
                    {product.supplierName && (
                        <p className="text-muted">
                            Supplier: <strong>{product.supplierName}</strong>
                        </p>
                    )}

                    <div className="price">
                        {product.discountedPrice ? (
                            <>
                <span className="fs-4 fw-bold">
                  ${product.discountedPrice}
                </span>{" "}
                                <span className="text-muted text-decoration-line-through">
                  ${product.price}
                </span>
                            </>
                        ) : (
                            <span className="fs-4 fw-bold">${product.price}</span>
                        )}
                    </div>

                    <p className="description">{product.description}</p>

                    <h5>Details</h5>
                    <ul>
                        {product.size && <li>Size: {product.size}</li>}
                        {product.colour && <li>Colour: {product.colour}</li>}
                        {product.material && <li>Material: {product.material}</li>}
                        {product.sustainabilityRating && (
                            <li>Sustainability rating: {product.sustainabilityRating} / 5</li>
                        )}
                        {product.releaseDate && <li>Release date: {product.releaseDate}</li>}
                        {product.manufacturer && (
                            <li>Manufacturer: {product.manufacturer}</li>
                        )}
                    </ul>


                    {product.reviews && product.reviews.length > 0 && (
                        <>
                            <h5 className="mt-4">Customer reviews</h5>
                            <div className="review-list">
                                {product.reviews.map((r, index) => (
                                    <div key={index} className="review-card">
                                        <div className="review-header">
                                            <span className="review-rating">{r.rating} / 5</span>
                                            <span className="review-author">
              {r.customerFirstName}
                                                {r.customerCity ? ` — ${r.customerCity}` : ""}
            </span>
                                        </div>
                                        <p className="review-comment">{r.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}



                    {product.supplierWebsite && (
                        <>
                            <h5 className="mt-4">About the supplier</h5>
                            <p>
                                <strong>{product.supplierName}</strong>
                                <br />
                                <a
                                    href={product.supplierWebsite}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Visit website
                                </a>
                            </p>
                            {product.supplierDescription && (
                                <p>{product.supplierDescription}</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;