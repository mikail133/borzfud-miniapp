document.addEventListener('DOMContentLoaded', function () {
    const cart = {};
    
    // Добавляем товар в корзину
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const item = this.dataset.item;
            const price = parseInt(this.dataset.price);
            
            if (!cart[item]) {
                cart[item] = { price: price, quantity: 1 };
            } else {
                cart[item].quantity += 1;
            }
            updateCart();
        });
    });

    // Обновляем отображение корзины
    function updateCart() {
        const cartElement = document.getElementById('cart');
        cartElement.innerHTML = '';

        const items = Object.keys(cart);
        if (items.length === 0) {
            cartElement.innerHTML = '<p>Корзина пуста</p>';
            return;
        }

        let total = 0;
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item}: ${cart[item].quantity} x ${cart[item].price} руб = ${cart[item].quantity * cart[item].price} руб`;
            cartElement.appendChild(itemElement);
            total += cart[item].quantity * cart[item].price;
        });

        const totalElement = document.createElement('div');
        totalElement.textContent = `Итого: ${total} руб`;
        cartElement.appendChild(totalElement);
    }

    // Оформление заказа
    document.getElementById('checkout').addEventListener('click', function () {
        if (Object.keys(cart).length === 0) {
            alert('Корзина пуста!');
            return;
        }

        let order = 'Ваш заказ:\n';
        Object.keys(cart).forEach(item => {
            order += `${item}: ${cart[item].quantity} x ${cart[item].price} руб\n`;
        });

        const total = Object.keys(cart).reduce((sum, item) => sum + cart[item].quantity * cart[item].price, 0);
        order += `Итого: ${total} руб\n`;

        alert(order);
    });
});
