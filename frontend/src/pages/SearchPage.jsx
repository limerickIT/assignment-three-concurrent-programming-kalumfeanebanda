import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SearchPage.css";
import {useTranslation} from "react-i18next";

function SearchPage() {
    const { t, i18n } = useTranslation();

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
        <div style={{padding: "1.5rem", fontFamily: "sans-serif"}}>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.75rem",
                }}
            >

            <h1>{t("searchPage.title")}</h1>

                <Link
                    to="/wishlist"
                    style={{
                        padding: "0.4rem 0.8rem",
                        borderRadius: "4px",
                        border: "1px solid #333",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                    }}
                >
                    My Wishlist
                </Link>
            </div>

            <div style={{marginBottom: "1rem"}}>
                <button onClick={() => i18n.changeLanguage("en-IE")}>EN</button>
                <button onClick={() => i18n.changeLanguage("fr-FR")}>FR</button>
                <button onClick={() => i18n.changeLanguage("es-ES")}>ES</button>
            </div>


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
                    <label>{t("searchPage.labels.productName")}</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("searchPage.placeholders.productNameExample")}
                        style={{width: "100%"}}
                    />
                </div>

                <div>
                    <label>{t("searchPage.labels.keyword")}</label>
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder={t("searchPage.placeholders.keyword")}
                        style={{width: "100%"}}
                    />
                </div>

                <div>
                    <label>{t("searchPage.labels.category")}</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="">{t("searchPage.labels.category")}</option>
                        {categories.map((c) => (
                            <option key={c.categoryId} value={c.categoryId}>
                                {c.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>{t("searchPage.labels.minPrice")}</label>
                    <input
                        type="number"
                        step="0.01"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        style={{width: "100%"}}
                    />
                </div>

                <div>
                    <label>{t("searchPage.labels.maxPrice")}</label>
                    <input
                        type="number"
                        step="0.01"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        style={{width: "100%"}}
                    />
                </div>

                <div>
                    <label>{t("searchPage.labels.minRating")}</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={minRating}
                        onChange={(e) => setMinRating(e.target.value)}
                        style={{width: "100%"}}
                    />
                </div>

                <div style={{display: "flex", gap: "0.5rem", alignItems: "center"}}>
                    <input
                        id="recent"
                        type="checkbox"
                        checked={recent}
                        onChange={(e) => setRecent(e.target.checked)}
                    />
                    <label htmlFor="recent">
                        {t("searchPage.labels.recent")}
                    </label>
                </div>

                <button
                    type="submit"
                    style={{
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    {t("searchPage.button.search")}
                </button>
            </form>

            {loading && <p>{t("searchPage.status.searching")}</p>}
            {error && <p style={{color: "red"}}>{error}</p>}

            <h2>{t("searchPage.results.heading")}</h2>
            {products.length === 0 && !loading && (
                <p>{t("searchPage.results.empty")}</p>
            )}

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
                        <th style={{borderBottom: "1px solid #ccc", textAlign: "left"}}>
                            {t("searchPage.table.id")}
                        </th>
                        <th style={{borderBottom: "1px solid #ccc", textAlign: "left"}}>
                            {t("searchPage.table.image")}
                        </th>
                        <th style={{borderBottom: "1px solid #ccc", textAlign: "left"}}>
                            {t("searchPage.table.name")}
                        </th>
                        <th style={{borderBottom: "1px solid #ccc", textAlign: "left"}}>
                            {t("searchPage.table.category")}
                        </th>
                        <th style={{borderBottom: "1px solid #ccc", textAlign: "left"}}>
                            {t("searchPage.table.price")}
                        </th>
                        <th style={{borderBottom: "1px solid #ccc", textAlign: "left"}}>
                            {t("searchPage.table.discounted")}
                        </th>
                        <th style={{borderBottom: "1px solid #ccc", textAlign: "left"}}>
                            {t("searchPage.table.rating")}
                        </th>
                        <th style={{borderBottom: "1px solid #ccc", textAlign: "left"}}>
                            {t("searchPage.table.details")}
                        </th>
                        <th style={{borderBottom: "1px solid #ccc", textAlign: "left"}}>
                            {t("searchPage.table.actions")}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((p) => (
                        <tr key={p.productId}>
                            <td style={{borderBottom: "1px solid #eee"}}>{p.productId}</td>
                            <td style={{borderBottom: "1px solid #eee"}}>
                                <img
                                    src={`/images/products/thumb/${p.productId}_1.png`}
                                    alt={p.productName}
                                    style={{width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px"}}
                                    onError={(e) => {
                                        e.target.src = "/images/products/thumb/no-image.png";
                                    }}
                                />
                            </td>
                            <td style={{borderBottom: "1px solid #eee"}}>{p.productName}</td>
                            <td style={{borderBottom: "1px solid #eee"}}>
                                {p.categoryName || "-"}
                            </td>
                            <td style={{borderBottom: "1px solid #eee"}}>
                                ${p.price?.toFixed ? p.price.toFixed(2) : p.price}
                            </td>
                            <td style={{borderBottom: "1px solid #eee"}}>
                                {p.discountedPrice != null
                                    ? `$${p.discountedPrice?.toFixed
                                        ? p.discountedPrice.toFixed(2)
                                        : p.discountedPrice
                                    }`
                                    : "-"}
                            </td>
                            <td style={{borderBottom: "1px solid #eee"}}>
                                {p.sustainabilityRating ?? "-"}
                            </td>
                            <td>
                                <Link
                                    to={`/products/${p.productId}`}
                                    className="btn btn-sm btn-primary"
                                >
                                    {t("searchPage.table.view")}
                                </Link>
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