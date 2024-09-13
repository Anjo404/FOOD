const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const adressInput = document.getElementById("adress")
const adressWarn = document.getElementById("adress-warn")


let cart = [];


    //abrir o modal do carrinho
    cartBtn.addEventListener("click", function() {
    cartModal.style.display = "flex"
    updateCartModal();
    cartModal.style.display = "flex"


})

    //fechar modal
    cartModal.addEventListener("click", function(event){
        if(event.target === cartModal){
            cartModal.style.display ="none"
        }
  
    }) 
    
    closeModalBtn.addEventListener("click", function(){
        cartModal.style.display ="none"
    })


    menu.addEventListener("click", function(event){
        // console.log(event.target)

        let parentButton = event.target.closest(".add-to-cart-btn")

        if(parentButton){
            const name = parentButton.getAttribute("data-name")
            const price =parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name,price)

        }
        
    
    })

    //FUNCAO PARA ADD NO CARRINHO

    function addToCart(name, price){
        const existingItem = cart.find(item => item.name === name)

        if(existingItem){
            //se o item já existe, aumenta a penas a quantidade +1
            existingItem.quantity += 1;
            }else{

        cart.push({
            name,
            price,
            quantity: 1,

        })
        }

        updateCartModal()
    }


    //Atualiza o carrinho
    function updateCartModal(){

        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item =>{
            const cartItemElement = document.createElement("div");
            cartItemElement.classList.add("flex", "justify-between","mb-4", "flex-col")



            cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">

            <div>

            <p class="font-bold">${item.name}</p>
            <p>Qtd:${item.quantity}</p>
            <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>
            

            <button class="remove-from-cart-btn" data-name="${item.name}">
            Remover
            </button>
            

            </div>  `
            total += item.price * item.quantity;

            cartItemsContainer.appendChild(cartItemElement)


        })

        cartTotal.textContent = total.toLocaleString("pt-BR", {
            style:"currency",
            currency: "BRL"

        });

            cartCounter.innerHTML = cart.length;

    }


    //Funcao para remover o item do carrinho
    cartItemsContainer.addEventListener("click", function (event){
        if (event.target.classList.contains("remove-from-cart-btn")){
            const name = event.target.getAttribute("data-name")
            removeItemCart(name);

        }
    
})
function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];
        console.log(item);

        if (item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;

        }
        cart.splice(index,1);
        updateCartModal();

    }}

    adressInput.addEventListener("input", function(event){
        let inputValue = event.target.value;
        
        if(inputValue !== ""){
            adressInput.classList.remove("border-red-500")
            adressWarn.classList.add("hidden")
        
        }

        //

    })

    //finalizar pedido

checkoutBtn.addEventListener("click", function(){
const isOpen = checkRestaurantOpen();
if(!isOpen){
    Toastify({
        text: "Ops o Restaurante está fechado!",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#ef4444",
        },
        
      }).showToast();



return;

}


    if(cart.length === 0) return;
if(adressInput.value ===""){

adressWarn.classList.remove("hidden")
adressInput.classList.add("border-red-500")
return;
}

//enviar pedido para api whats

const cartItem = cart.map((item) => {
    return( 
    ` ${item.name}  Quantidade:  (${item.quantity}) Preço: R$${item.price} `
    )

}).join("")
 
const message = encodeURIComponent(cartItem)
const phone = "67993022907"

window.open(`https://wa.me/${phone}?text=${message} Endereço:${adressInput.value}`, "_blank")

cart = [];
updateCartModal();

})




//verificar a hora  restaurante

function checkRestaurantOpen(){
const data = new Date();
const hora = data.getHours();
return hora >= 18 && hora < 22;

//restaurante aberto



}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

    if(isOpen){
        spanItem.classList.remove("bg-red-500");
        spanItem.classList.add("bg-green-600")
    }else{
        spanItem.classList.remove("bg-green-600")
        spanItem.classList.add("bg-red-500")


    }