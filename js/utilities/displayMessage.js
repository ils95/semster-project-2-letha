export default function displayMessage(messageType, message, elementTarget) {

    const element = document.querySelector(elementTarget);

    element.innerHTML = `<div class="message ${messageType}">${message}</div>`;
}