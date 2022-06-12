import {baseUrl} from "./settings/api.js";
import displayMessage from "../utilities/displayMessage.js";
import cartToggling from "../utilities/cartToggling.js";
import {getCart} from "../utilities/cartFunctions.js";

export default function createProducts(products) {

    const productsContainer = document.querySelector(".products");

        productsContainer.innerHTML = "";

        const currentCartList = getCart();
    
        products.forEach(function (product) {

            let cssClass = "fa-cart-arrow-down";

            const inCartList = currentCartList.find(function(item) {
                return parseInt(item.id) === product.id;
            })

            if(inCartList !== undefined) {
                cssClass = "fa-check";
            }

            if(product.image_url === null || product.image_url === "") {
                productsContainer.innerHTML += `<div class="products-box">
                                                    <a href="detail.html?id=${product.id}">
                                                        <div style="background-image: url(${baseUrl}${product.image.formats.thumbnail.url})" class="product-image"></div>
                                                            <h4>${product.title}</h4>
                                                        <p>Price: ${product.price}</p>
                                                    </a> 
                                                    <div class="add-cart">
                                                        <i class="fas ${cssClass}" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${baseUrl}${product.image.formats.thumbnail.url}">Add to cart</i>
                                                    </div>
                                                </div>`;
            } 
            else {
                productsContainer.innerHTML += `<div class="products-box">
                                                    <a href="detail.html?id=${product.id}">
                                                        <div style="background-image: url(${product.image_url})" class="product-image"></div>
                                                            <h4>${product.title}</h4>
                                                        <p>Price: ${product.price}</p>
                                                    </a>
                                                    <div class="add-cart">
                                                        <i class="fas ${cssClass}" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${baseUrl}${product.image_url}">Add to cart</i>
                                                    </div>
                                                </div>`;
            }

            if (products.length === 0) {
                displayMessage("warning", "No products found", ".products");
            }
        });

        cartToggling();

}
