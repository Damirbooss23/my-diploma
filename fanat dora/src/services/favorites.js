import { apiGet, apiPost, apiDelete } from './api';

export async function getFavorites() {
    return await apiGet('/favorites');
}

export async function addToFavorites(product) {
    const data = {
        product_id: product.id
    };
    return await apiPost('/favorites', data);
}

export async function removeFromFavorites(productId) {
    return await apiDelete(`/favorites/${productId}`);
}