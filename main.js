// Main page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            // This would be implemented when we have products on the main page
            console.log('Searching for:', searchTerm);
        });
    }

    // Category button functionality
    window.filterProducts = function(category) {
        // Redirect to gondola page with category filter
        window.location.href = `gondola.html?category=${category}`;
    };

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation to category buttons
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Cargando...</span>';
        });
    });

    // Initialize carousel auto-play
    const carousel = document.getElementById('carouselOffers');
    if (carousel) {
        // Auto-advance carousel every 5 seconds
        setInterval(() => {
            const nextButton = carousel.querySelector('.carousel-control-next');
            if (nextButton) {
                nextButton.click();
            }
        }, 5000);
    }
});