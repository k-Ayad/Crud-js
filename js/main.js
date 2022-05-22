
var productNameInput = document.getElementById('productNameInput');//Input kolo
var productPriceInput = document.getElementById('productPriceInput');//Input kolo
var productCategoryInput = document.getElementById('productCategoryInput');//Input kolo
var productDescInput = document.getElementById('productDescInput');//Input kolo
var tableBody = document.getElementById('tableBody');
var searchInput = document.getElementById('searchInput');
var updateBtn = document.getElementById('updateBtn');
var addBtn = document.getElementById('addBtn');
var productsContainer = [] ;
var updateIndex ;



if(localStorage.getItem('myProduct') != null)
{
    productsContainer = JSON.parse( localStorage.getItem('myProduct') );
    displayProducts(productsContainer);
}

function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    }
    productsContainer.push(product);
    localStorage.setItem('myProduct',JSON.stringify(productsContainer));
    clearForm();
    displayProducts(productsContainer);
}


function clearForm() 
{
    productNameInput.value = "" ;
    productPriceInput.value = "" ;
    productCategoryInput.value = "" ;
    productDescInput.value = "" ;
}


function displayProducts(productList) {

    var content = ``;
    
    for (var i = 0; i < productList.length; i++) {

        if(productList[i].name.toLowerCase().includes(searchInput.value.toLowerCase()) == false)
        {
            continue ;
        }

        content +=`<tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td>  <button class="btn btn-sm btn-outline-warning" onclick="chooseProduct(${i})">update</button> </td>
        <td>  <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${i});">delete</button> </td>
    </tr>`
    }
    tableBody.innerHTML = content;
}


function searchByName ()
{
    displayProducts(productsContainer);
}


function deleteProduct(productIndex) {
    productsContainer.splice(productIndex,1);
    displayProducts(productsContainer);
    localStorage.setItem('myProduct',JSON.stringify(productsContainer));
}


function chooseProduct(productIndex)
{
    updateIndex = productIndex ;
    productNameInput.value = productsContainer[productIndex].name ;
    productPriceInput.value = productsContainer[productIndex].price;
    productCategoryInput.value = productsContainer[productIndex].category;
    productDescInput.value = productsContainer[productIndex].desc;

    addBtn.classList.replace('d-inline-block','d-none');
    updateBtn.classList.replace('d-none' , 'd-inline-block');
}


function updateProduct() {
    productsContainer[updateIndex].name = productNameInput.value ;
    productsContainer[updateIndex].price = productPriceInput.value ;
    productsContainer[updateIndex].desc = productDescInput.value ;
    productsContainer[updateIndex].category = productCategoryInput.value ;

    clearForm();
    addBtn.classList.replace('d-none','d-inline-block');
    updateBtn.classList.replace('d-inline-block' , 'd-none');

    displayProducts(productsContainer);
    localStorage.setItem('myProduct',JSON.stringify(productsContainer));
}