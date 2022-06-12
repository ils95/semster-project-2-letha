import {baseUrl} from "./settings/api.js";
import displayMessage from "../utilities/displayMessage.js";

export default function featuredProducts(products) {

    const productsContainer = document.querySelector(".products");

        productsContainer.innerHTML = "";
    
        products.forEach(function(product) {

            if(product.image_url === null || product.image_url === "") {
                if(product.featured === true) {
                    productsContainer.innerHTML += `<div class="products-box">
                                                        <a href="detail.html?id=${product.id}">
                                                            <div style="background-image: url(${baseUrl}${product.image.formats.thumbnail.url})" class="product-image"></div>
                                                            <h4>${product.title}</h4>
                                                            <p>Price: ${product.price}</p>
                                                        </a>
                                                        
                                                    </div>`;
                }
                
            } else {
                if(product.featured === true) {
                    productsContainer.innerHTML += `<div class="products-box">
                                                        <a href="detail.html?id=${product.id}">
                                                            <div style="background-image: url(${product.image_url})" class="product-image"></div>
                                                            <h4>${product.title}</h4>
                                                            <p>Price: ${product.price}</p>
                                                        </a>
                                                        
                                                    </div>`;
                            }
                
            }

            if (products.length === 0) {
                displayMessage("warning", "No products found", ".products");
            }
            
        });
}
