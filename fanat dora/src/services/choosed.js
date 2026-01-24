import { BASE_URL } from "./api";

export async function getChoosed() {
    const response = await fetch(BASE_URL + "/choosed");
    if (!response.ok) {
        throw new Error("Failed to fetch choosed data");
    }
    return response.json();
}

export async function addToChoosed(product, quantity = 1) {
    const response = await fetch(BASE_URL + "/choosed", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            product_id: product.id,
            quantity
        })
    });
    if (!response.ok) {
        throw new Error("Failed to add item to choosed");
    }
    return response.json();
}

export async function updateToChoosed(product, quantity = 1) {
    const response = await fetch(BASE_URL + "/choosed/" + product.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            quantity
        })
    });
    if (!response.ok) {
        throw new Error("Failed to update to choosed");
    }
    return response.json();
}

export async function removeFromChoosed(product) {
    const response = await fetch(BASE_URL + "/choosed/" + product.id, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete item from choosed");
    }
    return response.json();
}