// --- ДАННЫЕ МАГАЗИНА ---

// Данные для Брендов Жидкостей (для liquids.html)
const liquidBrands = [
    { name: "Lucky 15ml", img: "lucky-logo.jpg", link: "lucky-15.html", price: "140 грн" }
];

// Данные для Картриджей (для cartridges.html)
const cartridgeProducts = [
    { name: "Vaporesso XROS (0.8)", img: "cartridge-xros.jpg", stock: true, price: "150 грн" },
    { name: "Vaporesso XROS (1.0)", img: "cartridge-xros-1.jpg", stock: true, price: "150 грн" },
    { name: "Ursa Nano (0.6)", img: "ursa-06.jpg", stock: false, price: "160 грн" }
];

// Данные для Вкусов Lucky (для lucky-15.html)
const luckyVastes = [
    { name: "Blueberry", img: "blueberry.jpg", stock: true },
    { name: "Cold Mango", img: "cold-mango.jpg", stock: true },
    { name: "Spearmint", img: "spearmint.jpg", stock: true },
    { name: "Cola", img: "cola.jpg", stock: true },
    { name: "Banana", img: "banana.jpg", stock: true },
    { name: "Pink Lemonade", img: "pink-lemonade.jpg", stock: true },
    { name: "Watermelon Lemonade", img: "watermelon-lemonade.jpg", stock: false },
    { name: "Strawberry", img: "strawberry.jpg", stock: false },
    { name: "Grape", img: "grape.jpg", stock: false },
    { name: "Apple", img: "apple.jpg", stock: false }
];

let cart = [];

// --- ФУНКЦИИ ОТРИСОВКИ (С УЧЕТОМ КЛАССОВ CSS) ---

function renderPage() {
    console.log("METASHOP: Render started...");
    
    const brandGrid = document.getElementById('brand-grid');
    const cartridgeGrid = document.getElementById('cartridge-grid');
    const luckyGrid = document.getElementById('lucky-grid');

    // 1. Отрисовка Брендов Жидкостей (на liquids.html)
    if (brandGrid) {
        brandGrid.innerHTML = liquidBrands.map(b => `
            <a href="${b.link}" class="category-card">
                <h2>${b.name}</h2>
                <p>от ${b.price}</p>
            </a>
        `).join('');
    }

    // 2. Отрисовка Картриджей (на cartridges.html) - ПРИМЕНЯЕМ КЛАССЫ CSS
    if (cartridgeGrid) {
        cartridgeGrid.innerHTML = cartridgeProducts.map(c => `
            <div class="product-card ${!c.stock ? 'out-of-stock' : ''}">
                <img src="${c.img}" alt="${c.name}" onerror="this.src='https://via.placeholder.com/150?text=Pods'">
                <h3>${c.name}</h3>
                <p class="volume-badge">${c.price}</p>
                <div class="card-buttons">
                    <button class="cart-btn" onclick="addToCart('${c.name}')" ${!c.stock ? 'disabled' : ''}>В корзину</button>
                    <button class="buy-now-btn" onclick="buyNow('${c.name}')" ${!c.stock ? 'disabled' : ''}>Купить</button>
                </div>
            </div>
        `).join('');
    }

    // 3. Отрисовка Вкусов Lucky (на lucky-15.html) - ПРИМЕНЯЕМ КЛАССЫ CSS И ОБЪЕМ
    if (luckyGrid) {
        luckyGrid.innerHTML = luckyVastes.map(p => `
            <div class="product-card ${!p.stock ? 'out-of-stock' : ''}">
                <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/150?text=Lucky'">
                <h3>${p.name}</h3>
                <p class="volume-badge">15ml</p>
                <p class="status">${p.stock ? 'В наличии' : 'Нет в наличии'}</p>
                <div class="card-buttons">
                    <button class="cart-btn" onclick="addToCart('${p.name} (15ml)')" ${!p.stock ? 'disabled' : ''}>В корзину</button>
                    <button class="buy-now-btn" onclick="buyNow('${p.name} (15ml)')" ${!p.stock ? 'disabled' : ''}>Купить</button>
                </div>
            </div>
        `).join('');
    }
}

// --- ФУНКЦИИ КОРЗИНЫ ---

function addToCart(name) {
    cart.push(name);
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.innerText = cart.length;
    showNotification(`✅ ${name} добавлен в корзину!`);
}

function buyNow(name) {
    const text = encodeURIComponent(`Привет! Хочу сразу купить: ${name}`);
    window.open(`https://t.me/MetaShop4?text=${text}`, '_blank');
}

function showNotification(text) {
    // Удаляем старое уведомление, если оно есть
    const old = document.querySelector('.notification');
    if (old) old.remove();

    const el = document.createElement('div');
    el.className = 'notification';
    el.innerText = text;
    document.body.appendChild(el);
    setTimeout(() => el.classList.add('show'), 10);
    setTimeout(() => {
        el.classList.remove('show');
        setTimeout(() => el.remove(), 300);
    }, 2500);
}

function toggleCart() {
    const m = document.getElementById('cart-modal');
    if (!m) return;
    m.style.display = (m.style.display === 'flex') ? 'none' : 'flex';
    const itemsEl = document.getElementById('cart-items');
    if (itemsEl) {
        itemsEl.innerHTML = cart.map(i => `<div class="cart-item">🔹 ${i}</div>`).join('') || '<div style="text-align:center;color:#888;padding:20px;">Корзина пуста</div>';
    }
}

function checkout() {
    if (cart.length === 0) return;
    const text = encodeURIComponent(`Мой заказ в Metashop:\n${cart.join('\n')}`);
    window.open(`https://t.me/MetaShop4?text=${text}`, '_blank');
}

// Запуск при загрузке
window.onload = renderPage;