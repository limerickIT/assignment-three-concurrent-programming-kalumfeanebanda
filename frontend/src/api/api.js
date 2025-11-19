export async function testBackend() {
    const res = await fetch("http://localhost:8080/api/products/search");

    const text = await res.text();
    console.log("RAW RESPONSE FROM BACKEND:", text);

    try {
        const json = JSON.parse(text);
        return json;
    } catch (e) {
        console.error("JSON parse failed:", e);
        throw new Error(`JSON parse failed: ${e.message}`);
    }
}