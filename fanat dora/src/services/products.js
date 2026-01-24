import { apiGet, apiPost, apiPut, apiDelete } from './api';

export async function getProducts() {
    return await apiGet('/products');
}

export async function createProduct(product) {
    return await apiPost('/products', product);
}

export async function getProduct(id) {
    return await apiGet(`/products/${id}`);
}

export async function editProduct(product, id) {
    return await apiPut(`/products/${id}`, product);
}

export async function deleteProduct(id) {
    return await apiDelete(`/products/${id}`);
}