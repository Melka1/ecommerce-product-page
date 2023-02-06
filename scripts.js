let cart = []


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
    cart.push({productName: productName, cartAmount: cartAmount, price: parseFloat(price)})

    let totCart = cart.reduce((a, b) => a + b.cartAmount, 0)
    console.log(cart)
    $(".cart--list").css("display","flex")
    $(".cart--list").text(totCart)
}
}