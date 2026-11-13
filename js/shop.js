/**
 * ALIENTO - Fitness & Wellness Shop
 * Pure frontend product catalogue with interactive WhatsApp Enquiry Cart
 */

const products = [
  {
    id: 'prod-1',
    name: 'Pilates Core Mini Ball',
    category: 'Equipment',
    price: '$22.00',
    description: 'Soft 20cm tactile Pilates ball designed for pelvic floor engagement, inner thigh activation, and comfortable spinal alignment during floor exercises.',
    image: 'assets/images/shapemaster.jpg'
  },
  {
    id: 'prod-2',
    name: 'Gentle Loop Resistance Bands (Set of 3)',
    category: 'Accessories',
    price: '$28.00',
    description: 'Premium woven fabric resistance bands with graduated light, medium, and firm tension levels that will not pinch or roll up during low-impact workouts.',
    image: 'assets/images/hero.jpg'
  },
  {
    id: 'prod-3',
    name: 'Comfort Dual-Layer Pilates Mat',
    category: 'Equipment',
    price: '$55.00',
    description: 'High-density 6mm cushioned exercise mat providing superior joint comfort for knees, hips, and back during gentle stretching and mobility work.',
    image: 'assets/images/vacushape.jpg'
  },
  {
    id: 'prod-4',
    name: 'Aliento Insulated Hydration Bottle (750ml)',
    category: 'Lifestyle',
    price: '$32.00',
    description: 'Double-walled stainless steel bottle in soft dusty blue, keeping water chilled for up to 24 hours while you move throughout your day.',
    image: 'assets/images/hero.jpg'
  },
  {
    id: 'prod-5',
    name: 'Acupressure Foot & Calf Roller',
    category: 'Recovery',
    price: '$24.00',
    description: 'Ergonomically contoured roller for releasing everyday foot arch tightness, supporting circulation, and complementing Whole Body Vibration sessions.',
    image: 'assets/images/massage-chair.jpg'
  },
  {
    id: 'prod-6',
    name: 'Pure Australian Magnesium Recovery Spray (150ml)',
    category: 'Recovery',
    price: '$26.00',
    description: 'Locally formulated topical magnesium mist to soothe tired muscles after your Shapemaster session or support a restful evening sleep.',
    image: 'assets/images/vibrosaun.jpg'
  }
];

// Enquiry Cart State
let enquiryCart = [];

document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  renderProducts();
  initCartDrawer();
  updateCartUI();
});

/**
 * Render Product Cards into #productsGrid
 */
function renderProducts() {
  const container = document.getElementById('productsGrid');
  if (!container) return;

  container.innerHTML = products.map(prod => `
    <div class="product-card reveal">
      <div class="product-media">
        <img src="${prod.image}" alt="${prod.name}" loading="lazy" />
      </div>
      <div class="product-body">
        <span class="product-category">${prod.category}</span>
        <h3>${prod.name}</h3>
        <div class="product-price">${prod.price} <span style="font-size:0.75rem; color:var(--color-text-muted); font-weight:normal;">AUD</span></div>
        <p>${prod.description}</p>
        <div class="product-actions">
          <button type="button" class="btn btn-primary btn-sm" onclick="addToEnquiry('${prod.id}')">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span>Add to Enquiry</span>
          </button>
          <button type="button" class="btn btn-outline btn-sm" onclick="enquireSingleProduct('${prod.id}')">
            <span>Enquire on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (typeof initScrollReveal === 'function') {
    initScrollReveal();
  }
}

/**
 * Add Product to Enquiry Cart
 */
window.addToEnquiry = function(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  const existing = enquiryCart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    enquiryCart.push({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${prod.name}" to your enquiry list.`);
};

/**
 * Instant Single Product Enquiry via WhatsApp
 */
window.enquireSingleProduct = function(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  const msg = `Hi Aliento, I would like to enquire about purchasing the ${prod.name} (${prod.price} AUD). Is it currently available for collection at Scoresby?`;
  window.openWhatsApp(msg);
};

/**
 * Cart Storage Helpers
 */
function saveCart() {
  try {
    sessionStorage.setItem('aliento_enquiry_cart', JSON.stringify(enquiryCart));
  } catch (e) {
    console.error(e);
  }
}

function loadCart() {
  try {
    const saved = sessionStorage.getItem('aliento_enquiry_cart');
    if (saved) {
      enquiryCart = JSON.parse(saved);
    }
  } catch (e) {
    enquiryCart = [];
  }
}

/**
 * Update Cart Drawer & Badges
 */
function updateCartUI() {
  const countEls = document.querySelectorAll('.cart-count');
  const totalCount = enquiryCart.reduce((acc, item) => acc + item.quantity, 0);

  countEls.forEach(el => {
    el.textContent = totalCount;
  });

  const trigger = document.querySelector('.floating-cart-trigger');
  if (trigger) {
    trigger.style.display = totalCount > 0 ? 'flex' : 'none';
  }

  renderCartItems();
}

/**
 * Render items inside Cart Drawer
 */
function renderCartItems() {
  const container = document.getElementById('cartItemsList');
  const footer = document.getElementById('cartDrawerFooter');
  if (!container) return;

  if (enquiryCart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--color-text-muted);">
        <p>Your enquiry list is currently empty.</p>
        <p style="font-size: 0.85rem; margin-top: 0.5rem;">Browse products above and click "Add to Enquiry".</p>
      </div>
    `;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'flex';

  container.innerHTML = enquiryCart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p style="color: var(--color-text-muted);">${item.price} each</p>
      </div>
      <div class="cart-item-qty">
        <button class="cart-qty-btn" onclick="changeQuantity('${item.id}', -1)">-</button>
        <span style="font-weight: 600; min-width: 20px; text-align: center;">${item.quantity}</span>
        <button class="cart-qty-btn" onclick="changeQuantity('${item.id}', 1)">+</button>
      </div>
      <button onclick="removeFromCart('${item.id}')" style="color: var(--color-error); padding: 4px;" title="Remove">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  `).join('');
}

window.changeQuantity = function(id, delta) {
  const item = enquiryCart.find(i => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    enquiryCart = enquiryCart.filter(i => i.id !== id);
  }
  saveCart();
  updateCartUI();
};

window.removeFromCart = function(id) {
  enquiryCart = enquiryCart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
};

window.clearCart = function() {
  enquiryCart = [];
  saveCart();
  updateCartUI();
};

/**
 * Send full cart enquiry over WhatsApp
 */
window.sendCartWhatsAppEnquiry = function() {
  if (enquiryCart.length === 0) return;

  let msg = 'Hi Aliento, I would like to enquire about purchasing the following wellness products:\n\n';
  enquiryCart.forEach((item, index) => {
    msg += `${index + 1}. ${item.name} (Qty: ${item.quantity}) - ${item.price} each\n`;
  });
  msg += '\nAre these items currently in stock for collection at your Scoresby studio?';

  window.openWhatsApp(msg);
};

/**
 * Initialize Drawer Events
 */
function initCartDrawer() {
  const openBtns = document.querySelectorAll('.open-cart-btn');
  const closeBtns = document.querySelectorAll('.close-cart-btn');
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartDrawerBackdrop');

  if (!drawer || !backdrop) return;

  const open = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', open));
  closeBtns.forEach(btn => btn.addEventListener('click', close));
  backdrop.addEventListener('click', close);
}
