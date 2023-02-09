let cart = []
let image = 1

function updateCartAmount(){
    let totCart = cart.reduce((a, b) => a + b.cartAmount, 0)
    console.log(cart)
    $(".cart--list").css("display","flex")
    $(".cart--list").text(totCart)
    if(totCart==0)$(".cart--list").css("display","none")
}

function togglePreview(id, type){
    image = id
    $(`${type} .preview--container img`).attr("src", `./images/image-product-${id}.jpg`);
    $(`${type} .prev div`).css("border", "initial")
    $(`${type} .prev div img`).css("opacity", "initial")
    $(`${type} .thumbnail${parseInt(id)} div`).css("border", "2px solid hsl(26, 100%, 55%)")
    $(`${type} .thumbnail${parseInt(id)} div img`).css("opacity", "0.5")
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

function handleNext(){
    image++;
    if(image==5) image = 1
    $("aside .preview--container img").attr("src", `./images/image-product-${image}.jpg`)
    $(`aside .prev div`).css("border", "initial")
    $(`aside .prev div img`).css("opacity", "initial")
    $(`aside .thumbnail${image} div`).css("border", "2px solid hsl(26, 100%, 55%)")
    $(`aside .thumbnail${image} div img`).css("opacity", "0.5")
}

function handlePrev(){
    image--;
    if(image==0) image = 4
    $("aside .preview--container img").attr("src", `./images/image-product-${image}.jpg`)
    $(`aside .prev div`).css("border", "initial")
    $(`aside .prev div img`).css("opacity", "initial")
    $(`aside .thumbnail${image} div`).css("border", "2px solid hsl(26, 100%, 55%)")
    $(`aside .thumbnail${image} div img`).css("opacity", "0.5")
}


function openPreview() {
    $("body").append(`
    <aside>
    <div class="product--preview">
      <div class="background"></div>
      <div class="preview">
        <div class="img--close" onclick="closePreview()">
          <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="hsl(26, 100%, 55%)" fill-rule="evenodd"/></svg>
        </div>
        <div class="preview--container">
            <button class="prev" onclick="handlePrev()">
            <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>
            </button>
            <img src="./images/image-product-${image}.jpg" alt="">
            <button class="next" onclick="handleNext()">
            <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>
            </button>
        </div>
        <div class="thumbnail1 prev">
            <div>
                <img  onclick="togglePreview('1', 'aside')" src="./images/image-product-1-thumbnail.jpg" alt="">
            </div>
        </div>
        <div class="thumbnail2 prev">
            <div>
                <img  onclick="togglePreview('2', 'aside')" src="./images/image-product-2-thumbnail.jpg" alt="">
            </div>
        </div>
        <div class="thumbnail3 prev">
            <div>
                <img  onclick="togglePreview('3', 'aside')" src="./images/image-product-3-thumbnail.jpg" alt="">
            </div>
        </div>
        <div class="thumbnail4 prev">
            <div>
                <img  onclick="togglePreview('4', 'aside')" src="./images/image-product-4-thumbnail.jpg" alt="">
            </div>
        </div>
      </div>
    </div>
  </aside>`)
}

function closePreview(){
    $("aside").remove()
}