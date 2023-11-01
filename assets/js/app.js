class Product {
    constructor(id, name, urlImg,category,price, des, rating) {
        this.id = id;
        this.name = name;
        this.urlImg = urlImg;
        this.category = category;
        this.price = price;
        this.des = des;
        this.rating = rating;
    }
}

class Category {
    constructor(id, urlImg, name, des) {
        this.id = id;
        this.name = name;
        this.urlImg = urlImg;
        this.des = des;
    }
}

class Cart {
    constructor(id, product, quantity) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
    }
}

//Category

// let categories = [cate01, cate02, cate03]

//Products

// let products = [pro01, pro02, pro03, pro04, pro05];

let categories = [];
let products = [];
let carts = [];
let KEY_PRODUCTS = "KEY_PRODUCTS";
let KEY_CATEGORIES = "KEY_CATEGORIES";
let KEY_CARTS = "KEY_CARTS";

initData();
function initData() {
    if(localStorage.getItem(KEY_CATEGORIES) != null ) {
        categories = JSON.parse(localStorage.getItem(KEY_CATEGORIES));
    } else {
        let cate01 = new Category(1, 'cate_coffee.png', 'Cà phê', "Sự kết hợp hoàn hảo giữa hạt cà phê Robusta & Arabica thượng hạng được trồng trên những vùng cao nguyên Việt Nam màu mỡ, qua những bí quyết rang..." );
        let cate02 = new Category(2, 'cate_tra.png', 'Trà', "Hương vị tự nhiên, thơm ngon của Trà Việt với phong cách hiện đại tại Monster Coffee sẽ giúp bạn gợi mở vị giác của bản thân và tận hưởng một cảm giác thật khoan khoái, tươi mới.");
        let cate03 = new Category(3, 'cate_cake.png', 'Bánh ngọt', "Những chiếc bánh của chúng tôi mang hương vị đặc trưng của ẩm thực Việt và còn là sự Tận Tâm, gửi gắm mà chúng tôi dành cho Quý khách hàng.");

        categories = [cate01, cate02, cate03];
        localStorage.setItem(KEY_CATEGORIES, JSON.stringify(categories));
    }

    if(localStorage.getItem(KEY_PRODUCTS) != null) {
        products = JSON.parse(localStorage.getItem(KEY_PRODUCTS));
    } else { 
        let pro01 = new Product(1, 'Mocha recipe', 'mocha.png', categories[0], 47000, "Cafe Mocha là gì? Mocha là 1 loại café được tạo cho từ Espresso & nữa nóng, thêm hương vị chocolate...", 5);
        let pro02 = new Product(2, 'Latte', 'latte.png', categories[0], 48000, "Ly cà phê sữa ngọt ngào đến khó quên! Với một chút nhẹ nhàng hơn so với Cappuccino, Latte của chúng tôi bắt...", 5);
        let pro03 = new Product(3, 'Vanila latte', 'vanila.png', categories[0], 49000, "y cà phê sữa đậm đà thời thượng! Một chút đậm đà hơn so với Latte, Cappuccino của chúng tôi...", 5);
        let pro04 = new Product(4, 'Americano', 'americano.png', categories[0], 46000, "Americano là sự kết hợp giữa cà phê espresso thêm vào nước đun sôi. Bạn có thể tùy thích lựa...", 5);
        let pro05 = new Product(5, 'Caramel latte', 'caramel.png', categories[0], 49000, "Đích thực là ly cà phê espresso ngon đậm đà! Được chiết xuất một cách hoàn hảo từ loại cà...", 5);
        let pro06 = new Product(6, 'Cafe cappuccino', 'cappuchino.png', categories[0], 49000, "Đích thực là ly cà phê espresso ngon đậm đà! Được chiết xuất một cách hoàn hảo từ loại cà...", 5);
        let pro07 = new Product(7, 'Espresso', 'espresso.png', categories[0], 49000, "Đích thực là ly cà phê espresso ngon đậm đà! Được chiết xuất một cách hoàn hảo từ loại cà...", 5);
        let pro08 = new Product(8, 'Iced espresso', 'iced.png', categories[0], 49000, "Đích thực là ly cà phê espresso ngon đậm đà! Được chiết xuất một cách hoàn hảo từ loại cà...", 5);

        products = [pro01, pro02, pro03, pro04, pro05, pro06, pro07, pro08];
        localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products));
    }

    if(localStorage.getItem(KEY_CARTS) != null) {
        carts = JSON.parse(localStorage.getItem(KEY_CARTS));
    } else {
        localStorage.setItem(KEY_CARTS, JSON.stringify(carts));
    }
}


//Function
function formatCurrency(money) {
    return parseInt(money).toLocaleString('vi-VN', { style: 'currency', currency: 'VND'});
}


function findCategoryById(id) {
    for(let i = 0; i < categories.length; i++) {
        if(categories[i].id == id) {
            return categories[i];
        }
    }
    return null;
}

function findProductById(id) {
    for(let i = 0; i < products.length; i++) {
        if(products[i].id === id) {
            return products[i];
        }
    }
    return null;
}

function findMaxProductId() {
    let max = products[0].id;
    products.forEach((product) => {
        if(product.id > max) {
            max = product.id;
        }
    })
    return max + 1;
}

function swapCategory(id) {
    for(let i = 0; i < categories.length; i++) {
        if(categories[i].id == id) {
            let temp = categories[0];
            categories[0] = categories[i];
            categories[i] = temp;
        }
    }
    return categories;
}