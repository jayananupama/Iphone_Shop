import './bootstrap';

const products = [
    { id: 'iphone16pro', name: 'iPhone 16 Pro', desc: 'Natural Titanium · 256GB', category: 'iPhone', price: 119900, tag: 'NEW', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=85' },
    { id: 'macbookair', name: 'MacBook Air 15"', desc: 'M3 · Midnight · 16GB', category: 'Mac', price: 134900, tag: 'POPULAR', image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=600&q=85' },
    { id: 'airpodspro', name: 'AirPods Pro 2', desc: 'USB-C · Active Noise Cancellation', category: 'Audio', price: 24900, tag: 'ESSENTIAL', image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&q=85' },
    { id: 'watchultra', name: 'Apple Watch Ultra 2', desc: 'Titanium · Ocean Band', category: 'Watch', price: 89900, tag: 'ADVENTURE', image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&q=85' },
];
const iphones = [
    { model: 'iPhone 5s', year: 2013, display: '4.0" Retina', chip: 'A7', ram: '1 GB', camera: '8 MP', battery: '1560 mAh', storage: '16 / 32 / 64 GB', price: 8999 },
    { model: 'iPhone 8', year: 2017, display: '4.7" Retina HD', chip: 'A11 Bionic', ram: '2 GB', camera: '12 MP', battery: '1821 mAh', storage: '64 / 256 GB', price: 16999 },
    { model: 'iPhone X', year: 2017, display: '5.8" Super Retina', chip: 'A11 Bionic', ram: '3 GB', camera: '12 MP Dual', battery: '2716 mAh', storage: '64 / 256 GB', price: 21999 },
    { model: 'iPhone 11', year: 2019, display: '6.1" Liquid Retina', chip: 'A13 Bionic', ram: '4 GB', camera: '12 MP Dual', battery: '3110 mAh', storage: '64 / 128 / 256 GB', price: 32999 },
    { model: 'iPhone 13', year: 2021, display: '6.1" Super Retina XDR', chip: 'A15 Bionic', ram: '4 GB', camera: '12 MP Dual', battery: '3227 mAh', storage: '128 / 256 / 512 GB', price: 49999 },
    { model: 'iPhone 15', year: 2023, display: '6.1" Super Retina XDR', chip: 'A16 Bionic', ram: '6 GB', camera: '48 MP Dual', battery: '3349 mAh', storage: '128 / 256 / 512 GB', price: 64999 },
    { model: 'iPhone 16 Pro', year: 2024, display: '6.3" Super Retina XDR', chip: 'A18 Pro', ram: '8 GB', camera: '48 MP Pro Fusion', battery: '3582 mAh', storage: '128 / 256 / 512 GB / 1 TB', price: 119900 },
    { model: 'iPhone 17 Pro Max', year: 2026, display: '6.9" ProMotion XDR', chip: 'A19 Pro', ram: '12 GB', camera: '48 MP Pro Fusion', battery: '4685 mAh', storage: '256 / 512 GB / 1 TB', price: 164900 },
];
let cart = JSON.parse(localStorage.getItem('ishop-cart') || '[]');
const money = value => `₹${value.toLocaleString('en-IN')}`;
const $ = selector => document.querySelector(selector);
const toast = message => { const el = $('#toast'); el.textContent = message; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2300); };

function renderProducts(filter = 'all') {
    const visible = filter === 'all' ? products : products.filter(product => product.category === filter);
    $('#product-grid').innerHTML = visible.map(product => `<article class="product-card"><div class="product-image"><span class="tag">${product.tag}</span><img src="${product.image}" alt="${product.name}" loading="lazy"></div><div class="product-info"><h3>${product.name}</h3><p>${product.desc}</p><div class="product-footer"><span class="price">${money(product.price)}</span><button class="add-btn" aria-label="Add ${product.name}" data-add="${product.id}">+</button></div></div></article>`).join('');
    document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => addToCart(button.dataset.add)));
}
function addToCart(id) {
    const product = products.find(item => item.id === id); const existing = cart.find(item => item.id === id);
    existing ? existing.quantity++ : cart.push({ ...product, quantity: 1 }); saveCart(); openCart(); toast(`${product.name} added to your bag`);
}
function saveCart() { localStorage.setItem('ishop-cart', JSON.stringify(cart)); renderCart(); }
function renderCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0); $('#cart-count').textContent = count;
    $('#bag-title').textContent = count ? `${count} ${count === 1 ? 'item' : 'items'} selected.` : 'Nothing here yet.';
    $('#cart-items').innerHTML = cart.length ? cart.map(item => `<div class="cart-row"><img src="${item.image}" alt=""><div><h4>${item.name}</h4><p>${item.quantity} × ${money(item.price)}</p></div><button class="remove" data-remove="${item.id}">×</button></div>`).join('') : '<p class="empty-bag">Your considered collection starts here. Add something beautiful.</p>';
    $('#cart-total').textContent = money(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    document.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => { cart = cart.filter(item => item.id !== button.dataset.remove); saveCart(); }));
}
function openCart() { $('#cart-drawer').classList.add('open'); $('#drawer-overlay').classList.add('open'); }
function closeCart() { $('#cart-drawer').classList.remove('open'); $('#drawer-overlay').classList.remove('open'); }
function renderComparison() {
    const a = iphones[Number($('#compare-a').value)]; const b = iphones[Number($('#compare-b').value)];
    const rows = [['Display', a.display, b.display], ['Chip', a.chip, b.chip], ['RAM', a.ram, b.ram], ['Camera', a.camera, b.camera], ['Battery', a.battery, b.battery], ['Storage', a.storage, b.storage], ['Release year', a.year, b.year], ['Current price', money(a.price), money(b.price)]];
    $('#comparison-table').innerHTML = `<div class="comparison"><div><strong>Spec</strong><strong>${a.model}</strong><strong>${b.model}</strong></div>${rows.map(row => `<div><span>${row[0]}</span><span>${row[1]}</span><span>${row[2]}</span></div>`).join('')}</div>`;
}
function openCompare() { $('#compare-modal').classList.add('open'); renderComparison(); }
window.addEventListener('DOMContentLoaded', () => {
    renderProducts(); renderCart();
    setTimeout(() => $('#loader').classList.add('loaded'), 650);
    document.querySelectorAll('.reveal').forEach(element => new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: .12 }).observe(element));
    document.querySelectorAll('[data-count]').forEach(element => new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { let value = 0; const target = Number(element.dataset.count); const timer = setInterval(() => { element.textContent = ++value; if (value >= target) clearInterval(timer); }, 55); } }), { threshold: .5 }).observe(element));
    $('.cart-btn')?.addEventListener('click', openCart); $('#cart-btn').addEventListener('click', openCart); $('#close-cart').addEventListener('click', closeCart); $('#drawer-overlay').addEventListener('click', closeCart);
    $('#checkout-btn').addEventListener('click', () => cart.length ? toast('Checkout is ready — payment integration can be connected here.') : toast('Add an item before checking out.'));
    document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { renderProducts(button.dataset.filter); $('#featured').scrollIntoView({ behavior: 'smooth' }); }));
    $('#open-compare').addEventListener('click', openCompare); $('#close-compare').addEventListener('click', () => $('#compare-modal').classList.remove('open'));
    iphones.forEach((phone, index) => { ['#compare-a', '#compare-b'].forEach(selector => $(selector).insertAdjacentHTML('beforeend', `<option value="${index}">${phone.model}</option>`)); }); $('#compare-a').value = '4'; $('#compare-b').value = '6'; ['#compare-a', '#compare-b'].forEach(selector => $(selector).addEventListener('change', renderComparison));
    $('#newsletter-form').addEventListener('submit', event => { event.preventDefault(); toast('You’re on the list. Welcome to the good stuff.'); event.target.reset(); });
    document.addEventListener('mousemove', event => { $('.cursor-glow').style.left = `${event.clientX}px`; $('.cursor-glow').style.top = `${event.clientY}px`; });
});
