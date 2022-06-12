import createProducts from "./createProducts.js";

export default function searchProducts(products) {

    const search = document.querySelector("input.filter");

    search.addEventListener("keyup", doFiltering)

    function doFiltering(event) {

        const filterValue = event.target.value;

        const filteredProducts = products.filter(function(product) {
            if(product.title.toLowerCase().includes(filterValue.toLowerCase())) {
                return true;
            }
        });

        createProducts(filteredProducts);
     }
}