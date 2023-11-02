getTop5Product();
function getTop5Product() {
    let str = '';
    for(let i = 0; i < 5; i++) {
        let rate = products[i].rating;
        str += `
                <div class="product-item">
                    <div class="product-thumb-info">
                        <a href="#" title="" class="product-thumbnail">
                            <img src="assets/images/products/${products[i].urlImg}" alt="">
                        </a>
                        <div class="info-action-start">
                            <div class="product-info">
                                <a href="#" class="product-name">${products[i].name}</a>
                                <span class="price-box">${formatCurrency(products[i].price)}</span>
                            </div>
                            <div class="product-action-start">
                                <div class="start">`;
        for(let i = 0; i < rate; i++) {
            str += `<i class="fa-solid fa-star"></i>`;
        }                    
        str +=                 `</div>
                                <a onclick="addProductCart(${products[i].id})" class="action">
                                    <i class="fa-solid fa-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
        `;
    }

    document.getElementById('list_top5_product').innerHTML = str;
}

showCategories();
function showCategories() {
    let str = '';
    for(let i = 0; i < categories.length; i++) {
        str += `
            <div class="item-category">
                <div class="category-img">
                    <img src="assets/images/categories/${categories[i].urlImg}" alt="">
                </div>
                <div class="category-info">
                    <h4>${categories[i].name}</h4>
                    <div class="category-des">
                        ${categories[i].des}
                    </div>
                </div>
            </div>`;
    }
    document.getElementById('list_categories').innerHTML = str;
}

showProducts();
function showProducts() {
    let str = '';
    for(let i = 0; i < products.length; i++) {
        str += `
                <div class="item-product">
                    <div class="item-img">
                        <img src="assets/images/products/${products[i].urlImg}" alt="">
                    </div>
                    <div class="item-info">
                        <div class="item-name-price">
                            <div class="item-name">
                            ${products[i].name}
                            </div>
                            <div class="item-price">${formatCurrency(products[i].price)}</div>
                        </div>
                        <div class="item-des">
                        ${products[i].des}
                        </div>
                    </div>
                </div>
        `;
    }
    document.getElementById('list_product').innerHTML = str;
}

function addProductCart(id) {
    let product = findProductById(id);
    let flag = false;

    for(let i = 0; i < carts.length; i++){
        let idProductAdd = carts[i].product.id;
        if(idProductAdd == id) {
            carts[i].quantity++;
            flag = true;
        }
    }
    if(!flag) {
        let cart = new Cart(carts.length + 1, product, 1);
        localStorage.setItem(KEY_CARTS, JSON.stringify(carts));
        carts.push(cart);
    }
    showCart();
}

function removeProductCart(id) {
    for(let i = 0; i < carts.length; i++) {
        if(carts[i].id == id) {
            carts.splice(i, 1);
        }
    }
    localStorage.setItem(KEY_CARTS, JSON.stringify(carts));
    showCart();
}

showCart()

function showCart() {
    let str = '';
    let amount = 0;
    for(let i = 0; i < carts.length; i++) {
        let product = carts[i].product;
        str += `
                <div class="cart-item">
                    <div class="cart-item-top">
                        <div class="cart-item-title">
                            <h4><a href="" title="Latte">${product.name}</a></h4>
                        </div>
                        <div class="cart-item-quantity">
                            <button>+</button>
                            <input type="number" value="${carts[i].quantity}">
                            <button>-</button>
                        </div>
                    </div>
                    <div class="cart-item-bottom">
                        <div class="remove-cart-item">
                            <a href="#" onclick="removeProductCart(${carts[i].id})">x Xóa</a>
                        </div>
                        <div class="cart-item-price">
                            ${formatCurrency(product.price * carts[i].quantity)}
                        </div>
                    </div>
                </div>
        `;
        amount += product.price * carts[i].quantity;
    }
    localStorage.setItem(KEY_CARTS, JSON.stringify(carts));
    document.getElementById('total-cart').innerHTML = carts.length;
    document.getElementById('list_cart').innerHTML = str;
    document.getElementById('amount').innerHTML = formatCurrency(amount);
}

document.querySelector('#cart').onclick = ()=> {
    document.querySelector('.cart-popup').classList.toggle('active');
}

let searchForm = true;
document.querySelector('.box-search').onclick = ()=>{
    if(searchForm) {
        document.querySelector('.search-form').style.display = 'block';
        searchForm = false;
    } else {
        document.querySelector('.search-form').style.display = 'none';
        searchForm = true;
    }
    
}