import {baseUrl} from "./components/settings/api.js";
import displayMessage from "./utilities/displayMessage.js";
import createMenu from "./utilities/createMenu.js";

createMenu();

const detailContainer = document.querySelector(".detail-product");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

const detailUrl = baseUrl + "/products/" + id;

(async function () {

    try {
        const response = await fetch(detailUrl);
        const json = await response.json();

        const details = json;

        createHtml(details);
    }
    catch(error) {
        console.log(error);
        displayMessage("error", error, ".product");
    }
    
})();

function createHtml(details) {
    if(details.image_url === null || details.image_url === "") {
        detailContainer.innerHTML = `<div class="detail-box">
                                        <img src="${baseUrl}${details.image.formats.medium.url}"></img> 
                                        <div class="detail-info">
                                            <h4>${details.title}</h4>
                                            <p>${details.description}</p>
                                            <p>Price: ${details.price}</p>
                                        </div>
                                    </div>`;
    } 
    else {
        detailContainer.innerHTML = `<div class="detail-box">
                                        <img src="${details.image_url}"></img>
                                        <div class="detail-info">
                                            <h4>${details.title}</h4>
                                            <p>${details.description}</p>
                                            <p>Price: ${details.price}</p>
                                        </div>
                                    </div>`;
    }
}




