
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