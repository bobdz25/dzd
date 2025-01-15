// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحديث عدد المنتجات في السلة (الذي يظهر في الـ header)
    updateCartCount();

    // إذا كنا في صفحة السلة، نعرض محتويات السلة
    if (document.getElementById('cart-items-container')) {
        displayCartItems();
    }
});

// إضافة منتج إلى السلة
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];  // استرجاع السلة من localStorage أو إنشاء سلة فارغة
    
    // إضافة المنتج إلى السلة
    cart.push({ productName, price });
    
    // تخزين السلة في LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // تحديث عدد المنتجات في السلة
    updateCartCount();
}

// تحديث عدد المنتجات في السلة
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cart.length;
    document.getElementById('cart-count')?.textContent = `السلة (${cartCount})`;
}

// عرض محتويات السلة
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items-container');
    let totalPrice = 0;

    // إذا كانت السلة فارغة
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>سلتك فارغة!</p>';
        return;
    }

    // عرض المنتجات في السلة
    cart.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.productName}</p>
            <p>السعر: ${item.price} ر.س</p>
        `;
        cartItemsContainer.appendChild(itemElement);
        totalPrice += parseFloat(item.price);
    });

    // عرض المجموع
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// ربط الزر "أضف إلى السلة" بكل منتج
document.querySelectorAll('.add-to-cart-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        const productName = this.dataset.productName;
        const price = this.dataset.price;
        addToCart(productName, price);
    });
});
