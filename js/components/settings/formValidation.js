export const minimumPasswordLength = 4;

export function emailValidation(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function passwordValidation(string) {
    return hasNumber(string) && checkLength(string);
}

function hasNumber(string) {
    return /\d/.test(string);
}

function checkLength(string) {
    return string.trim().length >= minimumPasswordLength;
}