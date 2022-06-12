import {getCart, saveCart} from "./cartFunctions.js";

export default function cartToggling() {
    const cartButtons = document.querySelectorAll(".products-box i");

    cartButtons.forEach(function(icon) {
        icon.addEventListener("click", handleClick);
    })

    function handleClick() {
        this.classList.toggle("fa-cart-arrow-down");
        this.classList.toggle("fa-check");

        const id = this.dataset.id;
        const title = this.dataset.title;
        const price = this.dataset.price;
        const image = this.dataset.image;

        const currentCartList = getCart();

        const product = currentCartList.find(function(cartProduct) {
            if(cartProduct.id === id) {
                 return true;
            }
        })

        if(!product) {
            const newCartproduct = {id: id, title: title, price: price, image: image};
            currentCartList.push(newCartproduct);
            saveCart(currentCartList);
        }
        else {
            const updatedCartList = currentCartList.filter(function(item) {
                if(item.id !== id) {
                    return true;
                }
            });
            saveCart(updatedCartList);
        }
    }
}