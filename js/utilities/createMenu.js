import {getUsername} from "../components/settings/storage.js";
import logoutButton from "../components/settings/logout.js";

export default function createMenu() {

    const container = document.querySelector("nav");

    const { pathname } = document.location;

    const username = getUsername();

    let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">Log in</a>`;

    if(username) {
        authLink = `<button id="logout">Log out</button>`;
    }

    let mySite = "";

    if(username) {
        mySite = `<a href="admin.html" class="${pathname === "/admin.html" ? "active" : ""}">My site</a>`;
    }
    

   

    container.innerHTML = `<div class="info-banner">
                                <p>Free shipping on orders above $50</p>
                            </div>
                            <div class="navbar-line1">
                                <div class="logo">
                                    <a href="/"><h1>Tough</h1></a>
                                </div>
                                <div class="login">
                                    ${mySite}
                                    ${authLink}
                                </div>
                            </div>
                            <div class="navbar-line2">
                                <ul>
                                    <li>
                                        <a href="/" class="${pathname === "/" || pathname === "/index.html" ? "active" : ""}">Home</a>
                                    </li>
                                    <li>
                                        <a href="products.html" class="${pathname === "/products.html" ? "active" : ""}">Products</a>
                                    </li>
                                    <li>
                                        <a href="cart.html" class="${pathname === "/cart.html" ? "active" : ""}">Your cart</a>
                                    </li>
                                </ul>
                            </div>`;

    logoutButton();
}