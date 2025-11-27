import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./ProductDetailPage.css";



const API_BASE = "http://localhost:8080/api";

function ProductDetailPage() {
    const { id } = useParams();
    const { t } = useTranslation();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorKey, setErrorKey] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const [inWishlist, setInWishlist] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setErrorKey(null);   // ✅ use the right setter

        fetch(`${API_BASE}/products/${id}/detail`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setProduct(data);
                setActiveIndex(0);
            })
            .catch((err) => {
                console.error("Failed to load product detail:", err);

                setErrorKey("productPage.status.failedToLoad");

            })
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        const productId = Number(id);
        if (!productId) return;

        fetch(`${API_BASE}/wishlist`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((wishlistItems) => {
                const found =
                    Array.isArray(wishlistItems) &&
                    wishlistItems.some((item) => item.productId === productId);

                setInWishlist(found);
            })
            .catch((err) => {
                console.error("Failed to check wishlist:", err);
            });
    }, [id]);

    const handleAddToWishlist = () => {
        if (!product || inWishlist) return;

        setWishlistLoading(true);

        fetch(`${API_BASE}/wishlist/${product.productId}`, {
            method: "POST",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }
                setInWishlist(true);
            })
            .catch((err) => {
                console.error("Failed to add to wishlist", err);
                alert("Failed to add to wishlist");
            })
            .finally(() => setWishlistLoading(false));
    };


    if (loading) {
        return (
            <div className="container mt-4">
                {t("productPage.status.loading")}
            </div>
        );
    }

    if (errorKey) {
        return (
            <div className="container mt-4">
                <p className="text-danger">{t(errorKey)}</p>
                <Link to="/" className="btn btn-link">
                    {t("productPage.actions.backToSearch")}
                </Link>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mt-4">
                <p>{t("productPage.status.notFound")}</p>
                <Link to="/" className="btn btn-link">
                    {t("productPage.actions.backToSearch")}
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
                {t("productPage.actions.backToSearch")}
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
                            {t("productPage.labels.averageRating")}{" "}
                            <strong>
                                {product.averageRating.toFixed
                                    ? product.averageRating.toFixed(1)
                                    : product.averageRating}
                            </strong>{" "}
                            {t("productPage.labels.outOfFive")}
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
                                {t("productPage.labels.category")}{" "}
                                <strong>{product.categoryName}</strong>
                            </>
                        )}
                    </p>

                    {product.supplierName && (
                        <p className="text-muted">
                            {t("productPage.labels.supplier")}{" "}
                            <strong>{product.supplierName}</strong>
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
                            <span className="fs-4 fw-bold">
                                ${product.price}
                            </span>
                        )}
                    </div>

                    <p className="description">{product.description}</p>

                    <h5>{t("productPage.headings.details")}</h5>
                    <ul>
                        {product.size && (
                            <li>
                                {t("productPage.labels.size")} {product.size}
                            </li>
                        )}
                        {product.colour && (
                            <li>
                                {t("productPage.labels.colour")} {product.colour}
                            </li>
                        )}
                        {product.material && (
                            <li>
                                {t("productPage.labels.material")} {product.material}
                            </li>
                        )}
                        {product.sustainabilityRating && (
                            <li>
                                {t("productPage.labels.sustainabilityRating")}{" "}
                                {product.sustainabilityRating} {t("productPage.labels.outOfFive")}
                            </li>
                        )}
                        {product.releaseDate && (
                            <li>
                                {t("productPage.labels.releaseDate")} {product.releaseDate}
                            </li>
                        )}
                        {product.manufacturer && (
                            <li>
                                {t("productPage.labels.manufacturer")}{" "}
                                {product.manufacturer}
                            </li>
                        )}
                    </ul>

                    {product.reviews && product.reviews.length > 0 && (
                        <>
                            <h5 className="mt-4">
                                {t("productPage.headings.customerReviews")}
                            </h5>
                            <div className="review-list">
                                {product.reviews.map((r, index) => (
                                    <div key={index} className="review-card">
                                        <div className="review-header">
                                            <span className="review-rating">
                                                {r.rating} {t("productPage.labels.outOfFive")}
                                            </span>
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
                            <h5 className="mt-4">
                                {t("productPage.headings.aboutSupplier")}
                            </h5>
                            <p>
                                <strong>{product.supplierName}</strong>
                                <br/>
                                <a
                                    href={product.supplierWebsite}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {t("productPage.actions.visitWebsite")}
                                </a>
                            </p>
                            {product.supplierDescription && (
                                <p>{product.supplierDescription}</p>
                            )}
                        </>
                    )}

                    <div style={{marginTop: "1rem"}}>
                        <button
                            onClick={handleAddToWishlist}
                            disabled={wishlistLoading || inWishlist}
                            style={{
                                padding: "0.5rem 1rem",
                                fontWeight: "bold",
                                cursor: wishlistLoading || inWishlist ? "default" : "pointer",
                                opacity: wishlistLoading || inWishlist ? 0.7 : 1,
                            }}
                        >
                            {inWishlist ? "In Wishlist" : "Add to Wishlist"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;