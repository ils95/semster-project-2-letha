import {baseUrl} from "./components/settings/api.js";
import displayMessage from "./utilities/displayMessage.js";
import createBanner from "./components/createBanner.js";
import featuredProducts from "./components/featuredProducts.js";
import createMenu from "./utilities/createMenu.js";

createMenu();

const bannerUrl = baseUrl + "/home";

(async function () {

    try {
        const response = await fetch(bannerUrl);
        const json = await response.json();

        const banner = json.hero_banner.formats.large.url;

        createBanner(banner);
    }
    catch(error) {
        console.log(error)
        displayMessage("error", error, ".intro");
    }

})();


const productsUrl = baseUrl + "/products";

(async function () {

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        const products = json;

        featuredProducts(products);
    }
    catch(error) {
        console.log(error)
        displayMessage("error", error, ".products");
    }
    
})();




   