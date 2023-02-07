let cart = []

function updateCartAmount(){
    let totCart = cart.reduce((a, b) => a + b.cartAmount, 0)
    console.log(cart)
    $(".cart--list").css("display","flex")
    $(".cart--list").text(totCart)
    if(totCart==0)$(".cart--list").css("display","none")
}

function togglePreview(id){
    $(".preview--container img").attr("src", `./images/image-product-${id}.jpg`);
}

function add(){
    let cartAmount = parseInt($(".cart--control p").text())
    $(".cart--control p").text(cartAmount+1)
}

function minus(){
    let cartAmount = parseInt($(".cart--control p").text())
    if(cartAmount>0)$(".cart--control p").text(cartAmount-1);
}

function addToCart(){
  let cartAmount =  parseInt($(".cart--control p").text())
  
  if(cartAmount>0){
    let productName = $(".product--name").text()
    let price = $(".price").text()
    price = price.replace("$", "")
    cart.push({productName: productName, cartAmount: cartAmount, price: parseFloat(price).toFixed(2)})

    updateCartAmount()
    }
}

function toggleCart(){
    let carts = document.querySelectorAll(".cart--preview")
    console.log(carts)
    let list  = cart.map((cartItem, index)=>{
        return `
        <div id='${index}' class="items">
              <img class="item--image" src="./images/image-product-1-thumbnail.jpg" alt="">
              <div class="item--desc">
                <h4 class="item--title">${cartItem.productName}</h4>
                <p class="item--cost">$${cartItem.price} x ${cartItem.cartAmount} <strong>$${(cartItem.price*cartItem.cartAmount).toFixed(2)}</strong></p>
              </div>
              <img src="./images/icon-delete.svg" onclick="handleDelete('${index}')" alt="">
            </div>
        `
    })
    if(carts.length){
        $(".cart--preview").remove()
    } else {
        $(".cart--container").append(`
        <div class="cart--preview">
        <h3>Cart</h3>
        <hr>
        ${cart.length>0?`
        ${list.join("")}
        <button class="check--out">Checkout</button>
        `:`
        <p class="no--cart">You cart is empty.</p>        
        `}
        </div>`)
    }
}

function handleDelete(id){
    $(`cart--preview #${id}`).remove()
    cart.splice(id, 1)
    updateCartAmount()
    toggleCart()
}