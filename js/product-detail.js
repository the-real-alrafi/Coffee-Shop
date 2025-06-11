// js/product-detail.js
document.addEventListener('DOMContentLoaded', () => {
    // Re-declare productsData or fetch it from a global source if available
    // For simplicity, let's assume productsData is accessible or re-declared here.
    // In a real application, you'd fetch this from an API or a shared data file.
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

    const detailProductImage = document.getElementById('detailProductImage');
    const detailProductTitle = document.getElementById('detailProductTitle');
    const detailProductPrice = document.getElementById('detailProductPrice');
    const detailProductDescription = document.getElementById('detailProductDescription');
    const productDetailContainer = document.getElementById('productDetailContainer');


    const getProductIdFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    };

    const loadProductDetails = (productId) => {
        const product = productsData.find(p => p.id === productId);

        if (product) {
            detailProductImage.src = product.image;
            detailProductImage.alt = product.name;
            detailProductTitle.textContent = product.name;
            detailProductPrice.textContent = product.price;
            detailProductDescription.textContent = product.fullDetails; // Use full details for dedicated page
            document.title = `${product.name} - Coffee Shop`; // Update page title
            productDetailContainer.style.display = 'flex'; // Ensure container is visible
        } else {
            // Handle case where product is not found (e.g., show an error message)
            productDetailContainer.innerHTML = '<p style="text-align: center; font-size: 1.5em; color: #555;">Product not found!</p>';
            productDetailContainer.style.display = 'block'; // Adjust display for error message
            document.title = 'Product Not Found - Coffee Shop';
        }
    };

    const productId = getProductIdFromUrl();
    if (productId) {
        loadProductDetails(productId);
    } else {
        // If no ID in URL, display a message or redirect
        if (productDetailContainer) {
            productDetailContainer.innerHTML = '<p style="text-align: center; font-size: 1.5em; color: #555;">No product selected. Please go back to the <a href="index.html#products" style="color: #eeae60;">products page</a>.</p>';
            productDetailContainer.style.display = 'block';
        }
        document.title = 'No Product Selected - Coffee Shop';
    }
});