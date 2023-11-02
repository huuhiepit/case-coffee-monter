// Function 
function showCategies() {
    let str = '<option value="">Lựa chọn thể loại</option>';

    categories.forEach(category => {
        str += `<option value="${category.id}">${category.name}</option>`
    })

    document.getElementById('selectCategory').innerHTML = str;
}

function showProducts() {
    let str = '';
    let i = 1;
    products.forEach(product => {
        
        str += `
        <tr id="tr_product-${product.id}">
            <td>${i}</td>
            <td>P-${product.id}</td>
            <td>${product.name}</td>
            <td class="table-img"><img src="/assets/images/products/${product.urlImg}" alt=""></td>
            <td class="table-number">${formatCurrency(product.price)}</td>
            <td>${product.category.name}</td>
            <td style="width: 25%;">${product.des}</td>
            <td>
                <button class="btn fas fa-edit btn-edit" type="button" onclick="handleEditProduct(${product.id})" type="button"></button>
                <button class="btn fas fa-trash btn-delete" type="button" onclick="handleDeleteProduct(${product.id})"></button>
            </td>
        </tr>
        `;
        i++;
    });
    document.getElementById('total-product').innerHTML = `${i-1} out of ${products.length} Products`;
    document.getElementById('list-products').innerHTML = str;
}

//CRUD
function handleAddProduct() {
    let name = document.querySelector('.info-form input[name="txtName"]').value;
    let urlImg = document.querySelector('.info-form input[name="txtUrlImg"]').files[0].name;
    let price = document.querySelector('.info-form input[name="txtPrice"]').value;
    let catelory = document.querySelector('.info-form select[name="sCatelory"]').value;
    let des = document.querySelector('.info-form textarea[name="txtDes"]').value;

    //id, name, urlImg,category,price, des, rating
    let product = new Product(findMaxProductId(), name, urlImg, findCategoryById(catelory), price, des, 5);
    
    if(errorProduct(product)) {
        products.push(product);
        localStorage.setItem("KEY_PRODUCTS", JSON.stringify(products));
        clearInputAddProduct(); 
        showProducts();
    }
}   

function clearInputAddProduct() {
    document.querySelector('.info-form input[name="txtName"]').value = ''; 
    document.querySelector('.info-form input[name="txtUrlImg"]').files[0].name = ''; 
    document.querySelector('.info-form input[name="txtPrice"]').value = ''; 
    document.querySelector('.info-form select[name="sCatelory"]').value = ''; 
    document.querySelector('.info-form textarea[name="txtDes"]').value = '';
}

let editValue = true;

function handleEditProduct(id) {
    if(editValue) {
        let product = findProductById(id);
        let tdName = document.querySelectorAll(`#tr_product-${id} td`)[2];
        let tdUrlImage = document.querySelectorAll(`#tr_product-${id} td`)[3];
        let tdPrice = document.querySelectorAll(`#tr_product-${id} td`)[4];
        let tdCategory = document.querySelectorAll(`#tr_product-${id} td`)[5];
        let tdDes = document.querySelectorAll(`#tr_product-${id} td`)[6];
        let tdAction = document.querySelectorAll(`#tr_product-${id} td`)[7];

    
        
        tdName.innerHTML = `<input name="editPName" type="text" value="${product.name}">`;
        tdPrice.innerHTML = `<input name="editPPrice" type="number" value="${product.price}">`;
        
        let strSelect = '<select name="editCategory">';
        let caterloryEdit = swapCategory(product.category.id);
        for(let i = 0; i < caterloryEdit.length; i++) {
            strSelect += `<option value="${caterloryEdit[i].id}">${caterloryEdit[i].name}</option>`;
        }
        strSelect += '</select>';
        tdCategory.innerHTML = strSelect;
        tdDes.innerHTML = `<textarea name="editDes" id="" rows="5">${product.des}</textarea>`;

        tdAction.innerHTML = `
            <button class="btn btn-edit" onclick="handleUpdateProduct(${id})">
                <i class="fa-solid fa-check"></i>
            </button>
            <button class="btn btn-delete" onclick='handleCancelProduct(${id})'>
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;
        editValue = false;
    } else {
        alert("Editing on");
    }
}

function handleUpdateProduct(id) {
    let name = document.querySelector(`input[name="editPName"]`).value;
    let price = document.querySelector(`input[name="editPPrice"]`).value;
    let catelory = document.querySelector('select[name="editCategory"]').value;
    let des = document.querySelector('textarea[name="editDes"').value;

    // console.log(name, price, catelory, des);
    let product = findProductById(id);
    let cate = findCategoryById(catelory)

    if(name == "" || price == "" || price < 0 || des == "") {
        alert("Edit erros");
    } else {
        product.name = name;
        product.price = price;
        product.category = cate;
        product.des = des;
        localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products));
    }
    editValue = true;
    showProducts();
}

function handleCancelProduct(id) {
    let product = findProductById(id);
    let stt = document.querySelectorAll(`#tr_-product${id}`)[0];
    let str = `
            <td>${stt}</td>
            <td>P-${product.id}</td>
            <td>${product.name}</td>
            <td class="table-img"><img src="/assets/images/products/${product.urlImg}" alt=""></td>
            <td class="table-number">${formatCurrency(product.price)}</td>
            <td>${product.category.name}</td>
            <td style="width: 25%;">${product.des}</td>
            <td>
                <button class="btn fas fa-edit btn-edit" type="button" onclick="handleEditProduct(${product.id})" type="button"></button>
                <button class="btn fas fa-trash btn-delete" type="button" onclick=""></button>
            </td>`;
    document.querySelectorAll(`#tr_-product${id}`).innerHTML = str;
    
    editValue = false;
}

function handleDeleteProduct(id) {
    let product = findProductById(id);
    let check = confirm(`Are you sure you want to remove ${product.name}`);

    if(check) {
        deleteProduct(id);
        showProducts();
    }
}

function deleteProduct(id) {
    for(let i = 0; i < products.length; i++) {
        if(products[i].id == id) {
            products.splice(i, 1);
            localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products));
            break;
        }
    }
}

function errorProduct(product) {
    let errors = [];
    
    if(product.name == "") {
        errors.push('Please enter a name');
    }
    if(product.urlImg == "") {
        errors.push('Please select image');
    }
    if(product.price == "") {
        errors.push('Price must be a number');
    }
    if(product.category == null) {
        errors.push('Please select category');
    }
    if(product.des == "") {
        errors.push('Please enter describe');
    }
    
    if(errors.length > 0) {
        let messages = '';
        errors.forEach(error => {
            messages += error + '\n';
        })
        alert(messages);
        return false;
    }
    return true;
}

function searchNameProduct() {

    let txtSearch = document.querySelector('.search-box input[name="txtSearch"]').value;
    let productSearch = products.filter((p)=>{
        return p.name.toLowerCase().includes(txtSearch.toLowerCase())
    });
    let i = 1;
    let str = '';
    productSearch.forEach(product => {    
        str += `
        <tr id="tr_product-${product.id}">
            <td>${i}</td>
            <td>P-${product.id}</td>
            <td>${product.name}</td>
            <td class="table-img"><img src="/assets/images/products/${product.urlImg}" alt=""></td>
            <td class="table-number">${formatCurrency(product.price)}</td>
            <td>${product.category.name}</td>
            <td style="width: 25%;">${product.des}</td>
            <td>
                <button class="btn fas fa-edit btn-edit" type="button" onclick="handleEditProduct(${product.id})" type="button"></button>
                <button class="btn fas fa-trash btn-delete" type="button" onclick="handleDeleteProduct(${product.id})"></button>
            </td>
        </tr>`;
        i++;
    })

    document.getElementById('total-product').innerHTML = `${i-1} out of ${products.length} Products`;
    document.getElementById('list-products').innerHTML = str;
}
// Window
showCategies();
showProducts();