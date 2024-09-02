document.addEventListener('DOMContentLoaded', function () {
    const cart = [];
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeCartButton = document.getElementById('close-cart');
    const checkoutButton = document.getElementById('checkout-button');
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    const updateCart = () => {
        cartItemsList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            cartItemsList.appendChild(li);
            total += item.price;
        });
        totalPriceElement.textContent = total.toFixed(2);
        cartButton.textContent = `Cart (${cart.length})`;
    };

    document.querySelectorAll('.item button').forEach(button => {
        button.addEventListener('click', function () {
            const itemElement = button.parentElement;
            const itemName = itemElement.getAttribute('data-name');
            const itemPrice = parseFloat(itemElement.getAttribute('data-price'));
            cart.push({ name: itemName, price: itemPrice });
            updateCart();
            alert(`${itemName} added to cart! 🛒`);
        });
    });

    cartButton.addEventListener('click', () => {
        cartModal.classList.toggle('hidden');
    });

    closeCartButton.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Thank you for your purchase! 🎉');
            cart.length = 0;
            updateCart();
            cartModal.classList.add('hidden');
        } else {
            alert('Your cart is empty! 🛒');
        }
    });

    updateCart();
});
