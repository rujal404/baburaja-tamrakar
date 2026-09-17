window.onload = function() {
    // Get the popup and main content elements
    var popup = document.getElementById("popup");
    var mainContent = document.getElementById("mainContent");
    var closePopupBtn = document.getElementById("closePopupBtn");

    // Show the popup immediately on page load
    popup.style.display = "flex";

    // Close the popup and show the main content when the close button is clicked
    closePopupBtn.onclick = function() {
        popup.style.display = "none";
        mainContent.style.display = "block";
    };

    // Automatically close the popup after 3 seconds
    setTimeout(function() {
        if (popup.style.display !== "none") {
            popup.style.display = "none";
            mainContent.style.display = "block";
        }
    }, 300000); // Adjust the timing as needed
};

// Product Filter Section
document.getElementById('priceFilterForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;
    const sortOrder = document.getElementById('sortOrder').value;

    let productCards = Array.from(document.querySelectorAll('.product-card'));

    // Filter products based on price range
    productCards.forEach(function(card) {
        const productPrice = parseInt(card.getAttribute('data-price'));

        if (productPrice >= minPrice && productPrice <= maxPrice) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Sort products based on the selected sort order
    productCards = productCards.filter(card => card.style.display === 'block');

    if (sortOrder === 'low-to-high') {
        productCards.sort((a, b) => {
            return parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));
        });
    } else if (sortOrder === 'high-to-low') {
        productCards.sort((a, b) => {
            return parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price'));
        });
    } else if (sortOrder === 'latest') {
        productCards.sort((a, b) => {
            return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
        });
    } else if (sortOrder === 'most-popular') {
        productCards.sort((a, b) => {
            return parseInt(b.getAttribute('data-popularity')) - parseInt(a.getAttribute('data-popularity'));
        });
    }

    // Update the product grid with sorted products
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    productCards.forEach(function(card) {
        productGrid.appendChild(card);
    });
});

