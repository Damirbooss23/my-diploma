import { BASE_URL } from "./api";

export async function searchProducts(query) {
    const response = await fetch(BASE_URL + "/products/search?q=" + encodeURIComponent(query));
    if (!response.ok) {
        throw new Error("Failed to search products");
    }
    return response.json();
}

export async function getSearchSuggestions(query) {
    const response = await fetch(BASE_URL + "/products/suggestions?q=" + encodeURIComponent(query));
    if (!response.ok) {
        throw new Error("Failed to get search suggestions");
    }
    return response.json();
}