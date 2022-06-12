import {baseUrl} from "./components/settings/api.js";
import displayMessage from "./utilities/displayMessage.js";
import createMenu from "./utilities/createMenu.js";
import createProducts from "./components/createProducts.js";
import searchProducts from "./components/searchProducts.js";

createMenu();


const productsUrl = baseUrl + "/products";

(async function displayProducts() {

    const productsContainer = document.querySelector(".products");

    productsContainer.innerHTML = "";

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        const products = json;

        createProducts(products);
        searchProducts(products);

    }
    catch(error) {
        console.log(error)
        displayMessage("error", error, ".products");
    }
    
})();











