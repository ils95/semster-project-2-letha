import {baseUrl} from "./api.js";
import { saveToken, saveUser } from "./storage.js";
import displayMessage from "../../utilities/displayMessage.js";

export default async function login(email, password) {
    const url = baseUrl + "/auth/local";

    const data = JSON.stringify({identifier: email, password: password});

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        console.log(json);

        if(json.jwt) {
            saveToken(json.jwt);
            saveUser(json.user);

            document.location.href = "/admin.html";
        }

        if(json.error) {
            displayMessage("error", "Please enter a valid email adress and password", ".form-message");

        }
    }
    catch(error) {
        console.log(error)
    }
}