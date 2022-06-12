import {baseUrl} from "./components/settings/api.js";
import displayMessage from "./utilities/displayMessage.js";
import {getToken} from "./components/settings/storage.js";
import createMenu from "./utilities/createMenu.js";
import deleteButton from "./components/products/deleteFunctions.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if(!id) {
    document.location.href = "/";
}

const productUrl = baseUrl + "/products/" + id;

const loading = document.querySelector(".loading");
const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const featured = document.querySelector("#featured");
const imageUrl = document.querySelector("#image");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");

(async function() {
    try {
        const response = await fetch(productUrl);
        const edit = await response.json();

        title.value = edit.title;
        price.value = edit.price;
        description.value = edit.description;
        imageUrl.value = edit.imageUrl;
        featured.value = edit.featured;
        idInput.value = edit.idInput;

        deleteButton(edit.id);

    } catch(error) {
        console.log(error);
    } finally {
        loading.style.display = "none";
        form.style.display = "block";
    }
})();

form.addEventListener("submit", submitFrom);

function submitFrom(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const imageUrlValue = imageUrl.value.trim();
    const featuredValue = checkIfFeatured(featured);
    const idValue = idInput.value;

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

    updateProduct(titleValue, priceValue, descriptionValue, imageUrlValue, featuredValue, idValue);
}

async function updateProduct(title, price, description, image_url, featured, id) {

    const data = JSON.stringify({title: title, price: price, description: description, image_url: image_url, featured: featured});

    const token = getToken();

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(productUrl, options);
        const json = await response.json();

        if(json.updated_at) {
            displayMessage("success", "Product updated", ".message-container");
        }

        if(json.error) {
            displayMessage("error", json.message, ".message-container");
        }
    } catch(error) {
        console.log(error);
    }
}