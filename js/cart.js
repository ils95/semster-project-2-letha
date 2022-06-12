import {getCart} from "./utilities/cartFunctions.js";
import createMenu from "./utilities/createMenu.js";
import displayMessage from "./utilities/displayMessage.js";

createMenu();

const cart = getCart();

const cartContainer = document.querySelector(".products");
const totalContainer = document.querySelector(".total");

let total = 0;

cartContainer.innerHTML = "";

cart.forEach(function(product) {
    cartContainer.innerHTML += `<a href="detail.html?id=${product.id}">
                                    <div class="products-box">
                                    <div style="background-image: url(${product.image})" class="product-image"></div>
                                    <h4>${product.title}</h4>
                                    <p>Price: ${product.price}</p>
                                    </div></a>`;

    total += parseFloat(product.price);

});

totalContainer.innerHTML = `Total: ${total}`;


if (cart.length === 0) {
    displayMessage("warning", "Your cart is empty", ".products");
}