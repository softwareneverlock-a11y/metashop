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
            <img src="img/${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.stock ? 'В наличии' : 'Нет в наличии'}</p>
            <button class="buy-btn" onclick="addToCart('${p.name}')" ${!p.stock ? 'disabled' : ''}>
                ${p.stock ? 'В корзину' : 'Распродано'}
            </button>
        </div>
    `).join('');
}

function addToCart(name) {
    cart.push(name);
    document.getElementById('cart-count').innerText = cart.length;
}

function toggleCart() {
    const m = document.getElementById('cart-modal');
    m.style.display = m.style.display === 'block' ? 'none' : 'block';
    document.getElementById('cart-items').innerHTML = cart.map(i => `<p>🔹 ${i}</p>`).join('') || 'Пусто';
}

function checkout() {
    if (cart.length === 0) return;
    const text = encodeURIComponent(`Привет! Хочу заказать Lucky: ${cart.join(', ')}`);
    window.open(`https://t.me/MetaShop4?text=${text}`, '_blank');
}

render();