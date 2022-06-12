import {emailValidation, passwordValidation} from "./components/settings/formValidation.js";
import login from "./components/settings/login.js";
import createMenu from "./utilities/createMenu.js";

createMenu();

const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const button = document.querySelector("button");

email.addEventListener("input", toggleButton);
password.addEventListener("input", toggleButton);

function toggleButton() {
    const emailValue = email.value;
    const passwordValue = password.value;

    if(emailValidation(emailValue) && passwordValidation(passwordValue)) {
        button.disabled = false;
    }
    else {
        button.disabled = true; 
    }
}

form.addEventListener("submit", submitForm);

async function submitForm(event) {
    event.preventDefault();

    console.log("form submitted");

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    button.style.display = "none";

    await login(emailValue, passwordValue);

    button.style.display = "block";
}