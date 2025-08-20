// Gondola page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get category from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');
    
    if (categoryFromUrl) {
        filterProducts(categoryFromUrl);
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const targetBtn = document.querySelector(`[onclick="filterProducts('${categoryFromUrl}')"]`);
        if (targetBtn) {
            targetBtn.classList.add('active');
        }
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchProducts(searchTerm);
        });
    }
});

// Filter products by category
function filterProducts(category) {
    const allCategories = document.querySelectorAll('.product-category');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category.toLowerCase()) || 
            (category === 'all' && btn.textContent === 'Todos')) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide categories
    allCategories.forEach(categorySection => {
        const categoryData = categorySection.getAttribute('data-category');
        
        if (category === 'all' || categoryData === category) {
            categorySection.classList.remove('hidden');
            // Add fade-in animation
            categorySection.style.opacity = '0';
            categorySection.style.transform = 'translateY(20px)';
            setTimeout(() => {
                categorySection.style.transition = 'all 0.3s ease';
                categorySection.style.opacity = '1';
                categorySection.style.transform = 'translateY(0)';
            }, 100);
        } else {
            categorySection.classList.add('hidden');
        }
    });
    
    // Scroll to products section
    const productsMain = document.querySelector('.products-main');
    if (productsMain && category !== 'all') {
        productsMain.scrollIntoView({ behavior: 'smooth' });
    }
}

// Search products by name
function searchProducts(searchTerm) {
    const allProducts = document.querySelectorAll('.product-card');
    let hasResults = false;
    
    allProducts.forEach(product => {
        const productTitle = product.querySelector('.product-title').textContent.toLowerCase();
        const productDescription = product.querySelector('.product-description').textContent.toLowerCase();
        
        if (productTitle.includes(searchTerm) || productDescription.includes(searchTerm)) {
            product.style.display = 'block';
            hasResults = true;
            // Highlight search term (optional)
            highlightSearchTerm(product, searchTerm);
        } else {
            product.style.display = 'none';
        }
    });
    
    // Show/hide categories based on search results
    const allCategories = document.querySelectorAll('.product-category');
    allCategories.forEach(category => {
        const visibleProducts = category.querySelectorAll('.product-card[style*="block"], .product-card:not([style*="none"])');
        if (searchTerm === '' || visibleProducts.length > 0) {
            category.classList.remove('hidden');
        } else {
            category.classList.add('hidden');
        }
    });
    
    // Show no results message
    showNoResultsMessage(!hasResults && searchTerm !== '');
}

// Highlight search terms in product cards
function highlightSearchTerm(product, searchTerm) {
    if (searchTerm === '') return;
    
    const title = product.querySelector('.product-title');
    const description = product.querySelector('.product-description');
    
    [title, description].forEach(element => {
        const originalText = element.textContent;
        const highlightedText = originalText.replace(
            new RegExp(searchTerm, 'gi'),
            match => `<mark style="background: #fff3cd; padding: 2px 4px; border-radius: 3px;">${match}</mark>`
        );
        element.innerHTML = highlightedText;
        
        // Remove highlights after 3 seconds
        setTimeout(() => {
            element.textContent = originalText;
        }, 3000);
    });
}

// Show no results message
function showNoResultsMessage(show) {
    let noResultsDiv = document.getElementById('noResults');
    
    if (show) {
        if (!noResultsDiv) {
            noResultsDiv = document.createElement('div');
            noResultsDiv.id = 'noResults';
            noResultsDiv.className = 'no-results';
            noResultsDiv.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #7f8c8d;">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; color: #bdc3c7;"></i>
                    <h3>No se encontraron productos</h3>
                    <p>Intenta con otros términos de búsqueda</p>
                </div>
            `;
            document.querySelector('.products-main .container').appendChild(noResultsDiv);
        }
        noResultsDiv.style.display = 'block';
    } else {
        if (noResultsDiv) {
            noResultsDiv.style.display = 'none';
        }
    }
}

// Add to cart with animation
function addToCartWithAnimation(button, id, name, price, image) {
    // Disable button temporarily
    button.disabled = true;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Agregando...';
    
    // Add to cart
    setTimeout(() => {
        addToCart(id, name, price, image);
        
        // Reset button
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-check"></i> ¡Agregado!';
        button.style.background = '#27ae60';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }, 500);
}

// Enhanced add to cart function for product cards
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-cart-btn') || 
        event.target.closest('.add-to-cart-btn')) {
        
        const button = event.target.closest('.add-to-cart-btn');
        const productCard = button.closest('.product-card');
        
        if (productCard) {
            // Add visual feedback
            productCard.style.transform = 'scale(0.95)';
            setTimeout(() => {
                productCard.style.transform = '';
            }, 150);
        }
    }
});

// Lazy loading for product images
function setupLazyLoading() {
    const images = document.querySelectorAll('.product-image');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when page loads
document.addEventListener('DOMContentLoaded', setupLazyLoading);