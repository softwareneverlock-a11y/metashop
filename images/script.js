const products = [
    { name: "Watermelon Lemonade", img: "watermelon-lemonade.jpg", stock: false },
    { name: "Blueberry", img: "blueberry.jpg", stock: true },
    { name: "Cold Mango", img: "cold-mango.jpg", stock: true },
    { name: "Spearmint", img: "spearmint.jpg", stock: true },
    { name: "Strawberry", img: "strawberry.jpg", stock: false },
    { name: "Cola", img: "cola.jpg", stock: true },
    { name: "Banana", img: "banana.jpg", stock: true },
    { name: "Grape", img: "grape.jpg", stock: false },
    { name: "Pink Lemonade", img: "pink-lemonade.jpg", stock: true },
    { name: "Apple", img: "apple.jpg", stock: false }
];

let cart = [];

function render() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(p => `
        <div class="product-card ${!p.stock ? 'out-of-stock' : ''}">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="status">${p.stock ? 'В наличии' : 'Нет в наличии'}</p>
            <div class="card-buttons">
                <button class="cart-btn" onclick="addToCart('${p.name}')" ${!p.stock ? 'disabled' : ''}>В корзину</button>
                <button class="buy-now-btn" onclick="buyNow('${p.name}')" ${!p.stock ? 'disabled' : ''}>Купить</button>
            </div>
        </div>
    `).join('');
}

function addToCart(name) {
    cart.push(name);
    document.getElementById('cart-count').innerText = cart.length;
    showNotification(`✅ ${name} добавлен в корзину!`);
}

function buyNow(name) {
    const text = encodeURIComponent(`Привет! Хочу сразу купить: ${name}`);
    window.open(`https://t.me/MetaShop4?text=${text}`, '_blank');
}

function showNotification(text) {
    const el = document.createElement('div');
    el.className = 'notification';
    el.innerText = text;
    document.body.appendChild(el);
    setTimeout(() => el.classList.add('show'), 10);
    setTimeout(() => {
        el.classList.remove('show');
        setTimeout(() => el.remove(), 300);
    }, 2000);
}

function toggleCart() {
    const m = document.getElementById('cart-modal');
    m.style.display = m.style.display === 'block' ? 'none' : 'block';
    document.getElementById('cart-items').innerHTML = cart.map(i => `<div class="cart-item">🔹 ${i}</div>`).join('') || 'Корзина пуста';
}

function checkout() {
    if (cart.length === 0) return;
    const text = encodeURIComponent(`Привет! Мой заказ в Metashop: ${cart.join(', ')}`);
    window.open(`https://t.me/MetaShop4?text=${text}`, '_blank');
}

render();