import "./ProductCard.css";

function ProductCard({ product }) {
    return (
        <article className="card">
            <div className="card-image-wrapper">
                <img
                    src={`/images/${product.featureImage}`}
                    alt={product.productName}
                    onError={(e) => {
                        e.target.src = "/images/no-image.png";
                    }}
                />
            </div>
            <div className="card-body">
                <h2 className="card-title">{product.productName}</h2>
                <p className="card-manufacturer">{product.manufacturer}</p>

                <p className="card-price">
                    €{product.price}
                    {product.discountedPrice && (
                        <span className="card-discount"> Now €{product.discountedPrice}</span>
                    )}
                </p>

                {product.categoryName && (
                    <p className="card-category">{product.categoryName}</p>
                )}

                <p className="card-meta">
                    {product.size} · {product.colour} · {product.material}
                </p>
            </div>
        </article>
    );
}

export default ProductCard;