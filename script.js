
/*CARRITOOOOO */

document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsElement = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    let cartItems = [];
    let total = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const productElement = event.target.closest('.productos');
        const productId = productElement.dataset.id;
        const productName = productElement.querySelector('h3').textContent;
        const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));

        const existingCartItem = cartItems.find(item => item.id === productId);

        if (existingCartItem) {
            existingCartItem.quantity++;
        } else {
            cartItems.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
    }

    function updateCart() {
        cartItemsElement.innerHTML = '';
        total = 0;

        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
            cartItemsElement.appendChild(listItem);
            total += item.price * item.quantity;
        });

        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
});
