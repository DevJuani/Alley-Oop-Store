//anclar imagen en el css para que no se mueva

const addToShoppingCartButtons = document.querySelectorAll('.addToCart')
addToShoppingCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addToCartClicked)
})

//Boton comprar
const buyButton = document.querySelector('.comprarButton')
buyButton.addEventListener('click', buyButtonClicked)

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer')

function addToCartClicked(event){
    const button = event.target
    const item =button.closest('.modal-content')

const itemTitle = item.querySelector('.modal-title').innerText
const itemPrice = item.querySelector('.modal-price').innerText
const itemImage = item.querySelector('.modal-image').src

addItemToShoppingCart(itemTitle, itemPrice, itemImage)
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage){


    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItem')
    //Para que cuando agregue una item se aumente el numero y no agregue una row
    //ERROR DE ELEMNTQUANTITY
    for(let i=0; i<elementsTitle.length; i++){
        if(elementsTitle[i].innerText === itemTitle){
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

    shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeItemFromShoppingCart)

    //funcion de para aniadir mas de un item al carrito
    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change',quantityChanger)

    updateShoppingCartTotal()
}

//Funcion de actualizacion del carrito: Items y total
function updateShoppingCartTotal(){
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal')
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem')
    console.log('pedo',shoppingCartItems)

    shoppingCartItems.forEach(shoppingCartItems => {
        const shoppingCartItemPriceElement = shoppingCartItems.querySelector('.shoppingCartItemPrice')
        const shoppigCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$',''))
        const shoppingCartItemQuantityElement = shoppingCartItems.querySelector('.shoppingCartItemQuantity')
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value)
        total += shoppigCartItemPrice * shoppingCartItemQuantity
    })
    shoppingCartTotal.innerHTML = `$ ${total.toFixed(3)}`
}


//Funcion de Borrado de items del carrito
function removeItemFromShoppingCart(event){
    const buttonClicked = event.target
    buttonClicked.closest('.shoppingCartItem').remove()
    updateShoppingCartTotal()
}

//Funcion de cambio de cantidad de items del carrito
function quantityChanger(event){
    const input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
        alert('Para eliminar un item del carrito, presione el boton X')
    }
    updateShoppingCartTotal()
}

//Funcion que dispara el boton comprar
//agregar que no se pueda comprar si no hay items en el carrito
function buyButtonClicked(){
    shoppingCartItemsContainer.innerHTML = ''
    alert('Gracias por su compra')
    updateShoppingCartTotal()
}