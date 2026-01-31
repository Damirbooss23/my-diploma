import { BASE_URL } from "./api";

export  async function getProducts() {
    const res = await fetch(BASE_URL + "/products")
    return res.json()
}

export async function createProduct(product) {
    const res = await fetch(BASE_URL + "/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });
    return res.json();
}

export  async function getProduct(id) {
    const res = await fetch(BASE_URL + "/products/" + id)
    return res.json()
}

export async function editProduct(product, id) {
    const res = await fetch(BASE_URL + "/products/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });
    return res.json();
}

export async function deleteProduct(id) {
    const res = await fetch(BASE_URL + "/products/" + id, {
        method: "DELETE",
          headers: {
            "Content-Type": "application/json"
        },
    });
    return res.json();
}
