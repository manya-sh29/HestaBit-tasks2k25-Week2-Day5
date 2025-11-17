const productContainer = document.getElementById('product-container');
const searchInput = document.getElementById('search');
const sortButton = document.getElementById('sort');

let products = [];
let filteredProducts = [];

async function fetchProducts() {
    try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        products = data.products;
        filteredProducts = [...products];
        renderProducts(filteredProducts);
    } catch (error) {
        productContainer.innerHTML = '<p>Error loading products</p>';
        console.error(error);
    }
}

function renderProducts(list) {
    productContainer.innerHTML = list.map(product => `
        <div class="product-card">
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
        </div>
    `).join('');
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    filteredProducts = products.filter(p => p.title.toLowerCase().includes(query));
    renderProducts(filteredProducts);
});

// Sort functionality
sortButton.addEventListener('click', () => {
    filteredProducts.sort((a, b) => b.price - a.price);
    renderProducts(filteredProducts);
});

// Initial fetch
fetchProducts();
