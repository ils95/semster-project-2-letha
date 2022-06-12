import {baseUrl} from "./settings/api.js";

export default function createBanner(banner) {

    const introContainer = document.querySelector(".intro");

        introContainer.innerHTML = `<img class="herobanner" src="${baseUrl}${banner}" />
                                <div class="intro-heading"><h3>Tough Atlethic Wear</h3></div>
                                <div class="intro-quote">
                                    <p>Tough climate</p>
                                    <p>Tough people</p>
                                    <p>Tough clothing</p>
                                </div>
                                <div class="intro-button">Get Tough</div>
                                `;
}