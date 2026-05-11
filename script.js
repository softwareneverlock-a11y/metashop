// --- КОНФИГУРАЦИЯ ТОВАРОВ ---
const luckyVastes = [
    { name: "Blueberry", img: "blueberry.jpg", stock: true },
    { name: "Cold Mango", img: "cold-mango.jpg", stock: true },
    { name: "Spearmint", img: "spearmint.jpg", stock: true },
    { name: "Cola", img: "cola.jpg", stock: true },
    { name: "Banana", img: "banana.jpg", stock: true },
    { name: "Pink Lemonade", img: "pink-lemonade.jpg", stock: true },
    { name: "Watermelon", img: "watermelon-lemonade.jpg", stock: false },
    { name: "Strawberry", img: "strawberry.jpg", stock: false },
    { name: "Grape", img: "grape.jpg", stock: false },
    { name: "Apple", img: "apple.jpg", stock: false }
];

const podList = [
    { name: "Vaporesso XROS (0.8)", price: "150 грн", img: "cartridge-xros.jpg", stock: true },
    { name: "Vaporesso XROS (1.0)", price: "150 грн", img: "cartridge-xros-1.jpg", stock: true },
    { name: "Ursa Nano (0.6)", price: "160 грн", img: "ursa-06.jpg", stock: false }
];

// --- ЛОГИКА ОБЩЕЙ КОРЗИНЫ (LocalStorage) ---

// Загружаем корзину из памяти браузера при старте
let cart = JSON.parse(localStorage.getItem('metashop_cart')) || [];

function saveCart() {
    localStorage.setItem('metashop_cart', JSON.stringify(cart));
    updateCartCounter();
}

function updateCartCounter() {
    const count = document.getElementById('cart-count');
    if (count) {
        count.innerText = cart.length;
        count.style.display = cart.length > 0 ? 'block' : 'none';
    }
}

// --- ОТРИСОВКА ---

function render() {
    const luckyGrid = document.getElementById('lucky-grid');
    const cartridgeGrid = document.getElementById('cartridge-grid');
    const brandGrid = document.getElementById('brand-grid');

    if (brandGrid) {
        brandGrid.innerHTML = `
            <a href="lucky-15.html" class="category-card">
                <div class="volume-badge">POPULAR</div>
                <h2>LUCKY</h2>
                <p>15ML / 140 ГРН</p>
                <div style="margin-top:20px; color:var(--accent); font-size:10px;">ПЕРЕГЛЯНУТИ КАТАЛОГ ></div>
            </a>
        `;
    }

    if (luckyGrid) {
        luckyGrid.innerHTML = luckyVastes.map(v => `
            <div class="product-card ${!v.stock ? 'out-of-stock' : ''}">
                <div class="volume-badge">15ML</div>
                <img src="${v.img}" alt="${v.name}" onerror="this.src='https://via.placeholder.com/200/000000/00ffcc?text=METASHOP'">
                <h3>${v.name}</h3>
                <p class="status-text ${v.stock ? 'in-stock-text' : 'out-of-stock-text'}">
                    ● ${v.stock ? 'В НАЯВНОСТІ' : 'НЕМАЄ В НАЯВНОСТІ'}
                </p>
                <div class="card-buttons">
                    <button class="cart-btn" onclick="addToCart('${v.name} 15ml')">🛒</button>
                    <button class="buy-now-btn" onclick="buyNow('${v.name} 15ml')">ЗАМОВИТИ</button>
                </div>
            </div>
        `).join('');
    }

    if (cartridgeGrid) {
        cartridgeGrid.innerHTML = podList.map(p => `
            <div class="product-card ${!p.stock ? 'out-of-stock' : ''}">
                <div class="volume-badge">${p.price}</div>
                <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/200/000000/00ffcc?text=PODS'">
                <h3>${p.name}</h3>
                <p class="status-text ${p.stock ? 'in-stock-text' : 'out-of-stock-text'}">
                    ● ${p.stock ? 'В НАЯВНОСТІ' : 'НЕМАЄ В НАЯВНОСТІ'}
                </p>
                <div class="card-buttons">
                    <button class="cart-btn" onclick="addToCart('${p.name}')">🛒</button>
                    <button class="buy-now-btn" onclick="buyNow('${p.name}')">ЗАМОВИТИ</button>
                </div>
            </div>
        `).join('');
    }
    updateCartCounter();
}

// --- УПРАВЛЕНИЕ ЗАКАЗАМИ ---

function addToCart(item) {
    cart.push(item);
    saveCart();
    showNotify(`✅ ${item.toUpperCase()} ДОДАНО`);
}

function showNotify(text) {
    const oldNotify = document.querySelector('.notification');
    if (oldNotify) oldNotify.remove();
    const el = document.createElement('div');
    el.className = 'notification show';
    el.innerText = text;
    document.body.appendChild(el);
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 500); }, 2500);
}

function toggleCart() {
    const m = document.getElementById('cart-modal');
    if (!m) return;
    m.style.display = (m.style.display === 'flex') ? 'none' : 'flex';
    const items = document.getElementById('cart-items');
    if (items) {
        items.innerHTML = cart.map((i, index) => `
            <div class="cart-item" style="color:var(--accent); border-bottom: 1px solid var(--card-border); padding:10px 0; display:flex; justify-content:space-between;">
                <span>[+] ${i.toUpperCase()}</span>
                <span onclick="removeFromCart(${index})" style="cursor:pointer; color:#ff4444;">✕</span>
            </div>
        `).join('') || 'КОШИК ПОРОЖНІЙ';
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    toggleCart(); // Обновляем вид корзины
    toggleCart(); 
}

function buyNow(item) { 
    window.open(`https://t.me/MetaShop4?text=Вітаю! Хочу замовити: ${item}`); 
}

function checkout() { 
    if(cart.length) {
        const text = encodeURIComponent(`Нове замовлення:\n${cart.join('\n')}`);
        window.open(`https://t.me/MetaShop4?text=${text}`);
        // Очищаем корзину после заказа (по желанию)
        // cart = []; saveCart(); updateCartCounter();
    }
}

document.addEventListener('DOMContentLoaded', render);