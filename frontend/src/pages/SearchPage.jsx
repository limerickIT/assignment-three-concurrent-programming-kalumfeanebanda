import { useEffect, useState } from "react";
import { testBackend } from "../api/api.js";

export default function SearchPage() {
    const [count, setCount] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        testBackend()
            .then((data) => {
                console.log("Backend data:", data); // helpful in dev tools
                setCount(Array.isArray(data) ? data.length : 0);
            })
            .catch((err) => {
                console.error("Error talking to backend:", err);
                setError(err.message);
            });
    }, []);

    return (
        <div>
            <h1>Zelora Search Page</h1>

            {error && (
                <p style={{ color: "red" }}>
                    Error from backend: {error}
                </p>
            )}

            {!error && (
                <p>
                    Products returned from backend:{" "}
                    {count === null ? "Loading..." : count}
                </p>
            )}
        </div>
    );
}