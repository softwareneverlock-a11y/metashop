const podList = [
    { name: "Vaporesso XROS (0.8)", price: "150 грн", img: "cartridge-xros.jpg", stock: true },
    { name: "Vaporesso XROS (1.0)", price: "150 грн", img: "cartridge-xros-1.jpg", stock: true },
    { name: "Ursa Nano (0.6)", price: "160 грн", img: "ursa-06.jpg", stock: false }
];

const liquidVastes = [
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

let cart = [];

function render() {
    const luckyGrid = document.getElementById('lucky-grid');
    const cartridgeGrid = document.getElementById('cartridge-grid');
    const brandGrid = document.getElementById('brand-grid');

    if (brandGrid) {
        brandGrid.innerHTML = `<a href="lucky-15.html" class="category-card"><h2>Lucky</h2><p>15ml / 140 грн</p></a>`;
    }

    if (luckyGrid) {
        luckyGrid.innerHTML = liquidVastes.map(v => `
            <div class="product-card ${!v.stock ? 'out-of-stock' : ''}">
                <img src="${v.img}" alt="${v.name}" onerror="this.src='https://via.placeholder.com/150'">
                <h3>${v.name}</h3>
                <span class="volume-badge">15ml</span>
                <div class="card-buttons">
                    <button class="cart-btn" onclick="addToCart('${v.name} 15ml')">В корзину</button>
                    <button class="buy-now-btn" onclick="buyNow('${v.name} 15ml')">Купить</button>
                </div>
            </div>
        `).join('');
    }

    if (cartridgeGrid) {
        cartridgeGrid.innerHTML = podList.map(p => `
            <div class="product-card ${!p.stock ? 'out-of-stock' : ''}">
                <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/150'">
                <h3>${p.name}</h3>
                <span class="volume-badge">${p.price}</span>
                <div class="card-buttons">
                    <button class="cart-btn" onclick="addToCart('${p.name}')">В корзину</button>
                    <button class="buy-now-btn" onclick="buyNow('${p.name}')">Купить</button>
                </div>
            </div>
        `).join('');
    }
}

function addToCart(item) {
    cart.push(item);
    document.getElementById('cart-count').innerText = cart.length;
    showNotify(`✅ ${item} добавлен!`);
}

function showNotify(text) {
    const el = document.createElement('div');
    el.className = 'notification show';
    el.innerText = text;
    document.body.appendChild(el);
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 500); }, 2000);
}

function toggleCart() {
    const m = document.getElementById('cart-modal');
    m.style.display = (m.style.display === 'flex') ? 'none' : 'flex';
    document.getElementById('cart-items').innerHTML = cart.map(i => `<div class="cart-item">🔹 ${i}</div>`).join('') || 'Корзина пуста';
}

function buyNow(item) { window.open(`https://t.me/MetaShop4?text=Хочу купить: ${item}`); }
function checkout() { if(cart.length) window.open(`https://t.me/MetaShop4?text=Мой заказ:\n${cart.join('\n')}`); }

document.addEventListener('DOMContentLoaded', render);