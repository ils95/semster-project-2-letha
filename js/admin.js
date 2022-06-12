import {baseUrl} from "./components/settings/api.js";
import {getToken} from "./components/settings/storage.js";
import displayMessage from "./utilities/displayMessage.js";
import createMenu from "./utilities/createMenu.js";

createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const featured = document.querySelector("#featured");
const imageUrl = document.querySelector("#image");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const imageUrlValue = imageUrl.value.trim();
    const featuredValue = checkIfFeatured(featured);

    function checkIfFeatured(featured) {
        if(featured.checked) {
            return true;
        }
        else {
            return false;
        }
    }

    if (titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0 || imageUrlValue.length === 0) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }

    addProduct(titleValue, priceValue, descriptionValue, imageUrlValue, featuredValue);
}

async function addProduct(title, price, description, image_url, featured) {
    const url = baseUrl + "/products";

    const data = JSON.stringify({title: title, price: price, description: description, image_url: image_url, featured: featured});

    const token = getToken();

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        location.href = "/admin.html";

        if(json.description) {
            displayMessage("success", "Product created", ".message-container");
            form.reset();
        }

        if(json.error) {
            displayMessage("error", json.message, ".message-container");
        }

    } catch (error) {
        console.log(error);
        displayMessage("error", "An error occured", ".message-container");
    }
}

if(!getToken()) {
    document.location.href = "/";
}

const productsUrl = baseUrl + "/products";

(async function displayProducts() {

    const productsContainer = document.querySelector(".products");

    productsContainer.innerHTML = "";

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        const products = json;

        products.forEach(function (product) {

            if(product.image_url === null || product.image_url === "") {
                productsContainer.innerHTML += `<div class="products-box">
                                            <div style="background-image: url(${baseUrl}${product.image.formats.thumbnail.url})" class="product-image"></div>
                                            <h4>${product.title}</h4>
                                            <p>Price: ${product.price}</p>
                                            <a href="edit.html?id=${product.id}">Edit product</a>
                                            </div>`;
            } 
            else {
                productsContainer.innerHTML += `<div class="products-box">
                                            <div style="background-image: url(${product.image_url})" class="product-image"></div>
                                            <h4>${product.title}</h4>
                                            <p>Price: ${product.price}</p>
                                            <a href="edit.html?id=${product.id}">Edit product</a>
                                            </div>`;
            }
            
        });

    }
    catch(error) {
        console.log(error)
        displayMessage("error", error, ".products");
    }
    
})();





