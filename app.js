// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Cart Functionality
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('overlay');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const emptyCartMessage = document.getElementById('empty-cart-message');

let cart = [];

// Toggle Cart Sidebar
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('translate-x-full');
    overlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.add('translate-x-full');
    overlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

// Product Data
const products = [
    {
        id: 1,
        name: 'MacBook Pro 16"',
        price: 2499,
        image: 'https://laptopmedia.com/wp-content/uploads/2024/12/5-26.jpg',
        category: 'workstation',
        specs: 'M2 Pro, 16GB RAM, 1TB SSD, 16-core GPU'
    },
    {
        id: 2,
        name: 'Dell XPS 15',
        price: 1999,
        image: 'https://static.webx.pk/files/68529/Images/91wgl3ibnil.-ac-sl1500--68529-0-050124030708532.jpg',
        category: 'ultrabook',
        specs: 'i7-12700H, 16GB RAM, 512GB SSD, RTX 3050 Ti'
    },
    {
        id: 3,
        name: 'ASUS ROG Zephyrus',
        price: 1799,
        image: 'https://m.media-amazon.com/images/I/81H2tfnNReL.jpg',
        category: 'gaming',
        specs: 'Ryzen 9 6900HS, 16GB RAM, 1TB SSD, RTX 3070 Ti'
    },
    {
        id: 4,
        name: 'HP Spectre x360',
        price: 1499,
        image: 'https://static.webx.pk/files/35368/Images/hp-spectre-x360-35368-2176212-220824061317576.jpg',
        category: 'ultrabook',
        specs: 'i7-1260P, 16GB RAM, 512GB SSD, Iris Xe'
    },
    {
        id: 5,
        name: 'Lenovo Legion 7',
        price: 2199,
        image: 'https://p3-ofp.static.pub//fes/cms/2024/06/28/h8zdohs0io6t47wysqge4u8276cfl4953303.png',
        category: 'gaming',
        specs: 'i9-12900HX, 32GB RAM, 1TB SSD, RTX 3080 Ti'
    },
    {
        id: 6,
        name: 'MacBook Air M2',
        price: 1199,
        image: 'https://static1.xdaimages.com/wordpress/wp-content/uploads/wm/2023/10/macbook-air-15-display-on-main.jpg',
        category: 'ultrabook',
        specs: 'M2, 8GB RAM, 256GB SSD, 8-core GPU'
    },
    {
        id: 7,
        name: 'Dell Precision 7770',
        price: 3299,
        image: 'https://images-cdn.ubuy.com.sa/66fe275aeb5799260d44a74e-dell-precision-7770-mobile-workstation.jpg',
        category: 'workstation',
        specs: 'i9-12950HX, 64GB RAM, 2TB SSD, RTX A5500'
    },
    {
        id: 8,
        name: 'ASUS TUF Dash F15',
        price: 1299,
        image: 'https://sm.pcmag.com/pcmag_me/photo/default/20210301-123658_uwaq.jpg',
        category: 'gaming',
        specs: 'i7-12650H, 16GB RAM, 512GB SSD, RTX 3060'
    }
];

// Render Products
const productsContainer = document.getElementById('products-container');

function renderProducts(filter = 'all') {
    productsContainer.innerHTML = '';

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(product => product.category === filter);

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300';
        productCard.innerHTML = `
                    <div class="h-48 overflow-hidden">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                    </div>
                    <div class="p-4">
                        <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                        <p class="text-gray-600 text-sm mb-3">${product.specs}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-xl font-bold">$${product.price.toLocaleString()}</span>
                            <button class="add-to-cart bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition" data-id="${product.id}">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `;
        productsContainer.appendChild(productCard);
    });

    // Add event listeners to the new buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Filter Products
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('bg-blue-500', 'text-white'));

        // Add active class to clicked button
        button.classList.add('bg-blue-500', 'text-white');

        // Filter products
        const filter = button.dataset.filter;
        renderProducts(filter);
    });
});

// Add to Cart
function addToCart(e) {
    const productId = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === productId);

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    // Show feedback
    const button = e.target;
    button.textContent = 'Added!';
    button.classList.add('bg-green-500');
    setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.classList.remove('bg-green-500');
    }, 1500);
}

// Update Cart
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        cartTotal.textContent = '$0.00';
        return;
    }

    emptyCartMessage.classList.add('hidden');

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item bg-gray-700 p-3 rounded-lg flex justify-between items-center';
        cartItem.innerHTML = `
                    <div class="flex items-center">
                        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded mr-4">
                        <div>
                            <h4 class="font-semibold">${item.name}</h4>
                            <p class="text-gray-400 text-sm">$${item.price.toLocaleString()} x ${item.quantity}</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <span class="font-semibold mr-4">$${itemTotal.toLocaleString()}</span>
                        <button class="remove-from-cart text-red-400 hover:text-red-300" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update total
    cartTotal.textContent = `$${total.toLocaleString()}`;

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Remove from Cart
function removeFromCart(e) {
    const productId = parseInt(e.target.closest('button').dataset.id);

    // Find item in cart
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }

        updateCart();
    }
}

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove('hidden');
    } else {
        backToTopBtn.classList.add('hidden');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize
renderProducts();

// Set first filter button as active
filterButtons[0].classList.add('bg-blue-500', 'text-white');
