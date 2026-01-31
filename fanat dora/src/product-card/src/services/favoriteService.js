
import { BASE_URL } from "./api";

export async function getFavorites() {
  const response = await fetch(BASE_URL + "/favorites");
  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }
  return response.json();
}

export async function addToFavorites(product) {
  const response = await fetch(BASE_URL + "/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_id: product.id,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add to favorites");
  }

  return response.json();
}

export async function removeFromFavorites(productId) {
  const response = await fetch(BASE_URL + "/favorites/" + productId, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to remove from favorites");
  }

  return response.json();
}
