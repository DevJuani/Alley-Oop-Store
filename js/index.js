//anclar imagen en el css para que no se mueva
//En la funcion de que dispara el boton comprar, si hay un item, lo borro y le doy a comprar, se realiza con exito

let carrito = []

const addToShoppingCartButtons = document.querySelectorAll('.addToCart')
addToShoppingCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addToCartClicked)
})

//Boton comprar
const buyButton = document.querySelector('.comprarButton')
buyButton.addEventListener('click', buyButtonClicked)

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer')

function addToCartClicked(event) {
    const button = event.target
    const item = button.closest('.modal-content')

    const itemTitle = item.querySelector('.modal-title').innerText
    const itemPrice = item.querySelector('.modal-price').innerText
    const itemImage = item.querySelector('.modal-image').src
    const producto = {
        title: itemTitle,
        price: itemPrice,
        image: itemImage
    };
    carrito.push(producto)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    mostrarCarrito();

    //addItemToShoppingCart(itemTitle, itemPrice, itemImage)
}

function mostrarCarrito() {
    let shoppingCartRow = document.createElement('div')
    let productosJson = JSON.parse(localStorage.getItem('carrito'))
    
    for (let elemento of productosJson) {
        shoppingCartRow.innerHTML = `<div class="row shoppingCartItem">
                    <div class="col-6">
                        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                            <img class="imagenCarrito" src=${elemento.image} class="shopping-cart-image">
                            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${elemento.title}</h6>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                            <p class="item-price mb-0 shoppingCartItemPrice">${elemento.price}</p>
                        </div>
                    </div>
                    <div class="col-4">
                        <div
                            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                            <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                                value="1">
                            <button class="btn btn-danger buttonDelete" type="button">X</button>
                        </div>
                    </div>
                </div>`
    }

    shoppingCartItemsContainer.appendChild(shoppingCartRow);
    //Boton de borrar item
    //filter con el title, y si es igual, se borra
    shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeItemFromShoppingCart)

    function checkIfItemExists(title) {
        return JSON.parse(localStorage.getItem('carrito')).some(item => item.title === title)
    }

    //funcion de para aniadir mas de un item al carrito
    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanger)
    
    updateShoppingCartTotal()
}
/*function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItem')
    //Para que cuando agregue una item se aumente el numero y no agregue una row
    //ERROR DE ELEMNTQUANTITY
    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle) {
            //let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
        }
        //elementQuantity.value++;
        //return
    }
    const shoppingCartRow = document.createElement('div')
    const shoppingCartContent = `
                <div class="row shoppingCartItem">
                    <div class="col-6">
                        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                            <img class="imagenCarrito" src=${itemImage} class="shopping-cart-image">
                            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                            <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
                        </div>
                    </div>
                    <div class="col-4">
                        <div
                            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                            <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                                value="1">
                            <button class="btn btn-danger buttonDelete" type="button">X</button>
                        </div>
                    </div>
                </div>`
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.appendChild(shoppingCartRow);

    //Boton de borrar item
    shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeItemFromShoppingCart)

    //funcion de para aniadir mas de un item al carrito
    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanger)

    updateShoppingCartTotal()
}*/

//Funcion de actualizacion del carrito: Items y total
function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal')
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem')

    shoppingCartItems.forEach(shoppingCartItems => {
        const shoppingCartItemPriceElement = shoppingCartItems.querySelector('.shoppingCartItemPrice')
        const shoppigCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$', ''))
        const shoppingCartItemQuantityElement = shoppingCartItems.querySelector('.shoppingCartItemQuantity')
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value)
        total += shoppigCartItemPrice * shoppingCartItemQuantity
    })
    shoppingCartTotal.innerHTML = `$ ${total.toFixed(3)}`
}


//Funcion de Borrado de items del carrito
function removeItemFromShoppingCart(event) {
    const buttonClicked = event.target
    buttonClicked.closest('.shoppingCartItem').remove()
    updateShoppingCartTotal()
}

//Funcion de cambio de cantidad de items del carrito
function quantityChanger(event) {
    const input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Para eliminar un item, usar el boton X',
            showConfirmButton: false,
            timer: 1700
        })
    }
    updateShoppingCartTotal()
}

//Funcion que dispara el boton comprar
function buyButtonClicked() {
    if (shoppingCartItemsContainer.childElementCount === 0) {
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'No hay items en el carrito',
            showConfirmButton: false,
            timer: 1700
        })
    } else {
        shoppingCartItemsContainer.innerHTML = ''
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada con exito',
            showConfirmButton: false,
            timer: 1500
        })
        updateShoppingCartTotal()
        window.localStorage.clear()
    }
}