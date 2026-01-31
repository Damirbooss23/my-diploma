import { BASE_URL } from "./api";
export  async function getCart() {
    const responce = await fetch(BASE_URL + "/cart")
    if (!responce.ok) {
        throw new Error("Failed to fetch cart data");
    }
    return responce.json()
}

export async function addToCart(product,quantity= 1) {
    const responce = await fetch (BASE_URL + "/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify ({
            product_id: productId,
            quantity
        })
    });
    if (!responce.ok) {
        throw new Error ("Failed to add item to cart");
    }
    return responce.json();
}
export async function updateToCart(product,quantity= 1) {
    const responce = await fetch (BASE_URL + "/cart"+ product.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify ({

            quantity
        })
    });
    if (!responce.ok) {
        throw new Error ("Failed to upate to cart");
    }
    return responce.json();
}
export async function removeFromCart(product) {
    const responce = await fetch (BASE_URL + "/cart", {
        method: "DELETE",

    });
    if (!responce.ok) {
        throw new Error ("Failed to delete item to cart");
    }
    return responce.json();
}


