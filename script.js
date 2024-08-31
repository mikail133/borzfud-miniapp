let menuOpen = false;

function toggleMenu() {
    menuOpen = !menuOpen;
    document.body.classList.toggle('menu-open');
}

function openMenu() {
    toggleMenu();
    setTimeout(() => {
        document.getElementById('menu-content').style.display = 'flex';
    }, 300);
}

function closeMenu() {
    document.getElementById('menu-content').style.display = 'none';
    setTimeout(() => {
        menuOpen = false;
        document.body.classList.remove('menu-open');
    }, 300);
}

// Функция для загрузки изображений
function loadImage(url, callback) {
    let img = new Image();
    img.onload = () => {
        callback(img);
    };
    img.src = url;
}

// Загружаем изображения и устанавливаем их в меню
const menuItems = [
    { id: 1, name: 'Бургер', price: 250, image: 'burger.jpg' },
    { id: 2, name: 'Филе', price: 280, image: 'fillet.jpg' },
    { id: 3, name: 'Суп', price: 200, image: 'soup.jpg' },
    { id: 4, name: 'Пирог', price: 220, image: 'pie.jpg' },
    { id: 5, name: 'Салат', price: 180, image: 'salad.jpg' },
    { id: 6, name: 'Десерт', price: 150, image: 'dessert.jpg' }
];

menuItems.forEach(item => {
    loadImage(`images/${item.image}`, img => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <img src="${img.src}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Цена: ${item.price} руб.</p>
        `;
        document.querySelector('.menu-items').appendChild(menuItem);

        // Обработчик клика для отправки данных в Telegram WebApp
        menuItem.onclick = () => {
            if (window.Telegram && window.Telegram.WebApp) {
                window.Telegram.WebApp.sendData(JSON.stringify(item));
            } else {
                alert(`${item.name} добавлен в заказ!`);
            }
        };
    });
});
