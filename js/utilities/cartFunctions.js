const cartKey = "cart";

export function getCart() {
    const cart = localStorage.getItem(cartKey);

    if(cart === null) {
        return [];
    }

    return JSON.parse(cart)
}

export function saveCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

