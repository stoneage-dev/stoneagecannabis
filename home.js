
        // Restaurant Menu Data
        const menuItems = [
            { id: 1, name: "MUKIM TULLIP", category: "starters", price: 55, description: "unique, pungent, and sweet aroma profile , which is creamy, fruity, and reminiscent of ice cream." },
            { id: 2, name: "SKYWALKER", category: "starters", price: 65, description: "THC content ranging from 15% to 23% and is prized for its relaxing and euphoric effects." },
            { id: 3, name: "CHEESE", category: "starters", price: 55, description: "relaxing and euphoric hybrid effect that balances physical relaxation with a powerful head high" },
            { id: 4, name: "EXODUS CHEESE", category: "mains", price: 85, description: "celebrated for its unique sensory profile and powerful, long-lasting effects." },
            { id: 5, name: "BLUE FIRE", category: "mains", price: 95, description: "buds with a complex flavor profile of berries, citrus, and fuel." },
            { id: 6, name: "MAKOMO", category: "mains", price: 85, description: "high THC content, typically ranging from 15-20% and sometimes reaching up to 23%" },
            { id: 7, name: "SKITTLES", category: "mains", price: 95, description: "awardwinning cross between Grape Ape, Grapefruit, and an undisclosed third strain" },
            { id: 8, name: "BLOCK BERRY", category: "desserts", price: 145, description: "buds are dense, olive-green with purple hues and fiery orange hairs, covered in a frosty trichome layer."},
            { id: 9, name: "ORIGINAL BLITZ", category: "desserts", price: 155, description: "Indica-dominant hybrid (70% indica and 30% sativa)." },
            { id: 10, name: "FORBIDDOS", category: "desserts", price: 155, description: "This sweet-tasting variety provides hybrid effects that can be usefull during day or night." },
            { id: 11, name: "WEEDING CAKE", category: "drinks", price: 145, description: "buds with a complex flavor profile of berries, citrus, and fuel. Averages around 24% THC content" },
            { id: 12, name: "BLACK CHERRY PUNCH", category: "drinks", price: 185, description: "buds with a complex flavor profile of cherries, citrus, and fuel." },
            { id: 13, name: "GREEN CRACK", category: "drinks", price: 195, description: "Indica-dominant hybrid (70% indica and 30% sativa)." },
            { id: 14, name: "SLURRICANE", category: "drinks", price: 185, description: "olive-green with purple hues and fiery orange hairs, covered in a frosty trichome layer" }
        ];

        // Shopping Cart
        let cart = [];
        let cartCount = 0;
        let cartTotal = 0;

        // DOM Elements
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mainNav = document.getElementById('mainNav');
        const overlay = document.getElementById('overlay');
        const cartIcon = document.getElementById('cartIcon');
        const cartCountEl = document.getElementById('cartCount');
        const cartSidebar = document.getElementById('cartSidebar');
        const closeCart = document.getElementById('closeCart');
        const cartItemsEl = document.getElementById('cartItems');
        const cartTotalEl = document.getElementById('cartTotal');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const menuCategories = document.getElementById('menuCategories');
        const menuGrid = document.getElementById('menuGrid');
        const bookingForm = document.getElementById('bookingForm');
        const membershipForm = document.getElementById('membershipForm');
        const navLinks = document.querySelectorAll('nav a');

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Load menu items
            loadMenuItems('all');
            
            // Set up event listeners
            setupEventListeners();
            
            // Set minimum date for booking to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('date').setAttribute('min', today);
        });

        // Set up all event listeners
        function setupEventListeners() {
            // Mobile menu toggle
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
            overlay.addEventListener('click', toggleMobileMenu);
            
            // Cart functionality
            cartIcon.addEventListener('click', function(e) {
                e.preventDefault();
                openCart();
            });
            
            closeCart.addEventListener('click', closeCartSidebar);
            checkoutBtn.addEventListener('click', checkout);
            
            // Menu category filtering
            const categoryBtns = document.querySelectorAll('.category-btn');
            categoryBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    // Load menu items for selected category
                    const category = this.getAttribute('data-category');
                    loadMenuItems(category);
                });
            });
            
            // Navigation
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    if(this.getAttribute('href').startsWith('#')) {
                        e.preventDefault();
                        const pageId = this.getAttribute('href').substring(1);
                        showPage(pageId);
                        
                        // Update active nav link
                        navLinks.forEach(l => l.classList.remove('active'));
                        this.classList.add('active');
                        
                        // Close mobile menu if open
                        if(mainNav.classList.contains('active')) {
                            toggleMobileMenu();
                        }
                    }
                });
            });
            
            // Forms
            bookingForm.addEventListener('submit', handleBooking);
            membershipForm.addEventListener('submit', handleMembership);
        }

        // Toggle mobile menu
        function toggleMobileMenu() {
            mainNav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : 'auto';
        }

        // Show specific page
        function showPage(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('.page-content');
            pages.forEach(page => {
                page.style.display = 'none';
            });
            
            // Show selected page
            const selectedPage = document.getElementById(pageId);
            if(selectedPage) {
                selectedPage.style.display = 'block';
                
                // Scroll to top of the page
                window.scrollTo(0, 0);
            }
        }

        // Load menu items based on category
        function loadMenuItems(category) {
            menuGrid.innerHTML = '';
            
            // Filter items if not "all"
            const itemsToShow = category === 'all' 
                ? menuItems 
                : menuItems.filter(item => item.category === category);
            
            // Create menu item cards
            itemsToShow.forEach(item => {
                const menuItemEl = document.createElement('div');
                menuItemEl.className = 'menu-item';
                menuItemEl.innerHTML = `
                    <div class="menu-item-header">
                        <h4 class="menu-item-name">${item.name}</h4>
                        <div class="menu-item-price">R ${item.price.toFixed(2)}</div>
                    </div>
                    <p class="menu-item-desc">${item.description}</p>
                    <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
                `;
                
                menuGrid.appendChild(menuItemEl);
            });
            
            // Add event listeners to "Add to Cart" buttons
            document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    addToCart(itemId);
                });
            });
        }

        // Add item to cart
        function addToCart(itemId) {
            const item = menuItems.find(i => i.id === itemId);
            
            // Check if item already in cart
            const existingItem = cart.find(i => i.id === itemId);
            
            if(existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: 1
                });
            }
            
            // Update cart count and total
            updateCart();
            
            // Show notification
            showNotification(`${item.name} added to cart!`);
        }

        // Update cart display
        function updateCart() {
            // Calculate total items and price
            cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            
            // Update cart count in header
            cartCountEl.textContent = cartCount;
            
            // Update cart sidebar
            renderCartItems();
            
            // Update cart total
            cartTotalEl.textContent = `R ${cartTotal.toFixed(2)}`;
        }

        // Render cart items in sidebar
        function renderCartItems() {
            cartItemsEl.innerHTML = '';
            
            if(cart.length === 0) {
                cartItemsEl.innerHTML = '<p style="text-align: center; padding: 20px;">Your cart is empty</p>';
                return;
            }
            
            cart.forEach(item => {
                const cartItemEl = document.createElement('div');
                cartItemEl.className = 'cart-item';
                cartItemEl.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>R ${item.price.toFixed(2)} each</p>
                    </div>
                    <div class="cart-item-controls">
                        <button class="decrease-qty" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-qty" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                
                cartItemsEl.appendChild(cartItemEl);
            });
            
            // Add event listeners to cart item controls
            document.querySelectorAll('.decrease-qty').forEach(btn => {
                btn.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    updateCartItemQuantity(itemId, -1);
                });
            });
            
            document.querySelectorAll('.increase-qty').forEach(btn => {
                btn.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    updateCartItemQuantity(itemId, 1);
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    removeCartItem(itemId);
                });
            });
        }

        // Update cart item quantity
        function updateCartItemQuantity(itemId, change) {
            const itemIndex = cart.findIndex(item => item.id === itemId);
            
            if(itemIndex !== -1) {
                cart[itemIndex].quantity += change;
                
                // Remove item if quantity is 0 or less
                if(cart[itemIndex].quantity <= 0) {
                    cart.splice(itemIndex, 1);
                }
                
                updateCart();
            }
        }

        // Remove item from cart
        function removeCartItem(itemId) {
            cart = cart.filter(item => item.id !== itemId);
            updateCart();
        }

        // Open cart sidebar
        function openCart() {
            cartSidebar.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Close cart sidebar
        function closeCartSidebar() {
            cartSidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Handle checkout
        function checkout() {
            if(cart.length === 0) {
                alert('Your cart is empty. Add some items before checking out.');
                return;
            }
            
            // In a real application, this would redirect to a payment page
            // For this demo, we'll just show a confirmation message
            const itemList = cart.map(item => `${item.quantity}x ${item.name}`).join('\n');
            
            alert(`Order confirmed!\n\nItems:\n${itemList}\n\nTotal: R ${cartTotal.toFixed(2)}\n\nThank you for your order! We'll prepare it right away.`);
            
            // Clear cart
            cart = [];
            updateCart();
            closeCartSidebar();
        }

        // Handle booking form submission
        function handleBooking(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            
            // Format date for display
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            alert(`Booking confirmed!\n\nName: ${name}\nDate: ${formattedDate}\nTime: ${time}\nGuests: ${guests}\n\nThank you for your reservation! We look forward to serving you.`);
            
            // Reset form
            bookingForm.reset();
        }

        // Handle membership form submission
        function handleMembership(e) {
            e.preventDefault();
            alert('Thank you for joining the Stone Age Club! You will receive exclusive offers and updates via email.');
            
            // Reset form
            membershipForm.reset();
        }

        // Show notification
        function showNotification(message) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #5a3921;
                color: white;
                padding: 15px 20px;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1002;
                font-weight: 600;
                animation: fadeInUp 0.3s ease;
            `;
            
            // Add to document
            document.body.appendChild(notification);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'fadeOutDown 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // Add CSS animations for notifications
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeOutDown {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(20px);
                }
            }
        `;
        document.head.appendChild(style);