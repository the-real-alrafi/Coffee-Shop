document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const searchIcon = document.getElementById('searchIcon');
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput'); // Changed to get by ID
    const closeSearchBar = document.getElementById('closeSearchBar');
    const menuIcon = document.getElementById('menuIcon');
    const navMenu = document.getElementById('navMenu');
    const closeMenuIcon = document.getElementById('closeMenuIcon');
    const navLinks = document.querySelectorAll('#navMenu a');
    const sections = document.querySelectorAll('header, .about-section, .product-section, .customer-section, .footer-section');
    const productGrid = document.querySelector('.product-grid');
    const productCards = document.querySelectorAll('.product-card');
    const searchRecommendationsContainer = document.getElementById('searchRecommendations'); // NEW
    
    // Quick View Modal elements
    const quickViewModalOverlay = document.getElementById('quickViewModalOverlay');
    const closeQuickViewModalBtn = document.getElementById('closeQuickViewModal');
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductTitle = document.getElementById('modalProductTitle');
    const modalProductDescription = document.getElementById('modalProductDescription');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const viewFullDetailsBtn = document.getElementById('viewFullDetailsBtn'); // NEW

    // Define your product data here. This should ideally come from a backend or a separate data file.
    // Ensure product IDs match the data-product-id in index.html
    const productsData = [
        {
            id: 'arabica',
            name: 'ARABICA COFFEE',
            image: 'images/Arebica.webp',
            price: '$25.00',
            description: 'A premium Arabica blend, known for its smooth taste, aromatic fragrance, and balanced acidity. Perfect for a delightful morning cup.',
            fullDetails: 'This single-origin Arabica coffee is sourced from the high-altitude regions of Ethiopia, offering notes of citrus, jasmine, and chocolate. It features a medium body and a clean finish, making it a versatile choice for various brewing methods. Enjoy its natural sweetness and vibrant complexity.'
        },
        {
            id: 'rich-espresso',
            name: 'RICH ESPRESSO',
            image: 'images/Rich Espresso Blend.webp',
            price: '$28.00',
            description: 'A bold and intense espresso blend, crafted for a rich crema and a powerful coffee experience. Ideal for espresso machines.',
            fullDetails: 'Our Rich Espresso Blend is a carefully selected mix of Arabica and Robusta beans, dark roasted to perfection. It delivers a strong, full-bodied flavor with hints of dark chocolate and nutty undertones. Expect a thick, persistent crema and a robust coffee foundation for milk-based drinks.'
        },
        {
            id: 'bold-dark-roast',
            name: 'BOLD DARK ROAST',
            image: 'images/Bold Dark Roast.webp',
            price: '$27.00',
            description: 'Experience the deep, smoky flavors of our Bold Dark Roast. A classic choice for those who love a strong, invigorating coffee.',
            fullDetails: 'This powerful dark roast is designed for maximum flavor and intensity. With low acidity and a heavy body, it presents strong notes of toasted nuts, bittersweet chocolate, and a hint of caramel. It\'s a satisfying coffee that stands up well to cream and sugar, perfect for a robust start to your day.'
        },
        {
            id: 'signature-blend',
            name: 'SIGNATURE BLEND',
            image: 'images/PREMIUM-Gift-Box-3.avif',
            price: '$30.00',
            description: 'Our house special, a balanced and harmonious blend with a smooth finish. A true delight for any coffee connoisseur.',
            fullDetails: 'The Signature Blend represents the pinnacle of our craft. It\'s a harmonious combination of beans from various regions, expertly roasted to bring out a complex flavor profile. Expect notes of berries, dark chocolate, and a lingering sweet aftertaste. This blend is consistently smooth and aromatic.'
        },
        {
            id: 'morning-bliss',
            name: 'MORNING BLISS',
            image: 'images/Morning Bliss Coffee.webp',
            price: '$26.00',
            description: 'A light and bright roast, perfect for waking up. Offers a refreshing and uplifting coffee experience.',
            fullDetails: 'Morning Bliss is a vibrant light roast that offers a clean and crisp taste. It highlights the bright, natural acidity of the beans with fruity and floral notes. This coffee is best enjoyed black to truly appreciate its delicate complexities and refreshing finish.'
        },
        {
            id: 'african-coffee',
            name: 'AFRICAN COFFEE',
            image: 'images/AFRICAN COFFEE.webp',
            price: '$36.00',
            description: 'Explore the exotic flavors of African beans, known for their vibrant fruity notes and distinct aroma.',
            fullDetails: 'Our African Coffee is a celebration of the continent\'s rich coffee heritage. Sourced from renowned farms, it boasts lively notes of blueberry, citrus, and a hint of spice. This medium-light roast offers a clean, bright cup with a delightful complexity and an unforgettable aromatic profile.'
        },
        {
            id: 'espresso-taster',
            name: 'ESPRESSO TASTER',
            image: 'images/ESPRESSO TASTER PACK.webp',
            price: '$38.00',
            description: 'A curated selection of our finest espresso blends, perfect for discovering your favorite. Great for gifts.',
            fullDetails: 'The Espresso Taster Pack includes three distinct 250g bags of our most popular espresso blends. Discover varying intensities and flavor profiles, from nutty and chocolatey to bright and fruity. Perfect for the home barista looking to expand their palate or as a thoughtful gift for a coffee lover.'
        },
        {
            id: 'decaf-delight',
            name: 'DECAF DELIGHT',
            image: 'images/Decaf Delight Beans.webp',
            price: '$42.00',
            description: 'Enjoy rich coffee flavor without the caffeine. Our Decaf Delight uses a natural process to retain true coffee taste.',
            fullDetails: 'Our Decaf Delight offers all the rich flavor of traditional coffee, minus the caffeine. Using a gentle, natural water process, we ensure the beans retain their complex notes of caramel and roasted nuts. Enjoy a smooth, comforting cup anytime of day or night, without the jitters.'
        }
    ];


    const setNavHeightCssVar = () => {
        document.documentElement.style.setProperty('--nav-height', `${nav.offsetHeight}px`);
    };

    setNavHeightCssVar();
    window.addEventListener('resize', setNavHeightCssVar);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    const closeSearchBarFn = () => {
        if (searchBar.classList.contains('active')) {
            searchBar.classList.remove('active');
            searchBar.addEventListener('transitionend', function handler() {
                searchBar.classList.add('hidden');
                searchInput.value = ''; // Clear search input when closing
                filterProducts(''); // Show all products when closing search bar
                searchRecommendationsContainer.classList.remove('active'); // Hide recommendations
                searchBar.removeEventListener('transitionend', handler);
            }, { once: true });
        }
    };

    const closeMobileMenuFn = () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    };

    searchIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        closeMobileMenuFn();

        if (searchBar.classList.contains('hidden')) {
            searchBar.classList.remove('hidden');
            void searchBar.offsetWidth; 
        }
        searchBar.classList.toggle('active');
        searchBar.style.top = `${nav.offsetHeight}px`; // Ensure search bar is positioned correctly
        if (searchBar.classList.contains('active')) {
            searchInput.focus(); // Focus on the input when it becomes active
        } else {
            searchInput.value = ''; // Clear input if it's being deactivated by icon click
            filterProducts(''); // Show all products if search bar is toggled off
            searchRecommendationsContainer.classList.remove('active'); // Hide recommendations
        }
    });

    closeSearchBar.addEventListener('click', () => {
        closeSearchBarFn();
    });

    document.addEventListener('click', (event) => {
        if (!searchBar.contains(event.target) && !searchIcon.contains(event.target)) {
            closeSearchBarFn();
        }
    });
    searchBar.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    menuIcon.addEventListener('click', () => {
        closeSearchBarFn();
        navMenu.classList.add('active');
    });

    closeMenuIcon.addEventListener('click', () => {
        closeMobileMenuFn();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').split('#')[1]; // Handle links like index.html#about-us
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offset = (targetId === 'contact') ? 0 : nav.offsetHeight; 
                
                window.scrollTo({
                    top: targetSection.offsetTop - offset,
                    behavior: 'smooth'
                });
            } else if (this.getAttribute('href').startsWith('index.html')) {
                // If it's a link to index.html with a hash, navigate and then scroll
                window.location.href = this.getAttribute('href');
            }
            closeMobileMenuFn(); // Close menu after clicking a link
        });
    });

    const updateActiveLink = () => {
        let currentActiveId = '';
        const navHeight = nav.offsetHeight;

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const rect = section.getBoundingClientRect();
            
            // Check if the section is in view, considering the fixed header
            // A section is considered active if its top is above the nav (or slightly below)
            // AND a significant portion of it is visible OR it's the contact section
            if (rect.top <= navHeight + (window.innerHeight * 0.3) && rect.bottom > (window.innerHeight * 0.3)) {
                currentActiveId = section.id;
                break;
            }
        }
        
        // Special handling for the very top of the page (home section)
        if (window.scrollY < navHeight * 0.5 && document.getElementById('home')) {
            currentActiveId = 'home';
        }


        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            const linkId = linkHref.includes('#') ? linkHref.split('#')[1] : '';

            if (linkId === currentActiveId && linkHref.startsWith('index.html#')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('resize', updateActiveLink);

    // Initial state: hide search bar after CSS transition finishes
    setTimeout(() => {
        searchBar.classList.add('hidden');
        searchBar.classList.remove('active');
    }, 0);

    // --- Product Search & Recommendations Functionality ---
    const displayRecommendations = (searchTerm) => {
        searchRecommendationsContainer.innerHTML = ''; // Clear previous recommendations
        if (searchTerm.trim() === '') {
            searchRecommendationsContainer.classList.remove('active');
            return;
        }

        const filteredProducts = productsData.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filteredProducts.length > 0) {
            const heading = document.createElement('h5');
            heading.textContent = 'Products';
            searchRecommendationsContainer.appendChild(heading);

            filteredProducts.forEach(product => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.classList.add('search-suggestion');
                suggestionDiv.dataset.productId = product.id; // Store product ID

                suggestionDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="text-content">
                        <div class="product-name">${product.name}</div>
                        <div class="product-price-small">${product.price}</div>
                    </div>
                `;
                searchRecommendationsContainer.appendChild(suggestionDiv);

                suggestionDiv.addEventListener('click', () => {
                    // Navigate to product detail page on click
                    window.location.href = `product-detail.html?id=${product.id}`;
                    closeSearchBarFn(); // Close search bar after navigation
                });
            });
            searchRecommendationsContainer.classList.add('active');
        } else {
            searchRecommendationsContainer.classList.remove('active');
        }
    };

    // Listen for input on the search field for recommendations
    searchInput.addEventListener('input', (event) => {
        displayRecommendations(event.target.value);
    });

    // --- Quick View Modal Functionality ---
    const showQuickViewModal = (product) => {
        modalProductImage.src = product.image;
        modalProductImage.alt = product.name;
        modalProductTitle.textContent = product.name;
        modalProductDescription.textContent = product.description; // Use short description for modal
        modalProductPrice.textContent = product.price;

        // Set the ID for the "View Full Details" button
        viewFullDetailsBtn.dataset.productId = product.id;

        quickViewModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    };

    const hideQuickViewModal = () => {
        quickViewModalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scroll
    };

    // Add event listeners to all "Quick View" buttons on product cards
    productGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('quick-view-btn')) {
            const productId = event.target.closest('.product-card').dataset.productId;
            const product = productsData.find(p => p.id === productId);
            if (product) {
                showQuickViewModal(product);
            }
        }
    });

    closeQuickViewModalBtn.addEventListener('click', hideQuickViewModal);
    quickViewModalOverlay.addEventListener('click', (event) => {
        if (event.target === quickViewModalOverlay) {
            hideQuickViewModal();
        }
    });

    // Event listener for "View Full Details" button inside the modal
    viewFullDetailsBtn.addEventListener('click', () => {
        const productId = viewFullDetailsBtn.dataset.productId;
        if (productId) {
            window.location.href = `product-detail.html?id=${productId}`;
            hideQuickViewModal(); // Close modal when navigating
        }
    });

    // Initial filter on page load for the product section
    // (This part was from your previous script to filter products on the main page.
    // Given the new recommendation feature, this might be less critical or could be simplified.)
    const filterProducts = (searchTerm) => {
        // This function is still used when the search bar is closed or toggled off
        // It ensures all product cards are visible on the main product section when not searching.
        productCards.forEach(card => {
            const productTitle = card.querySelector('.product-title').textContent.toLowerCase();
            if (searchTerm === '' || productTitle.includes(searchTerm.toLowerCase())) {
                card.style.display = 'flex'; // Show the product card
            } else {
                card.style.display = 'none'; // Hide the product card
            }
        });

        // Hide any "no results" message if it exists
        const noResultsMessage = document.getElementById('no-search-results');
        if (noResultsMessage) {
            noResultsMessage.style.display = 'none';
        }
    };
});